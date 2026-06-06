/* Supabase admin CMS for GitHub Pages. Requires Supabase Auth user + admin_users row. */
(function () {
  const tables = {
    site_settings: ['hero_image','hero_badge','about_title','about_content','about_highlight','about_image','home_about_image','page_hero_media','cta_media','page_hero_overlay','cta_overlay'],
    projects: ['slug','title','category','summary','image','status','role','year','tools','is_featured','sort_order','content'],
    blogs: ['slug','title','category','summary','image','publish_date','author','content','is_published','sort_order'],
    certifications: ['slug','title','issuer','completion_date','summary','icon','image','sort_order'],
    skills: ['title','summary','image','sort_order'],
    experience: ['slug','title','place','start_year','end_year','period','summary','type','sort_order'],
    education: ['slug','title','place','start_year','end_year','period','summary','type','sort_order'],
    design_skills: ['title','percent','sort_order'],
    coding_skills: ['title','percent','sort_order'],
    messages: ['name','email','subject','message','is_read']
  };
  const textAreas = new Set(['content','summary','message','about_content','about_highlight']);
  const boolFields = new Set(['is_featured','is_published','is_read']);
  const numberFields = new Set(['sort_order','percent','page_hero_overlay','cta_overlay']);
  let currentTable = 'projects';
  let SB = null;
  const esc = (v = '') => String(v ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const $ = (s) => document.querySelector(s);
  const hasValidConfig = () => {
    const url = window.PORTFOLIO_SUPABASE_URL || '';
    const key = window.PORTFOLIO_SUPABASE_ANON_KEY || '';
    return window.supabase && /^https:\/\/[^\s]+\.supabase\.co\/?$/i.test(url) && key && !key.includes('YOUR-') && key.length > 30;
  };
  try {
    if (hasValidConfig()) SB = window.supabase.createClient(window.PORTFOLIO_SUPABASE_URL, window.PORTFOLIO_SUPABASE_ANON_KEY);
  } catch (err) { console.error(err); }

  function showConfigError() {
    $('#loginStatus').innerHTML = 'Supabase config is missing. Edit <strong>assets/js/supabase-config.js</strong> with your project URL and anon public key, then publish again.';
  }

  async function checkSession() {
    if (!SB) { showConfigError(); return; }
    const { data } = await SB.auth.getSession();
    if (data.session) {
      $('#loginPanel').style.display = 'none';
      $('#adminPanel').style.display = 'block';
      renderTabs();
      await loadDashboard();
      loadTable(currentTable);
    }
  }

  $('#loginBtn').onclick = async () => {
    if (!SB) { showConfigError(); return; }
    const { error } = await SB.auth.signInWithPassword({ email: $('#loginEmail').value.trim(), password: $('#loginPassword').value });
    $('#loginStatus').textContent = error ? error.message : 'Logged in.';
    if (!error) checkSession();
  };
  $('#logoutBtn').onclick = async (e) => { e.preventDefault(); if (SB) await SB.auth.signOut(); location.reload(); };

  function renderTabs() {
    $('#adminTabs').innerHTML = Object.keys(tables).map(t => `<a href="#" data-table="${t}" class="${t === currentTable ? 'active' : ''}">${esc(t.replaceAll('_', ' '))}</a>`).join('');
    $('#adminTabs').onclick = e => {
      if (e.target.dataset.table) {
        e.preventDefault(); currentTable = e.target.dataset.table; renderTabs(); loadTable(currentTable);
      }
    };
  }

  async function loadDashboard() {
    const dashboard = $('#adminDashboardCards');
    if (!dashboard) return;
    const names = ['projects','blogs','certifications','messages'];
    const counts = await Promise.all(names.map(async table => {
      const { count } = await SB.from(table).select('*', { count: 'exact', head: true });
      return { table, count: count ?? 0 };
    }));
    dashboard.innerHTML = counts.map(x => `<article class="admin-stat"><span>${esc(x.table.replaceAll('_',' '))}</span><strong>${x.count}</strong></article>`).join('');
  }

  async function loadTable(table) {
    const orderCol = ['projects','blogs','certifications','skills','experience','education','design_skills','coding_skills'].includes(table) ? 'sort_order' : (table === 'site_settings' ? 'id' : 'created_at');
    let query = SB.from(table).select('*').order(orderCol, { ascending: table !== 'messages', nullsFirst: false });
    if (table === 'site_settings') query = SB.from(table).select('*').eq('id', 1);
    const { data, error } = await query;
    if (error) { $('#adminContent').innerHTML = `<div class="admin-form"><p>${esc(error.message)}</p></div>`; return; }
    renderTable(table, data || []);
  }

  function formatCell(value) {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return esc(JSON.stringify(value));
    return esc(value);
  }

  function renderTable(table, rows) {
    const fields = tables[table];
    const canAdd = table !== 'messages' && table !== 'site_settings';
    const actionHead = table === 'messages' ? 'Actions' : 'Actions';
    $('#adminContent').innerHTML = `<div class="admin-head"><div><p class="admin-kicker">Table</p><h2>${esc(table.replaceAll('_', ' '))}</h2></div>${canAdd ? '<button class="btn primary" id="newBtn">Add New</button>' : ''}</div>
      <div class="admin-form" id="formBox" style="display:none"></div>
      <div class="table-wrap"><table class="admin-table"><tr>${fields.slice(0, 4).map(f => `<th>${esc(f)}</th>`).join('')}<th>${actionHead}</th></tr>${rows.map(r => `<tr>${fields.slice(0, 4).map(f => `<td>${formatCell(r[f])}</td>`).join('')}<td><a href="#" data-edit="${esc(r.id)}">${table === 'messages' ? 'View/Edit' : 'Edit'}</a>${table !== 'site_settings' ? ` | <a href="#" data-del="${esc(r.id)}">Delete</a>` : ''}</td></tr>`).join('')}</table></div>`;
    if (canAdd && $('#newBtn')) $('#newBtn').onclick = () => showForm(table, {});
    $('#adminContent').onclick = e => {
      if (e.target.dataset.edit) { e.preventDefault(); showForm(table, rows.find(r => String(r.id) === String(e.target.dataset.edit)) || {}); }
      if (e.target.dataset.del) { e.preventDefault(); deleteRow(table, e.target.dataset.del); }
    };
  }

  function fieldInput(f, row) {
    const val = row[f];
    if (boolFields.has(f)) return `<label>${esc(f)}<select name="${esc(f)}"><option value="true" ${val === true ? 'selected' : ''}>true</option><option value="false" ${val === false ? 'selected' : ''}>false</option></select></label>`;
    const text = typeof val === 'object' && val !== null ? JSON.stringify(val, null, 2) : (val ?? '');
    if (textAreas.has(f)) return `<label>${esc(f)}<textarea name="${esc(f)}" rows="${f === 'content' ? 9 : 4}">${esc(text)}</textarea></label>`;
    return `<label>${esc(f)}<input name="${esc(f)}" value="${esc(text)}"></label>`;
  }

  function castValue(field, value) {
    if (boolFields.has(field)) return value === 'true';
    if (numberFields.has(field)) return value === '' ? null : Number(value);
    if (field === 'content' && String(value).trim().startsWith('{')) {
      try { return JSON.parse(value); } catch { return value; }
    }
    return value;
  }

  function showForm(table, row) {
    const fields = tables[table];
    $('#formBox').style.display = 'block';
    $('#formBox').scrollIntoView({ behavior: 'smooth', block: 'start' });
    $('#formBox').innerHTML = `<h3>${row.id ? 'Edit' : 'Add'} ${esc(table.replaceAll('_', ' '))}</h3><div class="admin-group">${fields.map(f => fieldInput(f, row)).join('')}</div><button class="btn primary" id="saveBtn">Save</button><button class="btn ghost" id="cancelBtn" type="button">Cancel</button>`;
    $('#cancelBtn').onclick = () => { $('#formBox').style.display = 'none'; };
    $('#saveBtn').onclick = async () => {
      const payload = {};
      fields.forEach(f => payload[f] = castValue(f, document.querySelector(`[name="${CSS.escape(f)}"]`).value));
      let res;
      if (table === 'site_settings') res = await SB.from(table).upsert({ id: 1, ...payload }, { onConflict: 'id' });
      else if (row.id) res = await SB.from(table).update(payload).eq('id', row.id);
      else res = await SB.from(table).insert(payload);
      if (res.error) alert(res.error.message); else { await loadDashboard(); loadTable(table); }
    };
  }

  async function deleteRow(table, id) {
    if (!confirm('Delete record?')) return;
    const { error } = await SB.from(table).delete().eq('id', id);
    if (error) alert(error.message); else { await loadDashboard(); loadTable(table); }
  }

  document.addEventListener('DOMContentLoaded', checkSession);
})();
