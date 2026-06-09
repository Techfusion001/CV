# Admin UI Upgrade Changelog

Completed upgrade items:

1. Added a **Download General CV** button to the homepage hero section using `CV_File/MuhammadHaiderAbbasCV.pdf`.
2. Applied sharp futuristic edges across the public site and admin panel.
3. Added a new **Categories** admin page.
4. Added category dropdown support for portfolio projects, blogs, certifications, core skills, experience and education.
5. Updated the portfolio project form so project category is selected from the Portfolio category dropdown.
6. Converted the Settings admin page into a direct-update panel without the separate edit/list table.
7. Upgraded the admin dashboard with a professional control-room layout, hover states, live-style data tiles, charts and a world traffic map.
8. Added the uploaded world map image as `assets/img-world-traffic-map.png`.
9. Added Supabase schema additions for the `categories` table and category columns on relevant tables.

Files mainly changed:

- `assets/js/supabase-app.js`
- `assets/js/supabase-admin.js`
- `assets/js/seed-data.js`
- `assets/css/system.css`
- `data/categories.json`
- `data/certs.json`
- `data/skills.json`
- `data/experience.json`
- `data/education.json`
- `database/00_RUN_THIS_FIRST_COMPLETE_SCHEMA.sql`
- `database/EMERGENCY_FIX_MISSING_TABLES.sql`
