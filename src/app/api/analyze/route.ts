import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { supabase } from '@/lib/supabase';
import { ANALYSIS_SYSTEM_PROMPT } from '@/lib/prompts';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        // Check for required environment variables
        if (!process.env.OPENROUTER_API_KEY) {
            console.error('OPENROUTER_API_KEY is not set');
            return NextResponse.json({ error: 'Server configuration error: Missing OpenRouter API key' }, { status: 500 });
        }

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('Supabase configuration is incomplete');
            return NextResponse.json({ error: 'Server configuration error: Missing Supabase credentials' }, { status: 500 });
        }

        const { image, description } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'Image is required' }, { status: 400 });
        }

        // Generate a hash of the image for caching
        const imageHash = crypto.createHash('sha256').update(image).digest('hex');
        let analysisResult: any = null;

        // 0. Check Cache
        try {
            const { data: cachedAnalysis, error: cacheError } = await supabase
                .from('skin_analyses')
                .select('raw_ai_response')
                .eq('image_hash', imageHash)
                .single();

            if (!cacheError && cachedAnalysis?.raw_ai_response) {
                console.log('Cache hit! Using existing analysis.');
                analysisResult = cachedAnalysis.raw_ai_response;
            }
        } catch (e) {
            console.warn('Cache lookup failed (possibly missing migration):', e);
        }

        if (!analysisResult) {

            // 1. Storage: Upload to Bucket if Base64
            let finalImageUrl = image;
            if (image.startsWith('data:image')) {
                try {
                    const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
                    if (matches) {
                        const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1]; // Normalize jpeg
                        const base64Data = matches[2];
                        const buffer = Buffer.from(base64Data, 'base64');
                        const fileName = `${imageHash}.${extension}`;

                        console.log('Uploading image to storage...');
                        const { error: uploadError } = await supabase
                            .storage
                            .from('scans')
                            .upload(fileName, buffer, {
                                contentType: `image/${matches[1]}`,
                                upsert: true
                            });

                        if (uploadError) {
                            console.warn('Storage upload error (non-fatal):', uploadError.message);
                        }

                        // Always try to get public URL even if upload "failed" (might prevent duplicates error if upsert didn't work as expected or file exists)
                        const { data: { publicUrl } } = supabase
                            .storage
                            .from('scans')
                            .getPublicUrl(fileName);

                        if (publicUrl) {
                            finalImageUrl = publicUrl;
                            console.log('Image stored at:', finalImageUrl);
                        }
                    }
                } catch (uploadErr) {
                    console.warn('Image upload logic failed:', uploadErr);
                }
            }

            // 2. Fetch all active products from DB to feed into the AI context
            console.log('Fetching products from database...');
            const { data: products, error: dbError } = await supabase
                .from('products')
                .select('id, title, product_type, concerns, skin_types')
                .eq('is_active', true);

            if (dbError) {
                console.error('DB Error:', dbError);
                return NextResponse.json({ error: 'Failed to fetch active products: ' + dbError.message }, { status: 500 });
            }

            console.log(`Found ${products?.length || 0} active products`);

            if (!products || products.length === 0) {
                console.warn('No active products found in database');
                return NextResponse.json({
                    error: 'No products available. Please add products to the database first.'
                }, { status: 500 });
            }

            const productContext = JSON.stringify(products);

            // 3. Call OpenRouter AI
            console.log('Calling OpenRouter AI...');
            const response = await openai.chat.completions.create({
                model: "qwen/qwen-2.5-vl-7b-instruct",
                messages: [
                    {
                        role: "system",
                        content: ANALYSIS_SYSTEM_PROMPT + `\n\n### Available Products:\n${productContext}`
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: `User Description: ${description || "No description provided."}` },
                            { type: "image_url", image_url: { url: finalImageUrl } }
                        ]
                    }
                ],
                response_format: { type: "json_object" },
                temperature: 0, // Ensure deterministic output
                seed: 42,
            });

            let aiContent = response.choices[0].message.content || '{}';
            console.log('AI Response received');

            // Sanitize: Remove markdown code blocks if present
            aiContent = aiContent.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

            analysisResult = JSON.parse(aiContent);

            // Save to Cache
            const saveToCache = async () => {
                try {
                    // Store the final public URL (or original if upload failed)
                    await supabase.from('skin_analyses').insert({
                        image_hash: imageHash,
                        image_url: finalImageUrl,
                        raw_ai_response: analysisResult,
                        skin_type_detected: analysisResult.skin_type,
                        concerns_detected: analysisResult.concerns,
                        analysis_summary: analysisResult.summary
                    });
                    console.log('Analysis cached successfully');
                } catch (err) {
                    console.warn('Failed to cache analysis:', err);
                }
            };
            await saveToCache();
        }

        // 3. Hydrate Product Data
        // Extract all product IDs from the routine
        const productIds: string[] = [];
        analysisResult.routine?.morning?.forEach((step: any) => {
            if (step.product_id) productIds.push(step.product_id);
        });
        analysisResult.routine?.evening?.forEach((step: any) => {
            if (step.product_id) productIds.push(step.product_id);
        });

        // Fetch details for these products
        if (productIds.length > 0) {
            console.log(`Hydrating ${productIds.length} products...`);
            const { data: richProducts } = await supabase
                .from('products')
                .select('*')
                .in('id', productIds);

            const productMap = new Map(richProducts?.map(p => [p.id, p]));

            // Inject details back into the routine
            const hydrateStep = (step: any) => {
                const product = productMap.get(step.product_id);
                if (product) {
                    return {
                        ...step,
                        product_url: product.product_url,
                        image_url: product.image_url,
                        price: product.price,
                        title: product.title
                    };
                }
                return step;
            };

            if (analysisResult.routine?.morning) {
                analysisResult.routine.morning = analysisResult.routine.morning.map(hydrateStep);
            }
            if (analysisResult.routine?.evening) {
                analysisResult.routine.evening = analysisResult.routine.evening.map(hydrateStep);
            }
        }

        console.log('Analysis completed successfully');
        return NextResponse.json(analysisResult);

    } catch (error: any) {
        console.error('AI Analysis Error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json({
            error: error.message || 'An unexpected error occurred',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
