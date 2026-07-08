# Production-ready blog CMS

This project has been upgraded into a Vite + Express blog platform with:

- a secure admin login flow
- a protected admin dashboard
- blog post CRUD, draft/publish, delete, and duplicate actions
- category and tag management
- image upload and optimization
- SEO metadata, sitemap, robots, and RSS endpoints
- a public blog listing and article view

## Local development

1. Install dependencies: `npm install`
2. Set the following environment variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
   - `CSRF_SECRET`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (or `SUPABASE_ANON_KEY`)
   - `GEMINI_API_KEY` (optional for the AI endpoint)
3. Apply the SQL from [supabase/schema.sql](supabase/schema.sql) in your Supabase project.
4. Start the server: `npm run dev`
5. Open `http://localhost:3000/`

## Admin access

- Public blog route: `/blog`
- Admin route: `/admin`
- Login uses the configured admin email and password.

## Production notes

- The app now uses Supabase PostgreSQL for blog posts, categories, tags, media metadata, settings, and admin authentication.
- The server serves `/sitemap.xml`, `/robots.txt`, and `/rss.xml` automatically.
- Uploaded media is stored under `public/uploads` and its metadata is persisted in Supabase.
