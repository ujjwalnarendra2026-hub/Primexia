#!/bin/bash

# Git commit and push script
set -e

echo "[v0] Starting git commit and push..."

# Add all changes
git add -A

# Create commit with descriptive message
git commit -m "feat: Add admin email notifications, brute-force protection, and security enhancements

- Add ADMIN_EMAIL environment variable for contact form notifications
- Implement IP-based brute-force protection (5 attempts per 15 minutes)
- Create login_attempts table for tracking failed login attempts
- Add audit logging for all admin actions (login, logout, submissions viewed, deletion)
- Update email function to send to admin email instead of sender
- Enhance email sanitization with HTML entity encoding
- Fix CSP headers to allow Vercel preview domains in development
- Update admin login component with rate limit feedback
- Add submission deletion API with proper authentication and logging
- Create comprehensive documentation for admin setup and security features

Database migrations:
- scripts/01-create-contact-table.sql
- scripts/02-create-admin-table.sql
- scripts/03-create-rate-limit-table.sql
- scripts/04-create-login-attempts-table.sql

New features and files:
- lib/brute-force.ts: Brute-force protection utilities
- lib/csrf.ts: CSRF protection implementation
- middleware.ts: Server-side route protection for /admin
- ADMIN_SETUP_GUIDE.md: Complete setup and testing guide
- CHANGES_SUMMARY.md: Detailed summary of all changes"

echo "[v0] Commit created successfully"

# Push to remote
git push origin nextjs-audit

echo "[v0] Changes pushed to GitHub successfully!"
echo "[v0] Branch: nextjs-audit"
