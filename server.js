var express = require('express')
  app = express(),
  bodyParser = require('body-parser'),
  _=require('underscore'),
  mongoose = require('mongoose'),
  session = require('express-session');

var bcrypt = require('bcrypt'),
  salt = bcrypt.genSaltSync(10);

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/Granth'
  // plug in the db name 
);
// connecting the pauris to the model which is going to grab the information 
// from mongoose & bring it back from db
var Pauri = require('./models/pauri');
var Thought = require('./models/thought'); 

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
//connecting the css/js to the server.js
app.use(express.static(__dirname + '/public'));

//this is going to send the html to the root
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


// //CONFIGURE SESSION
// app.use(session({
//   saveUninitialized: true,
//   resave: true,
//   secret: 'SuperSecretCookie',
//   cookie: { maxAge: 60000 }
// }));

// /////MIDDLEWARE
// // middleware to manage sessions
// app.use('/', function (req, res, next) {
//   // saves userId in session for logged-in user
//   req.login = function (user) {
//     req.session.userId = user.id;
//   };

//   // finds user currently logged in based on `session.userId`
//   req.currentUser = function (callback) {
//     User.findOne({_id: req.session.userId}, function (err, user) {
//       req.user = user;
//       callback(null, user);
//     });
//   };

//   // destroy `session.userId` to log out user
//   req.logout = function () {
//     req.session.userId = null;
//     req.user = null;
//   };

//   next();
// });


///////////////AUTH ROUTES//////////////////


///////////////USER ROUTES//////////////////
// create new user with secure password
// app.post('/users', function (req, res) {
//   var newUser = req.body.user;
//   User.createSecure(newUser, function (err, user) {
//     // log in user immediately when created
//     req.login(user);
//     res.redirect('/pauris'); //should this redirect to thoughts or pauris?
//   });
// });


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
  // set the value of the id
  var targetId = req.params.id;
  // find thought in db by id
  Thought.findOne({_id:targetId}, function (err, foundThought) {
    res.json(foundThought);
  });
});

//UPDATE FUNCTION 
app.put('/thoughts/:id', function (req, res) {
  var targetId = req.params.id;
  console.log(req.params.id, "req.params.id");
  Thought.findOne(targetId, function (err, foundThought) {
    foundThought.thoughtText = req.body.thoughtText;
    console.log(foundThought.thoughtText, "foundthought");

    foundThought.save(function (err, savedThought) {
      res.json(savedThought);
      console.log(savedThought, "savedthought");
    });
  });
});

//DELETE FUNCTION 
app.delete('/thoughts/:id', function (req, res) {
  var targetId = req.params.id; 

  Thought.findOneAndRemove({_id: targetId}, function (err, deletedThought) {
    res.json(deletedThought);
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('server started on locahost:3000');
  });








