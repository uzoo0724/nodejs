// var http = require('http');
// var url = require('url');
// var qs = require('querystring');
// var db = require('./lib/db.js');

// var app = http.createServer(function (request, response) {
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     if (_url == '/') {
//         _url = '/index.html';
//     }
//     if (_url == '/favicon.ico') {
//         return response.writeHead(404);
//     }
//     response.writeHead(200);
//     response.end(queryData.id);
// });
// app.listen(3000);

const express = require('express');
const app = express();
var fs = require('fs');
var template = require('./lib/template.js');

app.get('/', (req, res) => {
  fs.readdir('./data', function(err, filelist) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.HTML(title, list,
                             `<h2>${title}</h2>${description}`,
                             `a href="/create">create</a>`
                             );
    res.send(html);
  });
});
app.get('/page', (req, res) => res.send('/page'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
