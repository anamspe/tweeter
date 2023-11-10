/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const renderTweets = function(arrOfTweets) {
    for (const tweet of arrOfTweets) {
      let $tweetElement = createTweetElement(tweet);
      $('#other-users-tweets').prepend($tweetElement);
    }
  };
  
  const createTweetElement = function(tweetObj) {
    
    const escape = function(str) {
      let div = document.createElement("div");
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
      const $data = $('#tweet-text');
      const $tweetContent = $data.val();
      if (!$tweetContent) {
      $('.no-content').slideDown()
      return;
    }
    if ($tweetContent.length > 140) {
      $('.too-many-chars').slideDown()
      return;
    }
    $('.no-content').slideUp();
    $('.too-many-chars').slideUp()
    const $serializedData = $data.serialize();
    $.post("/tweets", $serializedData)
      .then(() => {
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').val('140');
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
