<?php require 'includes/header.php';
$projects=read_json('projects');
$settings=read_json('settings');
$project=find_by_slug($projects,$_GET['slug']??'');
if(!$project){ echo '<section class="page-hero"><h1>Project not found</h1></section>'; require 'includes/footer.php'; exit; }
$c=$project['content']??[];
$tools=array_filter(array_map('trim', explode(',', $project['tools'] ?? '')));
$related=array_values(array_filter($projects, fn($p)=>($p['slug']??'')!==($project['slug']??'') && ($p['category']??'')===($project['category']??'')));
if(count($related)<3){ $related=array_values(array_filter($projects, fn($p)=>($p['slug']??'')!==($project['slug']??''))); }
?>
<section class="page-hero video-page-hero compact-hero detail-hero-compact">
  <div class="hero-media-shell"><?= media_tag($settings['page_hero_media'] ?? 'assets/videos/hero-background.mp4','bg-media',$project['image']) ?><div class="video-overlay" style="--overlay-opacity: <?=e($settings['page_hero_overlay'] ?? '0.50')?>"></div></div>
  <div class="hero-card detail-hero-card"><p class="eyebrow"><?=e($project['category'])?></p><h1><?=e($project['title'])?></h1><p><?=e(excerpt($project['summary'],120))?></p></div>
</section>
<section class="detail-layout reveal">
  <article class="article">
    <h2>Overview</h2><p><?=e($c['overview']??'')?></p>
    <h2>Problem</h2><p><?=e($c['problem']??'')?></p>
    <h2>Solution</h2><p><?=e($c['solution']??'')?></p>
    <h2>Key Features</h2><ul><?php foreach(($c['features']??[]) as $f): ?><li><?=e($f)?></li><?php endforeach; ?></ul>
    <h2>Outcome</h2><p><?=e($c['outcome']??'')?></p>
    <h2>Future Improvements</h2><p><?=e($c['future']??'')?></p>
  </article>
  <aside class="info-card">
    <h3>Project Info</h3>
    <p><strong>Type:</strong> <?=e($project['category'])?></p>
    <p><strong>Status:</strong> <?=e($project['status'])?></p>
    <p><strong>Role:</strong> <?=e($project['role'])?></p>
    <p><strong>Year:</strong> <?=e($project['year'])?></p>
    <div class="detail-tool-block"><strong>Tools:</strong><div class="inline-tool-list"><?php foreach($tools as $tool): ?><span><?=e($tool)?></span><?php endforeach; ?></div></div>
    <a class="btn primary" href="portfolio.php">Back to Portfolio</a>
  </aside>
</section>
<section class="section related-section reveal">
  <div class="section-head"><p class="eyebrow">Recommended</p><h2>Related Projects</h2><a href="portfolio.php">View all projects →</a></div>
  <div class="related-grid">
    <?php foreach(array_slice($related,0,3) as $p): ?>
      <article class="project-card premium-project-card"><img src="<?=e($p['image'])?>" alt="<?=e($p['title'])?>"><div><span class="tag"><?=e($p['category'])?></span><h3><?=e($p['title'])?></h3><p><?=e($p['summary'])?></p><a class="details" href="project.php?slug=<?=e($p['slug'])?>">View Details →</a></div></article>
    <?php endforeach; ?>
  </div>
</section>
<?php require 'includes/footer.php'; ?>
