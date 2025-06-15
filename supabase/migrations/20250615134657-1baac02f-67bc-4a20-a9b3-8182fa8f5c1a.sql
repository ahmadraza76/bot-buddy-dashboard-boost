
ALTER TABLE public.profiles
ADD COLUMN balance numeric NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.profiles.balance IS 'Current wallet amount for user (INR/USDT)';
