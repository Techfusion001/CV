<?php require '_header.php';
$items=read_json('experience');
if(isset($_GET['delete'])){
  $items=array_values(array_filter($items,fn($x)=>(($x['slug']??slugify($x['title']??''))!==$_GET['delete'])));
  write_json('experience',$items);
  header('Location: experience.php');
  exit;
}
?>
<div class="admin-head">
  <div>
    <p class="admin-kicker">Resume Manager</p>
    <h2>Experiences</h2>
  </div>
  <a class="btn primary" href="experience-form.php">Add Experience</a>
</div>
<table class="admin-table">
  <tr><th>Years</th><th>Title</th><th>Place</th><th>Type</th><th>Actions</th></tr>
  <?php foreach($items as $x): $slug=$x['slug'] ?? slugify($x['title'] ?? ''); ?>
    <tr>
      <td><?=e(($x['start_year'] ?? '').(!empty($x['end_year'])?' - '.$x['end_year']:''))?></td>
      <td><?=e($x['title'] ?? '')?></td>
      <td><?=e($x['place'] ?? '')?></td>
      <td><?=e($x['type'] ?? '')?></td>
      <td><a href="experience-form.php?slug=<?=e($slug)?>">Edit</a> | <a onclick="return confirm('Delete item?')" href="experience.php?delete=<?=e($slug)?>">Delete</a></td>
    </tr>
  <?php endforeach; ?>
</table>
<?php require '_footer.php'; ?>
