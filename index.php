<?php $pageTitle='Muhammad Haider Abbas | AI, Web, Cybersecurity, Game Dev & VFX Portfolio'; require 'includes/header.php';
$projects=read_json('projects'); $certs=read_json('certs'); $skills=read_json('skills'); $settings=read_json('settings'); ?>
<section class="hero dark-section hero-with-media">
  <div class="hero-media-shell"><?= media_tag($settings['page_hero_media'] ?? 'assets/videos/hero-background.mp4','bg-media',$settings['hero_image'] ?? '') ?><div class="video-overlay" style="--overlay-opacity: <?=e($settings['page_hero_overlay'] ?? '0.50')?>"></div></div>
  <div class="hero-text reveal hero-content"><p class="eyebrow">MSc Computer Science & Technology • UK Based</p><h1>Muhammad Haider Abbas</h1><h2><em>AI/ML Researcher, Game Developer, Cybersecurity Learner, Web Systems Developer & VFX Artist.</em></h2><p>I build practical software, intelligent experiments, secure-thinking systems, business platforms, game prototypes and cinematic creative work.</p><div class="actions"><a class="btn primary" href="portfolio.php">View Portfolio</a><a class="btn ghost" href="resume.php">Download CV</a><a class="btn line" href="contact.php">Contact Me</a></div></div>
  <div class="hero-visual reveal">
    <div class="hero-ring"><img src="<?=e($settings['hero_image'] ?? 'assets/svg/hero-avatar.svg')?>" alt="Muhammad Haider Abbas profile visual"></div>
    <div class="floating-panel panel-top"><strong>Portfolio System</strong><span>Frontend + Backend</span></div>
    <div class="floating-panel panel-bottom"><span><?=e($settings['hero_badge'] ?? 'AI • Cyber • Web • Game • VFX')?></span></div>
  </div>
</section>
<section class="section about-preview about-30-70 about-preview-image reveal">
  <div class="about-preview-media"><img src="<?=e($settings['home_about_image'] ?? 'assets/svg/home-about-visual.svg')?>" alt="About Muhammad Haider Abbas"></div>
  <div class="about-content-block"><p class="eyebrow">About</p><h2><?=e($settings['about_title'] ?? 'A hybrid technical + creative profile.')?></h2><p><?=e($settings['about_content'] ?? '')?></p><blockquote><?=e($settings['about_highlight'] ?? '')?></blockquote></div>
</section>
<section class="section dark-band reveal selected-slider-section">
  <div class="section-head"><p class="eyebrow">Featured Work</p><h2>Selected Projects</h2><a href="portfolio.php">View all projects →</a></div>
  <div class="portfolio-slider" data-slider>
    <button class="slider-btn prev" type="button" aria-label="Previous project">‹</button>
    <div class="slider-window"><div class="slider-track"><?php foreach(array_slice($projects,0,8) as $p): ?><article class="project-card slider-card premium-project-card"><img src="<?=e($p['image'])?>" alt="<?=e($p['title'])?>"><div><span class="tag"><?=e($p['category'])?></span><h3><?=e($p['title'])?></h3><p><?=e($p['summary'])?></p><a class="details" href="project.php?slug=<?=e($p['slug'])?>">View Details →</a></div></article><?php endforeach; ?></div></div>
    <button class="slider-btn next" type="button" aria-label="Next project">›</button>
  </div>
</section>
<section class="section reveal"><div class="section-head"><p class="eyebrow">Skills</p><h2>Core Skill Areas</h2></div><div class="skills-grid visual-grid centered-skills"><?php foreach($skills as $s): ?><article class="skill-card"><img src="<?=e($s['image'])?>" alt="<?=e($s['title'])?>"><div><strong><?=e($s['title'])?></strong><span><?=e($s['summary'])?></span></div></article><?php endforeach; ?></div></section>
<section class="section reveal"><div class="section-head"><p class="eyebrow">Credentials</p><h2>Certifications</h2><a href="certifications.php">See certifications →</a></div><div class="cert-row"><?php foreach(array_slice($certs,0,3) as $c): ?><article class="mini-card visual-mini"><img src="<?=e($c['image'] ?? 'assets/svg/cert-tech.svg')?>" alt="<?=e($c['title'])?>"><strong><?=e($c['title'])?></strong><em><?=e($c['issuer'])?><?=!empty($c['completion_date'])?' • '.e($c['completion_date']):''?></em><p><?=e($c['summary'])?></p></article><?php endforeach; ?></div></section>
<section class="cta dark-section reveal cta-with-media"><div class="hero-media-shell"><?= media_tag($settings['cta_media'] ?? 'assets/videos/cta-background.mp4','bg-media',$settings['hero_image'] ?? '') ?><div class="video-overlay" style="--overlay-opacity: <?=e($settings['cta_overlay'] ?? '0.50')?>"></div></div><div class="cta-content"><h2>Need a professional technical portfolio, project collaboration or creative system?</h2><p>Reach out for software, AI, cybersecurity, game development, animation/VFX and digital platform work.</p><a class="btn primary" href="contact.php">Start Conversation</a></div></section>
<?php require 'includes/footer.php'; ?>
