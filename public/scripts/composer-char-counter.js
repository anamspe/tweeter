$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    const charactersLeft = 140 - this.value.length;
    const $counter = $(this).siblings('div').children('.counter')
    $counter.html(charactersLeft);
    if (charactersLeft < 0)  {
      $counter.addClass("long-tweet");
    } else {
      $counter.removeClass("long-tweet");
    }
  });
});