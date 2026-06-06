<?php require '_header.php';
$items=read_json('certs');
$slug=$_GET['slug'] ?? '';
$item=['title'=>'','issuer'=>'','completion_date'=>'','summary'=>'','icon'=>'Cert','image'=>'assets/svg/cert-tech.svg'];
foreach($items as $it){
  if(($it['slug'] ?? slugify($it['title'] ?? ''))===$slug){ $item=$it; break; }
}
if($_SERVER['REQUEST_METHOD']==='POST'){
  verify_csrf();
  $oldSlug=$_POST['old_slug'] ?? '';
  $new=[
    'slug'=>slugify($_POST['title'] ?? ''),
    'title'=>trim($_POST['title'] ?? ''),
    'issuer'=>trim($_POST['issuer'] ?? ''),
    'completion_date'=>trim($_POST['completion_date'] ?? ''),
    'summary'=>trim($_POST['summary'] ?? ''),
    'icon'=>trim($_POST['icon'] ?? 'Cert'),
    'image'=>upload_image('image',$_POST['current_image'] ?? 'assets/svg/cert-tech.svg')
  ];
  $found=false;
  foreach($items as &$it){
    if(($it['slug'] ?? slugify($it['title'] ?? ''))===$oldSlug){ $it=$new; $found=true; break; }
  }
  unset($it);
  if(!$found){ $items[]=$new; }
  write_json('certs',$items);
  header('Location: certs.php');
  exit;
}
?>
<div class="admin-head">
  <div>
    <p class="admin-kicker">Credentials</p>
    <h2><?= $slug ? 'Edit Certification' : 'Add Certification' ?></h2>
  </div>
  <a class="btn ghost" href="certs.php">Back to Certifications</a>
</div>
<form method="post" enctype="multipart/form-data" class="admin-form">
  <input type="hidden" name="csrf" value="<?=csrf_token()?>">
  <input type="hidden" name="old_slug" value="<?=e($slug)?>">
  <div class="admin-group">
    <label>Title<input name="title" value="<?=e($item['title'])?>" required></label>
    <label>Issuer / From<input name="issuer" value="<?=e($item['issuer'])?>"></label>
  </div>
  <div class="admin-group">
    <label>Completion Date<input name="completion_date" value="<?=e($item['completion_date'])?>" placeholder="Example: 2023 or June 2026"></label>
    <label>Label / Icon Name<input name="icon" value="<?=e($item['icon'])?>"></label>
  </div>
  <div class="admin-group">
    <label>Current Image
      <?php if(!empty($item['image'])): ?><img class="admin-preview" src="../<?=e($item['image'])?>" alt=""><?php endif; ?>
      <input type="hidden" name="current_image" value="<?=e($item['image'])?>">
      <input type="file" name="image" accept="image/*">
    </label>
    <label>Summary<textarea name="summary"><?=e($item['summary'])?></textarea></label>
  </div>
  <button class="btn primary">Save Certification</button>
</form>
<?php require '_footer.php'; ?>
