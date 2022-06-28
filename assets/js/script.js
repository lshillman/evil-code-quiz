var clock = document.getElementById("seconds");
var clockHeading = document.getElementById("clock");

var intro = document.getElementById('intro');
var quiz = document.getElementById('quiz');
var highscores = document.getElementById('highscores');
var highscoresTable = document.getElementById('highscores-table');
var nameModal = document.getElementById('modal');
var gameOverMsg = document.getElementById('gameOverMsg');
var playerName = document.getElementById('name');
var saveNameBtn = document.getElementById('saveNameBtn');

var question = document.getElementById("question");
var choices = document.getElementById("choices");

var timer;
var timeRemaining = 60;
var currentQuestion = 0;

var questionsAnswered = 0;
var correctCount = 0;

// initial high scores to display if we don't have stuff in localstorage
var scores = [
    {name:"Luke", score:999999},
    {name:"Blinky", score:450},
    {name:"Pinky", score:202},
    {name:"Inky", score:200},
    {name:"Clyde", score:48},
];

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
            {choice: "Truthy", isCorrect: true, sortIndex: 0},
            {choice: "Falsy", isCorrect: false, sortIndex: 0},
            {choice: "Neither; it's NaN", isCorrect: false, sortIndex: 0},
            {choice: "Neither; it's undefined", isCorrect: false, sortIndex: 0}
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "Is <em>true</em> truthy or falsy?",
        choices: [
            {choice: "Truthy", isCorrect: false, sortIndex: 0},
            {choice: "Falsy", isCorrect: false, sortIndex: 0},
            {choice: "Neither; it's NaN", isCorrect: false, sortIndex: 0},
            {choice: "Neither; it's true", isCorrect: true, sortIndex: 0}
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "What is the best way to put an object in localStorage?",
        choices: [
            {choice: "localStorage.setItem()", isCorrect: false, sortIndex: 0},
            {choice: "localStorage.put()", isCorrect: false, sortIndex: 0},
            {choice: "JSON.stringify()", isCorrect: true, sortIndex: 0},
            {choice: "JSON.parse()", isCorrect: false, sortIndex: 0},
            {choice: "JSON.put()", isCorrect: false, sortIndex: 0},
            {choice: "JSON.localStorage.setItem()", isCorrect: false, sortIndex: 0}
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "What unit of time does setInterval take as an argument?",
        choices: [
            {choice: "seconds", isCorrect: false, sortIndex: 0},
            {choice: "milliseconds", isCorrect: true, sortIndex: 0},
            {choice: "nanoseconds", isCorrect: false, sortIndex: 0},
            {choice: "minutes", isCorrect: false, sortIndex: 0},
            {choice: "centiseconds", isCorrect: false, sortIndex: 0},
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "When working with JavaScript, how should you pronounce the G in 'gif'?",
        choices: [
            {choice: "Hard G, as in 'gift'", isCorrect: true, sortIndex: 0},
            {choice: "Soft G, as in 'George'", isCorrect: true, sortIndex: 0},
            {choice: "Gutteral CH, as in 'Bach'", isCorrect: true, sortIndex: 0},
            {choice: "Y, as in 'yiff'", isCorrect: true, sortIndex: 0},
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "Does slice() affect the string it's used on?",
        choices: [
            {choice: "Yes, always", isCorrect: false, sortIndex: 0},
            {choice: "No", isCorrect: true, sortIndex: 0},
            {choice: "It depends on the scope of the string", isCorrect: false, sortIndex: 0},
            {choice: "Only if invoked in a 'console.log' statement", isCorrect: false, sortIndex: 0},
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "In the following object, how would you access the value 'Tertiary adjunct of Unimatrix 01'?<br /><br />var collective = [<br />{designation: 'Locutus', role: 'Diplomat'},<br />{designation: '7/9', role: 'Tertiary Adjunct of Unimatrix 01'},<br />{designation: 'Hugh', role: 'Drone'}<br />]",
        choices: [
            {choice: "collective[1].role", isCorrect: true, sortIndex: 0},
            {choice: "collective[0].role()", isCorrect: true, sortIndex: 0},
            {choice: "'7/9'.role", isCorrect: false, sortIndex: 0},
            {choice: "role(collective[1])", isCorrect: false, sortIndex: 0},
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "In the following object, how would you access the value 'bartender'?<br />var crewman = {name: 'Guinan', rank: 'bartender', station: 'Ten Forward'};",
        choices: [
            {choice: "crewman.rank", isCorrect: true, sortIndex: 0},
            {choice: "crewman.rank()", isCorrect: false, sortIndex: 0},
            {choice: "rank(crewman)", isCorrect: false, sortIndex: 0},
            {choice: "Guinan.rank", isCorrect: false, sortIndex: 0},
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "In the following piece of code, what is 'pickle'?<br /><br />element.addEventListener('keyDown', keyHandler)<br /><br />function keyHandler(pickle) {<br />&nbsp;&nbsp;&nbsp;&nbsp;console.log('pickle');<br />}",
        choices: [
            {choice: "an event", isCorrect: true, sortIndex: 0},
            {choice: "a keyHandler", isCorrect: false, sortIndex: 0},
            {choice: "an event listener", isCorrect: false, sortIndex: 0},
            {choice: "a string", isCorrect: false, sortIndex: 0},
            {choice: "a function", isCorrect: false, sortIndex: 0},
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
    },

    {
        question: "If a = 6, b = 'T', and c.toUpperCase === b is <i>true</i>, what is a possible value of a * c?",
        choices: [
            {choice: "NaN", isCorrect: true, sortIndex: 0},
            {choice: "36", isCorrect: false, sortIndex: 0},
            {choice: "undefined", isCorrect: false, sortIndex: 0},
            {choice: "null", isCorrect: false, sortIndex: 0},
            {choice: "error", isCorrect: false, sortIndex: 0},
        ],
        audio: "./assets/sound/somefile.mp3",
        sortIndex: 0
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


function shuffleQuestions() {
    // shuffle the questions
    for (i=0; i < questionBank.length; i++) {
        questionBank[i].sortIndex = Math.floor(Math.random() * questionBank.length);
    }
    questionBank.sort((a, b) => b.sortIndex - a.sortIndex);

    // shuffle the answer choices
    for (i=0; i < questionBank.length; i++) {
        for (z=0; z < questionBank[i].choices.length; z++) {
            questionBank[i].choices[z].sortIndex = Math.floor(Math.random() * questionBank[i].choices.length);
        }
        questionBank[i].choices.sort((a, b) => b.sortIndex - a.sortIndex);
    }

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
                choices.children[i].addEventListener("click", incorrectClick); // Event delegation? LOL, what's that?
            }
        }
    } else {
        finishQuiz(timer);
    }
}

// stuff to do when a correct answer is clicked
function correctClick() {
    console.log("Correct choice clicked");
    currentQuestion++;
    correctCount++;
    showNextQuestion();
}

// stuff to do when a wrong answer is clicked
function incorrectClick() {
    console.log("incorrect choice clicked");
    currentQuestion++;
    showNextQuestion();
    timeRemaining -= 10;
    clock.innerHTML = timeRemaining;
}

// stuff to do when all questions or answered or the clock runs out.
// TODO combine redundant stuff to make this neater.
function finishQuiz(timer) {
    if (timeRemaining >= 0 && currentQuestion == questionBank.length) {
        // console.log("You finished, congrats!");
        gameOverMsg.innerHTML = "Congrats, you finished!";
        clearInterval(timer);
        highscores.setAttribute("style", "display: block;");
        quiz.setAttribute("style", "display: none;");
        clockHeading.setAttribute("style", "display: none;");
        if ((calculateScore() > scores[scores.length-1].score || scores.length < 10) && calculateScore() > 0) {
            collectName();
        }
    } else {
        // console.log("Time's up!");
        gameOverMsg.innerHTML = "Time's up!";
        clearInterval(timer);
        highscores.setAttribute("style", "display: block;");
        quiz.setAttribute("style", "display: none;");
        clockHeading.setAttribute("style", "display: none;");
         // check to see if the user's score is higher than the lowest high score
        if ((calculateScore() > scores[scores.length-1].score || scores.length < 10) && calculateScore() > 0) {
            collectName();
        }
    }
}

function calculateScore() { // if you finish the quiz, your correct answer count is multipled by the seconds remaining.
    if (timeRemaining > 0) {
        return correctCount * timeRemaining;
    } else {
        return correctCount;
    }
}

// show the name input modal
function collectName() {
    nameModal.setAttribute("style", "display: block;");
    playerName.focus();
}


// I decided to only add your name to the high scores if it's greater than 0. Since I'm only storing the top 10, that means your score has to be greater than 0 and grweater than the lowest score on the list (if there are 10 items) for the prompt to appear.

function addToHighScores(e) {
    e.preventDefault;
    console.log(playerName.value);
    if (playerName.value) {
        scores.push({name: playerName.value, score: calculateScore()});
    }
    nameModal.setAttribute("style", "display: none;");
    scores.sort((a, b) => b.score - a.score); // sorts scores from highest to lowest
    scores.splice(10); // only store the top 10 scores
    localStorage.setItem("scores", JSON.stringify(scores));
    updateHighScoresTable();
}

// write the scores array to the page as a table
function updateHighScoresTable() {
    highscoresTable.innerHTML = "";
    var tablecontent = "";
    for (i=0; i < scores.length; i++) {
        tablecontent += ("<tr><td>" + scores[i].name + "</td><td>" + scores[i].score + "</td></tr>")
    }
    highscoresTable.innerHTML = tablecontent;
}

// Reset all the variables and prepare a new quiz. Important to reset variables in case the user hits "try again" without refreshing the page.
function beginQuiz() {
    intro.setAttribute("style", "display: none;");
    highscores.setAttribute("style", "display: none;");
    quiz.setAttribute("style", "display: block;");
    clockHeading.setAttribute("style", "display: block;");
    timeRemaining = 60;
    clock.innerHTML = timeRemaining;
    currentQuestion = 0;
    correctCount = 0;
    shuffleQuestions();
    showNextQuestion();
    startClock();
}

// stuff to do when the page loads
function init () {
    if (localStorage.getItem("scores") != null) { // if we have high scores in local storage, write them to the scores array.
        scores = JSON.parse(localStorage.getItem("scores"));
        highscores.setAttribute("style", "display: block;");
        intro.setAttribute("style", "display: none;");
    }
    updateHighScoresTable();
}

// do some stuff when the page loads
init();

document.getElementById("beginBtn").addEventListener("click", beginQuiz);
document.getElementById("tryAgainBtn").addEventListener("click", beginQuiz);
saveNameBtn.addEventListener("click", addToHighScores);