var clock = document.getElementById("seconds");
var question = document.getElementById("question");
var choices = document.getElementById("choices");

var currentQuestion = 0;





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
    setInterval(function() {
        if (clock.innerHTML > 0)
        clock.innerHTML--;
    }, 1000);
}




function showNextQuestion() {
    var answerChoices = "";
    for (i = 0; i < questionBank[currentQuestion].choices.length; i++) {
        answerChoices += '<button class="choice">' + questionBank[currentQuestion].choices[i].choice + '</button>';
    }

    question.innerHTML = questionBank[currentQuestion].question;
    choices.innerHTML = answerChoices;
}

function correctClick() {
    console.log("Correct choice clicked");
}


function beginQuiz() {
    document.getElementById('intro').setAttribute("style", "display: none;");
    document.getElementById('quiz').setAttribute("style", "display: block;");
    showNextQuestion();
    startClock();
}


document.getElementById("beginBtn").addEventListener("click", beginQuiz);