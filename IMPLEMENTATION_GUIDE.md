# Implementation Guide - Post-Audit Setup

This guide walks you through setting up and testing the fixed Primexia application.

---

## 1. Database Setup

The migration scripts have already been executed. The following tables are now in your Supabase database:

### Verify Tables Exist
1. Go to [Supabase Dashboard](https://supabase.com)
2. Navigate to your project
3. Go to SQL Editor
4. Verify these tables exist:
   - `contact_submissions`
   - `admin_audit_log`
   - `rate_limits`

---

## 2. Environment Variables

Add these to your Vercel project in Settings → Environment Variables:

```
# Supabase (usually already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_SESSION_SECRET=your_random_secret_key_min_32_chars

# Security
CSRF_SECRET=your_random_csrf_secret_min_32_chars

# Email Configuration (Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
```

### Generate Secure Secrets

**Linux/Mac**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**For ADMIN_SESSION_SECRET and CSRF_SECRET**:
```bash
# Run this twice to get two different 64-character hex strings
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail" on "Windows Computer" (or your OS)
4. Copy the 16-character app password
5. Set as `GMAIL_APP_PASSWORD` in Vercel

---

## 3. Testing the Contact Form

### Test Submission
1. Go to your app's contact page
2. Fill in the form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Subject: "Test Message"
   - Message: "This is a test"
3. Submit the form
4. Verify success message appears

### Verify Data in Database
1. Open Supabase dashboard
2. Go to SQL Editor
3. Run:
```sql
SELECT * FROM contact_submissions 
ORDER BY created_at DESC 
LIMIT 1;
```
You should see your test submission.

### Check Email Was Sent
1. Check your Gmail inbox (GMAIL_USER)
2. You should receive an email with:
   - Properly formatted HTML with styles
   - Plain text version
   - All fields sanitized (no HTML injection)

---

## 4. Test Rate Limiting

### Rate Limit Testing
1. Submit the contact form 5 times rapidly from the same IP
2. On the 6th attempt, you should get: `"Too many requests. Please try again later."`
3. Response status: `429`

### Verify Rate Limit Data
1. Open Supabase SQL Editor
2. Run:
```sql
SELECT * FROM rate_limits 
WHERE created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
```
You should see one row per request with the client IP.

---

## 5. Test Admin Authentication

### Login Test
1. Navigate to `/admin`
2. You should be redirected to `/admin/login` (middleware protection)
3. Enter the password you set as `ADMIN_PASSWORD`
4. Click "Login"
5. You should be redirected to the admin dashboard

### Verify Audit Log
1. Open Supabase SQL Editor
2. Run:
```sql
SELECT * FROM admin_audit_log 
WHERE action = 'login'
ORDER BY created_at DESC 
LIMIT 1;
```
You should see your login recorded with:
- `success: true`
- Your client IP
- Current timestamp

### Failed Login Test
1. Navigate to `/admin/login`
2. Enter an incorrect password
3. Click "Login"
4. Error message should appear
5. Check audit log - should have a failed login entry

---

## 6. Admin Dashboard Testing

### View Submissions
1. Log in to admin dashboard
2. Click "View Submissions"
3. You should see all contact submissions with sorting
4. Check audit log for `submissions_viewed` entry

### Delete Submission
1. In submissions view, click delete on a test submission
2. Submission should be removed
3. Check audit log for `submission_deleted` entry

### Logout
1. Click "Logout" button
2. Session cookie should be cleared
3. You should be redirected to login
4. Check audit log for `logout` entry

---

## 7. Email Customization

### Modify Email Template

Edit `/supabase/functions/send-contact-email/index.ts`:

```typescript
// Around line 73 - HTML email template
const htmlBody = `
<!DOCTYPE html>
<html>
<!-- Modify the template here -->
</html>
`;
```

Key variables available:
- `escapedName` - Sanitized user name
- `escapedEmail` - Sanitized email
- `escapedCompany` - Sanitized company
- `escapedSubject` - Sanitized subject
- `escapedMessage` - Sanitized message (with `\n` converted to `<br>`)
- `id` - Submission ID for reference

---

## 8. Rate Limiting Tuning

### Adjust Rate Limit Settings

Edit `/app/api/contact/route.ts`:

```typescript
// Line 5-6
const RATE_LIMIT_REQUESTS = 5; // Change this number
const RATE_LIMIT_WINDOW = 3600; // Change to seconds (e.g., 1800 = 30 min)
```

### Clean Old Rate Limit Entries

Run this SQL periodically to clean up old entries:

```sql
DELETE FROM rate_limits 
WHERE created_at < NOW() - INTERVAL '24 hours';
```

---

## 9. Monitoring & Maintenance

### Monitor Admin Access
Check the audit log regularly for suspicious activity:

```sql
-- Failed login attempts
SELECT * FROM admin_audit_log 
WHERE action = 'login' AND success = false
ORDER BY created_at DESC;

-- All admin actions
SELECT * FROM admin_audit_log 
ORDER BY created_at DESC 
LIMIT 50;
```

### Monitor Rate Limits
Check for potential attacks:

```sql
-- Multiple requests from same IP in 1 hour
SELECT client_ip, COUNT(*) as request_count
FROM rate_limits 
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY client_ip
HAVING COUNT(*) > 3
ORDER BY request_count DESC;
```

---

## 10. Troubleshooting

### Email Not Sending

**Problem**: Submissions successful but no email received

**Solutions**:
1. Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in Vercel
2. Check logs: `console.error("[v0] Error sending email:...)`
3. Verify Gmail App Password is 16 characters
4. Check 2FA is enabled on Gmail account
5. Try sending test email manually

**Debug**: Check Supabase Function logs
1. Go to Supabase → Edge Functions
2. Click `send-contact-email`
3. Check Recent Invocations

### Rate Limiting Not Working

**Problem**: Can submit more than 5 times

**Solutions**:
1. Check if rate_limits table has data: `SELECT COUNT(*) FROM rate_limits;`
2. Verify client IP is being recorded correctly
3. If testing locally, multiple IPs might bypass limit
4. Check rate limit window hasn't exceeded

### Admin Login Not Working

**Problem**: Login redirect loop

**Solutions**:
1. Verify `ADMIN_PASSWORD` is set in Vercel
2. Verify `ADMIN_SESSION_SECRET` is set and at least 32 characters
3. Clear browser cookies for the domain
4. Check middleware.ts is configured correctly
5. Verify database tables exist: `SELECT * FROM admin_audit_log;`

### Email Contains HTML Tags

**Problem**: Email shows `&lt;` instead of `<`

**Solutions**:
1. This is correct! Tags are escaped for security
2. Email client should display properly formatted
3. Check plain text version for correct content
4. If HTML email shows escaped tags, check email client settings

---

## 11. Security Checklist

- [ ] All environment variables set in Vercel
- [ ] ADMIN_PASSWORD is strong (minimum 16 characters)
- [ ] GMAIL account has 2FA and app password
- [ ] Rate limiting is active and tested
- [ ] Middleware is protecting /admin routes
- [ ] Audit logs are being recorded
- [ ] Email sanitization verified (special characters escaped)
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] Database backups are configured in Supabase
- [ ] Regular review of admin audit logs scheduled

---

## 12. Performance Optimization

### Database Indexes
The migration scripts create necessary indexes. Verify:

```sql
-- Check existing indexes
SELECT * FROM information_schema.statistics 
WHERE table_name = 'contact_submissions';
```

### Caching Strategy
- Contact form endpoint: No caching (public endpoint)
- Admin submissions endpoint: Cache for 0 seconds (fresh data)
- Email function: Triggered asynchronously

---

## 13. Future Enhancements

Recommended additions for production:

1. **Two-Factor Authentication (2FA)**
   - Add TOTP-based 2FA to admin login

2. **Email Verification**
   - Verify contact email is valid before storing

3. **Spam Detection**
   - Integrate with Akismet or similar service

4. **Webhook Integration**
   - Send Slack/Discord notifications for new submissions

5. **Autoresponder**
   - Send confirmation email to user's provided email

6. **Advanced Analytics**
   - Track submission sources, timestamps, success rates

7. **Content Security Policy**
   - Add CSP headers to prevent XSS attacks

8. **Rate Limiting by Email**
   - Prevent same email from submitting too often

---

## Support

For issues or questions:
1. Check the AUDIT_FIXES.md for overview of changes
2. Review the implementation guide above
3. Check Supabase logs for detailed errors
4. Verify all environment variables are set correctly

---

**Last Updated**: February 2026
**Version**: 1.0
