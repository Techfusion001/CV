<?php require '_header.php';
$items=read_json('design_skills');
if($_SERVER['REQUEST_METHOD']==='POST'){
  verify_csrf();
  $new=[];
  foreach($_POST['title'] as $i=>$title){
    if(trim($title)==='') continue;
    $percent=max(0,min(100,(int)($_POST['percent'][$i] ?? 0)));
    $new[]=['title'=>trim($title),'percent'=>(string)$percent];
  }
  write_json('design_skills',$new);
  header('Location: design_skills.php');
  exit;
}
?>
<div class="admin-head">
  <div>
    <p class="admin-kicker">Resume Manager</p>
    <h2>Design Skills</h2>
  </div>
</div>
<form method="post" class="admin-form">
  <input type="hidden" name="csrf" value="<?=csrf_token()?>">
  <?php foreach($items as $s): ?>
    <div class="admin-group">
      <label>Skill Name<input name="title[]" value="<?=e($s['title'])?>"></label>
      <label>Percentage<input type="number" min="0" max="100" name="percent[]" value="<?=e($s['percent'])?>"></label>
    </div>
  <?php endforeach; ?>
  <div class="admin-group">
    <label>Skill Name<input name="title[]"></label>
    <label>Percentage<input type="number" min="0" max="100" name="percent[]" value=""></label>
  </div>
  <button class="btn primary">Save Design Skills</button>
</form>
<?php require '_footer.php'; ?>
