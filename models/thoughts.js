// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define thoguhts schema
var ThoughtsSchema = new Schema({
  thoughtText: String
});

// create and export Thoughts model
var Thoughts = mongoose.model('Thoughts', ThoughtsSchema);
module.exports = Thoughts;