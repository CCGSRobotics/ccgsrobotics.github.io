
const myTag=document.getElementsByClassName('facta');
const myTog=document.getElementsByClassName('facta_left');

const myTlg=document.getElementsByClassName('img_box');
const myTng=document.getElementsByClassName('img_box_right');

$(document).on("scroll", function () {
  if ($(myTag[0]).css('display') == 'none') {
    myTag[0].style.opacity = "0"
    myTlg[0].style.padding = "0px 20px 0px 0px"
  } else {
    myTag[0].style.opacity = "1.0"
    myTlg[0].style.padding = "30px 20px 0px 0px"

  }

  if ($(myTag[1]).css('display') == 'none') {
    myTag[1].style.opacity = "0"
    myTlg[1].style.padding = "0px 20px 0px 0px"
  } else {
    myTlg[1].style.padding = "30px 20px 0px 0px"
    myTag[1].style.opacity = "1.0"

  }

  if ($(myTog[0]).css('display') == 'none') {
    myTog[0].style.opacity = "0"
    myTng[0].style.padding = "0px 0px 0px 20px"
  } else {
    myTog[0].style.opacity = "1.0"
    myTng[0].style.padding = "30px 0px 0px 20px"
  }

});
