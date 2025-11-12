# 🌿 START HERE - Complete Setup Guide

## ✅ What's Already Done

Your Supabase credentials are already configured:
- ✅ Supabase URL: `https://weowrsvvsqragqzvqzmn.supabase.co`
- ✅ Supabase Anon Key: Configured in `.env.local`
- ✅ All dependencies installed
- ✅ Website code complete with teal/emerald theme
- ✅ Admin portal ready at `/portal`

## 🚀 3 Steps to Launch

### Step 1: Setup Database (2 minutes)

1. **Open Supabase Dashboard**
   - Go to: https://weowrsvvsqragqzvqzmn.supabase.co
   - Login if needed

2. **Run SQL Setup**
   - Click **SQL Editor** in left sidebar
   - Click **New Query** button
   - Open file: `RUN_THIS_SQL_IN_SUPABASE.txt`
   - Copy ALL the SQL code
   - Paste into Supabase SQL Editor
   - Click **Run** (or press Ctrl+Enter)
   - Wait for "Success. No rows returned"

3. **Verify Tables Created**
   - Click **Table Editor** in left sidebar
   - You should see 2 tables:
     - `WebsiteContent` (1 row)
     - `Treatment` (6 rows)

### Step 2: Start Development Server (10 seconds)

```bash
npm run dev
```

### Step 3: Open Website (5 seconds)

- **Public Website**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/portal

**Admin Login:**
- Username: `admin`
- Password: `admin123`

---

## 🎨 What You'll See

### Public Website (/)
- ✅ Beautiful hero section with teal/emerald gradient
- ✅ About section with hospital info
- ✅ 6 Ayurvedic services displayed
- ✅ 6 treatments loaded from database
- ✅ Contact form and information
- ✅ Fully responsive design

### Admin Portal (/portal)
- ✅ Secure login page
- ✅ Dashboard with statistics
- ✅ Appointments management
- ✅ Settings to edit content
- ✅ Treatment management (coming soon)

---

## 📝 How to Customize

### Change Website Text
1. Go to http://localhost:3000/portal
2. Login (admin/admin123)
3. Click **Settings** tab
4. Edit hospital name, contact info, etc.
5. Click **Save Changes**

### Add/Edit Treatments
Currently treatments are in the database. To manage them:
1. Go to Supabase → Table Editor → Treatment
2. Click on any row to edit
3. Or click **Insert row** to add new treatment

### Change Colors
Edit `app/page.tsx` and `app/portal/page.tsx`:
- Replace `teal-600` with your color
- Replace `emerald-600` with your accent color

---

## 🌐 Deploy to Production

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click **Import Project**
   - Select your GitHub repo
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `ADMIN_USERNAME`
     - `ADMIN_PASSWORD`
   - Click **Deploy**

3. **Done!** Your site is live at `your-project.vercel.app`

---

## 🔒 Security Checklist

Before going live:

- [ ] Change admin password in `.env.local`
- [ ] Enable Row Level Security in Supabase
- [ ] Add custom domain
- [ ] Update contact information
- [ ] Test all forms
- [ ] Check mobile responsiveness

---

## 📊 Database Structure

### WebsiteContent Table
```
- heroTitle (text)
- heroSubtitle (text)
- heroTagline (text)
- aboutText (text)
- missionText (text)
- visionText (text)
- contactPhone (text)
- contactEmail (text)
- contactAddress (text)
- workingHours (text)
```

### Treatment Table
```
- name (text)
- description (text)
- price (text)
- duration (text)
- icon (text)
- category (text)
- isActive (boolean)
```

---

## 🆘 Troubleshooting

### "Failed to fetch" errors
- Make sure SQL was run in Supabase
- Check tables exist in Table Editor
- Verify `.env.local` has correct credentials

### Login not working
- Username: `admin`
- Password: `admin123`
- Check `.env.local` file exists
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```
Then visit: http://localhost:3001

### Database connection error
- Check Supabase project is active
- Verify anon key in `.env.local`
- Check internet connection

---

## 📞 Quick Links

- **Supabase Dashboard**: https://weowrsvvsqragqzvqzmn.supabase.co
- **SQL Editor**: https://weowrsvvsqragqzvqzmn.supabase.co/project/_/sql
- **Table Editor**: https://weowrsvvsqragqzvqzmn.supabase.co/project/_/editor

---

## 🎉 You're Ready!

Your Sanjeevani Ayurvedic Hospital website is complete and ready to use!

**Next Steps:**
1. Run the SQL in Supabase (Step 1 above)
2. Start the dev server: `npm run dev`
3. Visit: http://localhost:3000
4. Customize content via admin portal
5. Deploy to Vercel when ready

**Need help?** Check the other documentation files:
- `README.md` - Full documentation
- `QUICK_START.md` - Quick setup guide
- `SUPABASE_SQL_SETUP.sql` - Database setup SQL

---

Made with 🌿 for Sanjeevani Ayurvedic Hospital
