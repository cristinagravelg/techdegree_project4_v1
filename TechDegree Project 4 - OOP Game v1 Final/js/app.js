/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//Purpose of this file - app.js is to create initialize the game instance and set off the game.


var startButton = document.getElementById("btn__reset");
var gameObject1 = null;

//creation of new gameObject & start of new game
startButton.addEventListener("click", ()=>{
    gameObject1 = new Game(0, ["Hello I am Charlie", "Apple Pie", "Lady Gaga", "Cris", "Guessing Game"],null);
    gameObject1.startGame();
});

//event listeners to triggers game dynamics upon user selecting specific letters on on-screen keyboard
var keyboardLetters = document.getElementsByClassName("key");

for(var i = 0; i<keyboardLetters.length;i++){
    keyboardLetters.item(i).addEventListener("click", (event)=>{
        gameObject1.handleInteraction(event.target.innerHTML);
    });
}

