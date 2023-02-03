/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $(".angles-down").on("click", function() {
    $('.new-tweet').toggle();
    $('.tweet-words').focus();
  });
  // $(window).scroll(function (event) {
  //   var scroll = $(window).scrollTop();
  //   // Do something
  //   console.log(scroll);
  // });
  //prevent XXS in the html
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //renderTweets
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').prepend($tweet);

    }
  };
  //creates tweet
  const createTweetElement = (tweet) => {
    const $tweet = `
    <div class="article-box">
    <article class="article">
<div class="avatar-username">
  <div class="avatar-name">
    <h1 class="avatar-image"><img src="${tweet.user.avatars}"></h1>
  </div>
  <div class="user-names">
    <div class="name">${tweet.user.name}</div>
    <div class="user-name">${tweet.user.handle}</div>
  </div>
</div>
<h5 class="actual-tweet">${escape(tweet.content.text)}</h5>
<footer class="tweet-footer2">
  <div class="time"> ${timeago.format(tweet.created_at)}</div>
  <div class="tweet-icons">
    <output name="flag" class="fa-solid fa-flag icon" for="tweet-container"></output>
    <output name="retweet" class="fa-solid fa-retweet icon" for="tweet-container"></output>
    <output name="like" class="fa-solid fa-heart icon" for="tweet-container"></output>
  </div>
</footer>
</article>
</div>`;
    return $tweet;
  };

  //tweet post validation
  $('form').submit(function(event) {
    event.preventDefault();
    let tweetText = $("#tweet-text").val();
    let maxCharLength = 140;
    if (tweetText.length === 0) {
      const errorText = $('<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;<span>No tweet formulated...😅 Tell us what you\'re humming about!</span>&nbsp;<i class="fa-solid fa-triangle-exclamation"></i>');
      $('.tweet-error-message').html(errorText);
      $('.tweet-error-message').slideDown();
    } else if (tweetText.length > maxCharLength) {
      const errorText = $('<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;<span>You\'ve gone over the maximum character limit of 140 characters 🤯</span>&nbsp;<i class="fa-solid fa-triangle-exclamation"></i>');
      $('.tweet-error-message').html(errorText);
      $('.tweet-error-message').slideDown();
    } else {
      $('.tweet-error-message').slideUp();
      const data = $(this).serialize();

      $.ajax({
        type: "POST",
        url: `/tweets`,
        data: data,
        //reload and fetch the tweets
        success: loadTweets(),
      });
    }
  });
  // load tweets and refresh after tweet made
  const loadTweets = () => {
    $("#tweet-text").val("");
    $(".counter").text(140);

    $.ajax({
      url: `/tweets`,
      success: "success",
    }).then((tweetData) => {
      renderTweets(tweetData);
    });
  };
  loadTweets();
});