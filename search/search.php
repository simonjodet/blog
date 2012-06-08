<?php
$db_file = __DIR__.'/../../search_indexer/search.sqlite';
$db = new PDO('sqlite:'.$db_file);
$_GET['search'] = 'php tdd';
$search_words = preg_match_all('/\b[a-z0-9]+\b/i', $_GET['search'], $matches);
$words = $matches[0];
$other_words_query = '';
for($i = 1; $i < count($words);$i++){
    $other_words_query .= ' AND content LIKE "%' . $words[$i] . '%"';
}
$sql = 'SELECT DISTINCT post, title, date, content FROM posts WHERE content LIKE "%'.$words[0].'%"'.$other_words_query.';';
$result = $db->query($sql);
$result->setFetchMode(PDO::FETCH_NAMED);
echo json_encode($result->fetchAll());
$db = null;
echo PHP_EOL;