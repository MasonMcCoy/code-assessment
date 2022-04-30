// DOM variables
var quizArea = document.getElementById("quiz-area");
var timerEl = document.getElementById("timer-text");
var timerCount = document.getElementById("timer-count");
var startBttn = document.getElementById("start-button");
var question = document.getElementById("prompt-area");
var currentQuestion;
var quizScore = 0;

// Array of assessment question objects
var assessQuestions = [{
    prompt: "Which of the following is NOT a JavaScript data type?",
    choices: ["Array", "Object", "Dictionary", "String"],
    answer: "Dictionary"
}, {
    prompt: "Which of the following is a method of the Web API?",
    choices: [".split()", ".innerHTML", ".createElement()", ".length"],
    answer: "createElement()"
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
    for (var i = 0; i < assessQuestions.length; i++) {
        var randomIdx = Math.floor(Math.random() * assessQuestions.length);
        
        // Removes question from the array to prevent duplicates
        selectedQuestion = assessQuestions.pop(randomIdx)

        // Return question object
        return selectedQuestion
    }
}

// Adds form to assessment area with question prompt and choices
function renderForm() {
    currentQuestion = getQuestion();

    console.log(currentQuestion);
    
    question.innerText = currentQuestion.prompt;

    var choiceForm = document.createElement("form");

    // Might not need this
    choiceForm.setAttribute("id", "choice-form");

    // Creates choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceRow = document.createElement("div");
        var choiceCB = document.createElement("input");
        var choiceP = document.createElement("p");

        choiceRow.style.display = "flex";
        choiceCB.setAttribute("type", "checkbox");
        choiceP.innerText = currentQuestion.choices[i];

        choiceRow.appendChild(choiceCB);
        choiceRow.appendChild(choiceP);

        choiceForm.appendChild(choiceRow);
    }

    quizArea.appendChild(choiceForm);
}

// Adds to total score if select choice is correct, removes times if incorrect
function checkChoice(choice) {
    if (choice === currentQuestion.answer) {
        quizScore += 1;
        console.log('Correct!');
        console.log(quizScore);
    } else {
        console.log('Incorrect!');
        console.log(quizScore);
        // TO-DO: Remove time from counter
    }
}

// Starts the assessment
function startQuiz() {
    startBttn.style.display = "none";

    renderForm();

    var timeLeft = 60;

    var quizTime = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timerCount.textContent = timeLeft;
            
        } else {
            clearInterval(quizTime);
            timerEl.innerText = 'Time is up!';
            clearQuestion()
            // TO-DO: Initials form

        }
        if (!assessQuestions.length && timeLeft > 0) {
            clearInterval(quizTime);
            console.log("You Win!");
            clearQuestion()
            // TO-DO: Initials form
        }
        
    }, 1000)
}

// Clears quiz area
function clearQuestion() {
    question.innerText = "";
    document.getElementById("choice-form").remove();
}

// Reports final score, recrods user initals
function scoreAlert() {
    alert("")
}


// Begins quiz
startBttn.addEventListener("click", startQuiz);

quizArea.addEventListener("click", function(event) {
    var userChoice = event.target;

    if (userChoice.tagName != "INPUT") {
        return;
    }

    // Checks to see if selected choice matches correct answer
    checkChoice(userChoice.parentElement.innerText);

    clearQuestion();

    if (!assessQuestions.length) {
        return
    }
    
    renderForm();
})