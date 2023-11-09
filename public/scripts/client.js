$(document).ready(function() {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(arrOfTweets) {
  for (const tweet of arrOfTweets) {
    let $tweetElement = createTweetElement(tweet);
    $('#other-users-tweets').append($tweetElement);
  }
}

const createTweetElement = function(tweetObj) {

  const date = (data) => {
    const result = new Date(data);
    return result.toDateString();
  }

  const $tweet = $(
    `<article class="tweets-container">
      <header>
         <span class="user-header">
          <img src=${tweetObj['user']['avatars']}>
          <span class="other-user">${tweetObj['user']['name']}</span>
        </span>
        <span class="user-handle">${tweetObj['user']['handle']}</span>
      </header>  
      <p class="tweet-content">${tweetObj['content']['text']}</p>
      <footer>
        <span>${date(tweetObj['created_at'])}</span>
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

renderTweets(data);

})