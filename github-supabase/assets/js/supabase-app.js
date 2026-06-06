
const SB = window.supabase.createClient(window.PORTFOLIO_SUPABASE_URL, window.PORTFOLIO_SUPABASE_ANON_KEY);
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const params = new URLSearchParams(location.search);
const esc = (v='') => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const media = (src) => src || 'assets/svg/home-about-visual.svg';

async function getTable(table, order='sort_order') {
  const { data, error } = await SB.from(table).select('*').order(order, { ascending: true });
  if (error) { console.error(error); return []; }
  return data || [];
}
async function getSingle(table, col, value) {
  const { data, error } = await SB.from(table).select('*').eq(col, value).maybeSingle();
  if (error) { console.error(error); return null; }
  return data;
}

function projectCard(p) {
  return `<article class="project-card premium-project-card reveal"><img src="${esc(media(p.image))}" alt="${esc(p.title)}"><div><span class="tag">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><a class="details" href="project.html?slug=${esc(p.slug)}">View Details →</a></div></article>`;
}
function blogCard(b) {
  return `<article class="blog-card reveal"><a class="blog-image" href="blog.html?slug=${esc(b.slug)}"><img src="${esc(media(b.image))}" alt="${esc(b.title)}"></a><div class="blog-card-body"><span class="tag">${esc(b.category)} • ${esc(b.publish_date || '')}</span><h3><a href="blog.html?slug=${esc(b.slug)}">${esc(b.title)}</a></h3><p>${esc(b.summary)}</p><a class="details" href="blog.html?slug=${esc(b.slug)}">Read Article →</a></div></article>`;
}
function resumeItem(x) {
  const years = [x.start_year, x.end_year].filter(Boolean).join(' - ') || x.period || '';
  return `<article class="classic-resume-item"><div class="classic-year">${esc(years)}</div><div class="classic-place">${esc(x.place)}</div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p></article>`;
}
function skillBar(s) {
  return `<div class="classic-skill"><div class="skill-title-row"><h3>${esc(s.title)}</h3><span>${esc(s.percent)}%</span></div><div class="skill-track"><i style="width:${esc(s.percent)}%"></i></div></div>`;
}

async function initHome() {
  if (!$('#homeProjects')) return;
  const settings = await getSingle('site_settings','id',1);
  if (settings) {
    $('#homeHeroImage').src = media(settings.hero_image);
    $('#homeAboutImage').src = media(settings.home_about_image);
    $('#heroBadge').textContent = settings.hero_badge || 'AI • Cyber • Web • Game • VFX';
    $('#aboutTitle').textContent = settings.about_title || '';
    $('#aboutContent').textContent = settings.about_content || '';
    $('#aboutHighlight').textContent = settings.about_highlight || '';
  }
  const projects = await getTable('projects');
  $('#homeProjects').innerHTML = projects.slice(0,3).map(projectCard).join('');
  const skills = await getTable('skills');
  $('#homeSkills').innerHTML = skills.map(s => `<article class="skill-card"><img src="${esc(media(s.image))}" alt="${esc(s.title)}"><div><strong>${esc(s.title)}</strong><span>${esc(s.summary)}</span></div></article>`).join('');
}

