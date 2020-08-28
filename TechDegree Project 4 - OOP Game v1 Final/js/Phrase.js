/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//Purpose of this file - Phrase.js to create a Phrase class to handle the creation of phrases.

class Phrase {
    //constructor elements
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }
    //function to add placeholders letters to display
    addPhraseToDisplay(){
        //selection and classification of HTML DOM elements
        var hiddenLetterBlock = document.getElementById("phrase").childNodes[1];
        hiddenLetterBlock.id = "phrase";
        hiddenLetterBlock.className = "section";
        //creation of <li> items for letter and space placeholders
        for(var i=0; i<this.phrase.length;i++){
            var letterItem = document.createElement('li');
            //space placeholder creation
            if(this.phrase[i]==" "){
                letterItem.className = "space";
                letterItem.textContent = this.phrase[i];
            }
            //letter placeholder creation
            else{
                letterItem.className = "hide letter";
                letterItem.textContent = this.phrase[i];    
            }
            hiddenLetterBlock.appendChild(letterItem); 
        }
    }
    
    //function to check if a specific letter is in the hidden phrase
    checkLetter(letter){
        var letterMatched = false;
        for(var i = 0; i<this.phrase.length; i++){
            if(letter == this.phrase[i]){
                letterMatched = true;
            } 
        }
        return letterMatched;
    }

    //function to reveal a hidden element in the screen if the letter selected matches it
    showMatchedLetter(letter){
        var hiddenPhrase = document.getElementById("phrase").childNodes[1];
        for(var i = 0; i<this.phrase.length;i++){
            if(this.phrase[i] == letter){
                hiddenPhrase.childNodes[i].className = "show letter";
            }
        }
    }
}
