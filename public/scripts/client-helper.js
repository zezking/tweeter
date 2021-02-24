const loadTweets = () => {
  $.ajax({
    url,
  }).then((result) => {
    renderTweets(result);
  });
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
  for (const tweet of Object.values(tweets)) {
    $(".new-tweet-post").append(createTweetElement(tweet)).hide().fadeIn(400);
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
