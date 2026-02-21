import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

console.log('[v0] Project root:', projectRoot);

try {
  // Configure git user
  console.log('[v0] Configuring git user...');
  execSync('git config user.email "v0-bot@vercel.com"', { cwd: projectRoot, stdio: 'inherit' });
  execSync('git config user.name "v0 Bot"', { cwd: projectRoot, stdio: 'inherit' });

  // Check git status
  console.log('[v0] Checking git status...');
  const status = execSync('git status --porcelain', { cwd: projectRoot, encoding: 'utf-8' });
  console.log('[v0] Git status output:\n', status);

  // Stage all changes
  console.log('[v0] Staging all changes...');
  execSync('git add -A', { cwd: projectRoot, stdio: 'inherit' });

  // Create commit
  const commitMessage = `feat: implement admin email notifications and brute-force protection

- Add ADMIN_EMAIL environment variable for contact form notifications
- Implement email sending to admin email instead of sender email
- Add brute-force protection with login attempt tracking (5 attempts/15 mins)
- Create login_attempts table in Supabase for tracking failed attempts
- Add brute-force utility with isLockedOut() and recordLoginAttempt() functions
- Integrate brute-force protection into admin login API route
- Display remaining attempts and lockout messages in admin dashboard
- Fix CSP headers to allow Vercel preview domains and localhost
- Enhanced security: rate limiting, audit logging, input sanitization
- Updated admin login component with rate limit feedback UI
- Add comprehensive documentation (ADMIN_SETUP_GUIDE.md, CHANGES_SUMMARY.md)

Security improvements:
- IP-based rate limiting on contact form (5 requests/hour)
- Brute-force protection on admin login (5 attempts/15 minutes)
- Email sanitization with HTML entity encoding
- Secure session cookies (httpOnly, sameSite, secure)
- Audit logging for all admin actions
- Server-side route protection with middleware`;

  console.log('[v0] Creating commit...');
  execSync(`git commit -m "${commitMessage}"`, { cwd: projectRoot, stdio: 'inherit' });

  // Push to remote
  console.log('[v0] Pushing to remote...');
  execSync('git push origin nextjs-audit', { cwd: projectRoot, stdio: 'inherit' });

  console.log('[v0] ✅ Successfully committed and pushed all changes!');
  process.exit(0);
} catch (error) {
  console.error('[v0] Error during git operations:', error.message);
  console.error('[v0] Stack:', error.stack);
  process.exit(1);
}
