# Sanjeevani Ayurvedic Hospital - Setup Guide

## 🚀 Quick Setup Steps

### 1. Database Setup (Supabase)

1. Go to your Supabase project: https://weowrsvvsqragqzvqzmn.supabase.co
2. Open the **SQL Editor**
3. Copy and paste the entire content from `SUPABASE_SQL_SETUP.sql`
4. Click **Run** to execute the SQL

This will create:
- ✅ `services` table with 6 sample services
- ✅ `treatments` table with 8 sample treatments
- ✅ `contact_messages` table (empty, ready for form submissions)
- ✅ `settings` table with hospital information
- ✅ All necessary triggers and RLS policies

### 2. Install Dependencies

```bash
npm install @supabase/supabase-js
```

### 3. Environment Variables

Your `.env.local` file is already configured with:
```
NEXT_PUBLIC_SUPABASE_URL="https://weowrsvvsqragqzvqzmn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

### 4. Run the Application

```bash
npm run dev
```

Visit: http://localhost:3000

## 📋 Features

### Main Website (/)
- ✅ Hero section with modern Ayurvedic design
- ✅ About section
- ✅ Services section (loaded from database)
- ✅ Treatments section (loaded from database)
- ✅ Contact form (saves to database)
- ✅ Green theme throughout

### Admin Portal (/portal)
- ✅ Login page (username: admin, password: admin123)
- ✅ **Services Management** - Add/delete services with name and image URL
- ✅ **Treatments Management** - Add/delete treatments with name
- ✅ **Contact Messages** - View, mark as read, delete messages
- ✅ **Settings** - Update hospital information

## 🎨 Design Features

- Modern Ayurvedic aesthetic with green as the main theme
- Organic patterns and botanical elements
- Smooth animations and transitions
- Responsive design for all devices
- Loading states for better UX
- Empty states when no data is available

## 🔧 How It Works

### Frontend → Database Flow

1. **Main Website** fetches services and treatments from Supabase on page load
2. **Contact Form** submits directly to `contact_messages` table
3. **Admin Portal** performs CRUD operations on all tables
4. All changes are reflected immediately

### Database Tables

```
services
├── id (auto)
├── name
├── image (URL)
├── created_at
└── updated_at

treatments
├── id (auto)
├── name
├── created_at
└── updated_at

contact_messages
├── id (auto)
├── name
├── email
├── phone
├── message
├── read (boolean)
├── created_at
└── updated_at

settings
├── id (auto)
├── hospital_name
├── contact_phone
├── contact_email
├── contact_address
├── working_hours
└── updated_at
```

## 🎯 Next Steps

1. Run the SQL setup in Supabase
2. Install dependencies: `npm install @supabase/supabase-js`
3. Start the dev server: `npm run dev`
4. Test the website at http://localhost:3000
5. Login to admin portal at http://localhost:3000/portal
6. Add/edit services, treatments, and settings as needed

## 📝 Notes

- All data is now dynamic and comes from Supabase
- No hardcoded data in the frontend
- RLS policies are set to allow all operations (you can restrict later)
- Sample data is included in the SQL setup
- Images use Unsplash URLs (you can replace with your own)

## 🐛 Troubleshooting

If services/treatments don't show:
1. Check if SQL was executed successfully in Supabase
2. Verify environment variables in `.env.local`
3. Check browser console for errors
4. Ensure `@supabase/supabase-js` is installed

If admin portal doesn't work:
1. Login with username: `admin` and password: `admin123`
2. Check if data is being fetched (open browser console)
3. Verify Supabase connection

## ✅ Everything is Ready!

Your application is now fully functional with:
- Dynamic data from database
- Admin portal for management
- Contact form submissions
- Modern Ayurvedic design
- Green theme throughout

Just run the SQL setup and start the dev server! 🎉
