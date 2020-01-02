/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.phrase.toLowerCase();
  }

  /**
   * adds phrase to the game board
   */
  addPhraseToDisplay() {

    // grab the current phrase
    const phrase = this.phrase;

    // htmlPhrase will hold the html to show the hidden phrase to be guessed on the board
    let htmlPhrase = "";

    // iterate through the letters in the phrase to set up the board
    for (let i = 0; i < phrase.length; i++) {
      if (phrase[i] === " ") {
        htmlPhrase += '<li class="space"> </li>';
      } else {
        htmlPhrase +=
          '<li class="hide letter ' + phrase[i] + '">' + phrase[i] + "</li>";
      }
    }
    $("#phrase ul").html(htmlPhrase);

    // return the html
    return htmlPhrase;
  }


  /**
  * checks to see if guessed letter is in the phrase
  * @param {string} clickedLetter - the letter user guessed
  */
  checkLetter(clickedLetter) {

    // grab the current phrase
    const phrase = this.phrase;

    // iterate through letters in the phrase
    for (let i = 0; i < phrase.length; i++) {
      // compare guessed letter to a letter in the phrase
      if (phrase[i] === clickedLetter) {
        return true;
      } 
    }
  }

  
  /**
  * reveals letter(s) on the board that matches the selected letter.
  * @param {string} clickedLetter - the letter user guessed
  */
  showMatchedLetter(clickedLetter) {
    // grab the element holding the phrase
    const phraseElement = $("#phrase li");

    // iterate through the element holding the phrase
    phraseElement.each((index, li) => {
      // if guessed letter is in phrase
      if ($(li).text() === clickedLetter) {
        // remove css "hide"
        $(li).removeClass("hide");

        // add css "show"
        $(li).addClass("show");
      }
    });
    
  }
}
