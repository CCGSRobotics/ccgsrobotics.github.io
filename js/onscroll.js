$(document).on("scroll", function () {
	if ($(document).scrollTop() > 750) { //Adjust value to fit scroll properly
		if (large < 5) {
		$("header").addClass("transparent");

	}
	} else {
		$("header").removeClass("transparent");
	}
});