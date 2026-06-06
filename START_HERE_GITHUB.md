# START HERE — GitHub Pages + Supabase Version

This folder is the correct version for GitHub Pages.

GitHub Pages does **not** run PHP, so this project uses:

- HTML pages
- CSS styling
- JavaScript frontend logic
- Supabase database/API

## What to upload to GitHub

Upload everything in this folder to your GitHub repository root:

```text
index.html
portfolio.html
project.html
blogs.html
blog.html
certifications.html
resume.html
contact.html
admin/
assets/
data/
_supabase/
.nojekyll
```

Do not upload the old PHP files for GitHub Pages.

## Step 1 — Supabase database

Open Supabase > SQL Editor and run these files in this order:

```text
_supabase/01_supabase_schema.sql
_supabase/02_seed_data.sql
```

## Step 2 — Create admin login

In Supabase:

1. Go to Authentication > Users.
2. Create your admin email/password.
3. Copy the user's Auth ID.
4. Run this SQL, replacing both values:

```sql
insert into public.admin_users (user_id, email)
values ('PASTE-AUTH-USER-ID-HERE', 'your@email.com');
```

## Step 3 — Connect website to Supabase

Open:

```text
assets/js/supabase-config.js
```

Replace the placeholder values:

```js
window.PORTFOLIO_SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
window.PORTFOLIO_SUPABASE_ANON_KEY = "YOUR-SUPABASE-ANON-PUBLIC-KEY";
```

Use the values from:

```text
Supabase > Project Settings > API
```

Use only the anon/public key. Never put the service-role key in GitHub.

## Step 4 — Publish on GitHub Pages

From VS Code terminal inside this folder:

```powershell
git init
git add .
git commit -m "Publish portfolio GitHub Pages Supabase version"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Then in GitHub:

```text
Repository > Settings > Pages > Deploy from branch > main > /root
```

Your site will be:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
```

Admin panel:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/admin/
```

## Important notes

- The site includes local JSON fallback data in `/data`, so it still displays content if Supabase is not connected yet.
- The contact form and admin panel require Supabase config to be correct.
- Store uploaded images/videos in Supabase Storage or keep local files inside `assets/`.
