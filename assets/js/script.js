var header = document.querySelector("header");
var content = document.querySelector("content");
var homeHeader = document.querySelector(".home-header");
var homeContent = document.querySelector(".home-content");
var quizHeader = document.querySelector(".quiz-header");
var quizContent = document.querySelector(".quiz-content");
var quizFooter = document.querySelector(".quiz-footer");
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

var question1 = {
  text: "Commonly used data types DO NOT include:",
  answer1: {
    text: "strings",
    correct: false,
  },
  answer2: {
    text: "booleans",
    correct: false,
  },
  answer3: {
    text: "alerts",
    correct: true,
  },
  answer4: {
    text: "numbers",
    correct: false,
  },
  answered: false,
};
var question2 = {
  text: "The condition in an if/else statement is enclosed within _____.",
  answer1: {
    text: "quotes",
    correct: false,
  },
  answer2: {
    text: "curly brackets",
    correct: true,
  },
  answer3: {
    text: "parentheses",
    correct: false,
  },
  answer4: {
    text: "square brackets",
    correct: false,
  },
  answered: false,
};
var question3 = {
  text: "Arrays in JavaScript can be used to store _____.",
  answer1: {
    text: "numbers and strings",
    correct: false,
  },
  answer2: {
    text: "other arrays",
    correct: false,
  },
  answer3: {
    text: "booleans",
    correct: false,
  },
  answer4: {
    text: "all of the above",
    correct: true,
  },
  answered: false,
};
var question4 = {
  text: "String values must be enclosed within _____ when being assigned to variables.",
  answer1: {
    text: "commas",
    correct: false,
  },
  answer2: {
    text: "curly brackets",
    correct: false,
  },
  answer3: {
    text: "quotes",
    correct: true,
  },
  answer4: {
    text: "parentheses",
    correct: false,
  },
  answered: false,
};
var question5 = {
  text: "A very useful tool used during development and debugging for printing content to the debugger is:",
  answer1: {
    text: "JavaScript",
    correct: false,
  },
  answer2: {
    text: "terminal/bash",
    correct: false,
  },
  answer3: {
    text: "for loops",
    correct: false,
  },
  answer4: {
    text: "console.log",
    correct: true,
  },
  answered: false,
};

questionArray.push(question1, question2, question3, question4, question5);

var score = 0;
var finalScore = 0;

startButton.addEventListener("click", function (event) {
  event.preventDefault();
  hideHomePage();
  quizHeader.setAttribute("style", "display:block;");
  quizContent.setAttribute("style", "display:flex;");
  quizFooter.setAttribute("style", "border-top: 2px solid gray;");
  page = "quiz";
  clearInterval(timeInterval);
  renderQuestion();
  countdown();
});

function renderQuestion() {
  var choice1 = {
    text: "1. " + questionArray[0].answer1.text,
    correct: questionArray[0].answer1.correct,
  };
  var choice2 = {
    text: "2. " + questionArray[0].answer2.text,
    correct: questionArray[0].answer2.correct,
  };
  var choice3 = {
    text: "3. " + questionArray[0].answer3.text,
    correct: questionArray[0].answer3.correct,
  };
  var choice4 = {
    text: "4. " + questionArray[0].answer4.text,
    correct: questionArray[0].answer4.correct,
  };

  quizHeader.textContent = questionArray[0].text;
  answerButtons[0].textContent = choice1.text;
  answerButtons[0].setAttribute("correct", choice1.correct);
  answerButtons[1].textContent = choice2.text;
  answerButtons[1].setAttribute("correct", choice2.correct);
  answerButtons[2].textContent = choice3.text;
  answerButtons[2].setAttribute("correct", choice3.correct);
  answerButtons[3].textContent = choice4.text;
  answerButtons[3].setAttribute("correct", choice4.correct);
}

answerButtons.forEach(function (answer) {
  answer.addEventListener("click", function (event) {
    evaluateAnswer(event.target);
  });
});

function evaluateAnswer(chosenAnswer) {
  if (chosenAnswer.getAttribute("correct") === "true") {
    score += 10;
    quizFooter.textContent = "Correct! +10 points";
  } else {
    timeLeft = timeLeft - 10;
    quizFooter.textContent = "Wrong!";
  }

  questionArray.shift();

  nextQuestion();
}

function nextQuestion() {
if (questionArray.length > 0) {
  renderQuestion();
}
else {
  finalScore = score + timeLeft;
  clearInterval(timeInterval);
  enterInitials(finalScore);
}
}

function enterInitials(finalScore) {
  hideQuiz();
  page = "enter";
  enterScoreHeader.setAttribute("style", "display:block;");
  enterScoreContent.setAttribute("style", "display:block;");
  finalScoreMsg.textContent = "Your final score is " + finalScore;
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

viewScoresButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (page !== "quiz") {
    viewScores();
  }
});

function viewScores() {
  clearInterval(timeInterval);
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
});

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
  quizFooter.setAttribute("style", "display:none");
}

function hideEnterScores() {
  enterScoreHeader.setAttribute("style", "display:none;");
  enterScoreContent.setAttribute("style", "display:none;");
}

function hideHighscores() {
  highscoresHeader.setAttribute("style", "display:none;");
  highscoresContent.setAttribute("style", "display:none;");
}
