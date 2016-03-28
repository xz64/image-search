var express = require('express');

var imageService = require('./src/imageService.js');

var app = express();
var port = +process.env.PORT || 8080;

app.listen(port);
