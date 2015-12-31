'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Store = new Schema({
  urlMap: Object
});

module.exports = mongoose.model('Store', Store);
