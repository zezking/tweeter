/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const url = "/tweets";

$(document).ready(function () {
  //autoheight for text area
  $("textarea")
    .each(function () {
      this.setAttribute("style", "height:30px; overflow-y:hidden;");
    })
    .on("input", function () {
      this.style.height = "30px";
      this.style.height = this.scrollHeight + 2 + "px";
    });
  //character counter
  $("textarea").on("input", charCounter);
  //load dummy tweets
  loadTweets();

  $("form").on("submit", function (event) {
    event.preventDefault();
    $tweetContent = $(this).serialize();
    $.ajax({
      url,
      method: "POST",
      data: $tweetContent,
    }).then(loadTweets());
  });
});

const renderTweets = (tweets) => {
  console.log(typeof tweets);
  for (const tweet of Object.values(tweets)) {
    $(".new-tweet-post").append(createTweetElement(tweet)).hide().fadeIn(400);
  }
};
const createTweetElement = (tweet) => {
  console.log(tweet);
  let $tweet = $(`<article class="tweet-feed">
  <header>
    <div class="user-profile-name">
      <img src=${tweet.user.avatars} alt="" />
      <span class="username">${tweet.user.name}</span>
    </div>
    <a class="user-ID">${tweet.user.handle}</a>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <time>${convertTime(tweet["created_at"])}</time>
    <div class="save-retweet-like">
      <i class="fas fa-bookmark"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
  </article>"`);
  return $tweet;
};
