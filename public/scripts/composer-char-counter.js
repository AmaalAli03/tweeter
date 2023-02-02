$(document).ready(function() {
  
  console.log("We are ready")
  $("#tweet-text").on("input",function () {
    let maxCount = 140;
    let count = $('.tweet-footer1').find('.counter');
    console.log(count);
    let countChar = $(this).val().length;
    let countRemainder = maxCount - countChar;
    count.text(countRemainder)
    if (countChar > maxCount) {
      count.addClass("countLimit");
    } else {
      count.removeClass("countLimit");
    }
    
  });
});

  
  
  
  
  
   