# Admin Panel Setup & Security Guide

## Overview

Your Primexia admin panel now includes enterprise-grade security features:
- **Brute-force protection** preventing password attacks
- **Email notifications** when new contact submissions arrive
- **Audit logging** tracking all admin actions
- **Rate limiting** on all API endpoints
- **Secure session management** with HTTPS-only cookies

## Environment Variables Required

Set these in your Vercel project dashboard under Settings → Environment Variables:

```
ADMIN_EMAIL=your-admin@email.com
ADMIN_DASHBOARD_PASSWORD=strong-password-here
ADMIN_SESSION_SECRET=randomly-generated-32-char-secret
CSRF_SECRET=randomly-generated-32-char-secret
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-gmail-app-password
```

## How It Works

### Contact Form Submission Flow
1. User submits contact form on `/contact` page
2. **Rate Limiting Check**: IP-based rate limit (5 submissions per hour)
3. **Data Storage**: Submission saved to `contact_submissions` table
4. **Email Trigger**: Supabase function sends notification to `ADMIN_EMAIL`
5. **Audit Log**: Submission recorded with timestamp and IP

### Admin Login & Security

**Access the Admin Panel:**
- Navigate to `/admin`
- Enter the `ADMIN_DASHBOARD_PASSWORD`

**Brute-Force Protection:**
- Maximum 5 login attempts per 15 minutes per IP
- After 5 failed attempts, IP is locked for 15 minutes
- Failed attempts are logged with IP and timestamp
- Response includes `attemptsRemaining` count

**Secure Session:**
- Session cookie is `httpOnly` (cannot be accessed via JavaScript)
- `sameSite: strict` prevents CSRF attacks
- `secure: true` in production (HTTPS-only)
- Session expires after 8 hours

### Admin Dashboard Features

Once authenticated, admins can:
- **View all contact submissions** with name, email, company, subject, message
- **Delete submissions** (logged for audit trail)
- **Logout** (clears secure session)

### Email Notifications

When a contact form is submitted:
1. Email sent to `ADMIN_EMAIL` with full details
2. Both HTML and plain-text versions included
3. All user input escaped to prevent injection
4. Submission ID and timestamp included for tracking

### Audit Logging

All admin actions logged to `admin_audit_log` table:
- `login` - Admin authentication attempts (success/failure)
- `logout` - Admin session termination
- `submissions_viewed` - Dashboard access
- `submission_deleted` - Individual submission deletion

Each log includes:
- Action type
- Client IP address
- Timestamp
- Success/failure status
- Failure reason (if applicable)

## Database Tables

### contact_submissions
```sql
- id (UUID, primary key)
- name (text)
- email (text)
- company (text, nullable)
- subject (text)
- message (text)
- client_ip (text)
- created_at (timestamp)
```

### admin_audit_log
```sql
- id (UUID, primary key)
- action (text)
- success (boolean)
- client_ip (text)
- details (text, nullable)
- created_at (timestamp)
```

### login_attempts
```sql
- id (UUID, primary key)
- client_ip (text)
- success (boolean)
- created_at (timestamp)
```

### rate_limits
```sql
- id (UUID, primary key)
- client_ip (text)
- created_at (timestamp)
```

## Security Best Practices

1. **Strong Password**: Use a random 16+ character password for `ADMIN_DASHBOARD_PASSWORD`
2. **Session Secret**: Generate a random 32+ character string for `ADMIN_SESSION_SECRET`
3. **CSRF Secret**: Generate a random 32+ character string for `CSRF_SECRET`
4. **Gmail Setup**: Use Gmail App Passwords (not your actual password)
5. **Monitor Audit Logs**: Check `admin_audit_log` table regularly for suspicious activity
6. **IP Tracking**: Review IPs in logs for unusual locations

## Email Configuration

### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password:
   - Go to Google Account → Security → App Passwords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
3. Set `GMAIL_USER` to your Gmail address
4. Set `GMAIL_APP_PASSWORD` to the 16-character password

### Alternative Email Providers

The email function currently uses Gmail SMTP. To use another provider:
1. Update `supabase/functions/send-contact-email/index.ts`
2. Replace Gmail SMTP settings with your provider
3. Update environment variables accordingly

## Testing

### Test Contact Form
1. Navigate to `/contact`
2. Fill out the form
3. Submit (should not be rate-limited on first attempt)
4. Check `ADMIN_EMAIL` for notification email

### Test Admin Login
1. Navigate to `/admin`
2. Enter incorrect password 5 times
3. Verify lockout message appears
4. Wait 15 minutes or use different IP to retry
5. Enter correct password to access dashboard

### Test Audit Logs
1. Query `admin_audit_log` table in Supabase
2. Verify login attempts are logged
3. Verify submission views are logged
4. Verify deletions are logged

## Troubleshooting

### Email not sending
- Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct
- Verify `ADMIN_EMAIL` is valid
- Check Supabase function logs

### Admin login not working
- Verify `ADMIN_DASHBOARD_PASSWORD` is correct
- Check IP isn't locked (wait 15 minutes)
- Check browser cookies are enabled

### Preview not loading
- Clear browser cache and cookies
- Try incognito mode
- Check CSP headers in next.config.ts allow preview domains

## Production Deployment

Before deploying to production:
1. Set all environment variables in Vercel
2. Test contact form submissions end-to-end
3. Test admin login and dashboard
4. Review audit logs
5. Set up email forwarding for `ADMIN_EMAIL`
6. Monitor logs regularly

## Support

For issues or questions:
1. Check Supabase function logs
2. Review audit_log table for errors
3. Check browser console for client-side errors
4. Review Next.js build logs
