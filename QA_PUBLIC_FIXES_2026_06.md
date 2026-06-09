# Public QA Fixes — 2026-06

Scope followed: only the issues reported for public performance, mobile project detail layout, 16:9 image previews, blog date saving, and basic site QA were changed.

## Fixed

1. **Mobile project detail layout**
   - Added final CSS overrides so the project detail page becomes one clean column below 992px.
   - Removed the forced 4:1 project/sidebar grid on mobile.
   - Prevented project titles and content from breaking letter-by-letter.
   - Sidebar details now move below the case study content on mobile.

2. **16:9 image ratio across content media**
   - Project cards, blog cards, portfolio previews, project detail hero images, carousel/gallery images and content preview images now use a fixed 16:9 horizontal ratio.
   - Profile image, logo, skill icons, admin previews and certificate/icon-style images were excluded from this global content-media rule.

3. **Blog date error**
   - Admin blog publish date is now rendered as a proper date input.
   - Empty blog date now saves as `null` instead of an empty string, fixing Supabase/Postgres `invalid input syntax for type date: ""`.

4. **Page load improvement**
   - Fixed unnecessary data loading on pages that do not use the homepage hero.
   - Added request caching for repeated CMS table reads during one page load.
   - Changed homepage CMS loading to parallel requests.
   - Added lazy/async image loading to generated project, blog and certificate cards.
   - Project/blog/cert detail hero images use eager loading because they are above-the-fold.
   - Added CDN/Supabase preconnect and DNS prefetch hints.
   - Preloader now hides earlier so the page feels responsive instead of waiting on every external asset.

5. **QA checks performed**
   - JavaScript syntax checked with `node --check` for:
     - `assets/js/supabase-app.js`
     - `assets/js/supabase-admin.js`
   - CSS reviewed for mobile override order so the new mobile project layout wins over earlier conflicting rules.
   - Public live URL was opened for baseline structure before applying fixes.

## Files changed

- `assets/css/system.css`
- `assets/js/supabase-app.js`
- `assets/js/supabase-admin.js`
- `js/main.js`
- Public/admin HTML files: added safe resource hints only.

