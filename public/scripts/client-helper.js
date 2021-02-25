//GET the current tweets
const loadTweets = (action) => {
  $.ajax({
    url,
  }).then((res) => {
    action(res);
  });
};
//POST the tweet with post method and text content in the form
const submitTweet = (event, action) => {
  event.preventDefault();
  const textLength = $("textarea").val();
  if (textValidation(textLength) === "toolong") {
    $.sweetModal({
      title: "Content Too Long!",
      message: "Would you shut up man...",
      theme: $.sweetModal.THEME_DARK,
      icon: $.sweetModal.ICON_WARNING,
      buttons: {},
    });
    return;
  }
  if (textValidation(textLength) === "notPresent") {
    $.sweetModal({
      title: "Content Too Short!",
      message: "You need to speak more!",
      theme: $.sweetModal.THEME_DARK,
      icon: $.sweetModal.ICON_WARNING,
      buttons: {},
    });
    return;
  }
  $.ajax({
    url,
    method: "POST",
    data: $("form").serialize(),
  }).then((res) => action(res));
};
//render all the tweets from the tweeter objects
const renderTweets = (tweets) => {
  $(".new-tweet-post").empty();
  for (const tweet of Object.values(tweets).reverse()) {
    $(".new-tweet-post").append(createTweetElement(tweet));
  }
};
// render and add the lastest tweets
const addTweetsSubmission = (tweets) => {
  const tweet = Object.values(tweets).pop();
  $(".new-tweet-post").prepend(createTweetElement(tweet).hide().fadeIn(400));
};
// escaple function to prevent XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//create a new tweet element
const createTweetElement = (tweet) => {
  const harmfulmsg = "<script>$('body').empty()</script>";
  let $tweet = $(`<article class="tweet-feed">
  <header>
    <div class="user-profile-name">
      <img src=${tweet.user.avatars} alt="" />
      <span class="username">${tweet.user.name}</span>
    </div>
    <a class="user-ID">${tweet.user.handle}</a>
  </header>
  <p>${escape(tweet.content.text)}</p>
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
//count the character
const charCounter = function () {
  const textLength = $(this).val().length;
  let remainingLength = 140 - textLength;

  if (remainingLength < 0) {
    $("#counter").css("color", "red"); //factor to create a overCounter Class
  } else {
    $("#counter").css("color", "black");
  }
  $("#counter").text(remainingLength);
};
//convert the unix seconds to normal time // This needs to refactor
const convertTime = (pastTime) => {
  // 1575909015000
  const datetime = new Date(pastTime);
  const humanDateFormat = datetime.toLocaleString();

  return humanDateFormat;
};
//validate text length if it's too long or too short
const textValidation = (str) => {
  if (str.length > 140) {
    return "toolong";
  } else if (str.length === 0) {
    return "notPresent";
  }
};

const buttonAnimation = () => {
  $("#send-Tweet").css("background-color:black");
};
