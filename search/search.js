var http = require('http'), querystring = require('querystring'), sqlite = require('sqlite');

var db = new sqlite.Database();

http.createServer(function (req, res) {
  db.open('../search_indexer/search.db', function (error) {
    if (error) {
      console.log(error);
      throw error;
    }
    var queryParameters = querystring.parse(req.url);
    var searchString = '';
    for (var key in queryParameters) {
      if (queryParameters.hasOwnProperty(key) && key.replace(/[^A-Za-z0-9 ]/gi,'') == 'search') {
        searchString = queryParameters[key].replace(/[^A-Za-z0-9 ]/gi,'');
      }
    }
    var sql = 'SELECT post FROM posts WHERE content LIKE "%' + searchString + '%";';
    db.execute( sql, [],
      function (error, rows) {
        if (error) {
          throw error;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(rows)+'\n');
      }
    );
  }
);
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');