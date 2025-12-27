-- Seed Data for JildMaxAI (Comprehensive NGlow.co Catalog)
-- Run this in Supabase SQL Editor

-- Clear existing products first
TRUNCATE products;

INSERT INTO products
  (
  title,
  product_url,
  description,
  image_url,
  price,
  product_type,
  skin_types,
  concerns,
  is_active
  )
VALUES

  -- ==================== FACEWASHES ====================
  (
    'Whitening Flawless Face Wash',
    'https://nglow.co/products/whitening-flawless-face-wash',
    'Brightens & deeply cleanses. Enriched with Kojic Acid, Niacinamide & Vitamin C for radiant, even-toned skin.',
    'https://nglow.co/cdn/shop/files/8.png?v=1762239950&width=1200',
    499.00,
    'Facewash',
    ARRAY
['Oily', 'Combination', 'Normal'],
  ARRAY['Pigmentation', 'Dullness', 'Uneven Tone'],
  true
),
(
  'Strawberry Face Wash',
  'https://nglow.co/products/strawberry-face-wash',
  'Hydrate, Cleanse & Revitalize. A refreshing fruity wash for a quick energy boost.',
  'https://nglow.co/cdn/shop/files/10.png?v=1757683856&width=1200', 
  480.00,
  'Facewash',
  ARRAY['Normal', 'Oily'],
  ARRAY['Dullness', 'Refreshing'],
  true
),
(
  'Aloe Vera Face Wash',
  'https://nglow.co/products/aloe-vera-face-wash',
  'Hydrate, Soothe & Refresh. A gentle cleanser perfect for sensitive or irritated skin.',
  'https://nglow.co/cdn/shop/files/3_cc8f79d5-357c-4d4f-95f0-bc2be74343a8.png?v=1757683715&width=1200',
  480.00,
  'Facewash',
  ARRAY['Sensitive', 'Dry', 'Redness'],
  ARRAY['Redness', 'Dehydration', 'Sensitivity'],
  true
),
(
  'Vitamin C Face Wash',
  'https://nglow.co/products/vitamin-c-face-wash',
  'Brighten & Purify for Radiant Skin. Targeted for glowing skin.',
  'https://nglow.co/cdn/shop/files/9.png?v=1757683919&width=1200',
  480.00,
  'Facewash',
  ARRAY['Dull', 'Normal', 'Dry'],
  ARRAY['Dullness', 'Glow'],
  true
),
(
  'Charcoal Face Wash',
  'https://nglow.co/products/charcoal-face-wash',
  'Purify, Detox & Brighten Skin Naturally. Deep cleanses pores, removes impurities & prevents acne.',
  'https://nglow.co/cdn/shop/files/14.png?v=1757683768&width=1200',
  480.00,
  'Facewash',
  ARRAY['Oily', 'Acne-Prone'],
  ARRAY['Acne', 'Oiliness', 'Detox'],
  true
),

-- ==================== CLEANSERS ====================
(
  'All Day Vitamin Cleanser',
  'https://nglow.co/products/all-day-vitamin-cleanser',
  'Brightening & Nourishing Face Wash. gentle daily cleanser enriched with vitamins to refresh and energize tired skin.',
  'https://nglow.co/cdn/shop/files/5.png?v=1757683624&width=1200',
  550.00,
  'Cleanser',
  ARRAY['Normal', 'Dull', 'Combination'],
  ARRAY['Dullness', 'Uneven Tone'],
  true
),
(
  'Collagen Daily Facial Cleanser',
  'https://nglow.co/products/collagen-daily-facial-cleanser',
  'Deep Cleansing & Skin Renewal. Promotes elasticity and removes impurities specifically for aging skin.',
  'https://nglow.co/cdn/shop/files/1_0307b577-2d2d-47cc-afdd-c53fe1c73ef9.png?v=1757525039&width=1200',
  600.00,
  'Cleanser',
  ARRAY['Mature', 'Dry', 'Normal'],
  ARRAY['Aging', 'Fine Lines', 'Texture'],
  true
),
(
  'Aloe Vera Facial Cleanser',
  'https://nglow.co/products/aloe-vera-facial-cleanser',
  'Hydrating & Soothing Formula. A gentle, non-stripping cleanser for sensitive and irritated skin.',
  'https://nglow.co/cdn/shop/files/1_bf1d3d2c-ce6b-4056-842a-1ccfdf476747.png?v=1757524404&width=1200',
  480.00,
  'Cleanser',
  ARRAY['Sensitive', 'Dry', 'Redness'],
  ARRAY['Redness', 'Dehydration', 'Sensitivity'],
  true
),
(
  'Rice Water Cleanser',
  'https://nglow.co/products/rice-water-cleanser',
  'Gentle Hydration for a Radiant Glow. Inspired by K-Beauty, rice water brightens and softens the skin.',
  'https://nglow.co/cdn/shop/files/1.png?v=1757524107&width=1200',
  550.00,
  'Cleanser',
  ARRAY['Normal', 'Combination', 'Dull'],
  ARRAY['Dullness', 'Uneven Tone', 'Texture'],
  true
),
(
  'Salicylic Acid Cleanser',
  'https://nglow.co/products/salicylic-acid-cleanser',
  'Purify, Clear & Prevent Breakouts. Deep cleanses pores to remove excess oil and prevent acne.',
  'https://nglow.co/cdn/shop/files/2_c8b1f98b-03ff-4348-944f-96766735b094.png?v=1757525158&width=1200',
  599.00,
  'Cleanser',
  ARRAY['Oily', 'Acne-Prone'],
  ARRAY['Acne', 'Breakouts', 'Oiliness'],
  true
),

