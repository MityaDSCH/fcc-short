'use strict';

var express = require('express');
var mongoose = require('mongoose');
var Store = require('./shortcut.model.js');

var app = express();

app.use('/', express.static('./'));

app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/src/index.html');
  });

app.route('/new/:url') // creates new shortcut
  .get(function(req, res) {
    // url is in store and return existing shortcut if so
    // check if url is valid
      // save url to store and generate shortcut
      // send return object
  });

app.route('/:shortcut') // redirects
  .get(function(req, res) {

  });

app.listen(process.env.PORT || 8080, function(req, res) {
  console.log('listening');
});
