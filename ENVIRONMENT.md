# Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq AI
GROQ_API_KEY=your_groq_api_key

# PayHero
PAYHERO_API_KEY=your_payhero_api_key
PAYHERO_SECRET_KEY=your_payhero_secret_key
PAYHERO_CHANNEL_ID=your_payhero_channel_id
PAYHERO_WEBHOOK_SECRET=your_payhero_webhook_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### PayHero Setup Instructions

1. Log in to your PayHero account
2. Navigate to Payment Channels > My Payment Channels
3. Note your `channel_id` from the list
4. Get your API Key and Secret Key from the API settings
5. Configure your webhook URL: `https://your-domain.com/api/payment/webhook`
6. Add the above values to your `.env.local` file
