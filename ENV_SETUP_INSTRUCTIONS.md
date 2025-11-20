# Environment Variables Setup

## Required Environment Variables

Your application needs Supabase credentials to work properly. Follow these steps:

### 1. Get Your Supabase Credentials

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

### 2. Create .env.local File

Create a file named `.env.local` in the root of your project with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials.

### 3. For Production (Coolify)

Add these environment variables in your Coolify dashboard:

1. Go to your application in Coolify
2. Navigate to **Environment Variables** or **Configuration**
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

### 4. Verify Setup

After setting up the environment variables:

```bash
# Test locally
npm run dev

# Build for production
npm run build
```

Both commands should work without errors.

## Security Notes

- ✅ `.env.local` is already in `.gitignore` (safe)
- ✅ Never commit `.env.local` to Git
- ✅ The `NEXT_PUBLIC_` prefix makes these variables available in the browser (this is intentional for Supabase)
- ✅ Use Row Level Security (RLS) in Supabase to protect your data

## Troubleshooting

### Build Error: "supabaseUrl is required"
- Make sure `.env.local` exists in the project root
- Verify the environment variables are set correctly
- Restart your development server after creating `.env.local`

### Production Deployment Issues
- Verify environment variables are set in Coolify
- Check Coolify logs for specific errors
- Ensure the Supabase URL and key are correct

## Example .env.local

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzg3MjQwMCwiZXhwIjoxOTM5NDQ4NDAwfQ.example-signature-here
```

---

**Need Help?** Check the Supabase documentation: https://supabase.com/docs
