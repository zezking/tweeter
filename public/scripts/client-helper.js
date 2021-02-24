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
