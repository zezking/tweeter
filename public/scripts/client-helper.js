//GET the current tweets

const $errorMsgTooLong = $(`<h2 id="warning-too-short">
<i class="fas fa-exclamation-triangle"></i>
Will you shut up man<i class="fas fa-exclamation-triangle"></i>
</h2>`);
const $errorNoContent = $(`<h2 id="warning-too-long">
<i class="fas fa-exclamation-triangle"></i>
Got nothing to say?<i class="fas fa-exclamation-triangle"></i>
</h2>`);

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
    $(".warning-box").empty();
    $(".warning-box")
      .append($errorMsgTooLong)
      .hide()
      .fadeIn(400)
      .fadeOut(400)
      .fadeIn(400)
      .fadeOut(400)
      .fadeIn(400)
      .fadeOut(400);

    return;
  }
  if (textValidation(textLength) === "notPresent") {
    $(".warning-box").empty();
    $(".warning-box")
      .append($errorNoContent)
      .hide()
      .fadeIn(400)
      .fadeOut(400)
      .fadeIn(400)
      .fadeOut(400)
      .fadeIn(400)
      .fadeOut(400);

    return;
  }

  $.ajax({
    url,
    method: "POST",
    data: $("form").serialize(),
  }).then((res) => action(res));

  $("#tweet-text").val("");
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
  const now = new Date().getTime();
  const created = pastTime;
  let howLongAgo = created - now;
  // Convert to a positive integer

  var getHumanTime = function (timestamp) {
    // Convert to a positive integer
    var time = Math.abs(timestamp);

    // Define humanTime and units
    var humanTime, units;

    // If there are years
    if (time > 1000 * 60 * 60 * 24 * 365) {
      humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10);
      units = "years";
    }

    // If there are months
    else if (time > 1000 * 60 * 60 * 24 * 30) {
      humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10);
      units = "months";
    }

    // If there are weeks
    else if (time > 1000 * 60 * 60 * 24 * 7) {
      humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10);
      units = "weeks";
    }

    // If there are days
    else if (time > 1000 * 60 * 60 * 24) {
      humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10);
      units = "days";
    }

    // If there are hours
    else if (time > 1000 * 60 * 60) {
      humanTime = parseInt(time / (1000 * 60 * 60), 10);
      units = "hours";
    }

    // If there are minutes
    else if (time > 1000 * 60) {
      humanTime = parseInt(time / (1000 * 60), 10);
      units = "minutes";
    }

    // Otherwise, use seconds
    else {
      humanTime = parseInt(time / 1000, 10);
      units = "seconds";
    }

    return humanTime + " " + units;
  };

  return getHumanTime(howLongAgo);
};
//validate text length if it's too long or too short
const textValidation = (str) => {
  if (str.length > 140) {
    return "toolong";
  } else if (str.length === 0) {
    return "notPresent";
  }
};
