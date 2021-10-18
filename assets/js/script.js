timer = 75;

let strtTime = function () {
    document.getElementById("timer").innerHTML = "Timer:" + timer;
    timer--;
    if (timer < 0) {
        alert("Time expired!")
        document.getElementById("question-area-content").remove();
        displayScores();
    }
    else {
        setTimeout(strtTime, 1000);
    }
};
// function for 10 sec penalty 
let wrngAns = function () {
    timer -= 10;
};
// function for begin quiz
let strtQuiz = function () {
    let pageContentElement = document.getElementById("pageContent");
    pageContentElement.remove();
    runQs();
};


// function for run questions
function runQs() {
    
}
