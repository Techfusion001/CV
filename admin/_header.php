<?php require_once '../includes/functions.php'; require_admin(); ?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Admin Panel | Muhammad Haider Abbas</title>
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="admin-body">
<div class="admin-shell">
  <aside class="admin-sidebar">
    <div class="admin-brand-card">
      <p class="admin-kicker">Portfolio CMS</p>
      <h2>Muhammad Haider Abbas</h2>
      <span>Formal site management dashboard</span>
    </div>
    <nav class="admin-nav">
      <a href="dashboard.php">Dashboard</a>
      <a href="settings.php">Site Settings</a>
      <a href="projects.php">Projects</a>
      <a href="skills.php">Skills</a>
      <a href="experience.php">Experience</a>
      <a href="education.php">Education</a>
      <a href="design_skills.php">Design Skills</a>
      <a href="coding_skills.php">Coding Skills</a>
      <a href="blogs.php">Blogs</a>
      <a href="certs.php">Certifications</a>
      <a href="messages.php">Messages</a>
      <a href="../index.php">View Site</a>
      <a href="logout.php">Logout</a>
    </nav>
  </aside>
  <section class="admin-main">
    <div class="admin-topbar">
      <div>
        <p class="admin-kicker">Control Panel</p>
        <h1>Website Administration</h1>
      </div>
      <div class="admin-top-actions">
        <a class="btn ghost" href="../index.php">Open Website</a>
      </div>
    </div>
