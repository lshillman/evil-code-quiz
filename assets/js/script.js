var clock = document.getElementById("seconds");

var intro = document.getElementById('intro');
var quiz = document.getElementById('quiz');
var highscores = document.getElementById('highscores');
var nameModal = document.getElementById('modal');
var gameOverMsg = document.getElementById('gameOverMsg');
var playerName = document.getElementById('name');
var saveNameBtn = document.getElementById('saveNameBtn');

var question = document.getElementById("question");
var choices = document.getElementById("choices");

var timer;
var timeRemaining = 5;
var currentQuestion = 0;

var questionsAnswered = 0;
var correctCount = 0;

var scores = [
    {name:"Luke", score:999999},
    {name:"Clyde", score:48},
    {name:"Pinky", score:202},
    {name:"Inky", score:200},
    {name:"Blinky", score:450},
];

var lowestHighScore = 0;

function sortScores() {
    // TODO write this
}

function logQuestion(question) { // used for debugging
    var message = question.question;
    for (i = 0; i < question.choices.length; i++) {
        message = message + " | " + question.choices[i].choice;
    }
    console.log(message);
}


// ultimately I'd like to have two arrays: 1. questionBank, to store all possible questions; 2. quizQuestions, which gets randomly populated with a selection of questions from the bank. We'll see if I have time.
var questionBank = [
    {
        question: "Is 'falsy' truthy or falsy?",
        choices: [
            {choice: "Truthy", isCorrect: true},
            {choice: "Falsy", isCorrect: false},
            {choice: "Neither; it's NaN", isCorrect: false},
            {choice: "Neither; it's undefined", isCorrect: false}
        ],
        shuffleChoices: function() {
            console.log("shuffleChoices function");
        },
        audio: "./assets/sound/somefile.mp3",
    },

    {
        question: "Is <em>true</em> truthy or falsy?",
        choices: [
            {choice: "Truthy", isCorrect: false},
            {choice: "Falsy", isCorrect: false},
            {choice: "Neither; it's NaN", isCorrect: false},
            {choice: "Neither; it's true", isCorrect: true}
        ],
        shuffleChoices: function() {
            console.log("shuffleChoices function");
        },
        audio: "./assets/sound/somefile.mp3",
    },

];


function startClock() {
    timer = setInterval(function() {
        if (timeRemaining > 0) {
            timeRemaining--;
            clock.innerHTML = timeRemaining;
        } else {
            finishQuiz(timer);
        }
    }, 1000);
}




function showNextQuestion() {
    if (questionBank[currentQuestion]) {
        var answerChoices = "";
        for (i = 0; i < questionBank[currentQuestion].choices.length; i++) {
            answerChoices += '<button class="choice">' + questionBank[currentQuestion].choices[i].choice + '</button>';
        }
        question.innerHTML = questionBank[currentQuestion].question;
        choices.innerHTML = answerChoices;
        // TODO: see if I can use "appendChild" to accomplish this function using only 1 loop
        for (i = 0; i < questionBank[currentQuestion].choices.length; i++) {
            if (questionBank[currentQuestion].choices[i].isCorrect) {
                choices.children[i].addEventListener("click", correctClick);
            } else {
                choices.children[i].addEventListener("click", incorrectClick);
            }
        }
    } else {
        finishQuiz(timer);
    }
}

function correctClick() {
    console.log("Correct choice clicked");
    currentQuestion++;
    correctCount++;
    showNextQuestion();
}

function incorrectClick() {
    console.log("incorrect choice clicked");
    currentQuestion++;
    showNextQuestion();
    timeRemaining -= 10;
    clock.innerHTML = timeRemaining;
}

function finishQuiz(timer) {
    if (timeRemaining >= 0 && currentQuestion == questionBank.length) {
        console.log("You finished, congrats!");
        gameOverMsg.innerHTML = "Congrats, you finished!";
        clearInterval(timer);
        highscores.setAttribute("style", "display: block;");
        quiz.setAttribute("style", "display: none;");
        if (calculateScore() > lowestHighScore && scores.length < 11) {
            collectName();
        }
    } else {
        console.log("Time's up!");
        gameOverMsg.innerHTML = "Time's up!";
        clearInterval(timer);
        highscores.setAttribute("style", "display: block;");
        quiz.setAttribute("style", "display: none;");
        if (calculateScore() > lowestHighScore && scores.length < 11) {
            collectName();
        }
    }
}

function calculateScore() {
    if (timeRemaining > 0) {
        return correctCount * timeRemaining;
    } else {
        return correctCount;
    }
}

function collectName() {
    nameModal.setAttribute("style", "display: block;");
}

function addToHighScores() {
    console.log(playerName.innerText); // TODO FIGURE OUT WHY THIS DOESN'T WORK
    if (playerName.innerText) {
        scores.push({name: playerName.innerText, score: calculateScore()});
    }
}


function beginQuiz() {
    intro.setAttribute("style", "display: none;");
    highscores.setAttribute("style", "display: none;");
    quiz.setAttribute("style", "display: block;");
    showNextQuestion();
    startClock();
}


document.getElementById("beginBtn").addEventListener("click", beginQuiz);
saveNameBtn.addEventListener("click", addToHighScores);