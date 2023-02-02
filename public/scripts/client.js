// const { application } = require("express");
//browser doesnt recognize require because it doesnt know how to run it.(impossible)
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').prepend($tweet);

    }
  };
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
    <output name="retweet" class="fa-solid fa-flag icon" for="tweet-container"></output>
    <output name="retweet" class="fa-solid fa-retweet icon" for="tweet-container"></output>
    <output name="like" class="fa-solid fa-heart icon" for="tweet-container"></output>
  </div>
</footer>
</article>
</div>`;
    return $tweet;
  };


  $('form').submit(function(event) {
    event.preventDefault();
    let tweetText = $("#tweet-text").val();
    let maxCharLength = 140;
    if (tweetText.length === 0) {
      const errorText = $('<i class="fa-solid fa-triangle-exclamation"></i> <span>No tweet formulated 😅 Tell us what you\'re humming about!</span><i class="fa-solid fa-triangle-exclamation"></i>');
      $('.tweet-error-message').html(errorText);
      $('.tweet-error-message').slideDown();
    } else if (tweetText.length > maxCharLength) {
      const errorText = $('<i class="fa-solid fa-triangle-exclamation"></i> <span>You\'ve gone over the maximum character limit of 140 characters🤯</span><i class="fa-solid fa-triangle-exclamation"></i>');
      $('.tweet-error-message').html(errorText);
      $('.tweet-error-message').slideDown();
    } else {
      // console.log(this)
      $('.tweet-error-message').slideUp();
      const data = $(this).serialize();
      // console.log(data);

      $.ajax({
        type: "POST",
        url: `/tweets`,
        data: data,
        //reload and fetch the tweets
        success: loadTweets(),
        // dataType: dataType
      });
    }
  });

  const loadTweets = () => {
    $.ajax({
      url: `/tweets`,
      // data: data,
      success: "success",
      // dataType: dataType
    }).then((tweetData) => {
      renderTweets(tweetData);
    });
  };
  loadTweets();

});