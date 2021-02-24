/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
];

$.ajax({
  url: "https://randomuser.me/api/",
  dataType: "json",
  success: function (data) {
    const randomUserProfile = data.results[0].picture.medium;
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
          $("#counter").css("color", "red"); //factor to create a overCounter Class
        } else {
          $("#counter").css("color", "black");
        }
        $("#counter").text(remainingLength);
      });

      $("form").on("submit", function (event) {
        event.preventDefault();
      });

      renderTweets(tweetData);
    });

    const renderTweets = (tweets) => {
      for (i in tweets) {
        $(".new-tweet-post").append(createTweetElement(tweets[i]));
      }
    };

    const createTweetElement = (tweet) => {
      let $tweet = $(`<article class="tweet-feed">
      <header>
        <div class="user-profile-name">
          <img src=${randomUserProfile} alt="" />
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

    const convertTime = (pastTime) => {
      const datetime = new Date(0);

      datetime.setUTCSeconds(pastTime);
      return datetime;
    };
  },
});
