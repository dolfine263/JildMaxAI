-- Seed Data for JildMaxAI Demo
-- Run this in your Supabase SQL Editor after creating the schema

INSERT INTO products
    (
    shopify_product_id,
    shopify_variant_id,
    title,
    handle,
    description,
    image_url,
    price,
    product_type,
    skin_types,
    concerns,
    is_active
    )
VALUES
    -- Cleansers
    (
        'demo-001',
        'demo-001-v1',
        'Hydra-Glow Gentle Cleanser',
        'hydra-glow-cleanser',
        'A creamy, pH-balanced cleanser that removes impurities without stripping the skin. Enriched with Ceramides and Hyaluronic Acid.',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
        24.99,
        'Cleanser',
        ARRAY
['Dry', 'Sensitive', 'Normal'],
  ARRAY['Dehydration', 'Redness'],
  true
),
(
  'demo-002',
  'demo-002-v1',
  'PoreControl Foaming Cleanser',
  'porecontrol-foaming-cleanser',
  'Lightweight foam cleanser with Salicylic Acid (0.5%) and Tea Tree. Clears congestion and minimizes pores.',
  'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400',
  19.99,
  'Cleanser',
  ARRAY['Oily', 'Combination'],
  ARRAY['Acne', 'Texture'],
  true
),

-- Treatments / Serums
(
  'demo-003',
  'demo-003-v1',
  'Vitamin C Radiance Serum',
  'vitamin-c-serum',
  '15% L-Ascorbic Acid + Ferulic Acid. Brightens dark spots and protects against environmental damage.',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
  45.00,
  'Treatment',
  ARRAY['Normal', 'Combination', 'Oily'],
  ARRAY['Pigmentation', 'Aging'],
  true
),
(
  'demo-004',
  'demo-004-v1',
  'Retinol Night Renewal Serum',
  'retinol-night-serum',
  '0.5% Encapsulated Retinol for sensitive skin. Reduces fine lines and smooths texture overnight.',
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400',
  52.00,
  'Treatment',
  ARRAY['Normal', 'Dry', 'Combination'],
  ARRAY['Aging', 'Texture'],
  true
),
(
  'demo-005',
  'demo-005-v1',
  'Niacinamide Pore Refiner',
  'niacinamide-pore-refiner',
  '10% Niacinamide + Zinc. Minimizes pores, controls oil, and evens skin tone.',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400',
  28.00,
  'Treatment',
  ARRAY['Oily', 'Combination'],
  ARRAY['Acne', 'Texture', 'Pigmentation'],
  true
),

-- Moisturizers
(
  'demo-006',
  'demo-006-v1',
  'Barrier Repair Moisturizer',
  'barrier-repair-moisturizer',
  'Rich, non-greasy cream with 5 Ceramides and Squalane. Restores damaged skin barrier.',
  'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400',
  38.00,
  'Moisturizer',
  ARRAY['Dry', 'Sensitive'],
  ARRAY['Dehydration', 'Redness'],
  true
),
(
  'demo-007',
  'demo-007-v1',
  'Oil-Free Hydrating Gel',
  'oil-free-hydrating-gel',
  'Lightweight water-gel formula with Hyaluronic Acid. Hydrates without clogging pores.',
  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400',
  32.00,
  'Moisturizer',
  ARRAY['Oily', 'Combination', 'Normal'],
  ARRAY['Dehydration', 'Acne'],
  true
),

-- Sunscreens
(
  'demo-008',
  'demo-008-v1',
  'Invisible Shield SPF 50+',
  'invisible-shield-spf50',
  'Ultra-light, no white cast sunscreen. Broad spectrum UVA/UVB protection with antioxidant complex.',
  'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=400',
  29.99,
  'Sunscreen',
  ARRAY['Normal', 'Oily', 'Combination'],
  ARRAY['Aging', 'Pigmentation'],
  true
),
(
  'demo-009',
  'demo-009-v1',
  'Sensitive Mineral Sunscreen SPF 40',
  'sensitive-mineral-spf40',
  '100% Zinc Oxide formula. Gentle enough for rosacea-prone and post-procedure skin.',
  'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400',
  34.00,
  'Sunscreen',
  ARRAY['Dry', 'Sensitive'],
  ARRAY['Redness', 'Aging'],
  true
),

-- Specialty
(
  'demo-010',
  'demo-010-v1',
  'Calming Centella Toner',
  'calming-centella-toner',
  'Alcohol-free toner with Centella Asiatica (CICA) and Panthenol. Soothes irritation and preps skin.',
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
  22.00,
  'Other',
  ARRAY['Sensitive', 'Dry', 'Normal'],
  ARRAY['Redness', 'Dehydration'],
  true
);
