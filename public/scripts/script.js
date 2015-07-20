$(function() {

// //template: connecting the html & js
// var thoughtsTemplate = _.template($('#thoughtsTemplate').html()); 

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


});