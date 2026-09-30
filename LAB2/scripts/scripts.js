let answer = Math.floor(Math.random() * 99) + 1;
let guesses;
let triesLeft = 7;
let wins = 0;
let losses = 0;
const tooLow = "Too Low Guess Higher";
const tooHigh = "Too High Guess Lower";
const defaultmes = "Guess Between 1-99";
const rangemes = "Number Must Be Between 1-99";
const winMessage = "Congratulations you guessed it";
let loseMessage = "Nice Try No More Guesses, It Was " + answer;
let pastGuessesMessage = "";
let WL = document.querySelector("#WL");
const guessMessage = document.querySelector("#guessMessage");
let guessButton = document.querySelector("#guessButton");
let resetButton = document.querySelector("#resetButton");
let input = document.querySelector("#input");
let guessCount = document.querySelector("#guessCount");
let pastGuesses = document.querySelector("#pastGuesses");
resetButton.style.display = 'none';
console.log(answer);

function showWin() {
    guessMessage.textContent = winMessage;
    guessMessage.style.color = "green";
    resetButton.style.display = 'inline-block';
    wins++;
    WL.textContent = "W: " + wins + " L: " + losses;
}

guessButton.addEventListener('click', function () {
    if(triesLeft == 0 || guessMessage.textContent == winMessage ){
        return;
    } else if(input.value > 99 || input.value < 1){
        guessMessage.textContent = rangemes;
        guessMessage.style.color = "red";
        return;
    } else if (input.value < answer){
        guessMessage.textContent = tooLow;
    } else if (input.value > answer){
        guessMessage.textContent = tooHigh;
    } else if (input.value == answer){
        showWin();
        return;
    }
    triesLeft -=1;
    guessCount.textContent = triesLeft.toString();
    pastGuessesMessage += input.value.toString() + " ";
    guessMessage.style.color = "red";
    pastGuesses.textContent = pastGuessesMessage;
    if (triesLeft == 0){
        guessMessage.textContent = loseMessage;
        resetButton.style.display = 'inline-block';
        losses++;
        WL.textContent = "W: " + wins + " L: " + losses;
    }
});

resetButton.addEventListener('click', function(){
    triesLeft = 7;
    guessCount.textContent = triesLeft.toString();
    pastGuesses.textContent = "";
    pastGuessesMessage = "";   
    guessMessage.textContent = defaultmes;
    guessMessage.style.color = "black";
    resetButton.style.display = 'none';
    answer = Math.floor(Math.random() * 99) + 1;
    loseMessage = "Nice Try No More Guesses, It Was " + answer;
    console.log(answer);
});