console.log("I'm a JavaScript file linked to this page!");

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











function beginQuiz() {
    document.getElementById('intro').setAttribute("style", "display: none;");
    document.getElementById('quiz').setAttribute("style", "display: block;");
}


document.getElementById("beginBtn").addEventListener("click", beginQuiz);