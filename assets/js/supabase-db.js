(function(){
  const cfgOk = () => window.PORTFOLIO_SUPABASE_URL && !String(window.PORTFOLIO_SUPABASE_URL).includes('PASTE_') && window.PORTFOLIO_SUPABASE_ANON_KEY && !String(window.PORTFOLIO_SUPABASE_ANON_KEY).includes('PASTE_');
  const client = cfgOk() && window.supabase ? window.supabase.createClient(window.PORTFOLIO_SUPABASE_URL, window.PORTFOLIO_SUPABASE_ANON_KEY) : null;
  const tableMap = { certs:'certifications', settings:'site_settings' };
  const cache = {};
  const escapeHtml = v => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const slugify = s => String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || ('item-' + Date.now());
  const normalizeSettings = row => row || {};
  const normalizeBlog = b => ({...b, date: b.date || b.publish_date || ''});
  const normalizeCert = c => ({...c});
  const bySort = (a,b) => (Number(a.sort_order||0)-Number(b.sort_order||0)) || String(a.title||'').localeCompare(String(b.title||''));
  const localNames = {certifications:'certs', site_settings:'settings'};
  async function localLoad(name){
    if(!window.PORTFOLIO_ALLOW_LOCAL_FALLBACK) return name==='site_settings'?{}:[];
    const file = localNames[name] || name;
    try{ const r = await fetch(`data/${file}.json`, {cache:'no-store'}); if(!r.ok) throw new Error('No local fallback'); return await r.json(); }catch(e){ return name==='site_settings'?{}:[]; }
  }
  async function select(name, opts={}){
    const table = tableMap[name] || name;
    if(client){
      let q = client.from(table).select('*');
      if(table==='site_settings') q = q.eq('id', 1).maybeSingle();
      else if(opts.singleBySlug) q = q.eq('slug', opts.singleBySlug).maybeSingle();
      else if(table==='blogs' && opts.publicOnly !== false) q = q.eq('is_published', true).order('sort_order', {ascending:true}).order('publish_date', {ascending:false});
      else if(['projects','blogs','certifications','skills','experience','education','design_skills','coding_skills'].includes(table)) q = q.order('sort_order', {ascending:true});
      else if(table==='messages') q = q.order('created_at',{ascending:false});
      const {data, error} = await q;
      if(!error){
        if(table==='site_settings') return normalizeSettings(data);
        const arr = Array.isArray(data) ? data : (data ? [data] : []);
        if(table==='blogs') return arr.map(normalizeBlog);
        if(table==='certifications') return arr.map(normalizeCert);
        return arr;
      }
      console.warn('Supabase select failed, trying local fallback:', table, error.message);
    }
    const local = await localLoad(table);
    if(table==='site_settings') return local;
    let arr = Array.isArray(local) ? local : [];
    if(opts.singleBySlug) arr = arr.filter(x => x.slug === opts.singleBySlug);
    if(table==='blogs') arr = arr.map(normalizeBlog);
    return arr.sort(bySort);
  }
  async function upsert(table, payload, conflict='id'){
    if(!client) throw new Error('Supabase is not configured. Open assets/js/supabase-config.js and paste your project URL + anon key.');
    if(table==='site_settings') payload.id = 1;
    const {data,error}=await client.from(table).upsert(payload,{onConflict:conflict}).select().single();
    if(error) throw error; return data;
  }
  async function insert(table, payload){
    if(!client) throw new Error('Supabase is not configured.');
    const {data,error}=await client.from(table).insert(payload).select().single();
    if(error) throw error; return data;
  }
  async function remove(table, id){
    if(!client) throw new Error('Supabase is not configured.');
    const {error}=await client.from(table).delete().eq('id', id); if(error) throw error;
  }
  async function upload(file){
    if(!client) throw new Error('Supabase is not configured.');
    if(!file) return '';
    const ext=(file.name.split('.').pop()||'bin').toLowerCase();
    const safe=(file.name.replace(/[^a-z0-9.\-_]+/gi,'-')).slice(-80);
    const path=`uploads/${Date.now()}-${Math.random().toString(16).slice(2)}-${safe || 'file.'+ext}`;
    const {error}=await client.storage.from('portfolio-media').upload(path,file,{upsert:false,contentType:file.type||undefined});
    if(error) throw error;
    return client.storage.from('portfolio-media').getPublicUrl(path).data.publicUrl;
  }
  async function getSession(){ if(!client) return null; const {data}=await client.auth.getSession(); return data.session || null; }
  async function signIn(email,password){ if(!client) throw new Error('Supabase is not configured.'); const {data,error}=await client.auth.signInWithPassword({email,password}); if(error) throw error; return data; }
  async function signOut(){ if(client) await client.auth.signOut(); }
  async function isAdmin(){
    if(!client) return false;
    const s=await getSession(); if(!s) return false;
    const {data,error}=await client.from('admin_users').select('user_id').eq('user_id', s.user.id).maybeSingle();
    return !error && !!data;
  }
  window.PortfolioDB = { client, cfgOk, select, upsert, insert, remove, upload, getSession, signIn, signOut, isAdmin, escapeHtml, slugify, bySort };
})();
