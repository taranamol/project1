var express = require('express')
  app = express(),
  bodyParser = require('body-parser'),
  _=require('underscore'),
  mongoose = require('mongoose'),
  session = require('express-session');

// connecting the pauris to the model which is going to grab the information 
// from mongoose & bring it back from db
var Pauri = require('./models/pauri');
var Thought = require('./models/thought'); 
var User = require('./models/user');

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/Granth'
  // plug in the db name 
);

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
//connecting the css/js to the server.js
app.use(express.static(__dirname + '/public'));


//////CONFIGURE SESSION
// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));


/////////////////MIDDLEWARE

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

///////////////AUTH ROUTES////////////////

// login route (renders login view)
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});

// app.get('/signup', function (req, res) {
//   res.sendFile(__dirname + '/login.html');
//   //CHANGED THIS FROM JUST "COMING SOON"
//   // DO I NEED THIS BECAUSE IT IS GOING TO SAME PLACE?
// });

// user submits the signup form
app.post('/users', function (req, res) {

  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(newUser.email, newUser.password, function (err, user) {
    res.send(user);
  });
});


// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    // saves user id to session
    req.login(user);

    // redirect to user profile
    res.redirect('/');
  });
});

// // // user profile page
// app.get('/profile', function (req, res) {
//   // finds user currently logged in
//   req.currentUser(function (err, user) {
//     res.send('Welcome ' + user.email);
//   });
// });


///////////////STATIC ROUTES//////////////////

//SEND HTML TO ROOT - HOMEPAGE
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


///////////////API ROUTES////////////////

///////////////PAURIS ROUTES

//GET ALL PAURIS
app.get('/pauris', function (req, res) {
  Pauri.find(function (err, pauri) {
    res.json(pauri);
  });
});


///////////////THOUGHTS ROUTES

//GET ALL THOUGHTS
app.get('/thoughts', function (req, res) {
  Thought.find(function (err, thought) {
    res.json(thought);
  });
});

//CREATE THOUGHT 
app.post('/thoughts', function (req, res) {
  var newThought = new Thought ({
    thoughtText: req.body.thoughtText
  });
  newThought.save(function (err, savedThought) {
    res.json(savedThought);
  });
});

//FIND THOUGHT BY ID FUNCTION
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








