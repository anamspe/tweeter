$(document).ready(function() {
  // console.log('document says: im ready')
  $('#tweet-text').on("input", function() {
    // console.log(this);
    const charactersLeft = 140 - this.value.length;
    // console.log(this.counter.value)
    const $counter = $(this).siblings('div').children('.counter')
    $counter.html(charactersLeft);
    if (charactersLeft < 0)  {
      $counter.addClass("long-tweet");
    } else {
      $counter.removeClass("long-tweet");
    }
  });
});