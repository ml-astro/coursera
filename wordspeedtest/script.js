const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var resultField = document.querySelector("#results");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var errors = 0;
//add words per minute counter

const textArray = ['A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.','The European languages are members of the same family.','The European languages'];
function randomText(){
  originText.innerHTML=textArray[Math.floor(Math.random()*3)];
}

window.onload=reset();

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
  if (time <= 9) {
    time = '0' + time;
  }
  return time;
}

// Run a standard minute/second/tenths timer:
function runTimer(){
  let currentTime = leadingZero(timer[0])+':'+leadingZero(timer[1])+'.'+timer[2];
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/10)/60);
  timer[1] = Math.floor((timer[3]/10) - (timer[0]*60));
  timer[2] = Math.floor(timer[3] - (timer[1]*10) - (timer[0]*600));
}

// Match the text entered with the provided text on the page:
function checkText(){
  let textEntered = testArea.value;
  let originTextMatch = originText.innerHTML.substring(0,textEntered.length);
  if (textEntered == originText.innerHTML){
    testWrapper.style.borderColor = 'green';
    clearInterval(interval);
    resultField.innerHTML='Error count: '+errors;
  }
  else {
    if (textEntered == originTextMatch){
      testWrapper.style.borderColor = 'blue';
    }
    else {
      testWrapper.style.borderColor = 'red';
      errors++;
    }
  }
}

// Start the timer:
function start(){
  let textLength = testArea.value.length;
  if (textLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 100);
  }
}

// Reset everything:
function reset(){
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;
  testArea.value='';
  theTimer.innerHTML = '00:00.0';
  testWrapper.style.borderColor='grey';
  errors = 0;
  resultField.innerHTML='';
  randomText();
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener('keypress', start, false);
testArea.addEventListener('keyup', checkText, false);
resetButton.addEventListener('click', reset, false);
