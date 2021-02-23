/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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

  $("textarea").on("input", function () {
    let textLength = $(this).val().length;
    let remainingLength = 140 - textLength;
    $(".counter").text(remainingLength);
  });
});
