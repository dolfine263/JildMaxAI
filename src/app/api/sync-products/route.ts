import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Admin client for writing to DB
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

async function fetchShopifyProducts() {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-04/products.json?limit=250`, {
        headers: {
            'X-Shopify-Access-Token': SHOPIFY_TOKEN!,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Shopify API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products;
}

// Helper to map Shopify tags to our Schema
function mapProductAttributes(tags: string, title: string) {
    const tagList = tags.split(',').map(t => t.trim().toLowerCase());
    const titleLower = title.toLowerCase();

    let productType = 'Other';
    if (tagList.includes('cleanser') || titleLower.includes('cleanser')) productType = 'Cleanser';
    else if (tagList.includes('moisturizer') || titleLower.includes('cream')) productType = 'Moisturizer';
    else if (tagList.includes('serum') || titleLower.includes('treatment')) productType = 'Treatment';
    else if (tagList.includes('sunscreen') || titleLower.includes('spf')) productType = 'Sunscreen';

    const concerns = [];
    if (tagList.includes('acne') || titleLower.includes('acne')) concerns.push('Acne');
    if (tagList.includes('aging') || titleLower.includes('anti-aging')) concerns.push('Aging');
    if (tagList.includes('brightening') || titleLower.includes('spot')) concerns.push('Pigmentation');

    return { productType, concerns };
}

export async function GET() {
    try {
        if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
            return NextResponse.json({ error: 'Missing Shopify Config' }, { status: 500 });
        }

        const products = await fetchShopifyProducts();
        const mappedProducts = products.map((p: any) => {
            const { productType, concerns } = mapProductAttributes(p.tags, p.title);
            const variant = p.variants[0]; // Take first variant for MVP

            return {
                shopify_product_id: p.id.toString(),
                shopify_variant_id: variant.id.toString(),
                title: p.title,
                handle: p.handle,
                description: p.body_html, // HTML description
                image_url: p.images[0]?.src || '',
                price: variant.price,
                product_type: productType,
                skin_types: [], // Default empty, populate via tags if needed
                concerns: concerns,
                is_active: p.status === 'active'
            };
        });

        // Upsert into Supabase
        const { error } = await supabaseAdmin
            .from('products')
            .upsert(mappedProducts, { onConflict: 'shopify_product_id' });

        if (error) {
            console.error('Supabase Upsert Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            count: mappedProducts.length,
            message: 'Products synced successfully'
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