-- ==================== SERUMS ====================
(
  'Collagen Daily Serum',
  'https://nglow.co/products/collagen-daily-serum',
  'Purify, Hydrate & Revitalize Skin. Boosts skin elasticity and plumpness for a youthful look.',
  'https://nglow.co/cdn/shop/files/2_854e2fe4-a68b-487c-9887-e5fb9db5a4b9.png?v=1757683993&width=1200',
  1080.00,
  'Treatment',
  ARRAY['Mature', 'Normal', 'Dry'],
  ARRAY['Aging', 'Fine Lines', 'Sagging'],
  true
),
(
  'NGlow Glutathione Serum',
  'https://nglow.co/products/nglow-glutathione-serum',
  'Brightening & Hydrating Antioxidant Serum. Reduces dark spots and promotes a brighter, even complexion.',
  'https://nglow.co/cdn/shop/files/3_2b136153-9901-4185-a1ad-404ba146d922.png?v=1762237323&width=1200',
  1080.00,
  'Treatment',
  ARRAY['Normal', 'Combination', 'Dry'],
  ARRAY['Pigmentation', 'Dullness', 'Dark Spots'],
  true
),
(
  'Retinol Serum',
  'https://nglow.co/products/retinol-serum',
  'Anti-Aging & Skin Renewal Formula. Reduces wrinkles and improves skin texture. Use at night.',
  'https://nglow.co/cdn/shop/files/3_240e775a-7ebf-4a41-8ba6-1e0b79a05504.png?v=1762239578&width=1200',
  1080.00,
  'Treatment',
  ARRAY['Mature', 'Dry', 'Normal'],
  ARRAY['Aging', 'Fine Lines', 'Texture'],
  true
),
(
  'Glow Serum',
  'https://nglow.co/products/glow-serum-k-beauty-hydration-brightening-formula',
  'Korean Beauty Hydration & Brightening Formula. Gives the ultimate glass-skin finish.',
  'https://nglow.co/cdn/shop/files/3_d3767699-d1ee-46dc-96dd-2d1efa423104.png?v=1762239127&width=1200',
  1499.00,
  'Treatment',
  ARRAY['Normal', 'Dry', 'Dull'],
  ARRAY['Dullness', 'Dehydration', 'Glow'],
  true
),
(
  'Hyaluronic Acid + Vit C Serum',
  'https://nglow.co/products/hyaluronic-acid-vit-c-serum',
  'Intense Hydration & Skin Barrier Support. Plumps skin and protects against environmental damage.',
  'https://nglow.co/cdn/shop/files/3_0bb52feb-2d52-41d2-abe4-519f80cac3ea.png?v=1762239359&width=1200',
  1250.00,
  'Treatment',
  ARRAY['Dry', 'Dehydrated', 'Normal'],
  ARRAY['Dehydration', 'Dullness'],
  true
),
(
  'Salicylic Acid Serum',
  'https://nglow.co/products/salicylic-acid-serum',
  'Acne-Fighting & Pore-Unclogging Formula. Targets active acne and blackheads.',
  'https://nglow.co/cdn/shop/files/3_d770f616-7d86-4688-9926-823eee313ebf.png?v=1762239795&width=1200',
  1080.00,
  'Treatment',
  ARRAY['Oily', 'Acne-Prone'],
  ARRAY['Acne', 'Large Pores', 'Blackheads'],
  true
),
(
  'Glycolic Acid + VIT B5 Serum',
  'https://nglow.co/products/glycolic-acid-vit-b5-serum',
  'Exfoliate, Hydrate & Renew Skin. Gently exfoliates dead skin cells to reveal smoother skin.',
  'https://nglow.co/cdn/shop/files/2_ac6412b9-5dcb-4922-8dfd-045d417fd0a6.png?v=1762239706&width=1200',
  1150.00,
  'Treatment',
  ARRAY['Combination', 'Normal', 'Oily'],
  ARRAY['Texture', 'Dullness', 'Congestion'],
  true
),
(
  'Niacinamide Serum',
  'https://nglow.co/products/niacinamide-serum-brightening-oil-control-formula',
  'Brightening & Oil Control Formula. Balances sebum production and minimizes pores.',
  'https://nglow.co/cdn/shop/files/1_5c34fe58-1896-476f-b18a-517fbad9d51a.png?v=1762238885&width=1200',
  1080.00,
  'Treatment',
  ARRAY['Oily', 'Combination', 'Sensitive'],
  ARRAY['Oiliness', 'Pores', 'Redness'],
  true
),

