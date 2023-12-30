var header = document.querySelector("header");
var content = document.querySelector("content");
var mainHeader = document.querySelector(".main-header");
var mainContent = document.querySelector(".main-content");
var quizHeader = document.querySelector(".quiz-header");
var quizContent = document.querySelector(".quiz-content");
var answerButtons = quizContent.querySelectorAll("button");
var enterScoreHeader = document.querySelector(".enter-score-header");
var enterScoreContent = document.querySelector(".enter-score-content");
var finalScoreMsg = enterScoreContent.querySelector("div");
var highScoresHeader = document.querySelector(".highscores-header");
var highScoresContent = document.querySelector(".highscores-content");
var startButton = document.querySelector(".start-button");
var viewScoresButton = document.querySelector(".view-scores");
var timerTextEl = document.querySelector(".timer-text");
console.log(answerButtons);

var timeLeft = 0;
var timeInterval;
var questionArray = [];
var question1 = "Commonly used data types DO NOT include:"

questionArray.push(question1);

var answer1 = {name: "answer1", number: "1. ", text: "strings", correct: false};
var answer2 = {name: "answer2", number: "2. ", text: "booleans", correct: false};
var answer3 = {name: "answer3", number: "3. ", text: "alerts", correct: true};
var answer4 = {name: "answer4", number: "4. ", text: "numbers", correct: false};
var answerArray = [answer1, answer2, answer3, answer4];
var answerNameArray = [answer1.name, answer2.name, answer3.name, answer4.name];

var chosenAnswer;

var score = 0;

startButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearInterval(timeInterval);
  startQuiz();
  countdown();
});

viewScoresButton.addEventListener("click", function (event) {
    event.preventDefault();
    viewScores();
  });

answerButtons.forEach(function(answer) {
    answer.addEventListener("click", function (event) {
        chosenAnswer = event.target.getAttribute("class").toString();
    evaluateAnswer();
    });
});

function startQuiz() {
    startButton.setAttribute("style", "display:none;");
    mainHeader.setAttribute("style", "display:none;");
    mainContent.setAttribute("style", "display:none;");
    quizHeader.setAttribute("style", "display:block;");
    quizContent.setAttribute("style", "display:flex;");
    quizHeader.textContent = questionArray[0];
    answerButtons[0].textContent = answer1.number + answer1.text;
    answerButtons[1].textContent = answer2.number + answer2.text;
    answerButtons[2].textContent = answer3.number + answer3.text;
    answerButtons[3].textContent = answer4.number + answer4.text;
}

function evaluateAnswer() {
    var chosenAnswerIndex = answerNameArray.indexOf(chosenAnswer);

    if (answerArray[chosenAnswerIndex].correct) {
        score += 10;
        clearInterval(timeInterval);
        enterInitials(score);
    }
    else {
        timeLeft = timeLeft - 10;
    }
}

function enterInitials(score) {
    quizHeader.setAttribute("style", "display:none;");
    quizContent.setAttribute("style", "display:none;");
    enterScoreHeader.setAttribute("style", "display:block;");
    enterScoreContent.setAttribute("style", "display:block;");
    finalScoreMsg.textContent = "Your final score is " + score;
}

function viewScores() {
}

function countdown() {
    timeLeft = 75;
  
    timeInterval = setInterval(function () {
      timerTextEl.textContent = "Time: " + timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timeInterval);
        enterInitials(score);
      }
  
      timeLeft--;
    }, 1000);
  }