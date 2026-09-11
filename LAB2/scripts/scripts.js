console.log("Whoa");
let answer = 48;
let guesses;
let triesLeft = 7;
const tooLow = "Too Low Guess Higher";
const tooHigh = "Too High Guess Lower";
const defaultmes = "Guess Between 1-99";
const winMessage = "Congratulations you guessed it";
const loseMessage = "Nice Try No More Guesses";
let pastGuessesMessage = "";
const guessMessage = document.querySelector("#guessMessage");
let guessButton = document.querySelector("#guessButton");
let input = document.querySelector("#input");
let guessCount = document.querySelector("#guessCount");
let pastGuesses = document.querySelector("#pastGuesses");

function showWin() {
    guessMessage.textContent = winMessage;
    guessMessage.style.color = "green";
}

guessButton.addEventListener('click', function () {
    if(triesLeft == 0 || guessMessage.textContent == winMessage ){
        return;
    }
    else if(input.value > 99 || input < 1){
        guessMessage.textContent = defaultmes
        return;
    }
    else if (input.value < answer){
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
    }
});


