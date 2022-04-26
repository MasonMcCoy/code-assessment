var timerCount = document.getElementById("timer-count");
var startBttn = document.getElementById("start-button");

function startTest() {
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