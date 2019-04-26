function Scrolldown() {
  if ($(window).scrollTop() == 0) {
  window.scrollBy({
       top: 750, // could be negative value
       left: 0,
       behavior: 'smooth'
       });
     };
}

window.onload = setTimeout(Scrolldown, 1000);
