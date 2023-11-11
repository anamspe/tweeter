/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Function to render Tweets from database
  const renderTweets = function(arrOfTweets) {
    $('#other-users-tweets').empty();
    for (const tweet of arrOfTweets) {
      const $tweetElement = createTweetElement(tweet);
      $('#other-users-tweets').prepend($tweetElement);
    }
  };

  // Function that will create the HTML to prepend tweets in the page
  const createTweetElement = function(tweetObj) {

    // Function to prevent XSS attacks (-someone posting scripts-)
    const escape = function(str) {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $(
      `<article class="tweets-container">
      <header>
      <span class="user-header">
      <img src=${tweetObj.user.avatars}>
      <span class="other-user">${tweetObj.user.name}</span>
      </span>
      <span class="user-handle">${tweetObj.user.handle}</span>
      </header>  
      <p class="tweet-content">${escape(tweetObj.content.text)}</p>
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
  };

  /////////////////////////////////////////////////////
  //        POST request for new tweets
  /////////////////////////////////////////////////////

  $('.new-tweet').on("submit", function(event) {
    event.preventDefault();
    const $inputData = $(this).find('#tweet-text');
    const $tweetContent = $inputData.val();
    const $counter = $(this).find('.counter');

    const $noContentError = $(this).find('.no-content');
    const $tooLong = $(this).find('.too-many-chars');

    // Error for when the form is empty
    if (!$tweetContent) {
      $noContentError.slideDown();
      return;
    }
    $noContentError.slideUp();

    // Error message for when tweet passes character limit
    if ($tweetContent.length > 140) {
      $tooLong.slideDown();
      return;
    }
    $tooLong.slideUp();

    // Post tweet if it passes conditions
    const $serializedData = $inputData.serialize();
    $.post("/tweets", $serializedData)
      .then(() => {
        loadTweets();
        // Clear form and reset counter
        $inputData.val('');
        $counter.val('140');
      });
  });

  /////////////////////////////////////////////////////
  //        GET request for tweets in DB
  /////////////////////////////////////////////////////

  const loadTweets = function() {
    $.getJSON("/tweets/", function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

});
