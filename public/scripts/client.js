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
  loadTweets(renderTweets);
  //click submit to render and load the lastest tweets with random user generated
  $("form").on("submit", (event) => {
    submitTweet(event, () => loadTweets(addTweetsSubmission));
  });
});
