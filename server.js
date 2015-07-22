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
var Pauri = require('./models/pauri');

var Thought = require('./models/thought'); 

//this is going to send the html to the root
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/Granth'// plug in the db name you've been using
);

///////////////API ROUTES//////////////////


///////////////PAURIS ROUTES////////////////

//this is /get route which will get all the pauris in the server
app.get('/pauris', function (req, res) {
  Pauri.find(function (err, pauri) {
    res.json(pauri);
  });
});


///////////////THOUGHTS ROUTES////////////////

//this is /get route which will get all the thoughts in the server
app.get('/thoughts', function (req, res) {
  Thought.find(function (err, thought) {
    res.json(thought);
  });
});

app.post('/thoughts', function (req, res) {
  var newThought = new Thought ({
    thoughtText: req.body.thoughtText
  });
  newThought.save(function (err, savedThought) {
    res.json(savedThought);
  });
});

//find thought by ID
app.get('/thoughts/:id', function (req, res) {
  // set the valueof the id
  var targetId = req.params.id;

  // find thought in db by id
  Thought.findOne({_id:targetId}, function (err, foundThought) {
    res.json(foundThought);
  });
});

//UPDATE FUNCTION // DOES NOT WORK //
app.put('/thoughts/:id', function (req, res) {
   console.log(req.params.id, "req.params");
  var targetId = req.params.id;

  Thought.findOne({_id: targetId}, function (err, foundThought) {
    foundThought.thoughtText = req.body.thoughtText;
    console.log(foundThought.thoughtText, "foundthough");

    foundThought.save(function (err, savedThought) {
      res.json(savedThought);
      console.log(savedThought, "savedthought");
    });
  });
});

//DELETE FUNCTION // DOES NOT WORK //
app.delete('/thoughts/:id', function (req, res) {
  var targetId = req.params.id; 

  Thought.findOneAndRemove({_id: targetId}, function (err, deletedThought) {
    res.json(deletedThought);
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('server started on locahost:3000');
  });








