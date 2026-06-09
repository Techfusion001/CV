# Senior Fix Build - Single Supabase Portfolio System

This build keeps only the Personal_Portfolio theme and turns it into one CMS-driven portfolio system.

## Fixed in this version

- Removed the broken design/coding skill `slug` insert issue.
- Added certifications fallback + seed workflow so certificates appear on frontend and admin.
- Added image live preview in Admin for every image field.
- Added image selector/media library in Admin using existing project images, SVGs and certificate images.
- Added local image upload preview. Uploaded images are saved as data URLs in the field, so they preview immediately.
- Added `Seed Missing Demo Data` button in Admin to push missing default records to Supabase.
- Added animated hero role text.
- Fixed hero primary button color contrast.
- Added footer across all frontend pages.
- Reworked Core Skills into circular icon cards matching the reference style but using the portfolio dark theme.
- Added `database/upgrade_fix_existing_supabase.sql` for older Supabase projects.
- Added embedded `assets/js/seed-data.js` so demo data still appears even when local JSON fetch is blocked.

## Important Supabase step

If you already ran the older schema and got this error:

`Could not find the 'slug' column of 'design_skills' in the schema cache`

then replace the site files with this build first. The JavaScript no longer sends `slug` to `design_skills` or `coding_skills`.

Then run:

`database/upgrade_fix_existing_supabase.sql`

If your Supabase tables are empty, open:

`admin/index.html`

and click:

`Seed Missing Demo Data`

This will insert missing projects, blogs, certifications, skills, education and experience into Supabase.

## Admin

Local/demo password:

`admin123`

For live Supabase, create a Supabase Auth user and insert the same email into `admin_users`:

```sql
insert into admin_users(email) values ('your-email@example.com') on conflict (email) do nothing;
```
