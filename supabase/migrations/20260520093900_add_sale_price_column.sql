-- Add sale_price column to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS sale_price text;
