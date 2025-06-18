
// Generate a random API key
export const generateApiKey = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const segments = [12, 8, 8, 8, 14];
  
  return segments.map(length => {
    let segment = '';
    for (let i = 0; i < length; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  }).join('-');
};

// Generate a random webhook URL
export const generateWebhookUrl = (): string => {
  const baseUrl = 'https://api.botbuddy.dev/webhook/';
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `${baseUrl}${id}`;
};
