export interface Product {
    id: string;
    shopify_product_id: string;
    shopify_variant_id: string;
    title: string;
    handle: string;
    description: string;
    image_url: string;
    price: number;
    product_type: 'Cleanser' | 'Moisturizer' | 'Treatment' | 'Sunscreen' | 'Other';
    skin_types: string[];
    concerns: string[];
    ingredients?: string[];
    is_active: boolean;
}

export interface SkinAnalysis {
    id: string;
    image_url: string;
    skin_type_detected: string;
    concerns_detected: string[];
    analysis_summary: string;
    raw_ai_response: any;
    created_at: string;
}

export interface Routine {
    id: string;
    title: string;
    morning_routine: RoutineStep[];
    evening_routine: RoutineStep[];
}

export interface RoutineStep {
    step_number: number;
    product_id?: string; // Links to our DB product ID
    product_name: string;
    instruction: string;
}