-- ==================== SUNBLOCK ====================
(
  'Sunblock SPF 70+',
  'https://nglow.co/products/sunblock-spf-70',
  'Lightweight, Oil-Free, Broad-Spectrum Protection. No white cast finish.',
  'https://nglow.co/cdn/shop/files/1_33184255-1b7c-4782-87c3-3a0b3e00798c.png?v=1762238603&width=1200',
  720.00,
  'Sunscreen',
  ARRAY['All'],
  ARRAY['Sun Protection'],
  true
),
(
  'Tinted Sunblock SPF 60+',
  'https://nglow.co/products/tinted-sunblock-spf-60',
  'Lightweight, Oil-Free, Broad-Spectrum Protection with a subtle tint to even skin tone.',
  'https://nglow.co/cdn/shop/files/2_7beacc6f-3682-404e-845b-e9559dfac8a4.png?v=1762238542&width=1200',
  850.00,
  'Sunscreen',
  ARRAY['All'],
  ARRAY['Sun Protection', 'Uneven Tone'],
  true
),

-- ==================== TONERS ====================
(
  'Vitamin C Toner',
  'https://nglow.co/products/vitamin-c-toner',
  'Brighten, Hydrate & Refresh. Preps skin and boosts glow.',
  'https://nglow.co/cdn/shop/files/1_38779720-d137-4e35-97bf-0d590c41ef9a.png?v=1757525349&width=1200',
  510.00,
  'Other',
  ARRAY['Normal', 'Dull', 'Combination'],
  ARRAY['Dullness', 'Hydration'],
  true
),
(
  'Natural Rose Water Toner',
  'https://nglow.co/products/natural-rose-water-toner',
  'Glow-Boosting & Pore-Tightening. Calming and refreshing mist.',
  'https://nglow.co/cdn/shop/files/1_cfe51033-6204-4b04-8f9e-f82460498b96.png?v=1757526815&width=1200',
  450.00,
  'Other',
  ARRAY['All', 'Sensitive'],
  ARRAY['Dehydration', 'Refreshing'],
  true
),
(
  'Tea Tree Oil Face Toner',
  'https://nglow.co/products/tea-tree-oil-face-toner',
  'Acne-Fighting & Pore-Tightening Formula. Antibacterial toner for prone skin.',
  'https://nglow.co/cdn/shop/files/1_f22417ad-4096-4cc2-b622-2c384d69a7d1.png?v=1757525624&width=1200',
  550.00,
  'Other',
  ARRAY['Oily', 'Acne-Prone'],
  ARRAY['Acne', 'Oiliness'],
  true
),

-- ==================== MOISTURIZERS ====================
(
  'Almond Milk Moisturizer',
  'https://nglow.co/products/almond-milk-moisturizer',
  'Deep Hydration & Nourishment. Rich cream for dry skin types.',
  'https://nglow.co/cdn/shop/files/1_ff097e18-79c8-4e8f-bb1b-c67e0985380f.png?v=1762238324&width=1200',
  1199.00,
  'Moisturizer',
  ARRAY['Dry', 'Normal'],
  ARRAY['Dryness', 'Dehydration'],
  true
),
(
  'Shea Butter Moisturizer',
  'https://nglow.co/products/shea-butter-moisturizer',
  'Deep Hydration & Nourishment. Intense moisture for very dry skin.',
  'https://nglow.co/cdn/shop/files/1_649a9d3a-2c57-4a1d-a942-122981fac378.png?v=1762237451&width=1200',
  1150.00,
  'Moisturizer',
  ARRAY['Dry', 'Very Dry'],
  ARRAY['Dryness', 'Roughness'],
  true
),
(
  'Aloe Vera & Vitamin E Cream',
  'https://nglow.co/products/aloe-vera-vitamin-e-moisturizing-cream',
  'Hydrate, Nourish & Revitalize. Lightweight daily cream for all skin types.',
  'https://nglow.co/cdn/shop/files/1_5eb29131-d76a-41dc-a649-4e202dab22ee.png?v=1762237583&width=1200',
  950.00,
  'Moisturizer',
  ARRAY['All', 'Normal'],
  ARRAY['Hydration', 'Maintenance'],
  true
);
