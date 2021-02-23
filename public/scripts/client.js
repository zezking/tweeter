/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

const $tweet = $(`<article class="tweet-feed">
<header>
  <div class="user-profile-name">
    <img src="./images/tweeter-profile3.png" alt="" />
    <span class="username">Yolo</span>
  </div>
  <a class="user-ID">${tweetData.user.name}/a>
</header>
<p>${tweetData.content.text}</p>
<footer>
  <time>4 days ago</time>
  <div class="save-retweet-like">
    <i class="fas fa-bookmark"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
</footer>
</article>"`);

$(document).ready(function () {
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
      $("#counter").css("color", "red");
    } else {
      $("#counter").css("color", "black");
    }
    $("#counter").text(remainingLength);
  });
});
