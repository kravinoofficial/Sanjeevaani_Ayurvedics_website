# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: sanjeevani-hospital
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
5. Click "Create new project" (takes ~2 minutes)

## Step 2: Get Database Connection Strings

1. In your Supabase dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string** section
3. Select **Connection pooling** tab
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

## Step 3: Get Supabase Keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key

## Step 4: Update .env.local File

Replace the values in `.env.local`:

```env
# Supabase Configuration
SUPABASE_URL="https://your-project-ref.supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Admin Credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

## Step 5: Push Database Schema

Run these commands in order:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to Supabase
npm run db:push

# Seed initial data
npm run db:seed
```

## Step 6: Verify Setup

1. Go to Supabase dashboard → **Table Editor**
2. You should see two tables:
   - `WebsiteContent`
   - `Treatment`
3. Both should have data from the seed script

## Step 7: Run the Application

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/portal
  - Username: `admin`
  - Password: `admin123`

## Troubleshooting

### Connection Error
- Make sure you replaced `[YOUR-PASSWORD]` with actual password
- Check if your IP is allowed (Supabase → Settings → Database → Connection pooling)

### Tables Not Created
- Run `npm run db:push` again
- Check Supabase logs in dashboard

### Seed Failed
- Make sure tables are created first
- Run `npm run db:seed` again

## Security Notes

⚠️ **Important for Production:**
1. Change admin credentials in `.env.local`
2. Never commit `.env.local` to git
3. Use environment variables in production
4. Enable Row Level Security (RLS) in Supabase for production
