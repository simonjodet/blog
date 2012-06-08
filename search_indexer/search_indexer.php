<?php
$db_file = __DIR__.'/search.sqlite';
if(file_exists($db_file)){
    unlink($db_file);
}
$db = new PDO('sqlite:'.$db_file);
$sql = 'CREATE TABLE posts (id INTEGER PRIMARY KEY NOT NULL, post TEXT NOT NULL, title TEXT NOT NULL, date TEXT NOT NULL, content TEXT NOT NULL);';
$db->exec($sql);
$keywords = file_get_contents(__DIR__.'/../_site/search/keywords.html');
$raw_posts = explode('---POST_SPLIT---', $keywords);
unset($raw_posts[count($raw_posts)-1]);
$posts = array();
foreach($raw_posts as $raw_post){
    $post = array();
    preg_match('/.*---POST_URL_S---(.*)---POST_URL_E---.*/', $raw_post, $matches);
    $post['post'] = $matches[1];
    preg_match('/.*---POST_DATE_S---(.*)---POST_DATE_E---.*/', $raw_post, $matches);
    $post['date'] = $matches[1];
    preg_match('/.*---POST_TITLE_S---(.*)---POST_TITLE_E---.*/', $raw_post, $matches);
    $post['title'] = $matches[1];
    $content = preg_replace('/---POST_URL_S---.*---POST_URL_E---/i', ' ', $raw_post);
    $content = preg_replace('/---POST_DATE_S---.*---POST_DATE_E---/i', ' ', $content);
    $content = preg_replace('/---POST_TITLE_S---.*---POST_TITLE_E---/i', ' ', $content);
    $content = strip_tags($content);
    preg_match_all('/\b[a-z0-9]+\b/i', $content, $matches);
    $content = implode(' ', $matches[0]);
    
    $post['content'] = $content;
    $db->exec('INSERT INTO posts (post, title, date, content) VALUES ("'.$post['post'].'","'.$post['title'].'","'.$post['date'].'","'.$post['content'].'")');
    $posts[] = $post;
}
$db = null;