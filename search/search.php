<?php
$db_file = __DIR__.'/../../search_indexer/search.sqlite';
$db = new PDO('sqlite:'.$db_file);
// $search_words = preg_match_all('/\b[a-z0-9]+\b/i', $content, $matches);
$sql = 'SELECT DISTINCT post, title, date, content FROM posts WHERE content LIKE "%'.$_GET['search'].'%";';
// $sql = 'SELECT DISTINCT post, title, date, content FROM posts;';
$result = $db->query($sql);
$result->setFetchMode(PDO::FETCH_NAMED);
echo json_encode($result->fetchAll());
$db = null;
echo PHP_EOL;