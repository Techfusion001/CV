<?php require 'includes/header.php';
$blogs=read_json('blogs');
$settings=read_json('settings');
$blog=find_by_slug($blogs,$_GET['slug']??'');
if(!$blog){ echo '<section class="page-hero"><h1>Blog not found</h1></section>'; require 'includes/footer.php'; exit; }
$related=array_values(array_filter($blogs, fn($b)=>($b['slug']??'')!==($blog['slug']??'') && ($b['category']??'')===($blog['category']??'')));
if(count($related)<3){ $related=array_values(array_filter($blogs, fn($b)=>($b['slug']??'')!==($blog['slug']??''))); }
?>
<section class="page-hero video-page-hero compact-hero detail-hero-compact">
  <div class="hero-media-shell"><?= media_tag($settings['page_hero_media'] ?? 'assets/videos/hero-background.mp4','bg-media',$blog['image']) ?><div class="video-overlay" style="--overlay-opacity: <?=e($settings['page_hero_overlay'] ?? '0.50')?>"></div></div>
  <div class="hero-card detail-hero-card"><p class="eyebrow"><?=e($blog['category'])?> • <?=e($blog['date'])?></p><h1><?=e($blog['title'])?></h1><p><?=e(excerpt($blog['summary'],120))?></p></div>
</section>
<section class="detail-layout blog-detail-layout reveal">
  <article class="article blog-article">
    <img class="article-featured-image" src="<?=e($blog['image'])?>" alt="<?=e($blog['title'])?>">
    <div class="article-meta-row"><span>Published: <?=e($blog['date'])?></span><span>Category: <?=e($blog['category'])?></span><span>By Muhammad Haider Abbas</span></div>
    <h2><?=e($blog['title'])?></h2>
    <p class="lead"><?=e($blog['summary'])?></p>
    <p><?=nl2br(e($blog['content']))?></p>
  </article>
  <aside class="info-card blog-sidebar">
    <h3>Blog Info</h3>
    <p><strong>Published:</strong> <?=e($blog['date'])?></p>
    <p><strong>Category:</strong> <?=e($blog['category'])?></p>
    <p><strong>Author:</strong> Muhammad Haider Abbas</p>
    <div class="sidebar-recommend"><h4>Recommended Blogs</h4><?php foreach(array_slice($related,0,4) as $b): ?><a class="small-recommend-card" href="blog.php?slug=<?=e($b['slug'])?>"><img src="<?=e($b['image'])?>" alt="<?=e($b['title'])?>"><span><?=e($b['title'])?></span></a><?php endforeach; ?></div>
    <a class="btn primary" href="blogs.php">Back to Blogs</a>
  </aside>
</section>
<section class="section related-section reveal">
  <div class="section-head"><p class="eyebrow">Recommended</p><h2>Related Blogs</h2><a href="blogs.php">View all blogs →</a></div>
  <div class="blog-grid blog-grid-3"><?php foreach(array_slice($related,0,3) as $b): ?><article class="blog-card"><a class="blog-image" href="blog.php?slug=<?=e($b['slug'])?>"><img src="<?=e($b['image'])?>" alt="<?=e($b['title'])?>"></a><div class="blog-card-body"><span class="tag"><?=e($b['category'])?> • <?=e($b['date'])?></span><h3><a href="blog.php?slug=<?=e($b['slug'])?>"><?=e($b['title'])?></a></h3><p><?=e($b['summary'])?></p><a class="details" href="blog.php?slug=<?=e($b['slug'])?>">Read Article →</a></div></article><?php endforeach; ?></div>
</section>
<?php require 'includes/footer.php'; ?>
