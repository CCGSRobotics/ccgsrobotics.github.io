$(document).on("scroll", function () {
	if ($(document).scrollTop() > 750) { //Adjust value to fit scroll properly
		if (large < 5) {
		$("header").addClass("transparent");

	}
	} else {
		$("header").removeClass("transparent");
	}
});






//console.log("start");
// $(document).ready(function() {
// 	setInterval(function(){
// 			console.log("1");
//
// 			document.getElementById('parra').style.backgroundImage = 'url(img01.jpg)';
//
//
// 			setTimeout(function(){
// 			console.log("2");
//
//
// 			document.getElementById('parra').style.backgroundImage = 'url(img02.jpg)';
// 
//
//
// 	}, 8000);
// }, 16000);
// });
