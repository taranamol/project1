$(function() {


// APPENDING THE PAURIS ONTO THE PAGE
var paurisController = {

paurisTemplate: _.template($('#paurisTemplate').html()),

    all: function() {
      console.log("calling all");
      $.get('/pauris', function(data) {
        var allPauris = data;
        _.each(allPauris, function(pauris) {
          //append the pauris so they appear on the page
          var $paurisHtml = $(paurisController.paurisTemplate(pauris));
          console.log($paurisHtml);
          $('#paurisList').append($paurisHtml); 
          console.log(allPauris);
        });
      });
    }
  };

  paurisController.all();


// APPENDING THE THOUGHTS ONTO THE PAGE
var thoughtsController = {

thoughtsTemplate: _.template($('#thoughtsTemplate').html()),

    all: function() {
      console.log("calling all");
      $.get('/thoughts', function(data) {
        var allThoughts = data;
        _.each(allThoughts, function(thoughts) {
          //append the thoughts so they appear on the page
          var $thoughtsHTML = $(thoughtsController.thoughtsTemplate(thoughts));
          console.log($thoughtsHTML);
          $('#listOfThoughts').append($thoughtsHTML); 
          console.log(allThoughts);
        });
      });
    },

  create: function(newThought) {
    var thoughtData = {thoughtText: newThought};
    console.log(thoughtData);
    // this is creating a a request to the server to create a new thought 
    $.post('/thoughts', thoughtData, function(data) {
      //passing through the thoughtTemplate to show the thought on the page
      var $thoughtsHTML = $(thoughtsController.thoughtsTemplate(data));
      $('#listOfThoughts').append($thoughtsHTML); 
    });
  },

  setupView: function() {
    //existing thoughts onto the page 
    thoughtsController.all()

    $('#submitThought').on('submit', function(event) {
      event.preventDefault();
      var thoughtText = $('#thoughtText').val();
      console.log(thoughtText);
      thoughtsController.create(thoughtText);
    });
  }



// CLOSES THE THOUGHTSCONTROLLER
}

thoughtsController.setupView()


//CLOSES THE WHOLE FUNCTION
});




