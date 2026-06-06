<?php require_once __DIR__ . '/functions.php'; $pageTitle=$pageTitle ?? SITE_NAME; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e($pageTitle) ?></title>
  <meta name="description" content="Professional portfolio of Muhammad Haider Abbas: AI, cybersecurity, web systems, game development, 3D animation and VFX.">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<header class="site-header">
  <a class="brand" href="index.php"><span>Muhammad</span> Haider Abbas</a>
  <button class="menu-btn" aria-label="Open Menu">☰</button>
  <nav class="nav">
    <a href="index.php">Home</a><a href="about.php">About</a><a href="portfolio.php">Portfolio</a><a href="certifications.php">Certifications</a><a href="resume.php">Resume</a><a href="blogs.php">Blog</a><a href="contact.php">Contact</a>
  </nav>
</header>
<main>
