var header = document.querySelector("header");
var content = document.querySelector("content");
var homeHeader = document.querySelector(".home-header");
var homeContent = document.querySelector(".home-content");
var quizHeader = document.querySelector(".quiz-header");
var quizContent = document.querySelector(".quiz-content");
var answerButtons = quizContent.querySelectorAll("button");
var enterScoreHeader = document.querySelector(".enter-score-header");
var enterScoreContent = document.querySelector(".enter-score-content");
var finalScoreMsg = enterScoreContent.querySelector("div");
var highscoresHeader = document.querySelector(".highscores-header");
var highscoresContent = document.querySelector(".highscores-content");
var highscoresList = document.querySelector(".highscores-list");
var startButton = document.querySelector(".start-button");
var viewScoresButton = document.querySelector(".view-scores");
var timerTextEl = document.querySelector(".timer-text");
var submitScoreButton = document.querySelector(".submit-score");
var backButton = document.querySelector(".back-button");
var clearScoresButton = document.querySelector(".clear-scores-button");
var initialsInput = document.querySelector(".initials");

var page = "home";
var timeLeft = 0;
var timeInterval;
var questionArray = [];
var choicesArray = [];
var question1 = "Commonly used data types DO NOT include:";
var question2 =
  "The condition in an if/else statement is enclosed within _____.";
var question3 = "Arrays in JavaScript can be used to store _____.";
var question4 =
  "String values must be enclosed within _____ when being assigned to variables.";
var question5 =
  "A very useful tool used during development and debugging for printing content to the debugger is:";

questionArray.push(question1, question2, question3, question4, question5);

var choices1 = {
  text1: "strings",
  correct1: false,
  text2: "booleans",
  correct2: false,
  text3: "alerts",
  correct3: true,
  text4: "numbers",
  correct4: false,
};
var choices2 = {
  text1: "quotes",
  correct1: false,
  text2: "curly brackets",
  correct2: true,
  text3: "parentheses",
  correct3: false,
  text4: "square brackets",
  correct4: false,
};
var choices3 = {
  text1: "numbers and strings",
  correct1: false,
  text2: "other arrays",
  correct2: false,
  text3: "booleans",
  correct3: false,
  text4: "all of the above",
  correct4: true,
};
var choices4 = {
  text1: "commas",
  correct1: false,
  text2: "curly brackets",
  correct2: false,
  text3: "quotes",
  correct3: true,
  text4: "parentheses",
  correct4: false,
};
var choices5 = {
  text1: "JavaScript",
  correct1: false,
  text2: "terminal/bash",
  correct2: false,
  text3: "for loops",
  correct3: false,
  text4: "console.log",
  correct4: true,
};

choicesArray.push(choices1, choices2, choices3, choices4, choices5);

var answer1 = {
  name: "answer1",
  number: "1. ",
  text: choicesArray[0].text1,
  correct: choicesArray[0].correct1,
};
var answer2 = {
  name: "answer2",
  number: "2. ",
  text: choicesArray[0].text2,
  correct: choicesArray[0].correct2,
};
var answer3 = {
  name: "answer3",
  number: "3. ",
  text: choicesArray[0].text3,
  correct: choicesArray[0].correct3,
};
var answer4 = {
  name: "answer4",
  number: "4. ",
  text: choicesArray[0].text4,
  correct: choicesArray[0].correct4,
};
var answerArray = [answer1, answer2, answer3, answer4];
var answerNameArray = [answer1.name, answer2.name, answer3.name, answer4.name];

var chosenAnswer;

var score = 0;
var finalScore = 0;

startButton.addEventListener("click", function (event) {
  event.preventDefault();
  hideHomePage();
  quizHeader.setAttribute("style", "display:block;");
  quizContent.setAttribute("style", "display:flex;");
  page = "quiz";
  clearInterval(timeInterval);
  nextQuestion();
  countdown();
});

viewScoresButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (page !== "quiz") {
    viewScores();
  }
});

