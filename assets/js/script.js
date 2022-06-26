var clock = document.getElementById("clock");
var question = document.getElementById("question");
var choices = document.getElementById("choices");

var currentQuestion = 0;





function logQuestion(question) {
    var message = question.question;
    for (i = 0; i < question.choices.length; i++) {
        message = message + " | " + question.choices[i].choice;
    }
    console.log(message);
}

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
        question: "Is <i>true</i> truthy or falsy?",
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








function showNextQuestion() {
    var answerChoices = "";
    for (i = 0; i < questionBank[0].choices.length; i++) {
        answerChoices += '<button class="choice">' + questionBank[0].choices[i].choice + '</button>';
    }

    question.innerHTML = questionBank[0].question;
    choices.innerHTML = answerChoices;
}


function beginQuiz() {
    document.getElementById('intro').setAttribute("style", "display: none;");
    document.getElementById('quiz').setAttribute("style", "display: block;");
    showNextQuestion();
}


document.getElementById("beginBtn").addEventListener("click", beginQuiz);