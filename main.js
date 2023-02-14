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
var path = require('path');
var sanitizeHtml = require('sanitize-html');

app.get('/', (req, res) => {
  fs.readdir('./data', function (err, filelist) {
    console.log(filelist);
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

app.get('/page/:pageId', (req, res) => {
  fs.readdir('./data', function (err, filelist) {
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
      var title = req.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });
      var list = template.list(filelist);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `<a href="/create">create</a>
          <a href="/update?id=${sanitizedTitle}">update</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      res.send(html);
    })
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
