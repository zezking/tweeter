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
    alert("Your tweet is too long");
    return;
  }
  if (textValidation(textLength) === "notPresent") {
    alert("You need to at least put something");
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
//create a new tweet element
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
  const datetime = new Date(0);

  datetime.setUTCSeconds(pastTime);
  return datetime;
};

const textValidation = (str) => {
  if (str.length > 140) {
    return "toolong";
  } else if (str.length === 0) {
    return "notPresent";
  }
};
