var Thought = require("../script.js"); //importing the script.js
var request = require('request')
  , expect = require('chai').expect

// DESCRIBE WHAT WE ARE TESTING
  // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
    // SEND THE REQUEST
      // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
      // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
      // CALL DONE();

describe('Google.com', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('https://google.com/', function(err, res, body) {
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      done();
    })
  })
});

describe("testing the add function", function() {
  it("should add a thought", function(done) {
    var newThought = new Thought();
    
    newThought.add("hello this is a test");
    
    expect(myLib.all().length).equal(1);
    // expect(myLib.all()[].id).equal(1);
    done();
  });
});