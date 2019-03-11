// https://codepen.io/DaBhai13/pen/bNMKXL

// to be cleaned

var large = 0
function myFunction(x) {
	x.classList.toggle("change");
	if (large < 5) {
		$("header").removeClass("small");
		$("header").addClass("large");

		large = 10;
	} else {

		$("header").removeClass("large");
		if ($(document).scrollTop() > 100) {
			$("header").addClass("small");
		} else {
			$("header").removeClass("small");
		}
		large = 0;
	}
}

$(document).on("scroll", function () {
	if ($(document).scrollTop() > 50) {
		if (large < 5) {
		$("header").addClass("small");
	}
	} else {
		$("header").removeClass("small");
	}
});
