# Haider Portfolio System — GitHub Pages + Supabase Version

This folder is the converted static version of your PHP/XAMPP portfolio system.

## What changed

- PHP pages were converted to `.html` pages.
- JSON/file writing was replaced by Supabase database calls.
- Admin login now uses Supabase Auth instead of PHP sessions.
- Admin CRUD now works from the browser through Supabase RLS policies.
- Contact form saves messages into the `messages` Supabase table.
- Image/video uploads from admin go to the public Supabase Storage bucket `portfolio-media`.
- The website styling, structure, pages and content flow remain the same as the localhost portfolio system.

## Folder to publish

Upload **everything inside this folder** to your GitHub repository root.

Do not upload the old PHP files for GitHub Pages. GitHub Pages cannot run PHP.

## Step 1 — Create Supabase database

1. Open Supabase Dashboard.
2. Create a new project.
3. Go to SQL Editor.
4. Run:

```text
database/supabase_schema.sql
```

5. Then run:

```text
database/seed_data.sql
```

## Step 2 — Create admin user

1. Supabase Dashboard > Authentication > Users.
2. Create a user with your email and password.
3. Copy the created user's UUID.
4. Run this in Supabase SQL Editor:

```sql
insert into public.admin_users (user_id, email)
values ('PASTE-AUTH-USER-ID-HERE', 'your-email@example.com')
on conflict (user_id) do update set email = excluded.email;
```

## Step 3 — Configure frontend Supabase keys

Open:

```text
assets/js/supabase-config.js
```

Paste your Project URL and anon/public key:

```js
window.PORTFOLIO_SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
window.PORTFOLIO_SUPABASE_ANON_KEY = "YOUR-SUPABASE-ANON-PUBLIC-KEY";
```

Never use the Supabase service_role key in frontend code.

## Step 4 — Publish on GitHub Pages

From this folder:

```powershell
git init
git add .
git commit -m "Publish portfolio with Supabase backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Then GitHub:

Settings > Pages > Build and deployment > Deploy from branch > Branch: `main` > Folder: `/root`.

## Main URLs

```text
index.html
about.html
portfolio.html
project.html?slug=ml-anomaly-detection-concept-drift
certifications.html
resume.html
blogs.html
blog.html?slug=technical-creative-portfolio
contact.html
admin/login.html
```

## Admin panel

Open:

```text
/admin/login.html
```

Login with your Supabase Auth admin user.

## Notes

- Public pages can load local JSON fallback data while Supabase is not configured, so you can preview the design.
- Admin and contact saving require Supabase configuration.
- Keep `database/` in the repo if you want a public setup reference, or remove it after deployment if you prefer.
