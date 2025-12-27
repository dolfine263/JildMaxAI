-- Add image_hash column to skin_analyses table for caching
ALTER TABLE skin_analyses ADD COLUMN IF NOT EXISTS image_hash text;
-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_skin_analyses_image_hash ON skin_analyses(image_hash);
