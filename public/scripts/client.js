/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const { autoTextHeight } = require("./helper");
const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const $tweet = $(document).ready(function () {
  //autoheight for text area

  $("textarea")
    .each(function () {
      this.setAttribute("style", "height:30px;overflow-y:hidden;");
    })
    .on("input", function () {
      this.style.height = "30px";
      this.style.height = this.scrollHeight + 2 + "px";
    });

  //character counter
  $("textarea").on("input", function () {
    let textLength = $(this).val().length;
    let remainingLength = 140 - textLength;

    if (remainingLength < 0) {
      $("#counter").css("color", "red"); //factor to create a overCounter Class
    } else {
      $("#counter").css("color", "black");
    }
    $("#counter").text(remainingLength);
  });

  const renderTweets = (tweets) => {
    for (i in tweets) {
      $(".new-tweet-feed").append(createTweetElement(tweets[i]));
    }
  };
  const createTweetElement = (tweet) => {
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
      <time>4 days ago</time>
      <div class="save-retweet-like">
        <i class="fas fa-bookmark"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
    </article>"`);
    return $tweet;
  };

  renderTweets(tweetData);
});
