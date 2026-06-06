<?php
require '_header.php';
$items = read_json('projects');
$old = find_by_slug($items, $_GET['slug'] ?? '') ?: [
    'title'=>'','slug'=>'','category'=>'','status'=>'','year'=>'','role'=>'','image'=>'','summary'=>'','tags'=>[],'tools'=>'',
    'content'=>['overview'=>'','problem'=>'','solution'=>'','features'=>[],'outcome'=>'','future'=>'']
];
if($_SERVER['REQUEST_METHOD']==='POST'){
    verify_csrf();
    $slug = $_POST['slug'] ?: slugify($_POST['title']);
    $image = upload_image('image_file', $_POST['image'] ?? '');
    $item = [
        'title'=>trim($_POST['title']),
        'slug'=>$slug,
        'category'=>trim($_POST['category']),
        'status'=>trim($_POST['status']),
        'year'=>trim($_POST['year']),
        'role'=>trim($_POST['role']),
        'image'=>$image,
        'summary'=>trim($_POST['summary']),
        'tags'=>array_values(array_filter(array_map('trim', explode(',', $_POST['tags'] ?? '')))),
        'tools'=>trim($_POST['tools']),
        'content'=>[
            'overview'=>trim($_POST['overview']),
            'problem'=>trim($_POST['problem']),
            'solution'=>trim($_POST['solution']),
            'features'=>array_values(array_filter(array_map('trim', explode("\n", $_POST['features'] ?? '')))),
            'outcome'=>trim($_POST['outcome']),
            'future'=>trim($_POST['future'])
        ]
    ];
    $items = array_values(array_filter($items, fn($x)=>$x['slug'] !== ($_POST['old_slug'] ?? '')));
    $items[] = $item;
    write_json('projects', $items);
    header('Location: projects.php');
    exit;
}
$c = $old['content'];
?>
<h1><?= $old['title'] ? 'Edit' : 'Add' ?> Project</h1>
<form class="admin-form" method="post" enctype="multipart/form-data">
  <input type="hidden" name="csrf" value="<?=csrf_token()?>">
  <input type="hidden" name="old_slug" value="<?=e($old['slug'])?>">
  <label>Title<input name="title" value="<?=e($old['title'])?>" required></label>
  <label>Slug<input name="slug" value="<?=e($old['slug'])?>"></label>
  <label>Category<input name="category" value="<?=e($old['category'])?>" required></label>
  <label>Status<input name="status" value="<?=e($old['status'])?>"></label>
  <label>Year<input name="year" value="<?=e($old['year'])?>"></label>
  <label>Role<input name="role" value="<?=e($old['role'])?>"></label>
  <label>Image path<input name="image" value="<?=e($old['image'])?>"></label>
  <label>Upload image<input type="file" name="image_file"></label>
  <label>Summary<textarea name="summary"><?=e($old['summary'])?></textarea></label>
  <label>Tags comma separated<input name="tags" value="<?=e(implode(', ', $old['tags'] ?? []))?>"></label>
  <label>Tools<input name="tools" value="<?=e($old['tools'])?>"></label>
  <label>Overview<textarea name="overview"><?=e($c['overview'] ?? '')?></textarea></label>
  <label>Problem<textarea name="problem"><?=e($c['problem'] ?? '')?></textarea></label>
  <label>Solution<textarea name="solution"><?=e($c['solution'] ?? '')?></textarea></label>
  <label>Features one per line<textarea name="features"><?=e(implode("\n", $c['features'] ?? []))?></textarea></label>
  <label>Outcome<textarea name="outcome"><?=e($c['outcome'] ?? '')?></textarea></label>
  <label>Future<textarea name="future"><?=e($c['future'] ?? '')?></textarea></label>
  <button class="btn primary">Save Project</button>
</form>
<?php require '_footer.php'; ?>
