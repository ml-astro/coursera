const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

function runTheClock() {
  var d = new Date();
  let hr = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  var d = new Date();
  console.log(d.getHours());

  let hrPosition = hr*360/12 + min*(360/60)/12;
  console.log(hr);
  let minPosition = (min*6)+(sec*360/60)/60;
  let secPosition = sec*6;

  HOURHAND.style.transform = 'rotate('+hrPosition+'deg)';
  MINUTEHAND.style.transform = 'rotate('+minPosition+'deg)';
  SECONDHAND.style.transform = 'rotate('+secPosition+'deg)';
}

var interval = setInterval(runTheClock,1000);
