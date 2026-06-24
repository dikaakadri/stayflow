-- Add 'extras' JSONB column to bookings table
-- This stores the list of extra facilities (karpet, extrabed, etc.) per booking
-- Also adds extras_charge column if missing

ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS extras JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS extras_charge DECIMAL(12,2) DEFAULT 0;
