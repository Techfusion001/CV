(function(){
 const db=window.PortfolioDB, cfg=window.PORTFOLIO_SUPABASE||{}, esc=db.esc, slugify=db.slugify;
 const sections={
   dashboard:[],
   projects:['title','slug','category','summary','content','image','tags','status','role','year'],
   blogs:['title','slug','category','summary','content','image','date'],
   certs:['title','issuer','completion_date','summary','image','credential_url'],
   skills:['title','summary','image'],
   experience:['title','place','period','summary','type','start_year','end_year'],
   education:['title','place','period','summary','type','start_year','end_year'],
   design_skills:['title','percent'],
   coding_skills:['title','percent'],
   settings:['hero_name','hero_badge','hero_role','hero_image','about_title','about_content','about_highlight','about_image','home_about_image'],
   messages:['name','email','subject','message','status']
 };
 const richFields=new Set(['summary','content','message','about_content','about_highlight']);
 const mediaLibrary=[
  'img/Main_Image.png','img/main_photo.jpg','img/main_bg.png','img/portfolio/01.png','img/portfolio/02.png','img/portfolio/03.jpg','img/portfolio/04.png','img/portfolio/cyb.jpeg','img/portfolio/DM.png','img/portfolio/GDI.png','img/portfolio/Unity.png','img/certs/01.png','img/certs/02.jpg','img/certs/03.jpg','img/certs/04.jpg',
  'assets/svg/ai-drift.svg','assets/svg/restaurant.svg','assets/svg/smartcv.svg','assets/svg/q-learning.svg','assets/svg/coursera.svg','assets/svg/cloud-data.svg','assets/svg/cyber-ontology.svg','assets/svg/car-market.svg','assets/svg/unity-fps.svg','assets/svg/dvwa.svg','assets/svg/jarvis.svg','assets/svg/dating-app.svg','assets/svg/blender-vfx.svg','assets/svg/shopify-store.svg','assets/svg/blog-portfolio.svg','assets/svg/blog-case-study.svg','assets/svg/blog-brand.svg','assets/svg/skill-ai.svg','assets/svg/skill-cyber.svg','assets/svg/skill-web.svg','assets/svg/skill-game.svg','assets/svg/skill-vfx.svg','assets/svg/skill-business.svg','assets/svg/cert-security.svg','assets/svg/cert-tech.svg','assets/svg/cert-academic.svg','assets/svg/hero-avatar.svg','assets/svg/about-portrait.svg','assets/svg/home-about-visual.svg'
 ];
 let current='dashboard', editId=null, data={};
 const loginBox=document.getElementById('loginBox'), app=document.getElementById('adminApp'), status=document.getElementById('loginStatus');
 async function login(){
   const email=document.getElementById('adminEmail').value.trim(), password=document.getElementById('adminPassword').value;
   try{
     if(db.hasSupabase){ const {error}=await db.client.auth.signInWithPassword({email,password}); if(error) throw error; }
     else { if(password!==(cfg.demoPassword||'admin123')) throw new Error('Wrong demo password'); localStorage.setItem('portfolio_demo_admin','1'); }
     showApp();
   }catch(e){ status.innerHTML='<span style="color:#ffb4b4">'+esc(e.message)+'</span>'; }
 }
 async function showApp(){ loginBox.classList.add('hide'); app.classList.remove('hide'); buildNav(); await loadAll(); render(); }
 function logout(){ if(db.hasSupabase) db.client.auth.signOut(); localStorage.removeItem('portfolio_demo_admin'); location.reload(); }
 function buildNav(){ document.getElementById('adminNav').innerHTML=Object.keys(sections).map(k=>`<button data-sec="${k}" class="${k===current?'active':''}">${label(k)}</button>`).join(''); document.querySelectorAll('[data-sec]').forEach(b=>b.onclick=()=>{current=b.dataset.sec;editId=null;render();}); }
 async function loadAll(){ for(const k of Object.keys(sections).filter(x=>x!=='dashboard')){ data[k]=await db.get(k); if(!Array.isArray(data[k])) data[k]=data[k]?[data[k]]:[]; } }
 function label(k){return k.replace(/_/g,' ').replace(/\b\w/g,m=>m.toUpperCase())}
 function stats(){ document.getElementById('adminStats').innerHTML=['projects','blogs','certs','skills','messages'].map(k=>`<div class="admin-card"><span>${label(k)}</span><strong>${(data[k]||[]).length}</strong></div>`).join('') }
 function render(){ buildNav(); stats(); if(current==='dashboard') return renderDashboard(); if(current==='messages') return renderMessages(); const rows=data[current]||[]; document.getElementById('adminContent').innerHTML=`<div class="admin-panel"><h2>${label(current)}</h2><p class="hp-muted">Manage website ${label(current).toLowerCase()} directly from this panel. Rich text, image preview, media selector and local upload preview are available where needed.</p>${form()} </div><div class="admin-panel"><h3>Existing ${label(current)}</h3><div style="overflow:auto"><table class="admin-table"><thead><tr>${sections[current].slice(0,4).map(f=>`<th>${label(f)}</th>`).join('')}<th>Preview</th><th>Actions</th></tr></thead><tbody>${rows.map(row).join('')||'<tr><td colspan="6">No records found.</td></tr>'}</tbody></table></div></div>`; bindForm(); }
 function trafficEvents(){ try{return JSON.parse(localStorage.getItem('portfolio_traffic_events')||'[]')}catch(e){return []} }
 function renderMessages(){
   const rows=data.messages||[];
   document.getElementById('adminContent').innerHTML=`
    <div class="admin-panel">
      <h2>Messages</h2>
      <p class="hp-muted">Contact form enquiries from your portfolio.</p>
      <div style="overflow:auto">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>${rows.map(m=>{const id=m.id||m.email||m.subject;return `<tr><td>${esc(m.name||'Visitor')}</td><td>${esc(m.email||'')}</td><td>${esc(m.subject||'No subject')}</td><td>${esc(String(m.message||'').replace(/<[^>]*>/g,'')).slice(0,260)}</td><td>${esc(m.status||'new')}</td><td><button class="admin-small-btn admin-danger" data-del="${esc(id)}">Delete</button></td></tr>`}).join('')||'<tr><td colspan="6">No messages yet.</td></tr>'}</tbody>
        </table>
      </div>
    </div>`;
   document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>del(b.dataset.del));
 }

 function renderDashboard(){
   const t=trafficEvents();
   const last7=[...Array(7)].map((_,i)=>{const d=new Date(); d.setDate(d.getDate()-(6-i)); return d.toISOString().slice(0,10)});
   const daily=last7.map(day=>t.filter(x=>(x.ts||'').slice(0,10)===day).length);
   const pages={}; t.forEach(x=>pages[x.path||'index.html']=(pages[x.path||'index.html']||0)+1);
   const pageRows=Object.entries(pages).sort((a,b)=>b[1]-a[1]).slice(0,6);
   document.getElementById('adminContent').innerHTML=`
    <div class="admin-dashboard-hero admin-panel">
      <div><span class="hp-badge">Live Portfolio Control Room</span><h1>Dashboard</h1><p class="hp-muted">CMS overview, traffic recorder, content health and visual analytics for the whole portfolio.</p></div>
      <div class="holo-card"><span>System Status</span><strong>${db.hasSupabase?'Supabase Live':'Demo Mode'}</strong><small>${new Date().toLocaleString()}</small></div>
    </div>
    <div class="admin-live-grid"><div class="admin-live-tile"><span>Total Visits</span><strong>${t.length}</strong></div><div class="admin-live-tile"><span>Top Page</span><strong>${esc((pageRows[0]&&pageRows[0][0])||'—')}</strong></div><div class="admin-live-tile"><span>Projects</span><strong>${data.projects?.length||0}</strong></div><div class="admin-live-tile"><span>Messages</span><strong>${data.messages?.length||0}</strong></div></div>
    <div class="admin-chart-grid">
      <div class="admin-panel"><h3>7-Day Traffic Line Chart</h3><canvas id="trafficLine" height="180"></canvas></div>
      <div class="admin-panel"><h3>Content Bar Chart</h3><canvas id="contentBars" height="180"></canvas></div>
      <div class="admin-panel"><h3>Page Views</h3><canvas id="pageBars" height="180"></canvas></div>
      <div class="admin-panel holographic-panel"><h3>Holographic Overview</h3><div class="holo-orb"><span>${t.length}</span><small>Total visits</small></div><p class="hp-muted">Local traffic recorder is active on the frontend and stores recent page visits in browser storage.</p></div>
    </div>
    <div class="admin-panel"><h3>Top Pages</h3><table class="admin-table"><tbody>${pageRows.map(([p,c])=>`<tr><td>${esc(p)}</td><td>${c}</td></tr>`).join('')||'<tr><td>No visits recorded yet. Open frontend pages once and return here.</td><td>0</td></tr>'}</tbody></table></div>
    <div class="admin-panel"><button id="seedBtn" class="hp-btn hp-btn-primary">Seed Missing Demo Data</button><span id="seedStatus" style="margin-left:12px"></span></div>`;
   document.getElementById('seedBtn').onclick=seedData;
   drawLine('trafficLine',daily,last7.map(d=>d.slice(5)));
   drawBars('contentBars',['Projects','Blogs','Certs','Skills','Messages'].map((n,i)=>({name:n,value:[data.projects?.length||0,data.blogs?.length||0,data.certs?.length||0,data.skills?.length||0,data.messages?.length||0][i]})));
   drawBars('pageBars',pageRows.map(([name,value])=>({name,value})));
 }
 function drawLine(id,vals,labels){ const c=document.getElementById(id); if(!c)return; const ctx=c.getContext('2d'), w=c.width=c.offsetWidth*devicePixelRatio, h=c.height=c.offsetHeight*devicePixelRatio; ctx.scale(devicePixelRatio,devicePixelRatio); const W=c.offsetWidth,H=c.offsetHeight,p=26,max=Math.max(1,...vals); ctx.clearRect(0,0,W,H); ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.lineWidth=1; for(let i=0;i<4;i++){let y=p+(H-2*p)*i/3; ctx.beginPath();ctx.moveTo(p,y);ctx.lineTo(W-p,y);ctx.stroke();} ctx.strokeStyle='#04b4e0';ctx.lineWidth=3; ctx.beginPath(); vals.forEach((v,i)=>{const x=p+(W-2*p)*(i/(vals.length-1||1)), y=H-p-(H-2*p)*(v/max); if(i)ctx.lineTo(x,y); else ctx.moveTo(x,y);}); ctx.stroke(); ctx.fillStyle='#fff'; vals.forEach((v,i)=>{const x=p+(W-2*p)*(i/(vals.length-1||1)), y=H-p-(H-2*p)*(v/max); ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill(); ctx.fillText(labels[i],x-15,H-6);}); }
 function drawBars(id,items){ const c=document.getElementById(id); if(!c)return; const ctx=c.getContext('2d'), w=c.width=c.offsetWidth*devicePixelRatio, h=c.height=c.offsetHeight*devicePixelRatio; ctx.scale(devicePixelRatio,devicePixelRatio); const W=c.offsetWidth,H=c.offsetHeight,p=28,max=Math.max(1,...items.map(x=>x.value)); ctx.clearRect(0,0,W,H); const bw=(W-2*p)/Math.max(1,items.length)-12; items.forEach((it,i)=>{const x=p+i*(bw+12), bh=(H-2*p)*(it.value/max); const y=H-p-bh; const g=ctx.createLinearGradient(0,y,0,H-p); g.addColorStop(0,'#04b4e0'); g.addColorStop(1,'rgba(4,180,224,.25)'); ctx.fillStyle=g; roundRect(ctx,x,y,bw,bh,8); ctx.fill(); ctx.fillStyle='#fff'; ctx.fillText(String(it.value),x+bw/2-4,y-6); ctx.fillStyle='rgba(255,255,255,.75)'; ctx.fillText(String(it.name).slice(0,10),x,H-6); }); }
 function roundRect(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); }
 function val(obj,f){ const v=obj?.[f]; return Array.isArray(v)?v.join(', '):(v??'') }
 function form(){ const obj=(data[current]||[]).find(x=>String(x.id||x.slug||x.title)===String(editId))||{}; return `<form id="editForm" class="admin-form">${sections[current].map(f=>fieldHtml(f,obj)).join('')}<div class="admin-full admin-actions"><button type="submit" class="hp-btn hp-btn-primary">${editId?'Update':'Add'} ${label(current).replace(/s$/,'')}</button>${editId?'<button type="button" id="cancelEdit" class="hp-btn">Cancel Edit</button>':''}</div></form>` }
 function toolbar(name){return `<div class="rte-toolbar" data-toolbar="${name}"><button type="button" data-cmd="bold"><b>B</b></button><button type="button" data-cmd="italic"><i>I</i></button><button type="button" data-cmd="insertUnorderedList">List</button><button type="button" data-cmd="formatBlock" data-value="h3">H3</button><button type="button" data-cmd="formatBlock" data-value="p">P</button></div>`}
 function fieldHtml(f,obj){
   const value=val(obj,f); const full=richFields.has(f)?'admin-full':'';
   if(db.imageFields.has(f)||f==='image') return `<div class="${full}"><label>${label(f)}</label><div class="image-picker"><input name="${f}" data-image-input="${f}" value="${esc(value)}" placeholder="Image path or generated preview"><button type="button" class="admin-small-btn" data-open-media="${f}">Select</button><label class="admin-small-btn file-label">Upload<input type="file" accept="image/*" data-upload-image="${f}"></label></div><div class="image-preview-wrap"><img class="image-preview" data-preview="${f}" src="${esc(value||'../assets/svg/hero-avatar.svg')}"></div><div class="media-library hide" data-media="${f}">${mediaLibrary.map(m=>`<button type="button" data-media-pick="${f}" data-src="${esc(m)}"><img src="../${esc(m)}"><span>${esc(m.split('/').pop())}</span></button>`).join('')}</div></div>`;
   if(richFields.has(f)) return `<div class="${full}"><label>${label(f)}</label>${toolbar(f)}<div class="rich-editor" contenteditable="true" data-rich="${f}">${value||''}</div><textarea name="${f}" class="rich-source">${esc(value)}</textarea></div>`;
   return `<div class="${full}"><label>${label(f)}</label><input name="${f}" value="${esc(value)}"></div>`;
 }
 function previewSrc(src){ if(!src) return '../assets/svg/hero-avatar.svg'; if(src.startsWith('data:')||src.startsWith('http')) return src; return '../'+src; }
 function row(x){ const id=x.id||x.slug||x.title; const img=x.image||x.hero_image||x.about_image||''; return `<tr>${sections[current].slice(0,4).map(f=>`<td>${String(val(x,f)).slice(0,140)}</td>`).join('')}<td>${img?`<img class="admin-row-img" src="${previewSrc(img)}">`:''}</td><td><div class="admin-actions">${current==='messages'?'':`<button data-edit="${esc(id)}">Edit</button>`}<button class="admin-danger" data-del="${esc(id)}">Delete</button></div></td></tr>` }
 function bindForm(){
   const f=document.getElementById('editForm'); if(f) f.onsubmit=save;
   const c=document.getElementById('cancelEdit'); if(c)c.onclick=()=>{editId=null;render()};
   document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{editId=b.dataset.edit;render(); window.scrollTo({top:0,behavior:'smooth'});});
   document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>del(b.dataset.del));
   document.querySelectorAll('[data-image-input]').forEach(inp=>{inp.addEventListener('input',()=>updatePreview(inp.dataset.imageInput,inp.value)); updatePreview(inp.dataset.imageInput,inp.value);});
   document.querySelectorAll('[data-open-media]').forEach(b=>b.onclick=()=>document.querySelector(`[data-media="${b.dataset.openMedia}"]`).classList.toggle('hide'));
   document.querySelectorAll('[data-media-pick]').forEach(b=>b.onclick=()=>{const name=b.dataset.mediaPick, input=document.querySelector(`[data-image-input="${name}"]`); input.value=b.dataset.src; updatePreview(name,input.value); document.querySelector(`[data-media="${name}"]`).classList.add('hide');});
   document.querySelectorAll('[data-upload-image]').forEach(inp=>inp.onchange=e=>{const file=e.target.files[0]; if(!file)return; const r=new FileReader(); r.onload=()=>{const name=inp.dataset.uploadImage, target=document.querySelector(`[data-image-input="${name}"]`); target.value=r.result; updatePreview(name,r.result);}; r.readAsDataURL(file);});
   document.querySelectorAll('.rte-toolbar button').forEach(btn=>btn.onclick=()=>{ const wrap=btn.closest('.admin-full')||btn.parentElement.parentElement; const ed=wrap.querySelector('.rich-editor'); ed.focus(); document.execCommand(btn.dataset.cmd,false,btn.dataset.value||null); syncRich(wrap); });
   document.querySelectorAll('.rich-editor').forEach(ed=>ed.addEventListener('input',()=>syncRich(ed.parentElement)));
 }
 function syncRich(wrap){ const ed=wrap.querySelector('.rich-editor'), ta=wrap.querySelector('.rich-source'); if(ed&&ta) ta.value=ed.innerHTML; }
 function updatePreview(name,value){ const img=document.querySelector(`[data-preview="${name}"]`); if(img) img.src=previewSrc(value); }
 function parse(field,value){ if(field==='tags') return value.split(',').map(x=>x.trim()).filter(Boolean); if(field==='percent') return parseInt(value||0); return value; }
 async function save(e){ e.preventDefault(); document.querySelectorAll('.rich-editor').forEach(ed=>syncRich(ed.parentElement)); const fd=new FormData(e.target); let obj={}; for(const f of sections[current]) obj[f]=parse(f,fd.get(f)||''); if(db.slugTables.has(current)&&obj.title&&!obj.slug) obj.slug=slugify(obj.title); try{ if(current==='settings'){ const existing=(data.settings||[])[0]; if(existing&&existing.id){ await db.update('settings',existing.id,obj); } else { await db.insert('settings',obj); } } else if(editId){await db.update(current,editId,obj)} else {await db.insert(current,obj)} await loadAll(); editId=null; render(); }catch(err){alert(err.message)} }
 async function del(id){ if(!confirm('Delete this record?')) return; try{await db.remove(current,id); await loadAll(); render();}catch(e){alert(e.message)} }
 async function seedData(){ const el=document.getElementById('seedStatus'); el.textContent=' Seeding...'; try{ const result=await db.seedMissing(); await loadAll(); render(); setTimeout(()=>alert('Seed complete: '+result.join(', ')),100); }catch(e){el.textContent=' '+e.message;} }
 document.addEventListener('DOMContentLoaded',async()=>{document.getElementById('loginBtn').onclick=login; document.getElementById('logoutBtn').onclick=logout; if(db.hasSupabase){ const {data:{session}}=await db.client.auth.getSession(); if(session) showApp(); } else if(localStorage.getItem('portfolio_demo_admin')) showApp(); });
})();
