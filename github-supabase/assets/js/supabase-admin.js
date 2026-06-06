
const SB = window.supabase.createClient(window.PORTFOLIO_SUPABASE_URL, window.PORTFOLIO_SUPABASE_ANON_KEY);
const tables = {
  projects: ['slug','title','category','summary','image','status','role','year','tools'],
  blogs: ['slug','title','category','summary','image','publish_date','author','content'],
  certifications: ['slug','title','issuer','completion_date','summary','icon','image'],
  skills: ['title','summary','image'],
  experience: ['slug','title','place','start_year','end_year','period','summary','type'],
  education: ['slug','title','place','start_year','end_year','period','summary','type'],
  design_skills: ['title','percent'],
  coding_skills: ['title','percent'],
  messages: ['name','email','subject','message','is_read']
};
let currentTable = 'projects';
const esc = (v='') => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function $(s){ return document.querySelector(s); }

async function checkSession(){
  const { data } = await SB.auth.getSession();
  if(data.session){ $('#loginPanel').style.display='none'; $('#adminPanel').style.display='block'; renderTabs(); loadTable(currentTable); }
}
$('#loginBtn').onclick = async () => {
  const { error } = await SB.auth.signInWithPassword({ email: $('#loginEmail').value, password: $('#loginPassword').value });
  $('#loginStatus').textContent = error ? error.message : 'Logged in.';
  if(!error) checkSession();
};
$('#logoutBtn').onclick = async (e) => { e.preventDefault(); await SB.auth.signOut(); location.reload(); };

function renderTabs(){
  $('#adminTabs').innerHTML = Object.keys(tables).map(t => `<a href="#" data-table="${t}" class="${t===currentTable?'active':''}">${t.replace('_',' ')}</a>`).join('');
  $('#adminTabs').onclick = e => { if(e.target.dataset.table){ e.preventDefault(); currentTable=e.target.dataset.table; renderTabs(); loadTable(currentTable); } };
}
async function loadTable(table){
  const { data, error } = await SB.from(table).select('*').order('created_at', { ascending:false, nullsFirst:false });
  if(error){ $('#adminContent').innerHTML = `<div class="admin-form"><p>${esc(error.message)}</p></div>`; return; }
  renderTable(table, data || []);
}
function renderTable(table, rows){
  const fields = tables[table];
  $('#adminContent').innerHTML = `<div class="admin-head"><div><p class="admin-kicker">Table</p><h2>${table}</h2></div><button class="btn primary" id="newBtn">Add New</button></div>
  <div class="admin-form" id="formBox" style="display:none"></div>
  <table class="admin-table"><tr>${fields.slice(0,4).map(f=>`<th>${f}</th>`).join('')}<th>Actions</th></tr>${rows.map(r=>`<tr>${fields.slice(0,4).map(f=>`<td>${esc(r[f])}</td>`).join('')}<td><a href="#" data-edit="${r.id}">Edit</a> | <a href="#" data-del="${r.id}">Delete</a></td></tr>`).join('')}</table>`;
  $('#newBtn').onclick = () => showForm(table, {});
  $('#adminContent').onclick = e => {
    if(e.target.dataset.edit){ e.preventDefault(); showForm(table, rows.find(r=>r.id===e.target.dataset.edit)); }
    if(e.target.dataset.del){ e.preventDefault(); deleteRow(table, e.target.dataset.del); }
  };
}
function showForm(table, row){
  const fields = tables[table];
  $('#formBox').style.display = 'block';
  $('#formBox').innerHTML = `<h3>${row.id?'Edit':'Add'} ${table}</h3><div class="admin-group">${fields.map(f=>`<label>${f}${f==='content'||f==='summary'||f==='message'?`<textarea name="${f}">${esc(row[f]||'')}</textarea>`:`<input name="${f}" value="${esc(row[f]||'')}">`}</label>`).join('')}</div><button class="btn primary" id="saveBtn">Save</button>`;
  $('#saveBtn').onclick = async () => {
    const payload = {};
    fields.forEach(f => payload[f] = document.querySelector(`[name="${f}"]`).value);
    let res;
    if(row.id) res = await SB.from(table).update(payload).eq('id', row.id);
    else res = await SB.from(table).insert(payload);
    if(res.error) alert(res.error.message); else loadTable(table);
  };
}
async function deleteRow(table,id){
  if(!confirm('Delete record?')) return;
  const { error } = await SB.from(table).delete().eq('id', id);
  if(error) alert(error.message); else loadTable(table);
}
checkSession();
