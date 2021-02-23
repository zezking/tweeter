/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const newTweetFeed = {
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
