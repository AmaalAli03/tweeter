/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement= (tweetObj)=> {
const tweetItem = `<article class="article">
<div class="avatar-username">
  <div class="avatar-name">
    <h1 class="avatar-image"><img src="${tweetObj.user.avatars}"></h1>
  </div>
  <div class="user-names">
    <div class="name">${tweetObj.user.name}</div>
    <div class="user-name">${tweetObj.user.handle}</div>
  </div>
</div>
<h5 class="actual-tweet">${tweetObj.content.text}</h5>
<footer class="tweet-footer2">
  <div class="time">${tweetObj.created_at}</div>
  <div class="tweet-icons">
    <output name="retweet" class="fa-solid fa-flag icon" for="tweet-container"></output>
    <output name="retweet" class="fa-solid fa-retweet icon" for="tweet-container"></output>
    <output name="like" class="fa-solid fa-heart icon" for="tweet-container"></output>
  </div>
</footer>
</article>`
return tweetItem
};