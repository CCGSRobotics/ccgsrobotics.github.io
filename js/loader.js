function ShowScroll() {
  $('html').css({'overflow-y':'visible'});
}



$(window).on('load', function() {

  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({'overflow':'visible'});

  setTimeout(ShowScroll, 700)

})
