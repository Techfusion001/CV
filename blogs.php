<?php $pageTitle='Blog | Muhammad Haider Abbas'; require 'includes/header.php'; $blogs=read_json('blogs'); $settings=read_json('settings'); ?>
<section class="page-hero video-page-hero compact-hero">
  <div class="hero-media-shell"><?= media_tag($settings['page_hero_media'] ?? 'assets/videos/hero-background.mp4','bg-media',$settings['hero_image'] ?? '') ?><div class="video-overlay" style="--overlay-opacity: <?=e($settings['page_hero_overlay'] ?? '0.50')?>"></div></div>
  <div class="hero-card hero-content narrow"><p class="eyebrow">Blog</p><h1>Blog & Insights</h1><p>Notes, project thinking and technical write-ups in a clean editorial layout.</p></div>
</section>
<section class="section blog-grid-section"><div class="blog-grid blog-grid-3"><?php foreach($blogs as $b): ?><article class="blog-card reveal"><a class="blog-image" href="blog.php?slug=<?=e($b['slug'])?>"><img src="<?=e($b['image'])?>" alt="<?=e($b['title'])?>"></a><div class="blog-card-body"><span class="tag"><?=e($b['category'])?> • <?=e($b['date'])?></span><h3><a href="blog.php?slug=<?=e($b['slug'])?>"><?=e($b['title'])?></a></h3><p><?=e($b['summary'])?></p><a class="details" href="blog.php?slug=<?=e($b['slug'])?>">Read Article →</a></div></article><?php endforeach; ?></div></section>
<?php require 'includes/footer.php'; ?>
