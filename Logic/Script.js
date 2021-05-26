let time =90;
let runningTimer;
let score=0;
let username = "";
let qNumber;
let finalScore;
const MAX_HIGH_SCORES = 7;

const startButton = document.getElementById("startButton");
const qContainer = document.getElementById("questionsContainer");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const countdown = document.getElementById("timerArea");
const scoreArea = document.getElementById("scoreArea");
const highscoreButton = document.getElementById("showscoresButton");

let highscores = JSON.parse(localStorage.getItem("highscores"))|| [];

startButton.addEventListener("click",startGame);
highscoreButton.addEventListener("click",displayscores);

//Fumction to start the GAME
function startGame(){
    startButton.classList.add("hide");
    scoreArea.classList.add("hide");
    answerButtons.classList.remove("hide");
    qNumber=0;
    qContainer.classList.remove("hide");
    scoreArea.innerHTML="";
    startClock();
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    showQuestion(questions[qNumber]);
}

//fxn to display questions
function showQuestion(question){
    qElement.innerText=question.question;
    question.answers.forEach(answer =>{
        const button =document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        answerButtons.appendChild(button);

    });
}

//Fxn to start the timer
function startClock(){
    countdown.innerHTML="Time Remaining:" + timer;
    if(timer <= 0){
        gameOver();
    } else {
        time -=1;
        runningTimer = setTimeout(startClock,1000);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    if(!selectedButton.dataset.correct){
        timer = timer -10;
        console.log(timer)
    }
    if(qNumber == question.length -1){
        gameOver();
    }else{
        clearQuestion();
        qNumber++;
        showQuestion(question[qNumber]);
    }
}

//Function to clear the currennt Question
function clearQuestion(){
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Function gameover
function gameOver(){
    clearInterval(runningTimer);
    countdown.innerHTML = "finished";
    clearQuestion();
    showResults();
    startButton.innerText = "Restart";
    startButton.classList.remove("hide")
    timer = 90;
    score =0;
}
function showResults(){
    finalScore = timer;
    if(finalScore <0){
        finalScore = 0;
    }
    qElement.innerText =" ";
    scoreArea.classList.remove("hide");
    answerButtons.classList.remove("hide");
    scoreArea.innerHTML = `Your score is ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
    username = document.getElementById("initials");
    saveButton = document.getElementById("save-btn");
    username.addEventListener("keyup",function(){
        saveButton.disabled = !username.value;
    });
}

//Fxn to submit HIGH SCORES
function submitScores(e){
    const score = {
        score:finalScore,
        name:username.value
    };
    highscores.push(score);
    highscores.sort((a,b) => b.score -a-score);
    highscores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highscores",JSON.stringify(highscores));
    displayscores
}

//Fuction to display high scores
function displayscores(){
    clearInterval(runningTimer);
    countdown.innerHTML = "";
    clearQuestion();
    qElement.innerText = "";
    scoreArea.classList.remove("hide");
    scoreArea.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
    const highScoresList = document.getElementById("highScoreslist");
    highScoresList.innerHTML = highscores
        .map(score => {
            return `<li class="scoresList">${score.name} - ${score.score}</li>`;

        })
        .join("");
        startButton.classList.remove("hide");
        highscoreButton.classList.add("hide");
}

//Function to clear high score
function clearScores(){
    highscores=[];
    highScoresList.innerHTML= "<h3> Scores have been cleared</h3>";
    document.getElementById("clearScores").classList.add("hide");
}

//Questions Go hear

const questions = [
    {
        question: "Inside which Html Element do we put the JS?",
        answers:[
            { text: "javascript" , correct:flase},
            { text: "script" , correct:true},
            { text: "js" , correct:flase},
            { text: "jQuery" , correct:flase}
        ]
    },
    {
        question: "The external JavaScript file must contain the script tag.",
        answers: [
          { text: "True", correct: false },
          { text: "False", correct: true }
        ]
      },
      {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
          { text: 'msg("Hello World");', correct: false },
          { text: 'prompt("Hello World");', correct: false },
          { text: 'alertBox("Hello World");', correct: false },
          { text: 'alert("Hello World");', correct: true }
        ]
      },
      {
        question: "How do you create a function in JavaScript?",
        answers: [
          { text: "function myFunction()", correct: true },
          { text: "function = myFunction()", correct: false },
          { text: "make.function.myFunction()", correct: false },
          { text: "function:myFunction()", correct: false }
        ]
      },
      {
        question: 'How do you call a function named "myFunction"?',
        answers: [
          { text: "call myFunction()", correct: false },
          { text: "read myFunction()", correct: false },
          { text: "myFunction()", correct: true },
          { text: "run.myFunction()", correct: false }
        ]
      },
      {
        question: "How do you write an IF statement in JavaScript?",
        answers: [
          { text: "if (i === 5)", correct: true },
          { text: "if i = 5 then", correct: false },
          { text: "if i === 5 then", correct: false },
          { text: "if (i = 5)", correct: false }
        ]
      },
      {
        question: "!= means what in javascript?",
        answers: [
          { text: "Or", correct: false },
          { text: "And", correct: false },
          { text: "Plus and Equal To", correct: false },
          { text: "Not Equal To", correct: true }
        ]
      },
      {
        question: "What Characters Contains an Array?",
        answers: [
          { text: "< >", correct: false },
          { text: "{ }", correct: false },
          { text: "[ ]", correct: true },
          { text: "# #", correct: false }
        ]
      }
    ];    
