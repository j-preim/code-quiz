var mainHeader = document.querySelector(".main-header");
var mainContent = document.querySelector(".main-content");
var buttons = document.querySelector(".buttons");
var startButton = document.querySelector(".start-button");
var viewScores = document.querySelector(".view-scores");
var timerTextEl = document.querySelector(".timer-text");

var timeInterval;

startButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearInterval(timeInterval);
  countdown();
});

viewScores.addEventListener("click", function (event) {
    event.preventDefault();
    viewScores();
  });

function viewScores() {

}

function countdown() {
    var timeLeft = 75;
  
    timeInterval = setInterval(function () {
      timerTextEl.textContent = "Time: " + timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timeInterval);

      }
  
      timeLeft--;
    }, 1000);
  }