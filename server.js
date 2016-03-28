var express = require('express');

var imageService = require('./src/imageService.js');

var app = express();
var port = +process.env.PORT || 8080;

app.get('/api/imagesearch/:query', function(req, res) {
  var query = req.params.query;
  var page = req.query.offset;
  imageService.query(query, page)
  .then(function(data) {
   res.json(data);
  });
});

app.get('/api/latest/imagesearch', function(req, res) {
  res.json(imageService.recentSearches);
});

app.listen(port);