async function initPortfolio() {
  if (!$('#portfolioGrid')) return;
  const projects = await getTable('projects');
  const cats = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  $('#filters').innerHTML = cats.map(c => `<a href="#" data-cat="${esc(c)}" class="${c==='All'?'active':''}">${esc(c)}</a>`).join('');
  function render(cat='All') {
    $('#portfolioGrid').innerHTML = projects.filter(p => cat==='All' || p.category===cat).map(projectCard).join('');
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
  const project = await getSingle('projects','slug',slug);
  if (!project) { $('#projectHero').innerHTML = '<div class="hero-card"><h1>Project not found</h1></div>'; return; }
  const c = project.content || {};
  $('#projectHero').innerHTML = `<div class="hero-media-shell"><video class="bg-media" autoplay muted loop playsinline src="assets/videos/hero-background.mp4"></video><div class="video-overlay" style="--overlay-opacity:.50"></div></div><div class="hero-card detail-hero-card"><p class="eyebrow">${esc(project.category)}</p><h1>${esc(project.title)}</h1><p>${esc(project.summary)}</p></div>`;
  $('#projectArticle').innerHTML = `<h2>Overview</h2><p>${esc(c.overview || '')}</p><h2>Problem</h2><p>${esc(c.problem || '')}</p><h2>Solution</h2><p>${esc(c.solution || '')}</p><h2>Key Features</h2><ul>${(c.features || []).map(f=>`<li>${esc(f)}</li>`).join('')}</ul><h2>Outcome</h2><p>${esc(c.outcome || '')}</p><h2>Future Improvements</h2><p>${esc(c.future || '')}</p>`;
  const tools = String(project.tools || '').split(',').map(x=>x.trim()).filter(Boolean);
  $('#projectInfo').innerHTML = `<h3>Project Info</h3><p><strong>Type:</strong> ${esc(project.category)}</p><p><strong>Status:</strong> ${esc(project.status)}</p><p><strong>Role:</strong> ${esc(project.role)}</p><p><strong>Year:</strong> ${esc(project.year)}</p><div class="detail-tool-block"><strong>Tools:</strong><div class="inline-tool-list">${tools.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div><a class="btn primary" href="portfolio.html">Back to Portfolio</a>`;
  const projects = await getTable('projects');
  $('#relatedProjects').innerHTML = projects.filter(p => p.slug !== slug).slice(0,3).map(projectCard).join('');
}

async function initBlogs() {
  if (!$('#blogsGrid')) return;
  const blogs = await getTable('blogs');
  $('#blogsGrid').innerHTML = blogs.map(blogCard).join('');
}

async function initBlog() {
  if (!$('#blogHero')) return;
  const slug = params.get('slug');
  const b = await getSingle('blogs','slug',slug);
  if (!b) { $('#blogHero').innerHTML = '<div class="hero-card"><h1>Blog not found</h1></div>'; return; }
  $('#blogHero').innerHTML = `<div class="hero-media-shell"><video class="bg-media" autoplay muted loop playsinline src="assets/videos/hero-background.mp4"></video><div class="video-overlay" style="--overlay-opacity:.50"></div></div><div class="hero-card detail-hero-card"><p class="eyebrow">${esc(b.category)} • ${esc(b.publish_date || '')}</p><h1>${esc(b.title)}</h1><p>${esc(b.summary)}</p></div>`;
  $('#blogArticle').innerHTML = `<img class="article-featured-image" src="${esc(media(b.image))}" alt="${esc(b.title)}"><div class="article-meta-row"><span>Published: ${esc(b.publish_date || '')}</span><span>Category: ${esc(b.category)}</span><span>By ${esc(b.author || 'Muhammad Haider Abbas')}</span></div><h2>${esc(b.title)}</h2><p class="lead">${esc(b.summary)}</p><p>${esc(b.content).replaceAll('\\n','<br>')}</p>`;
  const blogs = await getTable('blogs');
  const related = blogs.filter(x => x.slug !== slug);
  $('#blogInfo').innerHTML = `<h3>Blog Info</h3><p><strong>Published:</strong> ${esc(b.publish_date || '')}</p><p><strong>Category:</strong> ${esc(b.category)}</p><p><strong>Author:</strong> ${esc(b.author || 'Muhammad Haider Abbas')}</p><div class="sidebar-recommend"><h4>Recommended Blogs</h4>${related.slice(0,4).map(x=>`<a class="small-recommend-card" href="blog.html?slug=${esc(x.slug)}"><img src="${esc(media(x.image))}" alt=""><span>${esc(x.title)}</span></a>`).join('')}</div><a class="btn primary" href="blogs.html">Back to Blogs</a>`;
  $('#relatedBlogs').innerHTML = related.slice(0,3).map(blogCard).join('');
}

async function initCerts() {
  if (!$('#certGrid')) return;
  const certs = await getTable('certifications');
  $('#certGrid').innerHTML = certs.map(c => `<article class="cert-card reveal"><img class="cert-image" src="${esc(media(c.image))}" alt="${esc(c.title)}"><h3>${esc(c.title)}</h3><div class="cert-meta"><span><strong>From:</strong> ${esc(c.issuer)}</span><span><strong>Completed:</strong> ${esc(c.completion_date)}</span></div><p>${esc(c.summary)}</p></article>`).join('');
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
    const { error } = await SB.from('messages').insert(payload);
    $('#contactStatus').innerHTML = error ? `<div class="error">${esc(error.message)}</div>` : `<div class="success">Message sent successfully.</div>`;
    if (!error) e.target.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHome(); initPortfolio(); initProject(); initBlogs(); initBlog(); initCerts(); initResume(); initContact();
});
