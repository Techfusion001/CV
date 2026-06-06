# GitHub Pages + Supabase Publishing Guide

This package contains two versions:

1. `haider_portfolio_system/` root: your PHP/JSON version for XAMPP/cPanel PHP hosting.
2. `github-supabase/`: static GitHub Pages version powered by Supabase database.

GitHub Pages cannot run PHP, so use the `github-supabase` folder for GitHub Pages.

## 1. Create Supabase project

1. Go to Supabase and create a new project.
2. Open SQL Editor.
3. Run `database/supabase_schema.sql`.
4. Run `database/seed_data.sql`.

## 2. Create admin user

1. Supabase Dashboard > Authentication > Users.
2. Create your admin user with email/password.
3. Copy that user's `id`.
4. Run this SQL:

```sql
insert into public.admin_users (user_id, email)
values ('PASTE-AUTH-USER-ID-HERE', 'your@email.com');
```

Do not put your Supabase service role key inside GitHub. Only use the anon/publishable key in browser code.

## 3. Configure static site

Open:

```text
github-supabase/assets/js/supabase-config.js
```

Replace:

```js
window.PORTFOLIO_SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
window.PORTFOLIO_SUPABASE_ANON_KEY = "YOUR-SUPABASE-ANON-PUBLIC-KEY";
```

with your real Supabase project URL and anon key.

## 4. Publish on GitHub Pages

Copy the contents of `github-supabase/` into your GitHub repository root, then run:

```powershell
git init
git add .
git commit -m "Publish portfolio with Supabase backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Then open GitHub:

Settings > Pages > Build and deployment > Deploy from a branch > Branch: `main` > Folder: `/root`.

Your site will be live at:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
```

## 5. Admin panel

After publishing, open:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/admin/
```

Login with the Supabase Auth user you created.

## 6. Media uploads

Use Supabase Storage bucket:

```text
portfolio-media
```

Upload images/videos there. Then paste public URLs into admin fields such as image, hero_image, page_hero_media, etc.

## Notes

- Public visitors can read portfolio data and submit contact messages.
- Only the admin user listed in `public.admin_users` can edit data.
- RLS is enabled on all tables.
