<?php require '_header.php';
$settings=read_json('settings');
if($_SERVER['REQUEST_METHOD']==='POST'){
  verify_csrf();
  $settings['hero_image']=upload_image('hero_image',$settings['hero_image'] ?? 'assets/svg/hero-avatar.svg');
  $settings['about_image']=upload_image('about_image',$settings['about_image'] ?? 'assets/svg/about-portrait.svg');
  $settings['home_about_image']=upload_image('home_about_image',$settings['home_about_image'] ?? 'assets/svg/home-about-visual.svg');
  $settings['page_hero_media']=upload_media('page_hero_media',$settings['page_hero_media'] ?? 'assets/videos/hero-background.mp4');
  $settings['cta_media']=upload_media('cta_media',$settings['cta_media'] ?? 'assets/videos/cta-background.mp4');
  $settings['hero_badge']=trim($_POST['hero_badge'] ?? '');
  $settings['about_title']=trim($_POST['about_title'] ?? '');
  $settings['about_content']=trim($_POST['about_content'] ?? '');
  $settings['about_highlight']=trim($_POST['about_highlight'] ?? '');
  $settings['page_hero_overlay']=trim($_POST['page_hero_overlay'] ?? '0.50');
  $settings['cta_overlay']=trim($_POST['cta_overlay'] ?? '0.50');
  write_json('settings',$settings);
  header('Location: settings.php'); exit;
}
?>
<div class="admin-head">
  <div>
    <p class="admin-kicker">Brand & Media</p>
    <h2>Site Settings</h2>
  </div>
</div>
<p>Edit profile visuals, hero background media and about section content.</p>
<form method="post" enctype="multipart/form-data" class="admin-form">
  <input type="hidden" name="csrf" value="<?=csrf_token()?>">
  <div class="admin-group">
    <label>Homepage Hero Picture
      <?php if(!empty($settings['hero_image'])): ?><img class="admin-preview" src="../<?=e($settings['hero_image'])?>" alt=""><?php endif; ?>
      <input type="file" name="hero_image" accept="image/*">
    </label>
    <label>About Page Picture
      <?php if(!empty($settings['about_image'])): ?><img class="admin-preview" src="../<?=e($settings['about_image'])?>" alt=""><?php endif; ?>
      <input type="file" name="about_image" accept="image/*">
    </label>
  </div>
  <div class="admin-group">
    <label>Home About Section Image
      <?php if(!empty($settings['home_about_image'])): ?><img class="admin-preview" src="../<?=e($settings['home_about_image'])?>" alt=""><?php endif; ?>
      <input type="file" name="home_about_image" accept="image/*">
    </label>
    <label>Hero Badge<input name="hero_badge" value="<?=e($settings['hero_badge'] ?? '')?>"></label>
  </div>
  <div class="admin-group">
    <label>All Page Hero Background (image or video)
      <?php if(!empty($settings['page_hero_media'])): ?>
        <?php if(is_video($settings['page_hero_media'])): ?><video class="admin-preview" autoplay muted loop playsinline src="../<?=e($settings['page_hero_media'])?>"></video>
        <?php else: ?><img class="admin-preview" src="../<?=e($settings['page_hero_media'])?>" alt=""><?php endif; ?>
      <?php endif; ?>
      <input type="file" name="page_hero_media" accept="image/*,video/mp4,video/webm,video/ogg">
    </label>
    <label>CTA Background (image or video)
      <?php if(!empty($settings['cta_media'])): ?>
        <?php if(is_video($settings['cta_media'])): ?><video class="admin-preview" autoplay muted loop playsinline src="../<?=e($settings['cta_media'])?>"></video>
        <?php else: ?><img class="admin-preview" src="../<?=e($settings['cta_media'])?>" alt=""><?php endif; ?>
      <?php endif; ?>
      <input type="file" name="cta_media" accept="image/*,video/mp4,video/webm,video/ogg">
    </label>
  </div>
  <div class="admin-group">
    <label>Hero Overlay Darkness (0.00 to 1.00)<input name="page_hero_overlay" value="<?=e($settings['page_hero_overlay'] ?? '0.50')?>"></label>
    <label>CTA Overlay Darkness (0.00 to 1.00)<input name="cta_overlay" value="<?=e($settings['cta_overlay'] ?? '0.50')?>"></label>
  </div>
  <div class="admin-group">
    <label>About Title<input name="about_title" value="<?=e($settings['about_title'] ?? '')?>"></label>
    <label>About Content<textarea name="about_content"><?=e($settings['about_content'] ?? '')?></textarea></label>
    <label>About Highlight<input name="about_highlight" value="<?=e($settings['about_highlight'] ?? '')?>"></label>
  </div>
  <button class="btn primary">Save Settings</button>
</form>
<?php require '_footer.php'; ?>
