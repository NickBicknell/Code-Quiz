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

var homeEl = document.querySelector("#home");
var startBtnEl = document.querySelector("#start-btn");
var nextBtnEl = document.getElementById("next-btn");
var quizEl = document.querySelector("#quiz");
var questionEl = document.getElementById("question");
var answerEl = document.querySelectorAll(".answer");
var isCorrect = document.querySelector("#correct-or-incorrect");
var aText = document.getElementById("a_text");
var bText = document.getElementById("b_text");
var cText = document.getElementById("c_text");
var dText = document.getElementById("d_text");
var score = 0;
var userScoreEl = document.querySelector("#score");





var currentQuestion = 0;

var timerEl = document.getElementById("timer");
var timeLeft = 60;
var timeSpent = 0;
var timeInterval;

startBtnEl.addEventListener("click", startTimer);


function startTimer() {
    timerEl.textContent = "Time: " + timeLeft;
    startQuiz();
    timeInterval = setInterval(function () {
        timeSpent++
        timerEl.textContent = "Time: " + (timeLeft - timeSpent);

        if (timeSpent >= timeLeft) {
            clearInterval(timeInterval);
        }
    }, 1000);
};

function stopTimer() {
    clearInterval(timeInterval);
};

function deselectAnswers() {
    answerEl.forEach((answer) => (answer.checked = false));
};

function getSelected() {
    var answer;
    answerEl.forEach((answerEl) => {
        if (answerEl.checked) answer = answerEl.id;
    });
    console.log(answer);
    return answer;
};

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

function nextQuestion() {
    currentQuestion++
    startQuiz();
    if (currentQuestion > questions.length) {
        stopTimer();
        if ((timeLeft - timeSpent) > 0)
            score += (timeLeft - timeSpent);
        userScoreEl.textContent = score;
    }
};

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

