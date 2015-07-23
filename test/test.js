var request = require('request'),
    expect = require('chai').expect
    baseUrl = 'http://localhost:3000/', 
    baseUrlLogin = 'http://localhost:3000/login',
    user = {email: "testemail", password: "password"};
    

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

//static route to home page
describe('GET /', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});


//static route to login page
describe('GET /login', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrlLogin + '/login', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});