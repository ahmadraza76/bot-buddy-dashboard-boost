
-- Add social media links as keys to platform_settings if not already present
INSERT INTO platform_settings (key, value, updated_at)
SELECT 'facebook_url', '', now()
WHERE NOT EXISTS (SELECT 1 FROM platform_settings WHERE key = 'facebook_url');

INSERT INTO platform_settings (key, value, updated_at)
SELECT 'twitter_url', '', now()
WHERE NOT EXISTS (SELECT 1 FROM platform_settings WHERE key = 'twitter_url');

INSERT INTO platform_settings (key, value, updated_at)
SELECT 'instagram_url', '', now()
WHERE NOT EXISTS (SELECT 1 FROM platform_settings WHERE key = 'instagram_url');

INSERT INTO platform_settings (key, value, updated_at)
SELECT 'youtube_url', '', now()
WHERE NOT EXISTS (SELECT 1 FROM platform_settings WHERE key = 'youtube_url');

INSERT INTO platform_settings (key, value, updated_at)
SELECT 'linkedin_url', '', now()
WHERE NOT EXISTS (SELECT 1 FROM platform_settings WHERE key = 'linkedin_url');
