// TO-DO:
// Only one click allowed! Spam clicks break the whole thing

// DOM variables
// var mainEl = document.querySelector("main");
var hiScores = document.getElementById("high-scores");
var quizArea = document.getElementById("quiz-area");
var timerEl = document.getElementById("timer-text");
var timerCount = document.getElementById("timer-count");
var timeLeft = 60;
var startBttn = document.getElementById("start-button");
var question = document.getElementById("prompt-area");
var currentQuestion;
var quizScore = 0;
var answersGiven = 0;

// Array of assessment question objects
var quizQuestions = [{
    prompt: "Which of the following is NOT a JavaScript data type?",
    choices: ["Array", "Object", "Dictionary", "String"],
    answer: "Dictionary"
}, {
    prompt: "Which of the following is a method of the Web API?",
    choices: [".split()", ".innerHTML", ".createElement()", ".length"],
    answer: ".createElement()"
}, {
    prompt: "Which character creates an Object?",
    choices: ["*", "{", "-", "="],
    answer: "{"
}, {
    prompt: "Strings can only contain alphabetical characters.",
    choices: ["True", "False"],
    answer: "False"
}, {
    prompt: "Which of the following is NOT a means of accessing DOM elements?",
    choices: [".fetch()", ".querySelector()", ".querySelectorAll()", ".getElementById()"],
    answer: ".fetch()"
}, {
    prompt: "What is the boolean value of 0?",
    choices: ["true", "false"],
    answer: "false"
}, {
    prompt: "The Web API allows developers to navigate HTML elements through the use of the...",
    choices: ["HAM", "RAM", "DOM", "XOM"],
    answer: "DOM"
}, {
    prompt: "How does the + operator work?",
    choices: ["Adds numbers", "Concatenates strings", "All of the above", "Adds elements to an array"],
    answer: "All of the above"
}, {
    prompt: "How might you further examine exectued code in the browser?",
    choices: ["console.log()", "watch statements", "breakpoints", "All of the above"],
    answer: "All of the above"
}, {
    prompt: "What is the syntax to add information to Local Storage?",
    choices: [".addItem(KEY, VALUE)", ".pushtoLocal(KEY, VALUE)", ".plsRemember(KEY, VALUE)", ".setItem(KEY, VALUE)"],
    answer: ".setItem(KEY, VALUE)"
}

]

// Randomly selects from array of quiz questions
function getQuestion() {
    for (var i = 0; i < quizQuestions.length; i++) {
        var randomIdx = Math.floor(Math.random() * (quizQuestions.length - 1));
        // console.log(randomIdx);

        // Removes question from the array to prevent duplicates
        selectedQuestion = quizQuestions.splice(randomIdx, 1);

        // Return question object
        return selectedQuestion
    }
}

// Adds form to assessment area with question prompt and choices
function QuestionForm() {
    currentQuestion = getQuestion();

    console.log(currentQuestion);
    
    question.innerText = currentQuestion[0].prompt;

    var choiceForm = document.createElement("form");

    choiceForm.setAttribute("id", "choice-form");

    // Creates choices
    for (var i = 0; i < currentQuestion[0].choices.length; i++) {
        var choiceRow = document.createElement("div");
        var choiceCB = document.createElement("input");
        var choiceP = document.createElement("p");

        choiceRow.style.display = "flex";
        choiceCB.setAttribute("type", "checkbox");
        choiceP.innerText = currentQuestion[0].choices[i];

        choiceRow.appendChild(choiceCB);
        choiceRow.appendChild(choiceP);

        choiceForm.appendChild(choiceRow);
    }

    quizArea.appendChild(choiceForm);
}

// Adds to total score if select choice is correct, removes times if incorrect
function checkChoice(choice) {
    answersGiven += 1;
    console.log(answersGiven);

    if (choice === currentQuestion[0].answer) {
        quizScore += 1;
    } else {
        // Remove time from counter
        timeLeft -= 5;
    }
}

// Starts the assessment
function startQuiz() {
    startBttn.style.display = "none";

    QuestionForm();

    var quizTime = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timerCount.textContent = timeLeft;
            
        } else {
            clearInterval(quizTime);
            timerEl.innerText = 'Time is up!';
            clearQuestion()
            recordScore()

        }
        if (answersGiven === 10 && timeLeft > 0) {
            clearInterval(quizTime);
            console.log("You Win!");
            setTimeout(() => {recordScore();}, 500);
        }
        
    }, 1000)
}

// Clears quiz area
function clearQuestion() {
    question.innerText = "";
    if (document.getElementById("choice-form")) {
        document.getElementById("choice-form").remove();
    }
}

// Reports final score, recrods user initals
function recordScore() {
    var scoreForm = document.createElement("form");
    var scoreP = document.createElement("p");
    var initialsLabel = document.createElement("label");
    var initialsInput = document.createElement("input");
    var scoreBtn = document.createElement("button");

    scoreP.innerText = "Your final score is " + quizScore;
    initialsLabel.innerText = "Initials";
    initialsInput.setAttribute("id", "initials-field");
    scoreBtn.innerText = "Submit";
    scoreBtn.setAttribute("id", "score-submit");

    scoreForm.appendChild(scoreP);
    scoreForm.appendChild(initialsLabel);
    scoreForm.appendChild(initialsInput);
    scoreForm.appendChild(scoreBtn);

    question.appendChild(scoreForm);    
}

function clickChoice(event) {
    var userChoice = event.target;

    if (userChoice.tagName != "INPUT") {
        return;
    }

    // Checks to see if selected choice matches correct answer
    checkChoice(userChoice.parentElement.innerText);
    
    // Brief delay so user can see the result of their input
    setTimeout(() => {clearQuestion();}, 500);
    
    // Handles the array being empty without error, removes event listener for future events
    if (answersGiven >= 10) {
        quizArea.removeEventListener("click", clickChoice);
        return
    }

    // Brief delay to match the above delay
    setTimeout(() => {QuestionForm();}, 500);
}

// Begins quiz
startBttn.addEventListener("click", startQuiz);

// Event delegation for all question choices
quizArea.addEventListener("click", clickChoice);

// Accesses local storage
hiScores.addEventListener("click", function() {
    startBttn.style.display = "none";
    clearQuestion();

    var scoreUl = document.createElement("ul");
    scoreUl.innerText = "High Scores";

    for (var i = 0; i < localStorage.length; i++) {
        initKey = localStorage.key(i)
        initVal = localStorage.getItem(localStorage.key(i));
        
        var scoreLi = document.createElement("li");
        
        scoreLi.innerText = initKey + " has a score of " + initVal;
        scoreUl.appendChild(scoreLi);
    }

    quizArea.appendChild(scoreUl);
})

// Records user score in local storage
question.addEventListener("click", function(event) {
    if (event.target && event.target.id === "score-submit") {
        var initials = document.getElementById("initials-field").value;

        if (initials.length <= 3 && initials.length >= 2) {
            localStorage.setItem(initials.toUpperCase(), quizScore);
        }
    }
})