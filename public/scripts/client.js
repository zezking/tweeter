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
  //toggle tweet box textarea
  $("#new-tweet-button").on("click", toggleTweet);
  //make compose tweet text a toggle button to toggle tweet textarea
  $("#compose-tweet-button").on("click", toggleTweet);
  //click to scroll up to the top of the page
  $("#scroll-up").on("click", scrollUpAction);
  //when scroll down the scrollup button will disappear
  $(window).scroll(scrollUpButton);
  //scroll up to fade out the "see what your friends are doing h2"
  if ($(window).width() < 701) {
    $(window).scroll(feedSubtitleHide);
  }
  if ($(window).width() < 701) {
    $(window).scroll(mainTitleHide);
  }

  //load dummy tweets
  loadTweets(renderTweets);
  //click submit to render and load the lastest tweets with random user generated
  $("form").on("submit", (event) => {
    submitTweet(event, () => loadTweets(addTweetsSubmission));
  });
});
