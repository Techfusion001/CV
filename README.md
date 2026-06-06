# Muhammad Haider Abbas Portfolio System

A professional portfolio website with frontend pages and a lightweight PHP backend/admin panel.

## What is included

- Responsive frontend portfolio website
- Three-column portfolio grid
- Project detail pages
- Blog and blog detail pages
- Certifications page
- Resume page
- Contact form
- Admin login
- Admin dashboard
- Add/edit/delete projects
- Add/edit/delete blogs
- Edit certifications
- View contact messages
- JSON data storage
- Upload support for project/blog images

## How to run locally

1. Install XAMPP or any PHP server.
2. Copy this folder into `htdocs`.
3. Open:

```text
http://localhost/haider_portfolio_system/
```

4. Admin panel:

```text
http://localhost/haider_portfolio_system/admin/login.php
```

Default admin login:

```text
Username: haider
Password: portfolio2026
```

Change the password in:

```text
includes/config.php
```

## Hosting

This version needs PHP, so use cPanel/PHP hosting, XAMPP, Hostinger, InfinityFree PHP hosting, or similar.

GitHub Pages will only run static HTML/CSS/JS and will not run the PHP backend. For GitHub Pages, export static pages only.

## Important privacy note

Phone number is intentionally not displayed publicly. The contact page uses email and a contact form.

## v2 polish update
- Hero/profile picture is editable from `admin/settings.php`.
- About title/content/highlight are editable from `admin/settings.php`.
- Skills are editable with image upload from `admin/skills.php`.
- Certifications now support editable uploaded images from `admin/certs.php`.
- Resume page has two columns: left experience, right education.
