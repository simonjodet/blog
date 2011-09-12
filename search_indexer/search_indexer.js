var sys = require('sys'), sqlite = require('sqlite'), fs = require('fs');

var db = new sqlite.Database();

var postKeywords = {
  'posts': null,
  'post': null,
  'post_id': null,
  'words': null,
  'callback': function(){},
  'finalCallback':function(){},
  'iteratePosts': function()
  {
    postKeywords.post = {
      'post': postKeywords.posts[0].match(/---POST_URL_S---(.*)---POST_URL_E---/)[1],
      'date': postKeywords.posts[0].match(/---POST_DATE_S---(.*)---POST_DATE_E---/)[1],
      'title': postKeywords.posts[0].match(/---POST_TITLE_S---(.*)---POST_TITLE_E---/)[1],
      'content': postKeywords.posts[0].replace(/---POST_URL_S---.*---POST_URL_E---/i,'').replace(/---POST_DATE_S---.*---POST_DATE_E---/i,'').replace(/---POST_TITLE_S---.*---POST_TITLE_E---/i,'').replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, ' ').replace(/\n/gi, ' ').replace(/\s{2,}/gi,' ')
    };
    // console.log(postKeywords.post);
    postKeywords.words = postKeywords.posts[0].toLowerCase().replace(/---POST_URL_S---.*---POST_URL_E---/i,'').replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, ' ').replace(/\n/gi, ' ').replace(/[^A-Za-z0-9]/gi,' ').replace(/\b[A-Za-z0-9]{1,2}\b/gi,' ').replace(/\s{2,}/gi,' ').replace(/^\s+/, '').replace(/\s+$/, '').split(' ');
    postKeywords.posts.shift();
    if(postKeywords.posts.length > 1){
      postKeywords.callback = postKeywords.iteratePosts;
    }
    else{
      postKeywords.callback = postKeywords.finalCallback;
    }
    postKeywords.createPost();
  },
  'createPost': function(){
    var sql = 'INSERT INTO posts (post, title, date, content) VALUES ("' + postKeywords.post.post + '", "' + postKeywords.post.title + '", "' + postKeywords.post.date + '", "' + postKeywords.post.content.replace(/"/, '') + '")';
    db.execute( sql, [],
      function (error, rows) {
        if (error && error.message == 'constraint failed') {
          var sql = "SELECT id FROM posts WHERE post = '" + postKeywords.post.post + "';";
          db.execute( sql, [],
            function (error, rows) {
              if (error) {
                throw error;
              }
              postKeywords.post_id = rows[0]['id'];
              // console.log('post already existing at ', postKeywords.post_id);
              postKeywords.insertWords();
            }
          );
        }
        else {
          var sql = 'SELECT last_insert_rowid() FROM posts;';
          db.execute( sql, [],
            function (error, rows) {
              if (error) {
                throw error;
              }
              postKeywords.post_id = rows[0]['last_insert_rowid()'];
              // console.log('post inserted at id', postKeywords.post_id);
              postKeywords.insertWords();
            }
          );
        }
      }
    );
  },
  'insertWords': function() {
    word = postKeywords.words[0];
    postKeywords.words.shift();
    var sql = 'INSERT INTO words (word) VALUES ("' + word + '")';
    db.execute( sql, [],
      function (error, rows) {
        if (error && error.message == 'constraint failed') {
          var sql = "SELECT id FROM words WHERE word = '" + word + "';";
          db.execute( sql, [],
            function (error, rows) {
              if (error) {
                throw error;
              }
              // console.log('word', word, 'already existing at', rows[0]['id']);
              if(postKeywords.words.length > 1){
                postKeywords.insertWords();
              }
              else{
                postKeywords.callback();
              }
            }
          );
        }
        else {
          var sql = 'SELECT last_insert_rowid() FROM words;';
          db.execute( sql, [],
            function (error, rows) {
              if (error) {
                throw error;
              }
              // console.log('word', word, 'inserted at id', rows[0]['last_insert_rowid()']);
              if(postKeywords.words.length > 1){
                postKeywords.insertWords();
              }
              else{
                postKeywords.callback();
              }
            }
          );
        }
      }
    );
  }
};
fs.unlink('search.db', function(error){
  if (error) {
    console.log(error);
  }
  // console.log('Database erased.')
  db.open('search.db', function (error) {
    if (error) {
      console.log(error);
      throw error;
    }
    var sql = 'CREATE TABLE IF NOT EXISTS "posts" ("id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, "post" TEXT NOT NULL UNIQUE, "title" TEXT NOT NULL, "date" TEXT NOT NULL, "content" TEXT NOT NULL);';
    db.execute( sql, [],
      function (error, rows) {
        if (error) {
          throw error;
        }
        // console.log("posts table created.");
        var sql = 'CREATE TABLE IF NOT EXISTS "words" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "word" TEXT NOT NULL UNIQUE);';
        db.execute( sql, [],
          function (error, rows) {
            if (error) {
              throw error;
            }
            // console.log("words table created.");
            fs.readFile('../_site/search/keywords.html', function (err, data) {
              if (err) {
                throw err;
              }
              postKeywords.posts = data.toString().split('---POST_SPLIT---');
              postKeywords.finalCallback = function(){
                console.log("I'm done!");
              };
              postKeywords.iteratePosts();
            });
          }
        );
      }
    );
  });
});