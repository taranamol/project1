$(function() {

$.backstretch("http://www.bespokepixels.co.uk/code/parallax/parallax.jpg");

// APPENDING THE PAURIS ONTO THE PAGE
var paurisController = {

  paurisTemplate: _.template($('#paurisTemplate').html()),

  all: function() {
    console.log("calling all");
    $.get('/pauris', function(data) {
      var allPauris = data;
      _.each(allPauris, function(pauri) {
          //append the pauris so they appear on the page
          var $pauriHtml = $(paurisController.paurisTemplate(pauri));
          // console.log($paurisHtml);
          $('#paurisList').append($pauriHtml); 
          // console.log(allPauris);
          _.each(pauri.thoughts, function(thought) {
            var $thoughtHTML = $(thoughtsController.thoughtsTemplate(thought));
          //with the listOfThoughts with a certain data-id with the id of the pauri
          $('.listOfThoughts[data-id=' + pauri._id + ']').append($thoughtHTML); 
          // console.log(allThoughts);
        });
        });
    });
  },

  create: function(newThought, pauriId) {
    var thoughtData = {thoughtText: newThought};
    console.log(thoughtData); { 
       // this is creating a a request to the server to create a new thought 
       $.post('/pauris/'+pauriId+'/thoughts', thoughtData, function(data) {
         //passing through the thoughtTemplate to show the thought on the page
         var $thoughtHTML = $(thoughtsController.thoughtsTemplate(data));
         //with the listOfThoughts with a certain data-id with the id of the pauri
         $('.listOfThoughts[data-id=' + pauriId+ ']').append($thoughtHTML); 
       });}
     },

     setupView: function() {
      console.log("setupView");
    //existing thoughts onto the page 
    paurisController.all()

    $('#paurisList').on('submit', ".submitThought", function(event) {
      console.log("sub");
      event.preventDefault();
      var thoughtText = $(this).find('.thoughtText').val();
      var pauriId = $(this).attr('data-id');
      console.log(thoughtText);
      paurisController.create(thoughtText, pauriId);
    });
  }

};
//CLOSES PAURI CONTROLLER 

paurisController.setupView();


// APPENDING THE THOUGHTS ONTO THE PAGE
var thoughtsController = {

  thoughtsTemplate: _.template($('#thoughtsTemplate').html()),

  all: function() {
      // console.log("calling all");
      $.get('/thoughts', function(data) {
        var allThoughts = data;
        _.each(allThoughts, function(thoughts) {
          //append the thoughts so they appear on the page
          var $thoughtsHTML = $(thoughtsController.thoughtsTemplate(thoughts));
          // console.log($thoughtsHTML);
          $('#listOfThoughts').append($thoughtsHTML); 
          // console.log(allThoughts);
        });
        thoughtsController.addEventHandlers();
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

  update: function (thoughtId, updatedThought) {
    console.log('hello');
    $.ajax({
      type: 'PUT',
      url: '/thoughts/' + thoughtId,
      data: {
        thoughtText: updatedThought
      },
      success: function(data) {
        var $thoughtsHTML = $(thoughtsController.thoughtsTemplate(data));
        $('#thought-' + thoughtId).replaceWith($thoughtsHTML);
      }
    });
    console.log('success'); 
  },

  delete: function (thoughtId) {
    //sending a request to the server to delete the thought
    $.ajax ({
      type: 'DELETE',
      url: '/thoughts/' + thoughtId,
      success: function(data) {
        $('#thought-' + thoughtId).remove();
      } 
    });
  },

  addEventHandlers: function() {
    // $('#thoughtsTemplate')
      // for update: submit event on `.updatedThought` form
      $('#listOfThoughts').on('submit', '.updatedComment', function(event) {
        event.preventDefault();
        var thoughtId = $(this).closest('.thought').attr('data-id');
        // console.log(thoughtId);
        var updatedThought = $(this).find('.updatedThought').val();
        // console.log(updatedThought);
        thoughtsController.update(thoughtId, updatedThought);
      })
      // for delete on the .deleteComment button
      $('#listOfThoughts').on('click', '.deleteComment', function(event) {
        event.preventDefault();
        var thoughtId = $(this).closest('.thought').attr('data-id');
        thoughtsController.delete(thoughtId);
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


}
// CLOSES THE THOUGHTSCONTROLLER

thoughtsController.setupView()


//CLOSES THE WHOLE FUNCTION
});




