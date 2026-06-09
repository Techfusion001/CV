# Professional UI Upgrade Changelog

## Completed changes

1. Homepage skills
- Merged Core Skills and More Skills into one Core Skills section.
- Added a strict 3-column x 2-row skill grid with equal card sizing.
- Removed the More Skills heading from the frontend renderer.

2. Hero panel lower block
- Converted the plain stats section into graphic/cinematic cards with accent borders, animated diamond highlights and sharper futuristic edges.

3. Resume page
- Reworked Education and Experience into a single-line timeline style with dots for each entry.
- Removed heavy boxed timeline cards and replaced them with sharp divider lines.

4. Design & coding skills
- Removed bold styling from skill titles for a cleaner professional look.

5. Portfolio page
- Added category filter buttons so recruiters/companies can filter projects by skill/category.

6. Portfolio detail page
- Rebuilt the detail page into an 80/20 layout.
- Main 80% section contains description, overview, problem, solution, features, outcome and next improvements.
- Right 20% sidebar contains year, category, role, status, tools and a documentation download button.
- Sidebar uses sticky positioning and remains visible while scrolling.
- Added a top category slider with transparent professional buttons.
- Added downloadable documentation files for every project inside `/docs`.

7. Certifications
- Certification grid is now fixed to 3 columns per row on desktop.
- Certification cards link to a new detail page: `cert.html?slug=...`.
- Each certificate has a professional detail overview: what was learnt, business/company value and practical use.

8. Footer
- Footer is now full browser width, not trapped inside the inner content container.

9. Theme polish
- Kept the existing dark theme and blue accent.
- Reduced rounded corners into sharper futuristic edges.
- Added clean hover motion, cinematic image frames and more professional spacing.
