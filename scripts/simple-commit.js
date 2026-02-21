import { execSync } from 'child_process';
import path from 'path';

const projectRoot = '/vercel/share/v0-project';

console.log('[v0] Starting git commit process...');
console.log('[v0] Working directory:', projectRoot);

try {
  // Change to project directory
  process.chdir(projectRoot);

  // Check git status
  console.log('[v0] Checking git status...');
  const status = execSync('git status --short', { encoding: 'utf-8' });
  console.log('[v0] Git status:\n', status);

  // Stage all changes
  console.log('[v0] Staging all changes...');
  execSync('git add -A', { stdio: 'inherit' });

  // Check if there are changes to commit
  const stagedChanges = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
  if (!stagedChanges.trim()) {
    console.log('[v0] No changes to commit');
    process.exit(0);
  }

  // Create commit message
  const commitMessage = `feat: Add admin email notifications, brute-force protection, and security enhancements

- Add ADMIN_EMAIL environment variable for contact form notifications
- Implement brute-force protection with IP-based rate limiting (5 attempts per 15 minutes)
- Create login_attempts table for tracking admin login attempts
- Add audit logging for all admin actions (login, logout, submissions)
- Update email function to send notifications to admin email instead of sender
- Enhance HTML email templates with proper styling
- Improve input sanitization to prevent XSS and HTML injection attacks
- Fix CSP headers to allow Vercel preview domains in development
- Add rate limiting feedback to admin login UI
- Add submission deletion API with audit logging
- Create brute-force protection utility with lockout mechanism
- Update AdminDashboard component with attempt tracking UI

Security improvements:
- Server-side middleware protection for /admin routes
- Timing-safe password comparison
- HTTP-only secure cookies
- Audit trail for all admin operations
- IP-based rate limiting and lockout protection

Files modified:
- lib/env.ts - Added ADMIN_EMAIL, GMAIL_USER, GMAIL_APP_PASSWORD
- lib/admin-auth.ts - Added audit logging
- lib/brute-force.ts (new) - Brute-force protection utilities
- app/api/admin/login/route.ts - Added brute-force protection
- app/api/admin/logout/route.ts - Added logging and secure cookies
- app/api/admin/submissions/route.ts - Added deletion and logging
- supabase/functions/send-contact-email/index.ts - Send to admin email
- components/admin/AdminDashboard.tsx - Added rate limit feedback
- middleware.ts - Server-side route protection
- next.config.ts - Fixed CSP headers for preview domains

Database:
- scripts/04-create-login-attempts-table.sql - New login tracking table`;

  console.log('[v0] Creating commit...');
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });

  // Push to remote
  console.log('[v0] Pushing to remote...');
  execSync('git push origin HEAD', { stdio: 'inherit' });

  console.log('[v0] ✅ Successfully committed and pushed all changes!');
} catch (error) {
  console.error('[v0] Error during git operations:', error.message);
  process.exit(1);
}
