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
    let questionAreaContentElement = document.createElement("section");
    questionAreaContentElement.id = "question-area-content"
    document.body.append(questionAreaContentElement);

    let currentQuest = 0
    let questionHeader = document.createElement("h3");
    questionAreaContentElement.append(questionHeader)

    let addBtn = function () {
        for (i = 0; i < questionData[currentQuest].choices.length; i++) {
            let button = document.createElement("button");
            button.className = "btn"
            questionAreaContentElement.append(button);
        }
    }
    addBtn();

    let choicesElement = document.querySelectorAll(".btn");

    function iterate() {
        questionHeader.textContent = questionData[currentQuest].question
        choicesElement.forEach((choicesButton, i) => {
            choicesButton.textContent = questionData[currentQuest].choices[i]
        })
    }
    choicesElement.forEach(el => {
        el.addEventListener("click", function (event) {
            let choice = this.textContent
            if (choice === questionData[currentQuest].answer) {
                let correctAns = document.createElement("h3")
                correctAns.textContent = "Correct"
                $(correctAns).delay(200).fadeOut(500);
                document.body.append(correctAns)
            } else {
                let incorrectAns = document.createElement("h3")
                incorrectAns.textContent = "Incorrect"
                $(incorrectAns).delay(200).fadeOut(500);
                document.body.append(incorrectAns)
                wrongAnswer();
            }
            currentQuest++;
            if (currentQuest < questionData.length) {
                iterate()
            } else {
                setTimeout(returnScore, 1000);
            }
        }
        );




        iterate();

    })
}
