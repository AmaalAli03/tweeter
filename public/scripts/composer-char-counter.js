$(document).ready(function() {
  
  console.log("We are ready")
  $("#tweet-text").on("input",function () {
    let maxCount = 140;
    // console.log($(this).val().length);
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
    // console.log("You have ikeypress ",$(this).val())
  });
});

  
  
  
  
  // document.addEventListener("keypress", (event) => {
  //         // console.log(event);
  //         console.log("You have ikeypress ",this.event);
  //       });

   