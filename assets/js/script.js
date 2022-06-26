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
    }
];











