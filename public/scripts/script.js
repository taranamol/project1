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
// var thoughtsController = {

// thoughtsTemplate: _.template($('#thoughtsTemplate').html()),

//     all: function() {
//       console.log("calling all");
//       $.get('/thoughts', function(data) {
//         var allThoughts = data;
//         _.each(allThoughts, function(thoughts) {
//           //append the thoughts so they appear on the page
//           var $thoughtsHTML = $(thoughtsController.thoughtsTemplate(thoughts));
//           console.log($thoughtsHTML);
//           $('#listOfThoughts').append($thoughtsHTML); 
//           console.log(allThoughts);
//         });
//       });
//     }
//   };

//   thoughtsController.all();



});