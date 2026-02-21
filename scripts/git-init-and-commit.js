import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('[v0] Starting git initialization and commit...');
console.log('[v0] Project root:', projectRoot);

try {
  // Change to project directory
  process.chdir(projectRoot);

  // Check if git is already initialized
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    console.log('[v0] Git repository already initialized');
  } catch {
    console.log('[v0] Initializing git repository...');
    execSync('git init', { stdio: 'inherit' });
    console.log('[v0] Git repository initialized');
  }

  // Configure git user (temporary for this commit)
  execSync('git config user.email "v0-bot@vercel.dev" || true', { stdio: 'inherit' });
  execSync('git config user.name "v0 Bot" || true', { stdio: 'inherit' });

  // Add all changes
  console.log('[v0] Adding all files...');
  execSync('git add -A', { stdio: 'inherit' });

  // Check git status
  console.log('[v0] Git status:');
  execSync('git status', { stdio: 'inherit' });

  // Create commit
  const commitMessage = `feat: Add admin email notifications, brute-force protection, and security enhancements

Changes:
- Add ADMIN_EMAIL environment variable for contact form notifications
- Implement brute-force protection on admin login (5 attempts per 15 minutes)
- Add login_attempts table for tracking failed login attempts by IP
- Create brute-force.ts utility with rate limiting functions
- Update email function to send notifications to admin instead of sender
- Enhance input sanitization with HTML entity encoding
- Add audit logging for all admin actions
- Improve CSP headers for development preview domains
- Display rate limit feedback in admin login UI
- Add submission deletion API with logging
- Track client IP on all submissions for security

Database Migrations:
- scripts/04-create-login-attempts-table.sql

Updated Files:
- lib/env.ts: Added ADMIN_EMAIL and GMAIL env vars
- lib/admin-auth.ts: Added audit logging function
- lib/brute-force.ts: NEW brute-force protection utility
- lib/validation.ts: Enhanced sanitization
- app/api/admin/login/route.ts: Added brute-force protection
- app/api/admin/logout/route.ts: Added logging and security
- app/api/admin/submissions/route.ts: Added deletion API and logging
- app/api/contact/route.ts: Added email trigger and rate limiting
- supabase/functions/send-contact-email/index.ts: Send to admin email
- components/admin/AdminDashboard.tsx: Display rate limit feedback
- next.config.ts: Fixed CSP headers for development
- middleware.ts: Admin route protection
- ADMIN_SETUP_GUIDE.md: NEW setup documentation
- CHANGES_SUMMARY.md: NEW changes summary`;

  console.log('[v0] Creating commit...');
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });

  console.log('[v0] ✅ Successfully committed all changes!');
  console.log('[v0] Commit message includes comprehensive documentation of all changes');

} catch (error) {
  console.error('[v0] Error during git operations:', error.message);
  process.exit(1);
}
