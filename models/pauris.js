// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define pauri schema
var PaurisSchema = new Schema({
  pid: Number,
  gurmukhi: String,
});

// create and export Pauri model
var Pauris = mongoose.model('Pauris', PaurisSchema);
module.exports = Pauris;