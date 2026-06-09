# Haider Abbas Personal Portfolio — Complete Working System

This is one clean project built around the original `Personal_Portfolio.zip` theme only. There are no extra side themes, no template-switch buttons, and no separated secondary website folder.

## Included

- Main website: `index.html`, `resume.html`, `portfolio.html`, `project.html`, `blogs.html`, `blog.html`, `certs.html`, `contact.html`
- Admin panel: `admin/index.html`
- Supabase-ready backend integration for projects, blogs, certifications, skills, education, experience, settings, and contact messages
- Local/demo fallback mode so the website opens immediately even before Supabase keys are added
- Original Personal Portfolio styling preserved, with small professional extensions in `assets/css/system.css`

## Run locally

Open `index.html` directly, or use a local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Admin demo login

Open `admin/index.html`.

- Password: `admin123`

In demo mode, changes are stored in browser/local fallback. For real live backend, configure Supabase.

## Supabase setup

1. Create a Supabase project.
2. Open Supabase SQL editor.
3. Run `database/supabase_schema.sql`.
4. Run `database/seed_data.sql`.
5. Create an Auth user for your admin email in Supabase Authentication.
6. In SQL editor, run:

```sql
insert into admin_users(email) values ('YOUR_ADMIN_EMAIL');
```

7. Edit `assets/js/supabase-config.js`:

```js
window.PORTFOLIO_SUPABASE = {
  url: 'YOUR_SUPABASE_PROJECT_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY',
  adminEmail: 'YOUR_ADMIN_EMAIL',
  demoPassword: 'admin123'
};
```

Now frontend reads from Supabase, contact form writes messages to Supabase, and admin manages the whole website.

## Notes

This is a static frontend + Supabase backend system. Never put Supabase service-role keys in frontend files. Use only the anon public key and keep Row Level Security enabled.
