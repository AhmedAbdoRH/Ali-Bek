-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for everyone" ON testimonials FOR SELECT TO public USING (true);
CREATE POLICY "Enable full access for authenticated users" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
