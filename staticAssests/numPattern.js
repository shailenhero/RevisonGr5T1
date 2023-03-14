console.log("working")
const jasonData = document.querySelector("#data");
const questionDisplay = document.querySelector(".question");
const button = document.querySelector('#button')
const answerBoxA = document.querySelector('#answerBoxA')
const answerBoxB = document.querySelector('#answerBoxB')
const answerBoxC = document.querySelector('#answerBoxC')
const counter = document.querySelectorAll(".counter")
const inputBoxLabel = document.querySelectorAll(".inputBoxLabel")


const answerRes = document.querySelector("#answerRes");


const topicData = JSON.parse(jasonData.value);
let qNum = 1;
let score = 0;
let corrections = "";

button.addEventListener('click', function () {
    console.log("btn clicked")

    if (qNum < 4) {
        sequencing();
    }
    if (qNum === 4) {
        ordering();
    }
})

function sequencing() {
    //capture data
    let answerA;
    let answerB;
    let answerC;
    let userAnswerA = answerBoxA.value;
    let userAnswerB = answerBoxB.value;
    let userAnswerC = answerBoxC.value;

    // extract DB answers
    let answers = topicData.answers[qNum - 1]    //1700,1600,1300
    console.log('///////anser')
    console.log(answers.length)
    let index = 1;
    let number = "";
    for (const digit of answers) {
        if (digit == ",") {
            //reset number
            number = ""
            index++;
        }
        else {
            //add number to correct variable
            if (index === 1) {
                // update answerA
                if (!answerA) {
                    answerA = digit.toString();
                }
                else {
                    answerA = answerA + digit.toString();
                }
            }
            else if (index === 2) {
                if (!answerB) {
                    answerB = digit.toString();
                }
                else {
                    answerB = answerB + digit.toString();
                }
            }
            else if (index === 3) {
                if (!answerC) {
                    answerC = digit.toString();
                }
                else {
                    answerC = answerC + digit.toString();
                }
            }
        }
    }

    //compare answers
    if (userAnswerA == answerA && userAnswerB == answerB && userAnswerC == answerC) {
        score++;
        answerRes.classList.remove("incorrect");
        answerRes.classList.add("correct")
        answerRes.innerHTML = "Correct";
    }
    else {
        answerRes.innerHTML = "Incorrect";
        answerRes.classList.remove("correct");
        answerRes.classList.add("incorrect")
        corrections = corrections + topicData.questions[qNum] + ",";
    }

    //setting display
    answerBoxA.value = "";
    answerBoxB.value = "";
    answerBoxC.value = "";
    questionDisplay.innerText = topicData.questions[qNum];
    qNum++;
    counter[0].innerText = qNum;
    counter[1].innerText = qNum;

    //destroy current and set up decending
    if (qNum === 4) {
        answerBoxA.parentElement.removeChild(answerBoxA);
        inputBoxLabel[0].parentElement.removeChild(inputBoxLabel[0]);
        answerBoxB.parentElement.removeChild(answerBoxB);
        inputBoxLabel[1].parentElement.removeChild(inputBoxLabel[1]);
        answerBoxC.parentElement.removeChild(answerBoxC);
        inputBoxLabel[2].parentElement.removeChild(inputBoxLabel[2]);

        //change Question
        questionDisplay.innerText = topicData.questions[qNum + 1]
        //create new input fields
    }
}

