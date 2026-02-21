# Quick Reference Guide

## 🎯 Key Features at a Glance

### Contact Form → Admin Email
```
User submits form on website
                    ↓
Form data validated and rate limited
                    ↓
Data stored in Supabase
                    ↓
Email sent to ADMIN_EMAIL automatically
                    ↓
Admin receives notification immediately
```

### Admin Dashboard Access
```
Navigate to /admin
                ↓
Enter password
                ↓
5 attempts per 15 minutes (brute-force protected)
                ↓
View all contact submissions
                ↓
Delete submissions as needed
```

---

## 📋 Environment Variables Needed

```
ADMIN_EMAIL                    → admin@yourcompany.com
ADMIN_DASHBOARD_PASSWORD       → strong-password-here
ADMIN_SESSION_SECRET           → 32-char-random-secret
CSRF_SECRET                    → 32-char-random-secret
GMAIL_USER                     → your-gmail@gmail.com
GMAIL_APP_PASSWORD             → 16-char-app-password
```

---

## 🔒 Security Limits

| Feature | Limit | Time Window |
|---------|-------|-------------|
| Contact Form Submissions | 5 per IP | 1 hour |
| Admin Login Attempts | 5 per IP | 15 minutes |
| Login Lockout Duration | 30 minutes | After 5 failed |
| Session Timeout | 8 hours | From login |

---

## 📱 URLs

| Page | URL | Access |
|------|-----|--------|
| Contact Form | `/` (main page) | Public |
| Admin Dashboard | `/admin` | Password protected |
| Admin Login API | `/api/admin/login` | POST |
| Admin Logout API | `/api/admin/logout` | POST |
| Contact Submit API | `/api/contact` | POST |

---

## 🗄️ Database Tables

### contact_submissions
- All contact form submissions
- Fields: id, name, email, company, subject, message, client_ip, created_at

### admin_audit_log
- All admin actions and login attempts
- Fields: id, action, success, client_ip, details, created_at

### login_attempts
- Tracks failed login attempts for brute-force
- Fields: id, client_ip, success, created_at

### rate_limits
- Tracks contact form submissions for rate limiting
- Fields: id, client_ip, created_at

---

## 🧪 Quick Tests

### Test 1: Contact Form Email
1. Submit contact form on website
2. Check admin email inbox
3. Should receive email within 5 seconds

### Test 2: Admin Login
1. Go to `/admin`
2. Enter correct password
3. Should see dashboard with submissions

### Test 3: Brute-Force Protection
1. Go to `/admin`
2. Enter wrong password 5 times
3. On 6th attempt, should see "Too many failed attempts"
4. Try again after 30 minutes

### Test 4: Rate Limiting
1. Submit contact form quickly 6 times
2. 6th submission should fail with 429 error
3. Try again after 1 hour

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Email not received | Check ADMIN_EMAIL, GMAIL_USER, GMAIL_APP_PASSWORD in env |
| Can't login to /admin | Verify ADMIN_DASHBOARD_PASSWORD in env |
| Locked out of /admin | Wait 30 minutes or clear login_attempts table |
| Form submissions blocked | Wait 1 hour or clear rate_limits table |
| CSP errors in console | Check next.config.ts CSP policy |

---

## 📊 Admin Dashboard Features

✅ View all contact form submissions
✅ See submission details (name, email, company, subject, message)
✅ See timestamp of each submission
✅ Delete individual submissions
✅ Session-based authentication
✅ All actions logged for audit trail
✅ 8-hour automatic session timeout

---

## 🔐 Security Features

✅ Rate limiting (contact form: 5/hour per IP)
✅ Brute-force protection (login: 5 attempts/15 mins)
✅ Input sanitization (prevents XSS)
✅ Secure cookies (HTTP-only, same-site)
✅ Audit logging (all actions tracked)
✅ Email escaping (prevents injection)
✅ CSP headers (prevents attacks)
✅ Timing-safe passwords (constant-time comparison)

---

## 🚀 Deployment

```bash
# 1. Set environment variables in Vercel
# 2. Verify database migrations executed
# 3. Commit changes
git add .
git commit -m "feat: admin email and brute-force protection"
git push origin nextjs-audit

# 4. Merge PR to main in GitHub
# 5. Vercel deploys automatically
# 6. Test all features
```

---

## 📞 Common Commands

### View Contact Submissions in Supabase
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

### View Audit Logs
```sql
SELECT * FROM admin_audit_log ORDER BY created_at DESC;
```

### Check Brute-Force Attempts
```sql
SELECT client_ip, COUNT(*) as attempts 
FROM login_attempts 
WHERE success = false AND created_at > NOW() - INTERVAL '15 minutes'
GROUP BY client_ip;
```

### Clear Login Lockout
```sql
DELETE FROM login_attempts 
WHERE client_ip = '1.2.3.4' AND success = false;
```

---

## 📚 Documentation

- **IMPLEMENTATION_COMPLETE.md** - Full documentation
- **ADMIN_SETUP_GUIDE.md** - Setup instructions
- **DEPLOYMENT_CHECKLIST.md** - Deployment steps
- **PROJECT_SUMMARY.md** - Complete overview
- **QUICK_REFERENCE.md** - This file

---

## ✨ That's It!

Everything is set up and ready to deploy. Just:
1. Set environment variables
2. Push to GitHub
3. Test the features
4. Deploy!

Any questions? Check the full documentation files. 🚀
