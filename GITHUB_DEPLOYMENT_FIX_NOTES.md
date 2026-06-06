# GitHub + Supabase deployment fix notes

This package has been patched so the GitHub browser version behaves like the localhost/static version.

## What was fixed

1. `github-supabase/assets/js/supabase-app.js`
   - Added safe Supabase startup checks.
   - If Supabase URL/key are missing or wrong, the site now falls back to bundled JSON data instead of showing empty/broken sections.
   - Fixed blog date compatibility: supports both `publish_date` from Supabase and `date` from local JSON.
   - Fixed media paths so images/videos work from GitHub Pages project folders.
   - Added empty states instead of blank pages.
   - Added safer URL encoding for project/blog detail links.

2. `github-supabase/assets/js/supabase-admin.js`
   - Added safe config error message.
   - Fixed admin table ordering issue. Some tables such as `design_skills` and `coding_skills` do not have `created_at`, so the old admin could fail on GitHub/Supabase.
   - Added `site_settings` editing from the browser admin.
   - Added JSON editing support for project `content`.
   - Added booleans and numbers casting for Supabase fields.
   - Added dashboard counters for projects, blogs, certifications and messages.

3. `github-supabase/data/`
   - Added the local JSON data into the GitHub version as a fallback.
   - This means the public site still shows your content even before Supabase config is completed.

4. `github-supabase/admin/index.html` and CSS
   - Added dashboard stat cards and table overflow fixes.

## Very important before publishing

Edit this file:

`github-supabase/assets/js/supabase-config.js`

Put your actual values from Supabase Dashboard > Project Settings > API:

```js
window.PORTFOLIO_SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
window.PORTFOLIO_SUPABASE_ANON_KEY = "YOUR-SUPABASE-ANON-PUBLIC-KEY";
```

Do not use the service role key in frontend code. Only use the public anon key.

## What to upload to GitHub Pages

For GitHub Pages, upload the content inside:

`haider_portfolio_system/github-supabase/`

Not the PHP files. GitHub Pages does not run PHP.

If your repository is `CV`, these files should be directly inside the repository root so this works:

`https://techfusion001.github.io/CV/index.html`

Correct structure:

```text
CV/
  index.html
  portfolio.html
  project.html
  blogs.html
  blog.html
  contact.html
  admin/index.html
  assets/
  data/
  .nojekyll
```

## Supabase admin login requirement

The admin panel uses Supabase Auth. Create a user in Supabase Authentication, then add that user's UUID into `public.admin_users`.

Example SQL after creating the Auth user:

```sql
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where email = 'your-admin-email@example.com'
on conflict (user_id) do update set email = excluded.email;
```

## If frontend still does not fetch Supabase data

Check these in browser DevTools Console:

- `supabase-config.js` must load with status 200.
- URL must be exactly like `https://xxxxx.supabase.co`.
- Anon key must be the public anon key.
- Supabase SQL schema and seed data must already be run.
- RLS policies from `database/supabase_schema.sql` must exist.

The public website will still display fallback JSON content if Supabase is not connected, but contact form and admin require Supabase.
