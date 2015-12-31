'use strict';

var Store = require('./shortcut.model.js');

Store.find({}).remove().exec(function() {
  Store.create({
    originalUrl: 'http://whateverurliwouldlikeshorter.com',
    shortUrl: 'http://fcc-short.herokuapp.com/0',
    shortcut: 0
  });
});
