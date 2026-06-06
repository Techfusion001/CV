<?php require '_header.php';
$items=read_json('certs');
if(isset($_GET['delete'])){
  $items=array_values(array_filter($items,fn($x)=>(($x['slug']??slugify($x['title']??''))!==$_GET['delete'])));
  write_json('certs',$items);
  header('Location: certs.php');
  exit;
}
?>
<div class="admin-head">
  <div>
    <p class="admin-kicker">Credentials</p>
    <h2>Certifications</h2>
  </div>
  <a class="btn primary" href="cert-form.php">Add Certification</a>
</div>
<table class="admin-table">
  <tr><th>Title</th><th>Issuer</th><th>Date</th><th>Actions</th></tr>
  <?php foreach($items as $x): $slug=$x['slug'] ?? slugify($x['title'] ?? ''); ?>
    <tr>
      <td><?=e($x['title'])?></td>
      <td><?=e($x['issuer'])?></td>
      <td><?=e($x['completion_date'] ?? 'Completed')?></td>
      <td><a href="cert-form.php?slug=<?=e($slug)?>">Edit</a> | <a onclick="return confirm('Delete certification?')" href="certs.php?delete=<?=e($slug)?>">Delete</a></td>
    </tr>
  <?php endforeach; ?>
</table>
<?php require '_footer.php'; ?>
