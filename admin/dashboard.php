<?php require '_header.php';
$projects=read_json('projects'); $blogs=read_json('blogs'); $certs=read_json('certs'); $skills=read_json('skills'); $messages=read_json('messages'); $experience=read_json('experience'); $education=read_json('education');
$categories=[]; foreach($projects as $p){ $cat=$p['category'] ?? 'Other'; $categories[$cat]=($categories[$cat]??0)+1; }
$maxCat=max(1, ...array_values($categories ?: ['Other'=>1]));
$totalContent=max(1,count($projects)+count($blogs)+count($certs)+count($skills)+count($experience)+count($education));
function pct($value,$total){ return round(($value/max(1,$total))*100); }
?>
<section class="admin-hero-panel animated-admin-hero">
  <div><p class="admin-kicker">Overview</p><h2>Manage your portfolio content professionally.</h2><p>Use this dashboard to update website visuals, maintain projects, certificates, blogs, resume content and contact messages in one place.</p></div>
  <div class="admin-hero-graphic admin-orbit-graphic"><span></span><span></span><span></span><i></i></div>
</section>
<div class="dash-grid admin-dashboard-grid">
  <div class="admin-stat-card"><strong><?=count($projects)?></strong><span>Projects</span><p>Case studies and featured work.</p></div>
  <div class="admin-stat-card"><strong><?=count($skills)?></strong><span>Skills</span><p>Core expertise with visuals.</p></div>
  <div class="admin-stat-card"><strong><?=count($certs)?></strong><span>Certifications</span><p>Credentials and issuers.</p></div>
  <div class="admin-stat-card"><strong><?=count($blogs)?></strong><span>Blogs</span><p>Articles and notes.</p></div>
  <div class="admin-stat-card"><strong><?=count($messages)?></strong><span>Messages</span><p>Contact form submissions.</p></div>
  <div class="admin-stat-card"><strong><?=count($experience)?></strong><span>Experience</span><p>Resume work history.</p></div>
  <div class="admin-stat-card"><strong><?=count($education)?></strong><span>Education</span><p>Academic background.</p></div>
</div>
<section class="admin-analytics-grid">
  <article class="admin-chart-card">
    <div class="admin-chart-head"><div><p class="admin-kicker">Analytics</p><h3>Content Distribution</h3></div><span><?= $totalContent ?> Items</span></div>
    <div class="donut-chart" style="--p1: <?=pct(count($projects),$totalContent)?>; --p2: <?=pct(count($blogs),$totalContent)?>; --p3: <?=pct(count($certs),$totalContent)?>;"><div><strong><?= $totalContent ?></strong><span>Total</span></div></div>
    <div class="chart-legend"><span><i></i>Projects</span><span><i></i>Blogs</span><span><i></i>Certifications</span></div>
  </article>
  <article class="admin-chart-card">
    <div class="admin-chart-head"><div><p class="admin-kicker">Portfolio</p><h3>Project Categories</h3></div><span><?=count($categories)?> Types</span></div>
    <div class="bar-chart-list"><?php foreach($categories as $cat=>$num): ?><div class="bar-chart-item"><div><span><?=e($cat)?></span><b><?=$num?></b></div><em><i style="width: <?=round(($num/$maxCat)*100)?>%"></i></em></div><?php endforeach; ?></div>
  </article>
  <article class="admin-chart-card admin-line-card">
    <div class="admin-chart-head"><div><p class="admin-kicker">Activity</p><h3>Website Growth Visual</h3></div><span>Live CMS</span></div>
    <div class="line-visual"><span style="height:35%"></span><span style="height:48%"></span><span style="height:42%"></span><span style="height:63%"></span><span style="height:58%"></span><span style="height:76%"></span><span style="height:88%"></span></div>
  </article>
</section>
<div class="admin-quick-grid">
  <a class="admin-quick-card" href="project-form.php"><strong>Add Project</strong><span>Create a new portfolio case study.</span></a>
  <a class="admin-quick-card" href="blog-form.php"><strong>Add Blog</strong><span>Publish a new article or update.</span></a>
  <a class="admin-quick-card" href="cert-form.php"><strong>Add Certification</strong><span>Add issuer, date and visual.</span></a>
  <a class="admin-quick-card" href="experience-form.php"><strong>Add Experience</strong><span>Add company, role, date and summary.</span></a>
  <a class="admin-quick-card" href="education-form.php"><strong>Add Education</strong><span>Add institution, course and date.</span></a>
  <a class="admin-quick-card" href="settings.php"><strong>Update Hero Media</strong><span>Change images and background videos.</span></a>
</div>
<?php require '_footer.php'; ?>
