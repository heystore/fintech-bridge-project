-- Исправляем старые категории на новые
UPDATE services SET category = 'kyc-crypto' WHERE category IN ('crypto-wallet', 'crypto-exchange');