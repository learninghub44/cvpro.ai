# CVPro AI - Deployment Guide

This guide will help you deploy CVPro AI to Cloudflare Pages and configure the necessary services.

## Prerequisites

- Node.js 18+ installed
- Supabase account
- Groq API key
- PayHero account (for M-Pesa payments)
- Cloudflare account

## Environment Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd cvpro-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq AI
GROQ_API_KEY=your_groq_api_key

# PayHero
PAYHERO_API_KEY=your_payhero_api_key
PAYHERO_SECRET_KEY=your_payhero_secret_key
PAYHERO_WEBHOOK_SECRET=your_payhero_webhook_secret

# App URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Supabase Setup

### 1. Create a New Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### 2. Run Database Schema

1. Go to the SQL Editor in Supabase
2. Copy the contents of `supabase/schema.sql`
3. Paste and execute the SQL

This will create:
- `users` table
- `resumes` table
- `reports` table
- `payments` table
- `orders` table
- Storage bucket for resumes
- RLS policies

### 3. Configure Storage

1. Go to Storage in Supabase
2. Create a bucket named `resumes` (if not created by schema)
3. Make it public
4. Configure bucket policies (handled by schema.sql)

## Groq API Setup

1. Go to [console.groq.com](https://console.groq.com)
2. Create an account
3. Generate an API key
4. Add it to your `.env.local` file

## PayHero Setup

1. Go to [payhero.co.ke](https://payhero.co.ke)
2. Create an account
3. Get your API keys
4. Configure webhook URL: `https://your-domain.com/api/payment/webhook`
5. Add credentials to `.env.local`

## Cloudflare Pages Deployment

### Option 1: Git Integration

1. Push your code to GitHub/GitLab
2. Go to Cloudflare Dashboard > Pages
3. Create a new project
4. Connect your Git repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node.js version**: `18`
6. Add environment variables in Cloudflare Pages settings
7. Deploy

### Option 2: Direct Upload

1. Build the project locally:
```bash
npm run build
```

2. Upload the `.next` folder to Cloudflare Pages using Wrangler:
```bash
npm install -g wrangler
wrangler pages deploy .next
```

## Local Development

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Post-Deployment Checklist

- [ ] Verify environment variables are set
- [ ] Test Supabase connection
- [ ] Test file upload functionality
- [ ] Test CV analysis with Groq API
- [ ] Test PayHero payment integration
- [ ] Verify SEO metadata
- [ ] Check sitemap and robots.txt
- [ ] Test responsive design
- [ ] Verify RLS policies are working
- [ ] Set up analytics (Google Analytics, PostHog)

## Monitoring

### Check Application Logs

- Cloudflare Pages: Dashboard > Pages > Your Project > Logs
- Supabase: Dashboard > Logs

### Database Monitoring

- Supabase Dashboard > Database > Metrics
- Monitor query performance and storage usage

## Troubleshooting

### Build Errors

- Check Node.js version (requires 18+)
- Verify all dependencies are installed
- Check environment variables

### API Errors

- Verify API keys are correct
- Check Supabase RLS policies
- Review server logs

### Payment Issues

- Verify PayHero webhook is accessible
- Check transaction reference format
- Test with small amounts first

## Security Considerations

- Never commit `.env.local` to git
- Use strong API keys
- Enable RLS on all Supabase tables
- Regularly rotate API keys
- Monitor for suspicious activity
- Keep dependencies updated

## Scaling

### Database Scaling

- Supabase offers automatic scaling
- Monitor storage usage
- Consider upgrading plan for higher limits

### CDN Scaling

- Cloudflare Pages automatically scales
- Configure caching rules
- Use Cloudflare CDN for static assets

## Support

For issues or questions:
- Check Supabase documentation
- Review Groq API docs
- Contact PayHero support
- Check Cloudflare Pages documentation

## License

This project is proprietary software. All rights reserved.
