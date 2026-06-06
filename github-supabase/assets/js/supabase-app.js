/* GitHub Pages + Supabase frontend
   Safe on both localhost/static preview and deployed GitHub Pages.
   If Supabase config is missing/wrong, it falls back to bundled /data JSON so the site never looks broken. */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const params = new URLSearchParams(location.search);
  const esc = (v = '') => String(v ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const isAdminPage = location.pathname.includes('/admin/');
  const basePrefix = isAdminPage ? '../' : '';
  const media = (src) => {
    if (!src) return basePrefix + 'assets/svg/home-about-visual.svg';
    if (/^(https?:|data:|blob:)/i.test(src)) return src;
    return basePrefix + String(src).replace(/^\.\//, '');
  };

  let SB = null;
  const hasValidConfig = () => {
    const url = window.PORTFOLIO_SUPABASE_URL || '';
    const key = window.PORTFOLIO_SUPABASE_ANON_KEY || '';
    return window.supabase && /^https:\/\/[^\s]+\.supabase\.co\/?$/i.test(url) && key && !key.includes('YOUR-') && key.length > 30;
  };
  try {
    if (hasValidConfig()) SB = window.supabase.createClient(window.PORTFOLIO_SUPABASE_URL, window.PORTFOLIO_SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn('Supabase client could not start. Using local JSON fallback.', err);
    SB = null;
  }

  const jsonMap = {
    projects: 'projects.json',
    blogs: 'blogs.json',
    certifications: 'certs.json',
    skills: 'skills.json',
    experience: 'experience.json',
    education: 'education.json',
    design_skills: 'design_skills.json',
    coding_skills: 'coding_skills.json',
    site_settings: 'settings.json'
  };

  async function getJson(table) {
    const file = jsonMap[table];
    if (!file) return [];
    try {
      const res = await fetch(`${basePrefix}data/${file}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = await res.json();
      if (table === 'site_settings') return [{ id: 1, ...json }];
      return Array.isArray(json) ? json.map((row, i) => ({ sort_order: i + 1, ...row })) : [];
    } catch (err) {
      console.warn(`Local fallback failed for ${table}`, err);
      return table === 'site_settings' ? [{ id: 1 }] : [];
    }
  }

  function normalizeBlog(b) {
    return { ...b, publish_date: b.publish_date || b.date || '' };
  }
  function normalizeCert(c) {
    return { ...c, slug: c.slug || String(c.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') };
  }
  function normalizeRows(table, rows) {
    const mapped = (rows || []).map(r => table === 'blogs' ? normalizeBlog(r) : table === 'certifications' ? normalizeCert(r) : r);
    return mapped.sort((a, b) => (Number(a.sort_order ?? 9999) - Number(b.sort_order ?? 9999)) || String(b.created_at || '').localeCompare(String(a.created_at || '')));
  }

  async function getTable(table) {
    if (SB) {
      let query = SB.from(table).select('*');
      if (table === 'blogs') query = query.eq('is_published', true);
      query = query.order('sort_order', { ascending: true, nullsFirst: false });
      const { data, error } = await query;
      if (!error && data) return normalizeRows(table, data);
      console.warn(`Supabase read failed for ${table}. Using local JSON fallback.`, error);
    }
    return normalizeRows(table, await getJson(table));
  }

  async function getSingle(table, col, value) {
    if (!value && table !== 'site_settings') return null;
    if (SB) {
      let query = SB.from(table).select('*').eq(col, value).maybeSingle();
      if (table === 'site_settings') query = SB.from(table).select('*').eq('id', 1).maybeSingle();
      const { data, error } = await query;
      if (!error && data) return normalizeRows(table, [data])[0];
      if (error) console.warn(`Supabase single read failed for ${table}. Using local JSON fallback.`, error);
    }
    const rows = await getTable(table);
    return table === 'site_settings' ? (rows[0] || null) : (rows.find(x => String(x[col]) === String(value)) || null);
  }

  function emptyState(title, message) {
    return `<div class="empty-state"><h3>${esc(title)}</h3><p>${esc(message)}</p></div>`;
  }
  function projectCard(p) {
    return `<article class="project-card premium-project-card reveal"><img src="${esc(media(p.image))}" alt="${esc(p.title)}"><div><span class="tag">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><a class="details" href="project.html?slug=${encodeURIComponent(p.slug || '')}">View Details →</a></div></article>`;
  }
  function blogCard(b) {
    return `<article class="blog-card reveal"><a class="blog-image" href="blog.html?slug=${encodeURIComponent(b.slug || '')}"><img src="${esc(media(b.image))}" alt="${esc(b.title)}"></a><div class="blog-card-body"><span class="tag">${esc(b.category)} • ${esc(b.publish_date || '')}</span><h3><a href="blog.html?slug=${encodeURIComponent(b.slug || '')}">${esc(b.title)}</a></h3><p>${esc(b.summary)}</p><a class="details" href="blog.html?slug=${encodeURIComponent(b.slug || '')}">Read Article →</a></div></article>`;
  }
  function resumeItem(x) {
    const years = [x.start_year, x.end_year].filter(Boolean).join(' - ') || x.period || '';
    return `<article class="classic-resume-item"><div class="classic-year">${esc(years)}</div><div class="classic-place">${esc(x.place)}</div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p></article>`;
  }
  function skillBar(s) {
    const percent = Math.max(0, Math.min(100, Number(s.percent || 0)));
    return `<div class="classic-skill"><div class="skill-title-row"><h3>${esc(s.title)}</h3><span>${percent}%</span></div><div class="skill-track"><i style="width:${percent}%"></i></div></div>`;
  }

  async function initHome() {
    if (!$('#homeProjects')) return;
    const settings = await getSingle('site_settings', 'id', 1);
    if (settings) {
      if ($('#homeHeroImage')) $('#homeHeroImage').src = media(settings.hero_image);
      if ($('#homeAboutImage')) $('#homeAboutImage').src = media(settings.home_about_image || settings.about_image);
      if ($('#heroBadge')) $('#heroBadge').textContent = settings.hero_badge || 'AI • Cyber • Web • Game • VFX';
      if ($('#aboutTitle')) $('#aboutTitle').textContent = settings.about_title || '';
      if ($('#aboutContent')) $('#aboutContent').textContent = settings.about_content || '';
      if ($('#aboutHighlight')) $('#aboutHighlight').textContent = settings.about_highlight || '';
    }
    const projects = await getTable('projects');
    $('#homeProjects').innerHTML = projects.length ? projects.slice(0, 3).map(projectCard).join('') : emptyState('No projects found', 'Add projects in Supabase or keep the bundled data folder published.');
    const skills = await getTable('skills');
    if ($('#homeSkills')) $('#homeSkills').innerHTML = skills.map(s => `<article class="skill-card"><img src="${esc(media(s.image))}" alt="${esc(s.title)}"><div><strong>${esc(s.title)}</strong><span>${esc(s.summary)}</span></div></article>`).join('');
  }

  async function initPortfolio() {
    if (!$('#portfolioGrid')) return;
    const projects = await getTable('projects');
    const cats = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
    $('#filters').innerHTML = cats.map(c => `<a href="#" data-cat="${esc(c)}" class="${c === 'All' ? 'active' : ''}">${esc(c)}</a>`).join('');
    function render(cat = 'All') {
      const filtered = projects.filter(p => cat === 'All' || p.category === cat);
      $('#portfolioGrid').innerHTML = filtered.length ? filtered.map(projectCard).join('') : emptyState('No projects found', 'No records match this category.');
    }
    $('#filters').addEventListener('click', e => {
      if (e.target.dataset.cat) {
        e.preventDefault();
        $$('#filters a').forEach(a => a.classList.remove('active'));
        e.target.classList.add('active');
        render(e.target.dataset.cat);
      }
    });
    render();
  }

  async function initProject() {
    if (!$('#projectHero')) return;
    const slug = params.get('slug');
    const project = await getSingle('projects', 'slug', slug);
    if (!project) { $('#projectHero').innerHTML = '<div class="hero-card"><h1>Project not found</h1><p>Please open it again from the portfolio page.</p></div>'; return; }
    const c = typeof project.content === 'string' ? safeJson(project.content) : (project.content || {});
    $('#projectHero').innerHTML = `<div class="hero-media-shell"><video class="bg-media" autoplay muted loop playsinline src="${esc(media('assets/videos/hero-background.mp4'))}"></video><div class="video-overlay" style="--overlay-opacity:.50"></div></div><div class="hero-card detail-hero-card"><p class="eyebrow">${esc(project.category)}</p><h1>${esc(project.title)}</h1><p>${esc(project.summary)}</p></div>`;
    $('#projectArticle').innerHTML = `<h2>Overview</h2><p>${esc(c.overview || '')}</p><h2>Problem</h2><p>${esc(c.problem || '')}</p><h2>Solution</h2><p>${esc(c.solution || '')}</p><h2>Key Features</h2><ul>${(c.features || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul><h2>Outcome</h2><p>${esc(c.outcome || '')}</p><h2>Future Improvements</h2><p>${esc(c.future || '')}</p>`;
    const tools = String(project.tools || '').split(',').map(x => x.trim()).filter(Boolean);
    $('#projectInfo').innerHTML = `<h3>Project Info</h3><p><strong>Type:</strong> ${esc(project.category)}</p><p><strong>Status:</strong> ${esc(project.status)}</p><p><strong>Role:</strong> ${esc(project.role)}</p><p><strong>Year:</strong> ${esc(project.year)}</p><div class="detail-tool-block"><strong>Tools:</strong><div class="inline-tool-list">${tools.map(t => `<span>${esc(t)}</span>`).join('')}</div></div><a class="btn primary" href="portfolio.html">Back to Portfolio</a>`;
    const projects = await getTable('projects');
    $('#relatedProjects').innerHTML = projects.filter(p => p.slug !== slug).slice(0, 3).map(projectCard).join('');
  }

  function safeJson(str) { try { return JSON.parse(str); } catch { return {}; } }

  async function initBlogs() {
    if (!$('#blogsGrid')) return;
    const blogs = await getTable('blogs');
    $('#blogsGrid').innerHTML = blogs.length ? blogs.map(blogCard).join('') : emptyState('No blogs found', 'Add blogs in Supabase or publish the bundled data folder.');
  }

  async function initBlog() {
    if (!$('#blogHero')) return;
    const slug = params.get('slug');
    const b = await getSingle('blogs', 'slug', slug);
    if (!b) { $('#blogHero').innerHTML = '<div class="hero-card"><h1>Blog not found</h1><p>Please open it again from the blog page.</p></div>'; return; }
    $('#blogHero').innerHTML = `<div class="hero-media-shell"><video class="bg-media" autoplay muted loop playsinline src="${esc(media('assets/videos/hero-background.mp4'))}"></video><div class="video-overlay" style="--overlay-opacity:.50"></div></div><div class="hero-card detail-hero-card"><p class="eyebrow">${esc(b.category)} • ${esc(b.publish_date || '')}</p><h1>${esc(b.title)}</h1><p>${esc(b.summary)}</p></div>`;
    $('#blogArticle').innerHTML = `<img class="article-featured-image" src="${esc(media(b.image))}" alt="${esc(b.title)}"><div class="article-meta-row"><span>Published: ${esc(b.publish_date || '')}</span><span>Category: ${esc(b.category)}</span><span>By ${esc(b.author || 'Muhammad Haider Abbas')}</span></div><h2>${esc(b.title)}</h2><p class="lead">${esc(b.summary)}</p><p>${esc(b.content).replaceAll('\n', '<br>')}</p>`;
    const blogs = await getTable('blogs');
    const related = blogs.filter(x => x.slug !== slug);
    $('#blogInfo').innerHTML = `<h3>Blog Info</h3><p><strong>Published:</strong> ${esc(b.publish_date || '')}</p><p><strong>Category:</strong> ${esc(b.category)}</p><p><strong>Author:</strong> ${esc(b.author || 'Muhammad Haider Abbas')}</p><div class="sidebar-recommend"><h4>Recommended Blogs</h4>${related.slice(0, 4).map(x => `<a class="small-recommend-card" href="blog.html?slug=${encodeURIComponent(x.slug || '')}"><img src="${esc(media(x.image))}" alt=""><span>${esc(x.title)}</span></a>`).join('')}</div><a class="btn primary" href="blogs.html">Back to Blogs</a>`;
    $('#relatedBlogs').innerHTML = related.slice(0, 3).map(blogCard).join('');
  }

  async function initCerts() {
    if (!$('#certGrid')) return;
    const certs = await getTable('certifications');
    $('#certGrid').innerHTML = certs.length ? certs.map(c => `<article class="cert-card reveal"><img class="cert-image" src="${esc(media(c.image))}" alt="${esc(c.title)}"><h3>${esc(c.title)}</h3><div class="cert-meta"><span><strong>From:</strong> ${esc(c.issuer)}</span><span><strong>Completed:</strong> ${esc(c.completion_date)}</span></div><p>${esc(c.summary)}</p></article>`).join('') : emptyState('No certifications found', 'Add certifications in Supabase or publish the bundled data folder.');
  }

  async function initResume() {
    if (!$('#educationList')) return;
    $('#educationList').innerHTML = (await getTable('education')).map(resumeItem).join('');
    $('#experienceList').innerHTML = (await getTable('experience')).map(resumeItem).join('');
    $('#designSkills').innerHTML = (await getTable('design_skills')).map(skillBar).join('');
    $('#codingSkills').innerHTML = (await getTable('coding_skills')).map(skillBar).join('');
  }

  async function initContact() {
    if (!$('#contactForm')) return;
    $('#contactForm').addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = Object.fromEntries(fd.entries());
      if (!SB) {
        $('#contactStatus').innerHTML = `<div class="error">Supabase is not connected yet. Add your URL and anon key in assets/js/supabase-config.js.</div>`;
        return;
      }
      const { error } = await SB.from('messages').insert(payload);
      $('#contactStatus').innerHTML = error ? `<div class="error">${esc(error.message)}</div>` : `<div class="success">Message sent successfully.</div>`;
      if (!error) e.target.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHome(); initPortfolio(); initProject(); initBlogs(); initBlog(); initCerts(); initResume(); initContact();
  });
})();
