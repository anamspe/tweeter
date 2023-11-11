$(document).ready(function() {

  $('#tweet-text').on("input", function() {
    const $form = $(this).closest('form');
    const $counter = $form.find('.counter');
    const $tweet = $(this).val();
    const $charactersLeft = 140 - $tweet.length;

    // Counter number will change accordingly to the input
    $counter.text($charactersLeft);

    // Add long-tweet class to style the counter colour
    if ($charactersLeft < 0) {
      $counter.addClass("long-tweet");
    } else {
      $counter.removeClass("long-tweet");
    }
  });
});
