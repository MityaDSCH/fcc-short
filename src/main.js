'use strict';

var express = require('express');
var mongoose = require('mongoose');
var validator = require('validator');
var Store = require('./shortcut.model.js');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/fcc-short';
mongoose.connect(mongoURI);
require('./seedStore.js');

var app = express();
app.use('/', express.static('./'));

app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/src/index.html');
  });

app.route('/new/:url') // creates new shortcut
  .get(function(req, res) {
    var url = req.params.url;
    if (url.substr(0, 7) !== 'http://' && url.substr(0, 8) !== 'https://') {
      url = 'http://' + url;
    }
    var returned = false;
    Store.find({originalUrl: url}).exec(function(err, obj) {
      if (obj.length === 1) { // if url is already in db return the existing data

        res.json({
          original_url: obj[0].originalUrl,
          short_url: obj[0].shortUrl
        });

      } else if (validator.isURL(url)) { // othersise if the url is valid store a new doc and return data

        Store.count({}).exec(function(err, num) {
          Store.create({
            originalUrl: url,
            shortUrl: 'http://fcc-short.herokuapp.com/' + num,
            shortcut: num
          }, function(err, result) {
            res.json({
              original_url: result.originalUrl,
              short_url: result.shortUrl
            });
          });
        });

      } else {
        res.status(500).send('Looks like your url is invalid');
      }
    });

    // res.json({
    //   original_url: null,
    //   short_url: null
    // });
  });

app.route('/:shortcut') // redirects
  .get(function(req, res) {
    if (req.params.shortcut === 'favicon.ico') {
      res.status(404).send();
    } else {
      Store.findOne({shortcut: req.params.shortcut}).exec(function(err, obj) {
        console.log(err, obj);
        if (err || obj === null) {
          res.status(500).send("Looks like there's no shortcut with that name");
        } else {
          res.redirect(302, obj.originalUrl);
        }
      });
    }
  });

app.listen(process.env.PORT || 8080, function(req, res) {
  console.log('listening');
});
