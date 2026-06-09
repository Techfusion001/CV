# START HERE — Haider Portfolio CMS

1. Open the website locally from `index.html` to see demo/fallback data.
2. For live Supabase, open `assets/js/supabase-config.js` and add:
   - Supabase Project URL
   - Supabase anon public key
3. In Supabase SQL Editor, run:
   - `database/00_RUN_THIS_FIRST_COMPLETE_SCHEMA.sql`
4. Create a Supabase Auth user for admin login.
5. Add that admin email:

```sql
insert into public.admin_users(email)
values ('your-email@example.com')
on conflict (email) do nothing;
notify pgrst, 'reload schema';
```

6. Open `admin/index.html`, login, and manage Projects, Blogs, Certifications, Skills, Resume, Settings and Messages.

This package is one single Personal_Portfolio themed system. No side theme pages or linked second website system are included.
