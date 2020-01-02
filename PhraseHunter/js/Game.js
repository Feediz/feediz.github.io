/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrase();
    this.activePhrase = null;
  }

  /**
   * start the game
   */
  startGame() {
    // hide start screen #overlay
    const overlay = $("#overlay");
    overlay.hide();

    // get/set random phrase
    this.activePhrase = this.getRandomPhrase();

    // add the phrase to the board
    this.activePhrase.addPhraseToDisplay();

    // remove the overlay won/lose css
    overlay.slideUp("slow").removeClass('win');
    overlay.slideUp("slow").removeClass('lose');
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    // let's pick a random index
    const randomIndex = Math.floor(Math.random() * this.phrases.length);

    // let's pick a prhase using the random index 
    const randomPhrase = this.phrases[randomIndex];

    // let's return the phrase
    return new Phrase(randomPhrase);
  }

  /**
  * Handles onscreen keyboard button clicks
  * @param (HTMLButtonElement or string) clickedElement - The clicked button element or letter pressed
  * @param (string) method - method of user interaction keyboard or virtual 
  */
  handleInteraction(clickedElement, method) {

    // define checkLetter to be used 
    // to hold if the letter guessed is correct or not
    let checkLetter;
    if(method === "virtual") {   // virtual keyboard used

        // check to see if guessed correct letter
        checkLetter = this.activePhrase.checkLetter(clickedElement.textContent);
        
        // disable the letter button clicked
        clickedElement.disabled = true;
       

        if (checkLetter) {   // guessed correct letter
          // add css class "chosen"
          clickedElement.classList.add("chosen");

          // show guessed letter on the UI
          this.activePhrase.showMatchedLetter(clickedElement.textContent);

          // check if player won the game
          if(this.checkForWin()) {
            // end the game
            this.gameOver("won");
          }

        } else {
          // add css class "wrong"
          clickedElement.classList.add("wrong");

          // remove a life
          this.removeLife();

        }
    } else {   // physical keyboard used
      
      // virtualButton will hold the virtual button that holds the letter that was guessed
      let virtualButton;

      // reference all qwerty buttons
      const $qwertyButtons = $("#qwerty button");

      // iterate through the virtual buttons to compare with the letter guessed
      $qwertyButtons.each( (i, el) => {

        // let's find the button that holds the letter guessed
        if(clickedElement === el.textContent) {
          virtualButton = el;
        }
      });

      // disable button 
      if(virtualButton.disabled === false) {

        // check to see if guessed correct letter
        checkLetter = this.activePhrase.checkLetter(clickedElement);
        if(checkLetter) {
          // add css class "chosen"
          virtualButton.classList.add("chosen");
  
          // show guessed letter
          this.activePhrase.showMatchedLetter(clickedElement);
  
          // check if player won game
          if(this.checkForWin()) {
            this.gameOver("won");
          }
        } else {
          // add css class "wrong"
          virtualButton.classList.add("wrong");
  
          // remove a life for wrong guesses
          this.removeLife();
        }
      }

      // disable virtual key
      virtualButton.disabled = true;
    }
  }

  /**
  * Increases the value of the missed property
  * Remove a life from the scoreboard
  * Checks if player has remaining lives and ends game if player is out
  */
  removeLife() {
    // increment missed count
    this.missed += 1;

    // remove a life if there are still lifes left
    if(this.missed !== 5) {

      // flag to track if lifes left image has already been changed
      let scoreboardChanged = false;
      
      // let's reference the li elements holding number of lifes left
      const scoreBoardElement = $('#scoreboard li');

      // iterate over the lifes li elements
      scoreBoardElement.each( (i, li) => {
        // reference scoreboard image element
        let img = li.firstElementChild;

        // get current image name
        let currentImgName = img.src.substring(img.src.lastIndexOf("/")+1, img.src.length);

        // change image source to lost image if current image name is liveHeart.png and we haven't updated 
        // the image yet in this iteration
        if(currentImgName === 'liveHeart.png' && scoreboardChanged === false) {
          img.src = 'images/lostHeart.png';
          scoreboardChanged = true;
        }
      });

    } else {
      // missed five times already, we end the game
      this.gameOver('lost');
    }
  }

  /**
  * Checks for winning move
  * @return {boolean} True if game has been won, false if game wasn't won
  */
  checkForWin() {
    // init a flag to track if game is won and set it to true
    let won = true;

    // reference the phrase li elements
    const phraseElement = $("#phrase li");

    // iterate over the phrase elements
    phraseElement.each((index, li) => {

      // set the won flag to false if any of the phrase element has un-revealed letters
      if($(li).hasClass('hide')){
        won = false;
      }
    });

    // return won
    return won;
  };

  /**
  * Displays game over message
  * @param {boolean} gameWon - Whether or not the user won the game
  */
  gameOver(gameWon) {
    // reference the overlay div
    const overlay = $("#overlay");

    // reference the game-over-message div
    const overlay_msg = $("#game-over-message");

    if(gameWon === 'won') {
      // game won

      // add css class "win"
      overlay.addClass('win').slideDown("slow");

      // show user message they won
      overlay_msg.text("Congrats! You won!!! (Press n to start another game)");

      // reset the game
      this.resetGame();
    } else {
      // game lost

      // add css class "lose"
      overlay.addClass('lose').slideDown("slow");

      // show user message they lost
      overlay_msg.text("Bummer - No worries try again. (Press n to start another game)");

      // reset the game
      this.resetGame();
    }
    
    
    // hide the game board
    overlay.show();
  }


  /**
  * resets the game board
  */
  resetGame() {
    // remove phrase from gameboard
    $("#phrase ul").empty();

    // reset the onscreen keyboard css
    const qwertyKey = $("#qwerty button");
    qwertyKey.each((i, e) => {
      e.classList.remove("chosen");
      e.classList.remove("wrong");
      e.classList.add("css");
      e.disabled = false;
    });

    // change the scoreboard images
    const scoreBoardElement = $('#scoreboard li');
    scoreBoardElement.each( (i, li) => {
      let img = li.firstElementChild;
      img.src = 'images/liveHeart.png';
    });
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrase() {
    return [
      { phrase: "A drop in the bucket" },
      { phrase: "A foot in the door" },
      { phrase: "All in all" },
      { phrase: "As old as the hills" },
      { phrase: "Bite the dust" }
    ];
  }
}
