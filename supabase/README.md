# Supabase migration guide

1. Create a Supabase project and enable PostgreSQL.
2. Open the SQL editor and run [schema.sql](schema.sql).
3. Optionally run [seed.sql](seed.sql) to preload categories, tags, and the default author.
4. Set the following environment variables in Vercel or your hosting provider:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
   - `CSRF_SECRET`
5. The server is now wired to Supabase-backed queries for posts, categories, tags, media metadata, settings, and admin authentication.
