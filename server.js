var express = require('express')
  app = express(),
  bodyParser = require('body-parser'),
  _=require('underscore'),
  mongoose = require('mongoose');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

//connecting the css/js to the server.js
app.use(express.static(__dirname + '/public'));

// connecting the pauris to the model which is going to grab the information 
// from mongoose & bring it back from db
var Pauris = require('./models/pauris');

//this is going to send the html to the root
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

//connect to db called depthsofGranth
mongoose.connect('mongodb://localhost/Granth');

//APT routes

//this is /get route which will get all the data in the server
app.get('/pauris', function (req, res) {
  Pauris.find(function (err, pauris) {
    res.json(pauris);
  });
});

app.listen(3000, function () {
  console.log('server started on locahost:3000');
});