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
// function for 10 second penalty 
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
                wrngAns();
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

let returnScore = function () {
    // remove timer
    document.getElementById("timer").remove();
    document.getElementById("question-area-content").remove();

    let Score = timer

    let alertBoxEl = document.createElement("section")
    alertBoxEl.id = "alert-box"
    document.body.append(alertBoxEl);

    let gameOverStmt = document.createElement("p")
    gameOverStmt.textContent = "All Done " + Score + ". Enter your initials."
    alertBoxEl.append(gameOverStmt);

    let playerInitForm = document.createElement("form")
    alertBoxEl.append(playerInitForm)

    let playerInitTxtbox = document.createElement("input")
    playerInitTxtbox.setAttribute("type", "text");
    playerInitTxtbox.id = "player-initials";
    alertBoxEl.append(playerInitTxtbox);

    let playerInitSubmitBtn = document.createElement("input")
    playerInitSubmitBtn.setAttribute("type", "submit")
    playerInitSubmitBtn.id = "submit-btn"
    alertBoxEl.append(playerInitSubmitBtn);

    // addEventListener for click of submit button
    playerInitSubmitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let playerInits = document.querySelector('#player-initials').value;

        if (playerInits === "") {
            alert("Must Enter Initials!");
        } else {
            let obj = {
                player: playerInits,
                score: Score
            }
            if(localStorage.getItem("scoreTable")){
                scoresArr = JSON.parse(localStorage.getItem("scoreTable"))
            }
            scoresArr.push(obj)

            localStorage.setItem("scoreTable", JSON.stringify(scoresArr))
            localStorage.setItem("playerInitials", playerInits);
            localStorage.setItem("score", Score);
            alertBoxEl.remove();
            showScores();
        }
    })
};

let showScores = function () {
    let hiScores = document.createElement("section");
    hiScores.id = "pageContent"
    document.body.append(hiScores);

    let scoreHeader = document.createElement("h2");
    scoreHeader.textContent = "High Scores"
    hiScores.append(scoreHeader);

    let scoreList = document.createElement("ol")
    scoreList.id = "scoreList"
    hiScores.append(scoreList);

    let addScores = function () {
        let scoreScreenObject = JSON.parse(localStorage.getItem("scoreTable"))
        scoreScreenObject.sort((a, b) => b.score - a.score);

        for (i = 0; i < 3; i++) {
            let scoreItem = document.createElement("li");
            if (scoreScreenObject[i]){
                scoreItem.textContent = (scoreScreenObject[i].player + " " + scoreScreenObject[i].score);
            } else {
                scoreItem.textContent = ""
            }
            scoreList.append(scoreItem);
        }
    }
    addScores();

    let buttonsDiv = document.createElement("div")
    buttonsDiv.className = "button-container"
    hiScores.append(buttonsDiv);

    let restartButtonElement = document.createElement("button")
    restartButtonElement.textContent = "Start Quiz!"
    restartButtonElement.id = "restart-btn"
    buttonsDiv.append(restartButtonElement);
    
    let clearScoresElement = document.createElement("button")
    clearScoresElement.textContent = "Clear High Scores"
    clearScoresElement.id = "clear-scores-btn"
    buttonsDiv.append(clearScoresElement);

    // function to clear high score data on click event listener
    clearScoresElement.addEventListener("click", () => {
        localStorage.clear();
        scoreList.remove();
        clearScoresElement.remove();
    });
    
    // function to restart button for on click event listener to initiate quiz/timer
    restartButtonElement.addEventListener("click", () => {
        let timerCreate = document.createElement("h2");
        timerCreate.id = "timer"
        timer = 75
        header.append(timerCreate);
        strtTime();
        strtQuiz();
    });
}

let startButtonElement = document.getElementById("startBtn");
startButtonElement.addEventListener("click", () => {
    strtTime();
    strtQuiz();
});