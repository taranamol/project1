// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define thoguhts schema
var ThoughtSchema = new Schema({
  thoughtText: String
});

// create and export Thoughts model
var Thought = mongoose.model('Thought', ThoughtSchema, 'thoughts'); 
module.exports = Thought;