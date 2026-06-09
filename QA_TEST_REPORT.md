# QA Test Report — Personal_Portfolio_SINGLE_SUPABASE_SYSTEM_FINAL_QA

I audited the project as a single Personal_Portfolio themed CMS system.

## Checks completed

- ZIP extracted successfully.
- No merged/side-theme folder remains.
- Frontend pages present: `index.html`, `resume.html`, `portfolio.html`, `project.html`, `blogs.html`, `blog.html`, `certs.html`, `contact.html`.
- Admin page present: `admin/index.html`.
- All local CSS/JS/image/PDF links inside HTML resolve correctly.
- JavaScript syntax checked with Node for:
  - `assets/js/supabase-app.js`
  - `assets/js/supabase-admin.js`
  - `assets/js/seed-data.js`
- Demo seed data parses correctly:
  - 14 projects
  - 3 blogs
  - 6 certifications
  - 6 core skills
  - 5 experience records
  - 2 education records
  - 5 design skills
  - 5 coding skills
- Supabase table usage checked against schema.
- `public.settings` table is now included in all main schema repair files.
- `design_skills` and `coding_skills` do not use a `slug` column in the schema or admin fields.
- Admin image fields include path input, media selector and live preview.
- Frontend footer is generated across frontend pages.
- Hero role animation remains enabled.
- Button contrast was polished to avoid mixed/unclear CTA color.

## Important Supabase setup

Run this file first in Supabase SQL Editor:

`database/00_RUN_THIS_FIRST_COMPLETE_SCHEMA.sql`

Then create your Supabase Auth admin user and add the same email to `public.admin_users`:

```sql
insert into public.admin_users(email)
values ('your-email@example.com')
on conflict (email) do nothing;
notify pgrst, 'reload schema';
```

After that, open admin and click `Seed Missing Demo Data` only if the live database is empty.
