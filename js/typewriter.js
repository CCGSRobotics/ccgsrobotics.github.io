// function([string1, string2],target id,[color1,color2])

// All taken from: https://codepen.io/Tbgse/pen/dYaJyJ
 consoleText(['Kings Legacy.', 'The CCGS Robotics Club.', 'View all Blogs Here.'], 'text',['white','white','white']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {

      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
        if (usedWord == "The CCGS Robotics Club.") {
        if (elementInViewport(target)) {
          showblog();
        }
      }


      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}



function elementInViewport(el) {
var top = el.offsetTop;
var left = el.offsetLeft;
var width = el.offsetWidth;
var height = el.offsetHeight;

while(el.offsetParent) {
  el = el.offsetParent;
  top += el.offsetTop;
  left += el.offsetLeft;
}

return (
  top >= window.pageYOffset &&
  left >= window.pageXOffset &&
  (top + height) <= (window.pageYOffset + window.innerHeight) &&
  (left + width) <= (window.pageXOffset + window.innerWidth)
);
}


function showblog() {
  var x = document.getElementById('blogposts');
  $(x).addClass("highlight");

  setTimeout(function() {
    $(x).removeClass("highlight");
  }, 6000)
}
