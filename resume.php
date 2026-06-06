<?php
$pageTitle='Resume | Muhammad Haider Abbas';
require 'includes/header.php';
$settings=read_json('settings');
$experience=read_json('experience');
$education=read_json('education');
$designSkills=read_json('design_skills');
$codingSkills=read_json('coding_skills');
function year_range($x){
  $start=$x['start_year'] ?? '';
  $end=$x['end_year'] ?? '';
  if($start && $end) return $start.' - '.$end;
  if($start) return $start;
  return $x['period'] ?? '';
}
?>
<section class="page-hero video-page-hero compact-hero resume-hero">
  <div class="hero-media-shell"><?= media_tag($settings['page_hero_media'] ?? 'assets/videos/hero-background.mp4','bg-media',$settings['hero_image'] ?? '') ?><div class="video-overlay" style="--overlay-opacity: <?=e($settings['page_hero_overlay'] ?? '0.50')?>"></div></div>
  <div class="hero-card hero-content narrow">
    <p class="eyebrow">Resume</p>
    <h1>Resume</h1>
    <p><strong><?=count($experience)?> Years+ / Experience Areas</strong> shown through education, technical work, creative production and professional operations.</p>
    <a class="btn primary" href="CV_File/MuhammadHaiderAbbasCV.pdf">Download Public CV</a>
  </div>
</section>

<section class="section resume-classic reveal">
  <div class="resume-classic-head">
    <p class="eyebrow">Professional Profile</p>
    <h2>Muhammad Haider Abbas</h2>
    <p>A multidisciplinary computer science and creative technology professional working across AI/ML, cybersecurity, web systems, Unity game development, 3D animation, VFX and professional security operations.</p>
  </div>

  <div class="resume-two-columns">
    <div class="resume-column">
      <h2>Education</h2>
      <?php foreach($education as $x): ?>
        <article class="classic-resume-item">
          <div class="classic-year"><?=e(year_range($x))?></div>
          <div class="classic-place"><?=e($x['place'] ?? '')?></div>
          <h3><?=e($x['title'] ?? '')?></h3>
          <p><?=e($x['summary'] ?? '')?></p>
        </article>
      <?php endforeach; ?>
    </div>

    <div class="resume-column">
      <h2>Experience</h2>
      <?php foreach($experience as $x): ?>
        <article class="classic-resume-item">
          <div class="classic-year"><?=e(year_range($x))?></div>
          <div class="classic-place"><?=e($x['place'] ?? '')?></div>
          <h3><?=e($x['title'] ?? '')?></h3>
          <p><?=e($x['summary'] ?? '')?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section resume-skills-classic reveal">
  <div class="resume-two-columns">
    <div class="resume-column skill-bars-column">
      <h2>Design Skills</h2>
      <?php foreach($designSkills as $s): ?>
        <div class="classic-skill">
          <div class="skill-title-row"><h3><?=e($s['title'])?></h3><span><?=e($s['percent'])?>%</span></div>
          <div class="skill-track"><i style="width: <?=e($s['percent'])?>%"></i></div>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="resume-column skill-bars-column">
      <h2>Coding Skills</h2>
      <?php foreach($codingSkills as $s): ?>
        <div class="classic-skill">
          <div class="skill-title-row"><h3><?=e($s['title'])?></h3><span><?=e($s['percent'])?>%</span></div>
          <div class="skill-track"><i style="width: <?=e($s['percent'])?>%"></i></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php require 'includes/footer.php'; ?>
