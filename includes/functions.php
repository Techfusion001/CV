<?php
require_once __DIR__ . '/config.php';
function e($value){ return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'); }
function data_file($name){ return DATA_PATH . $name . '.json'; }
function read_json($name){ $file=data_file($name); if(!file_exists($file)) return []; $json=file_get_contents($file); $data=json_decode($json,true); return is_array($data)?$data:[]; }
function write_json($name,$data){ $file=data_file($name); $tmp=$file.'.tmp'; file_put_contents($tmp,json_encode($data,JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES),LOCK_EX); rename($tmp,$file); }
function find_by_slug($items,$slug){ foreach($items as $item){ if(($item['slug']??'')===$slug) return $item; } return null; }
function slugify($text){ $text=preg_replace('~[^\pL\d]+~u','-', $text); $text=iconv('utf-8','us-ascii//TRANSLIT',$text); $text=preg_replace('~[^-\w]+~','',$text); $text=trim($text,'-'); $text=preg_replace('~-+~','-',$text); return strtolower($text ?: 'item-'.time()); }
function csrf_token(){ if(empty($_SESSION['csrf'])) $_SESSION['csrf']=bin2hex(random_bytes(32)); return $_SESSION['csrf']; }
function verify_csrf(){ if(($_POST['csrf']??'') !== ($_SESSION['csrf']??'')){ http_response_code(403); exit('Invalid security token.'); } }
function is_admin(){ return !empty($_SESSION['admin_logged_in']); }
function require_admin(){ if(!is_admin()){ header('Location: login.php'); exit; } }
function excerpt($text,$limit=140){ $text=strip_tags((string)$text); return strlen($text)>$limit?substr($text,0,$limit-3).'...':$text; }
function upload_image($field, $fallback=''){
    if(empty($_FILES[$field]['name'])) return $fallback;
    if(!is_dir(UPLOAD_PATH)) mkdir(UPLOAD_PATH,0775,true);
    $allowed=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/svg+xml'=>'svg','image/gif'=>'gif'];
    $mime=mime_content_type($_FILES[$field]['tmp_name']);
    if(!isset($allowed[$mime])) return $fallback;
    if($_FILES[$field]['size'] > 5*1024*1024) return $fallback;
    $name=uniqid('upload_',true).'.'.$allowed[$mime];
    move_uploaded_file($_FILES[$field]['tmp_name'], UPLOAD_PATH.$name);
    return 'assets/uploads/'.$name;
}
function upload_media($field, $fallback=''){
    if(empty($_FILES[$field]['name'])) return $fallback;
    if(!is_dir(UPLOAD_PATH)) mkdir(UPLOAD_PATH,0775,true);
    $allowed=[
        'image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/svg+xml'=>'svg','image/gif'=>'gif',
        'video/mp4'=>'mp4','video/webm'=>'webm','video/ogg'=>'ogg','application/octet-stream'=>'mp4'
    ];
    $mime=mime_content_type($_FILES[$field]['tmp_name']);
    if(!isset($allowed[$mime])) return $fallback;
    if($_FILES[$field]['size'] > 35*1024*1024) return $fallback;
    $name=uniqid('media_',true).'.'.$allowed[$mime];
    move_uploaded_file($_FILES[$field]['tmp_name'], UPLOAD_PATH.$name);
    return 'assets/uploads/'.$name;
}
function is_video($path){ $path=parse_url((string)$path, PHP_URL_PATH) ?: (string)$path; $ext=strtolower(pathinfo($path, PATHINFO_EXTENSION)); return in_array($ext,['mp4','webm','ogg']); }
function media_tag($path, $class='bg-media', $poster=''){
    $src=e($path);
    if(!$src) return '';
    if(is_video($path)){
        $posterAttr=$poster ? ' poster="'.e($poster).'"' : '';
        return '<video class="'.e($class).'" autoplay muted loop playsinline preload="metadata"'.$posterAttr.'><source src="'.$src.'"></video>';
    }
    return '<img class="'.e($class).'" src="'.$src.'" alt="">';
}
?>