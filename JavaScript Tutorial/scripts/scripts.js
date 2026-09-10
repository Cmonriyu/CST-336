console.log("whoa");

let answer = 48;

let guesses;

let triesleft = 7;

let winMessage = "Congratulations you guessed it";

let guessMessage = document.querySelector("#guessMessage"); 

let guessInput;

function showWin() {
    guessMessage.textContent = winMessage;
    guessMessage.style.color = 'green';
}

let guessButton = document.querySelector("#guessButton")

guessButton.addEventListener("click", function(){
    guessInput = document.querySelector("#input
        ")
    
});