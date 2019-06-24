$(document).on("scroll", function () {
	if ($(document).scrollTop() > ($(window).height() - $(".cf").height())) { //Adjust value to fit scroll properly
		if (large < 5) {
		$("header").addClass("transparent");
	}
	} else {
		$("header").removeClass("transparent");
	}
});


$(window).on('load', function() {
  var parallax = $( ".parallax" ), speed = -0.6;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "50% " + (windowYOffset * speed) + "px";

      el.style.backgroundPosition = elBackgrounPos;

    });
  };
});