answerButtons.forEach(function (answer) {
  answer.addEventListener("click", function (event) {
    chosenAnswer = event.target.getAttribute("class").toString();
    evaluateAnswer();
  });
});

function nextQuestion() {
  quizHeader.textContent = questionArray[0];
  answerArray[0].text = choicesArray[0].text1;
  answerArray[0].correct = choicesArray[0].correct1;
  answerArray[1].text = choicesArray[0].text2;
  answerArray[1].correct = choicesArray[0].correct2;
  answerArray[2].text = choicesArray[0].text3;
  answerArray[2].correct = choicesArray[0].correct3;
  answerArray[3].text = choicesArray[0].text4;
  answerArray[3].correct = choicesArray[0].correct4;
  answerButtons[0].textContent = answerArray[0].number + answerArray[0].text;
  answerButtons[1].textContent = answerArray[1].number + answerArray[1].text;
  answerButtons[2].textContent = answerArray[2].number + answerArray[2].text;
  answerButtons[3].textContent = answerArray[3].number + answerArray[3].text;
}

function evaluateAnswer() {
  var chosenAnswerIndex = answerNameArray.indexOf(chosenAnswer);

  questionArray.shift();
  choicesArray.shift();

  if (answerArray[chosenAnswerIndex].correct) {
    score += 10;
  } else {
    timeLeft = timeLeft - 10;
  }

  if (questionArray.length === 0) {
    finalScore = score + timeLeft;
    clearInterval(timeInterval);
    enterInitials(finalScore);
  } else {
    nextQuestion();
  }
}

function enterInitials() {
  hideQuiz();
  page = "enter";
  enterScoreHeader.setAttribute("style", "display:block;");
  enterScoreContent.setAttribute("style", "display:block;");
  finalScoreMsg.textContent = "Your final score is " + finalScore;
  clearInterval(timeInterval);
}

var scoreEntry;
var initials;
var score;

var scoreEntries = [];
var storedScoreEntries = JSON.parse(localStorage.getItem("scoreEntries"));
if (storedScoreEntries !== null) {
  scoreEntries = storedScoreEntries;
}

submitScoreButton.addEventListener("click", function (event) {
  event.preventDefault();
  scoreEntry = {
    initials: initialsInput.value,
    score: finalScore,
  };
  scoreEntries.push(scoreEntry);
  localStorage.setItem("scoreEntries", JSON.stringify(scoreEntries));
  viewScores();
});

function viewScores() {
  hideHomePage();
  hideQuiz();
  hideEnterScores();
  page = "scores";
  highscoresHeader.setAttribute("style", "display:block;");
  highscoresContent.setAttribute("style", "display:block;");
  renderHighscores();
}

function renderHighscores() {
  scoreEntries.sort((a, b) => b.score - a.score);
  highscoresList.innerHTML = "";
  for (var i = 0; i < scoreEntries.length; i++) {
    scoreEntry = scoreEntries[i];

    var li = document.createElement("li");
    li.textContent = scoreEntry.initials + " - " + scoreEntry.score;
    li.setAttribute("data-index", i);

    highscoresList.appendChild(li);
  }
}

backButton.addEventListener("click", function (event) {
  event.preventDefault();
  hideHighscores();
  homeHeader.setAttribute("style", "display:;");
  homeContent.setAttribute("style", "display:;");
  startButton.setAttribute("style", "display:;");
});

clearScoresButton.addEventListener("click", function (event) {
    localStorage.clear();
    highscoresList.innerHTML = "";
})

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

function hideHomePage() {
  homeHeader.setAttribute("style", "display:none;");
  homeContent.setAttribute("style", "display:none;");
  startButton.setAttribute("style", "display:none;");
}

function hideQuiz() {
  quizHeader.setAttribute("style", "display:none;");
  quizContent.setAttribute("style", "display:none;");
}

function hideEnterScores() {
  enterScoreHeader.setAttribute("style", "display:none;");
  enterScoreContent.setAttribute("style", "display:none;");
}

function hideHighscores() {
  highscoresHeader.setAttribute("style", "display:none;");
  highscoresContent.setAttribute("style", "display:none;");
}
