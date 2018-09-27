var correctAnswers = ["gallifrey", "tardis", "time-lord", "sonic", "none", "regenerate", "two", "the-daleks", "killed", "any"];
var correctGuesses = 0;
var incorrectGuesses = 0;
var unansweredQuestions = 0;
var intervalID;
var timeLeft = 60;
var userAnswers = [];


function beginTrivia() {

    $("#time-left").text(timeLeft);

    $("#start").css("display", "none");
    $("#questionnaire").css("display", "block");

    intervalID = setInterval(countdown, 1000);

}

function collectAnswers() {
    // Collect the answers, store the results in variables 

    for (let i = 1; i <= 10; i++) {
        var radioName = "optradio" + i;
        var radioValue = "";

        if ($("input:radio[name=" + radioName + "]").is(":checked")) {
            radioValue = $("input[name=" + radioName + "]:checked").val();
        }

        userAnswers.push(radioValue);
    }

    for (let i = 0; i < correctAnswers.length; i++) {
        if (userAnswers[i] === "") {
            unansweredQuestions++;
        } else if (userAnswers[i] === correctAnswers[i]) {
            correctGuesses++;
        } else {
            incorrectGuesses++;
        }
    }
    
}

function countdown() {
    timeLeft--;

    $("#time-left").text(timeLeft);

    if (timeLeft === 0) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(intervalID);
    collectAnswers();
    showResults();
}

function showResults() {
    // Shows the results page, updates scores.

    $("#questionnaire").css("display", "none");
    $("#results").css("display", "block");

    $("#correct-answers").text(correctGuesses);
    $("#incorrect-answers").text(incorrectGuesses);
    $("#unanswered-questions").text(unansweredQuestions);

}

$(document).ready(function() {


    $("#start-btn").on("click", beginTrivia);

    $("#submit").on("click", function(event) {
        event.preventDefault();
        gameOver();
    })

    $("#restart").on("click", function() {
        timeLeft = 60;
        correctGuesses = 0;
        incorrectGuesses = 0;
        unansweredQuestions = 0;
        userAnswers = [];

        $("input:radio").prop("checked", false);

        $("#results").css("display", "none");
        
        beginTrivia();
    })

})