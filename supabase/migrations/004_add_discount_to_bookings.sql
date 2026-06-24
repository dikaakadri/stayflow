-- Add 'discount' column to bookings table
-- This stores the manual discount applied in Rupiah

ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS discount DECIMAL(12,2) DEFAULT 0;
