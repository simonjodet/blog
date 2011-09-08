var http = require('http'), querystring = require('querystring');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  console.log(querystring.parse(req.url));
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
/*
SELECT DISTINCT posts.post
FROM posts, words, words_posts
WHERE words.word = 'any'
AND posts.id = words_posts.post_id
AND words.id = words_posts.word_id;
//*/