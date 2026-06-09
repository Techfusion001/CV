(function(){
  const cfg=window.PORTFOLIO_SUPABASE||{};
  const hasSupabase=!!(cfg.url&&cfg.anonKey&&window.supabase&&!String(cfg.url).includes('YOUR_'));
  const client=hasSupabase?window.supabase.createClient(cfg.url,cfg.anonKey):null;
  const fallbackCache={};
  const tables=['projects','blogs','certs','skills','experience','education','design_skills','coding_skills','settings','messages'];
  const slugTables=new Set(['projects','blogs','experience','education']);
  const imageFields=new Set(['image','hero_image','about_image','page_hero_media','cta_media','home_about_image']);
  const dataBase=location.pathname.includes('/admin/')?'../data/':'data/';
  const esc=(s)=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
  const rich=(s)=>{ const t=document.createElement('template'); t.innerHTML=String(s??''); t.content.querySelectorAll('script,iframe,object,embed,style').forEach(n=>n.remove()); t.content.querySelectorAll('*').forEach(n=>{ [...n.attributes].forEach(a=>{ if(/^on/i.test(a.name)) n.removeAttribute(a.name); }); }); return t.innerHTML; };
  const recordVisit=()=>{ try{ const k='portfolio_traffic_events'; const arr=JSON.parse(localStorage.getItem(k)||'[]'); arr.push({path:location.pathname.split('/').pop()||'index.html',ts:new Date().toISOString()}); localStorage.setItem(k,JSON.stringify(arr.slice(-1000))); }catch(e){} };
  recordVisit();
  const slugify=s=>String(s||'item').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||('item-'+Date.now());
  const normalizeArray=v=>Array.isArray(v)?v:(v?String(v).split(',').map(x=>x.trim()).filter(Boolean):[]);
  const isMissingTable=e=>!!(e&&(e.code==='42P01'||/schema cache|Could not find the table|does not exist/i.test(e.message||'')));
  const missingTableMessage=table=>`Supabase table missing or schema cache not refreshed: ${table}. Run database/00_RUN_THIS_FIRST_COMPLETE_SCHEMA.sql in Supabase SQL Editor, wait 20 seconds, then refresh.`;
  async function fallback(table){
    const ls=localStorage.getItem('portfolio_'+table);
    if(ls){ try{ fallbackCache[table]=JSON.parse(ls); return fallbackCache[table]; }catch(e){} }
    if(fallbackCache[table]) return fallbackCache[table];
    if(window.PORTFOLIO_DEMO_DATA && Object.prototype.hasOwnProperty.call(window.PORTFOLIO_DEMO_DATA, table)){ fallbackCache[table]=JSON.parse(JSON.stringify(window.PORTFOLIO_DEMO_DATA[table])); return fallbackCache[table]; }
    try{ const res=await fetch(`${dataBase}${table}.json`,{cache:'no-store'}); const data=await res.json(); fallbackCache[table]=data; return data; }
    catch(e){ fallbackCache[table]=table==='settings'?{}:[]; return fallbackCache[table]; }
  }
  async function get(table){
    if(client){
      let q=client.from(table).select('*');
      if(['projects','blogs','certs','skills','experience','education','design_skills','coding_skills'].includes(table)) q=q.order('created_at',{ascending:false});
      const {data,error}=await q;
      if(!error&&data){
        if(table==='settings') return data[0]||await fallback(table);
        if(Array.isArray(data)&&data.length) return data;
        if(['projects','blogs','certs','skills','experience','education','design_skills','coding_skills'].includes(table)) return await fallback(table);
        return data;
      }
      console.warn('Supabase fallback for',table,error); if(isMissingTable(error)){ console.warn(missingTableMessage(table)); }
    }
    return fallback(table);
  }
  async function insert(table,row){
    row={...row};
    if(slugTables.has(table)) row.slug=row.slug||slugify(row.title||row.name||Date.now());
    if(table==='projects'&&typeof row.tags==='string') row.tags=normalizeArray(row.tags);
    if(client){ const {data,error}=await client.from(table).insert(row).select().single(); if(error){ if(isMissingTable(error)) throw new Error(missingTableMessage(table)); throw error; } return data; }
    const arr=await fallback(table); row.id=row.id||('local-'+Date.now()); arr.unshift(row); fallbackCache[table]=arr; localStorage.setItem('portfolio_'+table,JSON.stringify(arr)); return row;
  }
  async function update(table,id,row){
    row={...row}; if(!slugTables.has(table)) delete row.slug; if(table==='projects'&&typeof row.tags==='string') row.tags=normalizeArray(row.tags);
    if(client){ const {data,error}=await client.from(table).update(row).eq('id',id).select().single(); if(error){ if(isMissingTable(error)) throw new Error(missingTableMessage(table)); throw error; } return data; }
    const arr=await fallback(table); const i=arr.findIndex(x=>String(x.id||x.slug||x.title)===String(id)); if(i>-1) arr[i]={...arr[i],...row}; fallbackCache[table]=arr; localStorage.setItem('portfolio_'+table,JSON.stringify(arr)); return arr[i];
  }
  async function remove(table,id){
    if(client){ const {error}=await client.from(table).delete().eq('id',id); if(error) throw error; return true; }
    const arr=await fallback(table); const next=arr.filter(x=>String(x.id||x.slug||x.title)!==String(id)); fallbackCache[table]=next; localStorage.setItem('portfolio_'+table,JSON.stringify(next)); return true;
  }
  async function seedMissing(){
    const out=[];
    for(const table of ['settings','projects','blogs','certs','skills','experience','education','design_skills','coding_skills']){
      let base=await fallback(table); if(table==='settings'&&!Array.isArray(base)) base=[base]; let live=[];
      if(client){ const res=await client.from(table).select('*'); if(res.error){ if(isMissingTable(res.error)) throw new Error(missingTableMessage(table)); } live=res.data||[]; } else { live=await get(table); }
      const liveKeys=new Set((live||[]).map(x=>String(x.slug||x.title||x.name||x.hero_name||'settings').toLowerCase())); let count=0;
      for(const item of (Array.isArray(base)?base:[])){
        const key=String(item.slug||item.title||item.name||item.hero_name||'settings').toLowerCase();
        if(!liveKeys.has(key)){ try{ await insert(table,item); count++; }catch(e){ console.warn('Seed failed',table,item,e); } }
      }
      out.push(`${table}: ${count}`);
    }
    return out;
  }
  function getParam(name){return new URLSearchParams(location.search).get(name)}
  function tags(list){return normalizeArray(list).filter(Boolean).map(t=>`<span class="hp-tag">${esc(t)}</span>`).join('')}
  function image(src){return esc(src||'img/portfolio/01.png')}
  function footerHtml(){return `<footer class="hp-footer"><div class="hp-footer-inner"><div><strong>Haider Abbas</strong><p>Game Developer • 2D/3D Animator • VFX Artist • Web & AI Systems Builder</p></div><div class="hp-footer-links"><a href="index.html">About</a><a href="resume.html">Resume</a><a href="portfolio.html">Portfolio</a><a href="blogs.html">Blogs</a><a href="certs.html">Certifications</a><a href="contact.html">Contact</a></div><div class="hp-footer-copy">© 2026 All rights reserved. TechFusion.</div></div></footer>`}
  function ensureFooter(){ if(document.querySelector('.admin-shell')||location.pathname.includes('/admin/'))return; if(document.querySelector('.hp-footer'))return; const main=document.querySelector('#page_container')||document.body; main.insertAdjacentHTML('beforeend',footerHtml()); }
  async function renderHome(){
    const s=await get('settings'), projects=(await get('projects')).slice(0,3), skills=(await get('skills')).slice(0,6), blogs=(await get('blogs')).slice(0,3);
    const hero=document.querySelector('[data-home-hero]'); if(!hero) return;
    const role=s.hero_role||'Game Developer • 2D/3D Animator • VFX Artist • Web & AI Systems Builder';
    hero.innerHTML=`<div class="row flex-v-align"><div class="col-sm-12 col-md-5 col-lg-5"><div class="home-photo"><div class="hp-inner" style="background-image:url(${image(s.hero_image||'img/Main_Image.png')})"></div></div></div><div class="col-sm-12 col-md-7 col-lg-7"><div class="home-text hp-left"><span class="hp-badge">${esc(s.hero_badge||'Portfolio System')}</span><h1>${esc(s.hero_name||'Muhammad Haider Abbas')}</h1><h4 class="hp-typing" data-text="${esc(role)}">${esc(role)}</h4><p>${esc(s.about_content||'A multidisciplinary creator building professional digital systems.')}</p><div class="hp-actions"><a class="hp-btn hp-btn-primary" href="portfolio.html">View Projects</a><a class="hp-btn" href="contact.html">Contact Me</a></div></div></div></div>`;
    const stats=document.querySelector('[data-home-stats]'); if(stats) stats.innerHTML=`<div class="hp-stat"><strong>${projects.length}+</strong><span>Featured Projects</span></div><div class="hp-stat"><strong>${skills.length}+</strong><span>Core Skill Areas</span></div><div class="hp-stat"><strong>3+</strong><span>Years Experience</span></div><div class="hp-stat"><strong>UK</strong><span>Based Portfolio</span></div>`;
    const pwrap=document.querySelector('[data-featured-projects]'); if(pwrap){ pwrap.classList.add('hp-mobile-slider'); pwrap.innerHTML=projects.map(cardProject).join(''); }
    const swrap=document.querySelector('[data-skills]'); if(swrap) swrap.innerHTML=skillShowcase(skills);
    const bwrap=document.querySelector('[data-latest-blogs]'); if(bwrap){ bwrap.classList.add('hp-mobile-slider'); bwrap.innerHTML=blogs.map(cardBlog).join(''); }
    runTyping(); ensureFooter();
  }
  function skillShowcase(list){ const main=list.slice(0,4), rest=list.slice(4), mobileExtra=list[3]?[list[3]]:[]; return `<div class="hp-skills-showcase"><div class="hp-skills-main">${main.map(x=>skillIconCard(x,'hp-main-skill')).join('')}</div>${(rest.length||mobileExtra.length)?`<div class="hp-skills-slider-wrap"><div class="hp-skills-slider-title">More Skills</div><div class="hp-skills-slider">${mobileExtra.map(x=>skillIconCard(x,'hp-mobile-extra')).join('')}${rest.map(x=>skillIconCard(x,'')).join('')}</div></div>`:''}</div>` }
  function skillIconCard(x,extraClass=''){return `<div class="hp-skill-icon-card ${extraClass}"><div class="hp-skill-orb"><img src="${image(x.image)}" alt="${esc(x.title)}"></div><h3>${esc(x.title)}</h3><p>${rich(x.summary)}</p></div>`}
  function cardProject(p){return `<div class="hp-card"><img src="${image(p.image)}" alt="${esc(p.title)}"><h3>${esc(p.title)}</h3><p class="hp-muted">${esc(p.category||'Project')} ${p.year?'• '+esc(p.year):''}</p><p>${esc(p.summary)}</p><div>${tags(p.tags)}</div><div class="hp-actions"><a class="hp-btn" href="project.html?slug=${esc(p.slug||slugify(p.title))}">View Case Study</a></div></div>`}
  function cardBlog(b){return `<div class="hp-card"><img src="${image(b.image)}" alt="${esc(b.title)}"><p class="hp-date">${esc(b.category||'Blog')} • ${esc(b.date||'')}</p><h3>${esc(b.title)}</h3><p>${esc(b.summary)}</p><div class="hp-actions"><a class="hp-btn" href="blog.html?slug=${esc(b.slug||slugify(b.title))}">Read Blog</a></div></div>`}
  async function renderPortfolio(){const el=document.querySelector('[data-projects]'); if(el){ el.innerHTML=(await get('projects')).map(cardProject).join('')||'<div class="hp-alert">No projects found.</div>'; ensureFooter(); }}
  async function renderProject(){const el=document.querySelector('[data-project-detail]'); if(!el)return; const slug=getParam('slug'); const list=await get('projects'); const p=list.find(x=>(x.slug||slugify(x.title))===slug)||list[0]; if(!p){el.innerHTML='<div class="hp-alert">Project not found.</div>';return} const c=(p.content&&typeof p.content==='object')?p.content:null; const contentHtml=c?`<div class="hp-section hp-grid"><div class="hp-card"><h3>Overview</h3><div class="hp-rich-content">${rich(c.overview||p.summary||'')}</div></div><div class="hp-card"><h3>Problem</h3><div class="hp-rich-content">${rich(c.problem||'')}</div></div><div class="hp-card"><h3>Solution</h3><div class="hp-rich-content">${rich(c.solution||'')}</div></div></div>`:`<div class="hp-section hp-card hp-rich-content">${rich(p.content||p.summary||'')}</div>`; el.innerHTML=`<div class="hp-detail-hero"><img src="${image(p.image)}" alt="${esc(p.title)}"></div><span class="hp-badge">${esc(p.category||'Project')}</span><h2>${esc(p.title)}</h2><p class="hp-muted">${esc(p.status||'')} ${p.year?'• '+esc(p.year):''} ${p.role?'• '+esc(p.role):''}</p><p>${esc(p.summary)}</p><div>${tags(p.tags)}</div>${contentHtml}<div class="hp-section"><a class="hp-btn" href="portfolio.html">Back to Portfolio</a></div>`; ensureFooter();}
  async function renderBlogs(){const el=document.querySelector('[data-blogs]'); if(el){ el.innerHTML=(await get('blogs')).map(cardBlog).join('')||'<div class="hp-alert">No blogs found.</div>'; ensureFooter(); }}
  async function renderBlog(){const el=document.querySelector('[data-blog-detail]'); if(!el)return; const slug=getParam('slug'); const list=await get('blogs'); const b=list.find(x=>(x.slug||slugify(x.title))===slug)||list[0]; if(!b){el.innerHTML='<div class="hp-alert">Blog not found.</div>';return} el.innerHTML=`<div class="hp-detail-hero"><img src="${image(b.image)}" alt="${esc(b.title)}"></div><p class="hp-date">${esc(b.category||'Blog')} • ${esc(b.date||'')}</p><h2>${esc(b.title)}</h2><div class="hp-rich-content">${rich(b.content||b.summary||'')}</div><div class="hp-section"><a class="hp-btn" href="blogs.html">Back to Blogs</a></div>`; ensureFooter();}
  async function renderCerts(){const el=document.querySelector('[data-certs]'); if(el){ el.innerHTML=(await get('certs')).map(c=>`<div class="hp-card hp-cert-card"><img src="${image(c.image)}" alt="${esc(c.title)}"><h3>${esc(c.title)}</h3><p class="hp-muted">${esc(c.issuer||'')} • ${esc(c.completion_date||'')}</p><p>${esc(c.summary)}</p></div>`).join('')||'<div class="hp-alert">No certifications found. Use Admin → Seed Missing Demo Data or run database/seed_data.sql.</div>'; ensureFooter(); }}
  async function renderResume(){
    const edu=document.querySelector('[data-education]'), exp=document.querySelector('[data-experience]'), d=document.querySelector('[data-design-skills]'), c=document.querySelector('[data-coding-skills]');
    if(edu) edu.innerHTML=(await get('education')).map(timeline).join(''); if(exp) exp.innerHTML=(await get('experience')).map(timeline).join('');
    if(d) d.innerHTML=(await get('design_skills')).map(skillbar).join(''); if(c) c.innerHTML=(await get('coding_skills')).map(skillbar).join('');
    if(edu||exp||d||c) ensureFooter();
  }
  function timeline(x){return `<div class="timeline-item clearfix"><h5 class="item-period">${esc(x.period||((x.start_year||'')+' - '+(x.end_year||'')))}</h5><span class="item-company">${esc(x.place||'')}</span><h4 class="item-title">${esc(x.title)}</h4><p>${rich(x.summary)}</p></div>`}
  function skillbar(x){return `<div class="hp-resume-skill"><h4>${esc(x.title)}</h4><div class="skill-track"><div class="skill-fill" style="width:${Math.max(0,Math.min(100,parseInt(x.percent||0)))}%"></div></div></div>`}
  async function contact(){const form=document.querySelector('[data-contact-form]'); if(!form)return; form.addEventListener('submit',async e=>{e.preventDefault(); const status=document.querySelector('[data-contact-status]'); const fd=new FormData(form); const msg={name:fd.get('name'),email:fd.get('email'),subject:fd.get('subject'),message:fd.get('message'),created_at:new Date().toISOString(),status:'new'}; try{await insert('messages',msg); form.reset(); status.innerHTML='<div class="hp-alert">Message saved successfully. Admin can view it in the dashboard.</div>'}catch(err){status.innerHTML='<div class="hp-alert hp-error">Message could not be saved: '+esc(err.message)+'</div>'}}); ensureFooter();}
  function runTyping(){document.querySelectorAll('.hp-typing').forEach(el=>{const text=el.dataset.text||el.textContent;let i=0,dir=1;el.textContent='';setInterval(()=>{el.textContent=text.slice(0,i);i+=dir;if(i>text.length+10){dir=-1;i=text.length}else if(i<0){dir=1;i=0}},70)})}
  window.PortfolioDB={client,hasSupabase,get,insert,update,remove,seedMissing,fallback,esc,slugify,tables,slugTables,imageFields};
  document.addEventListener('DOMContentLoaded',()=>{renderHome();renderPortfolio();renderProject();renderBlogs();renderBlog();renderCerts();renderResume();contact();ensureFooter();});
})();
