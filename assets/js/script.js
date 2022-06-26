console.log("I'm a JavaScript file linked to this page!");

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
        logQuestion: function() {
            console.log(this.question + " -- " + this.choices[0].choice + ", " + this.choices[1].choice + ", " + this.choices[2].choice + ", " + this.choices[3].choice);
        },
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
        logQuestion: function() {
            var message = this.question;
            for (i = 0; i < this.choices.length; i++) {
                message = message + " | " + this.choices[i].choice;
            }
            console.log(message);
            // console.log(this.question + " -- " + this.choices[0].choice + ", " + this.choices[1].choice + ", " + this.choices[2].choice + ", " + this.choices[3].choice);

        },
    },

];











function beginQuiz() {
    document.getElementById('intro').setAttribute("style", "display: none;");
    document.getElementById('quiz').setAttribute("style", "display: block;");
}


document.getElementById("beginBtn").addEventListener("click", beginQuiz);