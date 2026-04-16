# React Native Developer Portfolio

This project is a `Next.js` portfolio starter for a React Native developer. It includes:

- Public portfolio pages
- Protected admin panel
- Supabase data model and auth hooks
- Contact form inbox storage
- Vercel-ready deployment setup

## Tech Stack

- `Next.js` App Router
- `React`
- `TypeScript`
- `Supabase`
- `Vercel`

## Project Structure

- `app/` public pages, admin pages, and server actions
- `components/` reusable UI
- `lib/` data helpers and Supabase clients
- `supabase/schema.sql` database schema and starter seed data

## Setup

1. Install dependencies

```bash
npm install
```

2. Copy env file

```bash
cp .env.example .env.local
```

3. Add your Supabase values to `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

4. In Supabase SQL editor, run:

`/Users/premmehta/Documents/New project/supabase/schema.sql`

5. Create public storage buckets in Supabase Storage:

- `portfolio-assets`
- `portfolio-resumes`

Turn on `Public bucket` for both so uploaded avatar, project images, and resume links can be displayed on the portfolio.

6. Create an admin user in Supabase Auth using email/password.

7. Run locally

```bash
npm run dev
```

8. Deploy to Vercel

- Import the repo into Vercel
- Add the same environment variables in Vercel project settings
- Redeploy

## Notes

- The public site renders demo content even before Supabase is connected.
- Once Supabase env vars are present, the app reads from your database.
- Admin write actions depend on `SUPABASE_SERVICE_ROLE_KEY`, so keep it server-only.
- The admin panel supports:
  `profile` update, avatar upload, resume upload, project create/update/delete, skill create/update/delete, experience create/update/delete, social link create/update/delete, and message archiving.
- Public pages are revalidated after admin changes so updated content appears immediately on the portfolio.
