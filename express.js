var express = require('express');
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 80!')
})


