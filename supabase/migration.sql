-- Quick Migration: Add product_url column if it doesn't exist
-- Run this FIRST in Supabase SQL Editor

-- Add the missing column
ALTER TABLE products ADD COLUMN
IF NOT EXISTS product_url text;

-- Verify it worked (optional)
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'products';
