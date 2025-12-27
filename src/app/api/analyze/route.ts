import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { supabase } from '@/lib/supabase';
import { ANALYSIS_SYSTEM_PROMPT } from '@/lib/prompts';

export async function POST(req: Request) {
    try {
        const { image, description } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'Image is required' }, { status: 400 });
        }

        // 1. Fetch all active products from DB to feed into the AI context
        const { data: products, error: dbError } = await supabase
            .from('products')
            .select('id, title, product_type, concerns, skin_types')
            .eq('is_active', true);

        if (dbError) {
            console.error('DB Error:', dbError);
            return NextResponse.json({ error: 'Failed to fetch active products' }, { status: 500 });
        }

        const productContext = JSON.stringify(products);

        // 2. Call OpenRouter with Vision
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
                        { type: "image_url", image_url: { url: image } }
                    ]
                }
            ],
            response_format: { type: "json_object" }
        });

        const aiContent = response.choices[0].message.content;
        const analysisResult = JSON.parse(aiContent || '{}');

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
                        handle: product.handle,
                        image_url: product.image_url,
                        price: product.price,
                        title: product.title // Ensure title matches DB
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

        // 4. (Possible Future Step) Save Analysis to DB

        return NextResponse.json(analysisResult);

    } catch (error: any) {
        console.error('AI Analysis Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
