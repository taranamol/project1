  //constructor function 
  function ThoughtsComments (thoughtText) {
    this.thoughtText = thoughtText;
  };

  //variable to hold all of the instances
  ThoughtsComments.all = [];

  ThoughtsComments.prototype.save = function(){
    ThoughtsComments.all.push(this);
    console.log(this);
  };

 
  ThoughtsComments.prototype.render = function() {
  _.each(ThoughtsComments.all, function (comment, index) {
    var $comment = $(thoughtsTemplate(this));
    $comment.attr('data-index', index);
    $listOfThoughts.append($comment)
    console.log("render works")
    });
  };


    //listens to the click for the submit
    $submitThought.on("submit", function(event) {
      event.preventDefault();

      console.log('form submitted!'); //printing that the submit button was clicked
      console.log($('#thoughtText').val() ); //to do list info

      
      // create new todo object from form data
      var commentText = $('#thoughtText').val();
      console.log($('#thoughtText').val() );

      var comment1 = new ThoughtsComments(thoughtText);
      comment1.save();
      comment1.render();
    

      // //this is for the to do list items that newly added in
      var $listThoughts = $("#listOfThoughts .thoughtsAppend"); 
      $listThoughts.click(function (event) {
      event.preventDefault();
      $(this).addClass("done");
       }) 

      });