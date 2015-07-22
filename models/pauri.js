// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define pauri schema
var PauriSchema = new Schema({
  pid: Number,
  gurmukhi: String
  
  // thoughts: [{
  //   type: Schema.Types.ObjectId,
  //   ref:'Thought'
  // }]

});

// create and export Pauri model
var Pauri = mongoose.model('Pauri', PauriSchema);
module.exports = Pauri;



