/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const renderTweets = function(arrOfTweets) {
  for (const tweet of arrOfTweets) {
    let $tweetElement = createTweetElement(tweet);
    $('#other-users-tweets').append($tweetElement);
  }
}

const createTweetElement = function(tweetObj) {

  const $tweet = $(
    `<article class="tweets-container">
      <header>
        <span class="user-header">
          <img src=${tweetObj.user.avatars}>
          <span class="other-user">${tweetObj.user.name}</span>
        </span>
        <span class="user-handle">${tweetObj.user.handle}</span>
      </header>  
      <p class="tweet-content">${tweetObj.content.text}</p>
      <footer>
        <span>${timeago.format((tweetObj.created_at) - 11 * 1000 * 60 * 60)}</span>
        <span class="reaction-icons" >
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span >  
      </footer >  
    </article >`
  );

  return $tweet;
}  

/////////////////////////////////////////////////////
//        POST request for new tweets
/////////////////////////////////////////////////////

// $('#tweet-text').on("input", function() {
//   const $tweetLength = this.value.length;
//   console.log($tweetLength);
// })

$('.new-tweet').on("submit", function(event) {
  event.preventDefault();
  const $data = $(this).children().find('#tweet-text');
  const $serializedData = $data.serialize();
  // if ($serializedData.length -5 <= 0) {
  //   alert("Please enter your tweet before submitting")
  // }
  $.post("/tweets", $serializedData)

  });

/////////////////////////////////////////////////////
//        GET request for tweets in DB
/////////////////////////////////////////////////////

const loadTweets = function () {
  $.getJSON("/tweets/", function (data) {
    renderTweets(data);
  })
}

loadTweets();


});
