/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

//Purpose of this js file - Game.js to create a Game class with methods for starting and ending the game, handling interactions, getting a random phrase, checking for a win, and removing a life from the scoreboard.

class Game {
    //initialization of Game properties
    constructor(missed, phrases, activePhrase){
        this.missed = missed;
        this.phrases = phrases;
        this.activePhrase = null;       
    }
    //function to start game
    startGame(){
        //Hides start screen for game to start
        var startScreen = document.getElementById("overlay");
        startScreen.style.display = "none";
        
        //chooses random phrase and sets display
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();  
    }
    
    //function to randomly choose hidden phrase
    getRandomPhrase(){
        var randomNumber = Math.round(Math.random()*(this.phrases.length-1));
        return this.phrases[randomNumber];
    }
    
    //function to handle game interactions
    handleInteraction(selectedButton){
        var keyboardLetters = document.getElementsByClassName("key");
        var unmatchedLoops = 0;
        for(var i = 0; i<this.activePhrase.phrase.length;i++){
            //checks if selected button is in hidden phrase
            if(selectedButton == this.activePhrase.phrase[i]){
                unmatchedLoops = 0;
                //if selected button is in hidden phrase, letter appears on screen
                this.activePhrase.showMatchedLetter(selectedButton);
                //keyboard item selected in marked as correctly chosen
                for(var j = 0; j<keyboardLetters.length;j++){
                    if(keyboardLetters.item(j).textContent == selectedButton){
                        keyboardLetters.item(j).className = "chosen";
                    }
                } 
                this.checkForWin();
            }
            else{
                unmatchedLoops +=1;
                //keyboard item selected in marked as incorrectly chosen
                if(unmatchedLoops ==this.activePhrase.phrase.length){
                    event.target.className = "wrong";
                    this.removeLife();
                }
                this.checkForWin();
            } 
        }
    }
    
    //function to remove life when incorrect letter is selected
    removeLife(){
        var activeLives = document.getElementsByClassName("tries");
        for(var i = this.missed; i<activeLives.length;i++){
            //life removed if wrong letter is selected
            activeLives.item(i).innerHTML = "<img src='images/lostHeart.png' alt='Heart Icon' height='35' width='30'>";
            break;
        }
        if(this.missed<activeLives.length-1){
            this.missed += 1;
        }
        else{
            //game over if all lives are lost
            this.gameOver("lose");
        }
    }
    
    //function to check for win throughout the player's guessing attempts
    checkForWin(){
        var sumOfCorrectLetters = 0;
        var numOfSpaces = 0;
        var hiddenPhrase = document.getElementById("phrase").childNodes[1].getElementsByTagName("li");
        for(var i = 0; i<this.activePhrase.phrase.length;i++){
            //adds to count if the class name of the phrase's element is correct, helps to determine whether player won
            if(hiddenPhrase.item(i).className == "show letter" || hiddenPhrase.item(i).textContent == " " ){
                sumOfCorrectLetters ++;
            }
            //checks for win & call game over function
            if(sumOfCorrectLetters == this.activePhrase.phrase.length){
                this.gameOver("win");
            }
        }
    }
    
    //function for gameover 
    gameOver(outcome){
        var startScreen = document.getElementById("overlay");
        startScreen.style.display = "";
        var startScreenH1 = document.getElementById("game-over-message");
          
        if(outcome == "win"){
            startScreenH1.textContent = "You won the game!";
            //calls to helper functions to reset the gameboard if player wins
            this.resetKeyboard();
            this.livesReset();
            this.phraseReset();
        }
        else{
            startScreenH1.textContent = "Better luck next time";
            //calls to helper functions to reset the gameboard if player loses
            this.resetKeyboard();
            this.livesReset();
            this.phraseReset();
        }      
    }
    
    //Helper functions to reset the gameboard upong gameover
    //function to return selected keyboard items to original - unselected - state
    resetKeyboard(){
        var keyboard = document.getElementById("qwerty");
        var keyboardLetters = keyboard.getElementsByTagName("button");
        for(var i = 0; i<keyboardLetters.length;i++){
            keyboardLetters.item(i).className = "key";
        }
    }
    
    //Funtion to restore lives to liveHeart
    livesReset(){
        var activeLives = document.getElementsByClassName("tries");
        for(var i = 0; i<activeLives.length;i++){
            activeLives.item(i).innerHTML = "<img src='images/liveHeart.png' alt='Heart Icon' height='35' width='30'>";
        }
    }
    
    //function to delete <li> items from screen 
    phraseReset(){
        var ulToClear = document.getElementById("phrase").childNodes[1];
        while(ulToClear.firstChild){
            ulToClear.removeChild(ulToClear.firstChild);
        }
    } 
}