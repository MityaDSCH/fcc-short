'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Store = new Schema({
  originalUrl: String,
  shortUrl: String,
  shortcut: Number
});

module.exports = mongoose.model('Store', Store);
