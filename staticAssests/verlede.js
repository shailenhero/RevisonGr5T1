console.log("working")



const jasonData = document.querySelector("#data");
const questionDisplay = document.querySelector(".question");
const button = document.querySelector('#button')
const backButton = document.querySelector('#backButton')
const backLink = document.querySelector("#backLink")
const subButton = document.querySelector(".subButton")
const answerBox = document.querySelector("#answerBox");
const counter = document.querySelectorAll(".counter")
const answerRes = document.querySelector("#answerRes");
const scoreDisplay = document.querySelector("#scoreDisplay")
const scoreBox = document.querySelector("#scoreBox")
const topicBox = document.querySelector("#topicBox")
const correctionsBox = document.querySelector("#correctionsBox")
let corrections = "";

let score = 0;
let qNum = -1;
const topicData = JSON.parse(jasonData.value);

function setUpQuestion() {
    if (qNum > 4) {
        button.classList.add("disabled")
        button.disabled = true;



        subButton.classList.remove("subButton")
        subButton.classList.add("subButtonActive")

        scoreDisplay.innerText = `Score: ${score}`;
        scoreDisplay.classList.remove("inactive");

        //// send score to backend
        scoreBox.value = score;
        topicBox.value = topicData.topicName;
        correctionsBox.value = correctionsBox.value + corrections
    }
    else {


        qNum = qNum + 1;
        questionDisplay.innerText = topicData.questions[qNum];
        counter[0].innerText = qNum + 1;
        counter[1].innerText = qNum + 1;
        answerBox.value = "";

    }
}

function capturedata() {
    let userAnswer = answerBox.value.toLowerCase();

    if (userAnswer.trim() === topicData.answers[qNum]) {
        score = score + 1;
        answerRes.classList.remove("incorrect");
        answerRes.classList.add("correct")
        answerRes.innerHTML = "Correct";
    }
    else {
        answerRes.innerHTML = "Incorrect";
        answerRes.classList.remove("correct");
        answerRes.classList.add("incorrect")
        corrections = corrections + userAnswer + ",";
    }
}

button.addEventListener('click', function () {
    console.log("btn clicked")
    capturedata();
    setUpQuestion();
})

setUpQuestion();