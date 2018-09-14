/*******DOM Elements********/
const timerDisplay = document.querySelector('.display__time-left');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const customTime = document.getElementById('custom');
const timeInput = document.getElementById('time-input');
const bigBlindInit = document.getElementById('blind-input');
const bigBlindCap = document.getElementById('cap-input');
const increment = document.getElementById('increment');
const leftArrow = document.querySelector('.fa-arrow-left');
const rightArrow = document.querySelector('.fa-arrow-right');
const bigBlindShow = document.querySelector('.big-blind-amount');
const smallBlindShow = document.querySelector('.small-blind-amount');
const popup = document.querySelector('.rick-roll');
const video = document.querySelector('.rick-roll-vid');
/********Application State*************/

const state = {
  intervalMinutes: timeInput.value,
  bigBlind: bigBlindInit.value,
  bigBlindCap: bigBlindCap.value
  /**********Variables Defined*********/

};
let intervalSeconds = state.intervalMinutes * 60;
let secondsLeft;
let countdown;
let smallBlind = state.bigBlind / 2;
/*************Timer Functionality******************/

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    if (!timerDisplay.classList.contains('paused')) {
      secondsLeft = Math.round((then - Date.now()) / 1000); // check if we should stop it!

      if (secondsLeft < 0) {
        clearInterval(countdown); //Rick Roll!

        rickRoll(); //toggle possession

        togglePossession(); //reset timer

        resetTimer(); //update blinds

        updateBlinds(); //start timer again after delay

        setTimeout(function () {
          startTimer();
        }, 18500);
        return;
      } // display it


      displayTimeLeft(secondsLeft);
    }
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
}

function startTimer() {
  timerDisplay.classList.remove('paused');
  seconds = parseInt(intervalSeconds);
  timer(seconds);
}

function pauseTimer() {
  timerDisplay.classList.add('paused');
  intervalSeconds = secondsLeft;
}

function resetTimer() {
  clearInterval(countdown);
  intervalSeconds = state.intervalMinutes * 60;
  displayTimeLeft(intervalSeconds);
}

function togglePossession() {
  if (leftArrow.classList.contains('hidden')) {
    leftArrow.classList.remove('hidden');
    rightArrow.classList.add('hidden');
  } else {
    leftArrow.classList.add('hidden');
    rightArrow.classList.remove('hidden');
  }
}

function rickRoll() {
  popup.classList.add('rick-roll-popup');
  popup.classList.remove('rick-roll-hidden');
  video.play();
  setTimeout(function () {
    video.load();
    popup.classList.remove('rick-roll-popup');
    popup.classList.add('rick-roll-hidden');
  }, 17500);
}

function updateBlinds() {
  if (state.bigBlind * 2 <= state.bigBlindCap) {
    state.bigBlind *= 2;
    smallBlind *= 2;
  } else {
    state.bigBlind = state.bigBlindCap;
    smallBlind = state.bigBlindCap / 2;
  }

  bigBlindShow.textContent = `$${state.bigBlind}`;
  smallBlindShow.textContent = `$${smallBlind}`;
}

function changeTimeInput(e) {
  e.preventDefault();
  state.intervalMinutes = timeInput.value;
  intervalSeconds = timeInput.value * 60;
  resetTimer();
  displayTimeLeft(intervalSeconds);
}

function changeBlindSettings(e) {
  e.preventDefault();
  state.bigBlind = bigBlindInit.value;
  smallBlind = bigBlindInit.value / 2;
  bigBlindShow.textContent = `$${state.bigBlind}`;
  smallBlindShow.textContent = `$${smallBlind}`;
}

function changeBigBlindCap(e) {
  e.preventDefault();
  state.bigBlindCap = e.target.value;
}

function init() {
  rightArrow.classList.add('hidden');
  displayTimeLeft(intervalSeconds);
  bigBlindShow.textContent = `$${state.bigBlind}`;
  smallBlindShow.textContent = `$${smallBlind}`;
}
/***********Event Listeners*********/
//time settings input


timeInput.addEventListener('change', changeTimeInput); //big blind settings input

bigBlindInit.addEventListener('change', changeBlindSettings); //big blind cap input

bigBlindCap.addEventListener('change', changeBigBlindCap); //play button

playButton.addEventListener('click', startTimer); //pause button

pauseButton.addEventListener('click', pauseTimer); //reset button

resetButton.addEventListener('click', resetTimer);
init();