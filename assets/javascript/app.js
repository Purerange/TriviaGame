var intervalID;

var timeLeft = 10;




function beginTrivia() {

    $("#start").css("display", "none");
    $("#questionnaire").css("display", "block");

    intervalID = setInterval(countdown, 1000);

}

function countdown() {
    timeLeft--;

    $("#time-left").text(timeLeft);

    if (timeLeft === 0) {
        outOfTime();
    }
}

function outOfTime() {
    alert("You're out of time!");
    clearInterval(intervalID);
}


$(document).ready(function() {


    $("#start-btn").on("click", beginTrivia);



})