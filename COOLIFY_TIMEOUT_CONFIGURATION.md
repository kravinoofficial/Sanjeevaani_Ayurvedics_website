# Coolify Timeout Configuration Guide

## Increasing Proxy Timeout in Coolify

To prevent timeout errors when your application is loading data from Supabase, you need to increase the proxy timeout settings in Coolify.

### Method 1: Using Coolify UI (Recommended)

1. **Log in to your Coolify dashboard**

2. **Navigate to your application**:
   - Go to "Projects"
   - Select your project
   - Click on your application

3. **Configure Network Settings**:
   - Click on the "Configuration" or "Network" tab
   - Look for "Proxy" or "Timeout" settings

4. **Increase Timeout Values**:
   - **Proxy Timeout**: Set to `120` seconds (or higher if needed)
   - **Read Timeout**: Set to `120` seconds
   - **Send Timeout**: Set to `120` seconds
   - **Connect Timeout**: Set to `30` seconds

5. **Save and Redeploy**:
   - Click "Save" or "Update"
   - Redeploy your application for changes to take effect

### Method 2: Using Docker Labels (Advanced)

If your Coolify setup uses Traefik as a reverse proxy, you can add custom labels to your application:

Add these labels in your Coolify application settings under "Custom Docker Labels":

```
traefik.http.services.your-app.loadbalancer.server.timeout.read=120s
traefik.http.services.your-app.loadbalancer.server.timeout.write=120s
traefik.http.services.your-app.loadbalancer.server.timeout.idle=120s
```

Replace `your-app` with your actual application name.

### Method 3: Environment Variables

Add these environment variables to your Next.js application in Coolify:

```env
# Increase Node.js timeout
NODE_OPTIONS="--max-http-header-size=16384"

# For production builds
NEXT_TELEMETRY_DISABLED=1
```

### Method 4: Custom Nginx Configuration (If using Nginx)

If Coolify uses Nginx as a reverse proxy, you may need to add custom configuration:

1. In Coolify, look for "Custom Nginx Configuration" or similar
2. Add these directives:

```nginx
proxy_connect_timeout 120s;
proxy_send_timeout 120s;
proxy_read_timeout 120s;
send_timeout 120s;
```

### Verification

After making changes:

1. **Redeploy your application** in Coolify
2. **Test the application** by loading pages that fetch data
3. **Check logs** in Coolify to ensure no timeout errors appear
4. **Monitor response times** - they should complete within the new timeout window

### Recommended Timeout Values

| Setting | Development | Production |
|---------|-------------|------------|
| Proxy Timeout | 120s | 90s |
| Read Timeout | 120s | 90s |
| Connect Timeout | 30s | 30s |
| Idle Timeout | 120s | 90s |

### Additional Notes

- **Start with 120 seconds** and adjust based on your actual needs
- **Monitor your application** to find the optimal timeout value
- **Consider implementing caching** (already done in the code optimizations) to reduce the need for long timeouts
- **Database optimization** (see DATABASE_OPTIMIZATION.sql) will help reduce query times

### Troubleshooting

If you still experience timeouts after increasing these values:

1. Check Supabase query performance in the Supabase dashboard
2. Verify network connectivity between Coolify and Supabase
3. Review application logs for specific error messages
4. Consider implementing request queuing or rate limiting
5. Check if Supabase is experiencing any service issues

### Contact Coolify Support

If you can't find these settings in your Coolify dashboard:

1. Check Coolify documentation for your specific version
2. Contact Coolify support or community forums
3. Provide your Coolify version and setup details
