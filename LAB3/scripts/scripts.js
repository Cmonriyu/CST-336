document.querySelector("button").addEventListener("click",gradeQuiz);

shuffleQ1();
shuffleQ4();
shuffleQ5();

let answers = ["Select", "riyu", 19, "CST", "Dog"];
let correct = [false, false, false, false, false];
let Qimgs = [document.querySelector("#Q1img"),document.querySelector("#Q2img"),document.querySelector("#Q3img"),document.querySelector("#Q4img"),document.querySelector("#Q5img")];
let Qtext = [document.querySelector("#Q1text"),document.querySelector("#Q2text"),document.querySelector("#Q3text"),document.querySelector("#Q4text"),document.querySelector("#Q5text")];

const correctimg = "images/correct.png";
const incorrectimg = "images/incorrect.png"; 
const greaterThan80 = "You Got More Than 80% Correct, Keep Trying.";
const lessThan80 = "You Are Under 80%, Keep Going";
const allcorrect = "Congratulations, You Got 100%, Good Job";

let attempts = localStorage.getItem("quizAttempts");
if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

updateAttempts();

function updateAttempts() {
    document.querySelector("#attempts").textContent = "Attempts Done: " + attempts;
}

function gradeQuiz(){

    attempts++;
    localStorage.setItem("quizAttempts", attempts);
    updateAttempts();

    let userAnswers = [document.querySelector('input[name="Q1"]:checked')?.value, document.querySelector('input[name = "nametext"]').value, document.querySelector('input[name = "agenum"]').value, document.querySelector("#majors").value, document.querySelector("#pets").value];

    for (let i = 0; i < 5; i++){
        if (answers[i] == userAnswers[i]){
            correct[i] = true;
        } else{
            correct[i] = false;
        }
    }

    let correctCount = 0;
    for (let i = 0; i < 5; i++){
        if (!correct[i]){
            Qimgs[i].src = incorrectimg;
            Qtext[i].textContent = "incorrect";
        } else {
            Qimgs[i].src = correctimg;
            Qtext[i].textContent = "correct";
            correctCount++;
        }
    }
    if (correctCount/answers.length >= .80){
        document.querySelector("#Bgrade").textContent = greaterThan80;
    } else {
        document.querySelector("#Bgrade").textContent = lessThan80;
    }
    if(!correct.includes(false)) document.querySelector("#Bgrade").textContent = allcorrect;
    
}

function shuffleQ1(){
    let Q1Choices = ["Select","Option","Dropdown","Menu"];
    shuffleArray(Q1Choices);
    for (let i of Q1Choices){
        let inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "Q1";
        inputElement.value = i;
        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.prepend(inputElement);
        document.querySelector("#Q1Choices").appendChild(labelElement);
    }
    
}

function shuffleQ4(){
    let Q4Choices = ["ENVS", "CST", "MATH", "BIO", "ENG", "CHEM"];
    shuffleArray(Q4Choices);
    for (let i of Q4Choices){
        let inputElement = document.createElement("option");
        inputElement.value = i;
        inputElement.textContent = i;
        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.append(inputElement);
        document.querySelector("#majors").appendChild(labelElement);
    }
}

function shuffleQ5(){
    let Q5Choices = ["Dog", "Cat", "Fish", "Bird", "Hamster", "Bunny"];
    shuffleArray(Q5Choices);
    for (let i of Q5Choices){
        let inputElement = document.createElement("option");
        inputElement.value = i;
        inputElement.textContent = i;
        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.append(inputElement);
        document.querySelector("#pets").appendChild(labelElement);
    }
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         [ array[i], array[j] ] = [ array[j], array[i] ];
     }
     return array;
}

