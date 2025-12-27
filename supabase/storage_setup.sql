-- Create a new storage bucket for skin scans
INSERT INTO storage.buckets
    (id, name, public)
VALUES
    ('scans', 'scans', true)
ON CONFLICT
(id) DO NOTHING;

-- Policy to allow anyone to upload (since we are not using auth for now)
DROP POLICY
IF EXISTS "Public Upload" ON storage.objects;
CREATE POLICY "Public Upload"
ON storage.objects FOR
INSERT
TO public
WITH CHECK
    (bucket_id =
'scans')
;

-- Policy to allow anyone to view images
DROP POLICY
IF EXISTS "Public View" ON storage.objects;
CREATE POLICY "Public View"
ON storage.objects FOR
SELECT
    TO public
USING
(bucket_id = 'scans');
