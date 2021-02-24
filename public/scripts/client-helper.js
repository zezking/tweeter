const loadTweets = () => {
  $.ajax({
    url,
  }).then((result) => {
    renderTweets(result);
  });
};

const submitTweet = (event, action) => {
  event.preventDefault();
  $.ajax({
    url,
    method: "POST",
    data: $("form").serialize(),
  }).then(loadTweets);
};
//count the character
const charCounter = function () {
  let textLength = $(this).val().length;
  let remainingLength = 140 - textLength;

  if (remainingLength < 0) {
    $("#counter").css("color", "red"); //factor to create a overCounter Class
  } else {
    $("#counter").css("color", "black");
  }
  $("#counter").text(remainingLength);
};
//convert the unix seconds to normal time
const convertTime = (pastTime) => {
  const datetime = new Date(0);

  datetime.setUTCSeconds(pastTime);
  return datetime;
};

const renderTweets = (tweets) => {
  $(".new-tweet-post").empty();
  for (const tweet of Object.values(tweets)) {
    $(".new-tweet-post").append(createTweetElement(tweet)).hide().fadeIn(400);
  }
};
const renderTweetsSubmission = (tweets) => {
  console.log(tweets);
  const tweet = Object.values(tweets).pop();
  $(".new-tweet-post").append(createTweetElement(tweet)).hide().fadeIn(400);
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
