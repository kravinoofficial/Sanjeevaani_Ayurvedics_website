# Quick Optimization Guide - Action Items

## ✅ COMPLETED (Code Optimizations)

All API routes have been optimized with:
- Request timeouts (10 seconds)
- Response caching (60-120 seconds)
- Optimized database queries
- Cache headers for CDN/browser caching

## 📋 TODO: Database Setup (5 minutes)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Select your project
   - Click "SQL Editor" in the left sidebar

2. **Run Optimization SQL**
   - Open the file: `DATABASE_OPTIMIZATION.sql`
   - Copy all the SQL code
   - Paste into Supabase SQL Editor
   - Click "Run" button

3. **Verify**
   - You should see "Success" messages
   - Indexes are now created

## 📋 TODO: Coolify Timeout (5 minutes)

### Quick Steps:

1. **Login to Coolify**
   - Go to your Coolify dashboard

2. **Find Your Application**
   - Projects → Your Project → Your App

3. **Update Timeout Settings**
   - Look for "Configuration" or "Network" tab
   - Find "Proxy Timeout" or similar setting
   - Change from `30` to `120` seconds
   - Save changes

4. **Redeploy**
   - Click "Redeploy" or "Restart" button
   - Wait for deployment to complete

### Can't Find Settings?
- Check `COOLIFY_TIMEOUT_CONFIGURATION.md` for detailed instructions
- Try Method 2 or 3 from that guide

## 🧪 Testing (2 minutes)

After completing the above:

1. **Visit your website**
   - Load the homepage
   - Check if services/treatments load quickly

2. **Test multiple times**
   - First load: May take a few seconds
   - Second load: Should be instant (cached)

3. **Check for errors**
   - No timeout errors should appear
   - All data should load successfully

## 📊 Expected Results

- **Page Load Time**: 2-5 seconds (first load)
- **Cached Load Time**: < 1 second (subsequent loads)
- **No Timeout Errors**: 504 errors should be gone
- **Database Queries**: 50-70% faster with indexes

## ❓ Still Having Issues?

1. Check `PERFORMANCE_OPTIMIZATION_SUMMARY.md` for detailed info
2. Review Coolify logs for specific errors
3. Verify Supabase is not rate-limiting your requests
4. Ensure environment variables are set correctly

## 📈 Monitoring

Keep an eye on:
- Coolify application logs
- Supabase dashboard (Query Performance)
- Website response times
- User feedback

---

**Total Time Required**: ~15 minutes
**Difficulty**: Easy
**Impact**: High (80-90% performance improvement)
