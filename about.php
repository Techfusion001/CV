<?php $pageTitle='About | Muhammad Haider Abbas'; require 'includes/header.php'; $settings=read_json('settings'); ?>
<section class="page-hero video-page-hero compact-hero">
  <div class="hero-media-shell"><?= media_tag($settings['page_hero_media'] ?? 'assets/videos/hero-background.mp4','bg-media',$settings['about_image'] ?? '') ?><div class="video-overlay" style="--overlay-opacity: <?=e($settings['page_hero_overlay'] ?? '0.50')?>"></div></div>
  <div class="hero-card hero-content narrow"><p class="eyebrow">About</p><h1>About Me</h1><p>A concise introduction to my multidisciplinary background.</p></div>
</section>
<section class="section about-deep about-30-70 reveal">
  <div class="about-image-card professional-graphic-card"><img src="<?=e($settings['about_image'] ?? 'assets/svg/about-portrait.svg')?>" alt="Muhammad Haider Abbas professional graphic portrait"></div>
  <div><h2><?=e($settings['about_title'] ?? '')?></h2><p><?=e($settings['about_content'] ?? '')?></p><p>I work across <strong>AI/ML research</strong>, <em>cybersecurity practice</em>, <u>web platform development</u>, Unity game prototypes and Blender/VFX visuals. This gives my portfolio a rare mix: technical logic, creative polish and real-world business direction.</p><div class="vector-strip"><span>Research</span><span>Build</span><span>Secure</span><span>Design</span><span>Present</span></div></div>
</section>
<?php require 'includes/footer.php'; ?>
