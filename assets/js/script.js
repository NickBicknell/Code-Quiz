// Quiz Questions Array
var questions = [
    {
        question: "What method returns a strings value as all uppercase characters?",
        a: "toUpper()",
        b: "toUpperCase()",
        c: "changeCaseType()",
        d: "UpperCase()",
        correct: "b",
    },
    {
        question: "What data type only has the 2 values of true or false",
        a: "Boolean",
        b: "String",
        c: "Number",
        d: "Null",
        correct: "a",
    },
    {
        question: "Which data type is not a primitive type?",
        a: "String",
        b: "Number",
        c: "Object",
        d: "Boolean",
        correct: "c",
    },
    {
        question: "Which comparison operator is used to compare both value and type?",
        a: "==",
        b: "<=",
        c: "!=",
        d: "===",
        correct: "d",
    },
    {
        question: "What is an example of camelCase?",
        a: "MyVariable",
        b: "myVariable",
        c: "MyVaRiAbLe",
        d: "MYVARIABLE",
        correct: "b",
    },
    {
        question: "What is the correct syntax for linking an external script file to the HTML",
        a: "<script href='script.js'>",
        b: "<script src='script.js'>",
        c: "<script name='script.js'>",
        d: "<script='script.js'>",
        correct: "b",
    },
];
// Start page variables
var homeEl = document.querySelector("#home");
var startBtnEl = document.querySelector("#start-btn");
var highscoreLink = document.querySelector("#highscore");
// Quiz page variables
var quizEl = document.querySelector("#quiz");
var questionEl = document.getElementById("question");
var answerEl = document.querySelectorAll(".answer");
var isCorrect = document.querySelector("#correct-or-incorrect");
var aText = document.getElementById("a_text");
var bText = document.getElementById("b_text");
var cText = document.getElementById("c_text");
var dText = document.getElementById("d_text");
var nextBtnEl = document.getElementById("next-btn");
var currentQuestion = 0;
// Score and submit initials page variables
var inputScore = document.querySelector("#input-score");
var initialsEl = document.querySelector("#initials");
var userScoreEl = document.querySelector("#score");
var submitScoreBtn = document.querySelector("#submit-score");
var score = 0;
// Out of time page variables
var youLost = document.querySelector("#you-lose");
var tryAgainBtn = document.querySelector("#try-again-btn");
// Highscore page variables
var highscoreEl = document.querySelector("#highscore-page");
var goBackBtn = document.querySelector("#go-back");
var clearScoreBtn = document.querySelector("#clear-scores");
var scoresEl = document.querySelector("#scores");
var highscores = [];
// Timer variables
var timerEl = document.getElementById("timer");
var timeLeft = 75;
var timeSpent = 0;
var timeInterval;
// View highscore link button click event w/ function
highscoreLink.addEventListener("click", function() {
    homeEl.classList.add('hide');
    quizEl.classList.add('hide');
    inputScore.classList.add('hide');
    isCorrect.classList.add('hide');
    timerEl.classList.add('hide');
    highscoreEl.classList.remove('hide');
    initScores();
    stopTimer();
});
// Start quiz button click event
startBtnEl.addEventListener("click", startTimer);
// Try again button click event
tryAgainBtn.addEventListener("click", startOver);
// function to start the timer
function startTimer() {
    timerEl.textContent = "Time: " + timeLeft;
    startQuiz();
    timeInterval = setInterval(function () {
        timeSpent++
        timerEl.textContent = "Time: " + (timeLeft - timeSpent);
        if (timeSpent >= timeLeft) {
            clearInterval(timeInterval);
            youLose();
        }
    }, 1000);
};
// function to stop the timer
function stopTimer() {
    clearInterval(timeInterval);
};
// function to uncheck all/previous selected answer
function deselectAnswers() {
    answerEl.forEach((answer) => (answer.checked = false));
};
// function to get selected answer
function getSelected() {
    var answer;
    answerEl.forEach((answerEl) => {
        if (answerEl.checked) answer = answerEl.id;
    });
    console.log(answer);
    return answer;
};
// function to start the quiz
function startQuiz() {
    homeEl.classList.add("hide");
    quizEl.classList.remove("hide");
    deselectAnswers();
    var currentQuestionData = questions[currentQuestion];
    questionEl.textContent = currentQuestionData.question;
    aText.textContent = currentQuestionData.a;
    bText.textContent = currentQuestionData.b;
    cText.textContent = currentQuestionData.c;
    dText.textContent = currentQuestionData.d;

};
// function to load the next question
function nextQuestion() {
    currentQuestion++;
    if (questions[currentQuestion]) {
        startQuiz();
    } else {
        // hide button, show final score, stop timer
        isCorrect.classList.add('hide');
        quizEl.classList.add('hide');
        nextBtnEl.classList.add('hide');
        inputScore.classList.remove('hide');
        stopTimer();
    }

    if ((timeLeft - timeSpent) > 0)  {
        score = (timeLeft - timeSpent);
        userScoreEl.textContent = score;
    }   
};
// click event function to go to the next question
nextBtnEl.addEventListener("click", () => {
    var answer = getSelected();
    if (answer) {
        if (answer === questions[currentQuestion].correct) {
            isCorrect.textContent = "Correct";
            nextQuestion();
        } else {
            isCorrect.textContent = "Incorrect";
            timeLeft -= 10;
            nextQuestion();
        };
    };
});
// Out of time page function
function youLose() {
    quizEl.classList.add('hide');
    youLost.classList.remove('hide');
    isCorrect.classList.add('hide');
    timerEl.classList.add('hide');
};
// function that starts quiz over
function startOver () {
    refreshPage();
};
// function that refreshes the page
function refreshPage() {
    location.reload()
};
// function that submits score w/ initials to local storage
function submitScore() {
    var score = userScoreEl.textContent;
    var initials = initialsEl.value;
    var oldScores = localStorage.getItem("scores");
    oldScores = JSON.parse(oldScores) || [];
    oldScores.push(initials + "-" + score);
    highscores = oldScores;
    localStorage.setItem("scores", JSON.stringify(oldScores));
    highscoreEl.classList.remove('hide');
    inputScore.classList.add('hide');
    initScores();
};
// click event to start quiz over on high score page
goBackBtn.addEventListener("click", refreshPage);
// click event to submit score to local storage
submitScoreBtn.addEventListener("click", submitScore);
// function to clear scores saved in local storage
function clearScores() {
    highscores = [];
    localStorage.setItem("scores", JSON.stringify(highscores));
    loadHighscores();
};
// clear score button click event on highscore page
clearScoreBtn.addEventListener("click", clearScores);
// function to load the highscores saved to local storage and load them onto the page
function loadHighscores() {
    scoresEl.innerHTML="";
    console.log(highscores);
    for (let i = 0; i < highscores.length; i++) {
        var newScore = highscores[i];
        console.log(newScore);
        var li = document.createElement("li");
        li.textContent = newScore;
        li.setAttribute("data-index", i);
        scoresEl.appendChild(li);
    }
    highscoreLink.classList.add('hide');
};
// function to check if the stored scores are not null
function initScores() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
        highscores = storedScores;
      }
      loadHighscores();
};
// function to store the highscore in local storage
function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
};