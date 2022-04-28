// DOM variables
var test = document.getElementById("assess-area");
var timerCount = document.getElementById("timer-count");
var startBttn = document.getElementById("start-button");
var question = document.getElementById("prompt-area");

// Array of assessment question objects
// TO-DO: Add content to this array
var assessQuestions = [{
    prompt: "Test Question 1",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 2",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 3",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 4",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 5",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 6",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 7",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 8",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 9",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}, {
    prompt: "Test Question 10",
    choices: ["Test Answer", "Test Answer 2", "Test Answer Too", "Test Answer II"]
}

]

// Randomly selects from array of test questions
function getQuestion() {
    for (var i = 0; i < assessQuestions.length; i++) {
        var randomIdx = Math.floor(Math.random() * assessQuestions.length);
        
        // Return question object
        return assessQuestions[randomIdx]
    }
}

// Adds form to assessment area with question prompt and choices
function renderForm() {
    question.innerText = getQuestion().prompt;

    var choiceForm = document.createElement("form");

    for (var i = 0; i < 4; i++) {
        var choiceRow = document.createElement("div");
        var choiceCB = document.createElement("input");
        var choiceP = document.createElement("p");

        choiceRow.style.display = "flex";
        choiceCB.setAttribute("type", "checkbox");
        choiceP.innerText = getQuestion().choices[i];

        choiceRow.appendChild(choiceCB);
        choiceRow.appendChild(choiceP);

        choiceForm.appendChild(choiceRow);
    }

    test.appendChild(choiceForm);
}

// Starts the assessment
function startTest() {
    startBttn.style.display = "none";

    renderForm();

    var timeLeft = 10;

    var testTime = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timerCount.textContent = timeLeft;
        } else {
            clearInterval(testTime);
        }
        
    }, 1000)
}

startBttn.addEventListener("click", startTest);