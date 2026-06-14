-- Add missing columns for extra facilities pricing to homestays table
ALTER TABLE homestays
ADD COLUMN IF NOT EXISTS karpet_price DECIMAL(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS extrabed_price DECIMAL(12,2) DEFAULT 0;
