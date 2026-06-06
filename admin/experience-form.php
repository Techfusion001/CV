<?php require '_header.php';
$items=read_json('experience');
$slug=$_GET['slug'] ?? '';
$item=['title'=>'','place'=>'','start_year'=>'','end_year'=>'','period'=>'','summary'=>'','type'=>''];
foreach($items as $it){
  if(($it['slug'] ?? slugify($it['title'] ?? ''))===$slug){ $item=$it; break; }
}
if($_SERVER['REQUEST_METHOD']==='POST'){
  verify_csrf();
  $oldSlug=$_POST['old_slug'] ?? '';
  $start=trim($_POST['start_year'] ?? '');
  $end=trim($_POST['end_year'] ?? '');
  $new=[
    'slug'=>slugify($_POST['title'] ?? ''),
    'title'=>trim($_POST['title'] ?? ''),
    'place'=>trim($_POST['place'] ?? ''),
    'start_year'=>$start,
    'end_year'=>$end,
    'period'=>trim($start.($end!==''?' - '.$end:'')),
    'summary'=>trim($_POST['summary'] ?? ''),
    'type'=>trim($_POST['type'] ?? '')
  ];
  $found=false;
  foreach($items as &$it){
    if(($it['slug'] ?? slugify($it['title'] ?? ''))===$oldSlug){ $it=$new; $found=true; break; }
  }
  unset($it);
  if(!$found){ $items[]=$new; }
  write_json('experience',$items);
  header('Location: experience.php');
  exit;
}
?>
<div class="admin-head">
  <div>
    <p class="admin-kicker">Resume Manager</p>
    <h2><?= $slug ? 'Edit Experience' : 'Add Experience' ?></h2>
  </div>
  <a class="btn ghost" href="experience.php">Back to Experiences</a>
</div>
<form method="post" class="admin-form">
  <input type="hidden" name="csrf" value="<?=csrf_token()?>">
  <input type="hidden" name="old_slug" value="<?=e($slug)?>">
  <div class="admin-group">
    <label>Start Year<input name="start_year" value="<?=e($item['start_year'] ?? '')?>" placeholder="Example: 2020"></label>
    <label>End Year<input name="end_year" value="<?=e($item['end_year'] ?? '')?>" placeholder="Example: 2024 or Now"></label>
  </div>
  <div class="admin-group">
    <label>Company / Institution<input name="place" value="<?=e($item['place'])?>" placeholder="Example: Ulster University, Birmingham"></label>
    <label>Title / Role / Degree<input name="title" value="<?=e($item['title'])?>" required></label>
  </div>
  <div class="admin-group">
    <label>Type / Category<input name="type" value="<?=e($item['type'])?>" placeholder="Example: Degree, Cybersecurity, Creative"></label>
    <label>Summary<textarea name="summary"><?=e($item['summary'])?></textarea></label>
  </div>
  <button class="btn primary">Save Experience</button>
</form>
<?php require '_footer.php'; ?>
