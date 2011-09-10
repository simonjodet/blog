var http = require('http'), querystring = require('querystring'), sqlite = require('sqlite');

var db = new sqlite.Database();

http.createServer(function (req, res) {
  // Open the database
  db.open('../search_indexer/search.db', function (error) {
    if (error) {
      console.log(error);
      // Return empty results
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(new Array())+'\n');
    }
    // Handle the search query
    var queryParameters = querystring.parse(req.url);
    var searchStrings = [];
    for (var key in queryParameters) {
      if (queryParameters.hasOwnProperty(key) && key.replace(/[^A-Za-z0-9 ]/gi,'') == 'search') {
        searchStrings = queryParameters[key].replace(/[^A-Za-z0-9 ]/gi,'').split(' ');
      }
    }
    // Build the SQL query
    var additionnalStrings = '';
    if(searchStrings.length > 1) {
      for(var i=1; i < searchStrings.length; i++) {
        additionnalStrings = additionnalStrings + ' AND content LIKE "%' + searchStrings[i] + '%"';
      }
    }
    if(searchStrings.length > 0 && searchStrings[0] != '') {
      var sql = 'SELECT DISTINCT post, content FROM posts WHERE content LIKE "%' + searchStrings[0] + '%"' + additionnalStrings + ';';
      // console.log(sql);
      db.execute( sql, [],
        function (error, rows) {
          if (error) {
            console.log(error);
            // Return empty results
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(new Array())+'\n');
          }
          // Return results
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(JSON.stringify(rows)+'\n');
        }
      );
    }
    else {
      // Return empty results
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(new Array())+'\n');
    }
  }
);
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');