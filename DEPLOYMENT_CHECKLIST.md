# Deployment Checklist

## Pre-Deployment

### Environment Variables ✅
Must be set in Vercel Project Settings → Environment Variables:

```
ADMIN_EMAIL=your-admin@example.com
ADMIN_DASHBOARD_PASSWORD=your-secure-password
ADMIN_SESSION_SECRET=your-32-char-random-string
CSRF_SECRET=your-32-char-random-string
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database Migrations ✅
All Supabase migrations have been executed:
- ✅ `scripts/01-create-contact-table.sql` - contact_submissions table
- ✅ `scripts/02-create-admin-table.sql` - admin_users, admin_audit_log tables
- ✅ `scripts/03-create-rate-limit-table.sql` - rate_limits table
- ✅ `scripts/04-create-login-attempts-table.sql` - login_attempts table

### Code Changes ✅
All code has been updated and tested:
- ✅ Contact form rate limiting implemented
- ✅ Admin email notifications enabled
- ✅ Brute-force protection active
- ✅ Audit logging functional
- ✅ CSP headers fixed for preview domains
- ✅ Security cookies configured

## Deployment Steps

### 1. Commit Changes
```bash
git add .
git commit -m "feat: implement admin email notifications and brute-force protection"
git push origin nextjs-audit
```

### 2. Merge to Main (in GitHub)
- Create Pull Request from `nextjs-audit` to `main`
- Review changes
- Merge when approved

### 3. Verify Deployment
- [ ] Visit https://primexia.vercel.app (or your domain)
- [ ] Submit test contact form
- [ ] Verify admin receives email
- [ ] Login to /admin with test password
- [ ] View submitted contact in dashboard

## Post-Deployment Testing

### Contact Form
- [ ] Submit form with valid data
- [ ] Check admin email inbox
- [ ] Verify submission appears in admin dashboard
- [ ] Test rate limiting (6 submissions = blocked)
- [ ] Verify error message on rate limit

### Admin Dashboard
- [ ] Access /admin page
- [ ] Try wrong password 5 times
- [ ] Verify "too many attempts" message
- [ ] Wait 15 minutes
- [ ] Try correct password
- [ ] Verify login successful
- [ ] View contact submissions
- [ ] Delete a submission
- [ ] Verify deletion successful
- [ ] Test logout

### Security
- [ ] Check browser console for CSP errors
- [ ] Verify cookies are httpOnly (dev tools)
- [ ] Check Supabase audit_log table for entries
- [ ] Verify rate_limits table has entries
- [ ] Verify login_attempts table tracking

## Monitoring

### Daily
- Check admin email for contact submissions
- Monitor contact form submissions in dashboard
- Review any errors in Vercel logs

### Weekly
- Review audit logs in Supabase
- Check for unusual login attempts (brute force patterns)
- Verify rate limiting is working

### Monthly
- Review security logs
- Check for any failed login attempts
- Verify all email notifications being sent

## Rollback Plan

If issues occur:

1. **Contact Form Issues**
   - Disable email function (set invalid ADMIN_EMAIL temporarily)
   - Form still saves to database
   - Revert CSP headers change if CSP blocking

2. **Admin Login Issues**
   - Bypass brute-force temporarily (update login_attempts window)
   - Increase password attempt limit
   - Clear login_attempts table if needed

3. **Email Not Sending**
   - Check GMAIL_USER and GMAIL_APP_PASSWORD
   - Verify ADMIN_EMAIL is valid
   - Check Supabase function logs

## Emergency Contacts

For issues during deployment:
- Vercel Support: https://vercel.com/help
- Supabase Support: https://supabase.com/support
- GitHub Issues: Check repository

## Completion Status

- [x] All code implemented
- [x] Database migrations executed
- [x] Environment variables configured
- [x] Documentation completed
- [ ] Deployed to production
- [ ] Post-deployment testing complete
- [ ] Monitoring active

---

**Ready for Deployment**: ✅ YES
**Date**: 2026-02-21
