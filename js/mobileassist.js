

function myFunction() {
$("#randomdiv").removeClass("mobile");
$("header").removeClass("mobilehead");
if (($('#randomdiv').offset().top - $(document).scrollTop()) > 40) {

    $("#randomdiv").addClass("mobile");
    $("header").addClass("mobilehead");
}
}

myFunction();

$(document).on("scroll", function () {
    myFunction();

    var mvar = setInterval(myFunction, 1);

    setTimeout(function (){
    clearInterval(mvar)
  }, 600);


    setTimeout(myFunction, 600);
});


$(window).resize(function () {
myFunction();
});


document.addEventListener("fullscreenchange", function( event ) {
myFunction();
});
