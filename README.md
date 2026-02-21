# Primexia Next.js Application

This project is a production-ready Next.js (App Router) migration of the original Lovable-generated web app.

## Stack

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (server-side access)

## Project Structure

- `/app` - routes, metadata, API routes (`/api/*`), sitemap, robots
- `/components` - UI and page components
- `/hooks` - client hooks
- `/lib` - shared utilities, env handling, auth, validation, server clients
- `/styles` - global styles
- `/public` - static assets

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Required variables:

- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_DASHBOARD_PASSWORD`
- `ADMIN_SESSION_SECRET`

3. Run development server:

```bash
npm run dev
```

4. Build and run production:

```bash
npm run build
npm start
```

## Security Notes

- Contact and admin data operations happen server-side via Next API routes.
- Admin authentication uses an HTTP-only session cookie.
- Security headers are configured in `next.config.ts`.
- Keep `.env` out of version control.

## SEO

- Metadata API is used for page titles, descriptions, Open Graph, and Twitter cards.
- `app/sitemap.ts` generates `sitemap.xml`.
- `app/robots.ts` generates `robots.txt`.
