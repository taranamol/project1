// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  name: String
  //author has many thoughts
});

var Author = mongoose.model('Author', AuthorSchema);