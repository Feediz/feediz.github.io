/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1s5grutGuQFwJcQP8bFwEI69Q8FCkGdDk/view?usp=sharing

// an array of quotes
var quotes = [
  {
    quote: "Don't cry because it's over, smile because it happened.",
    source: "Dr. Seuss",
    citation: "",
    year: 0,
    tags: ""
  },
  {
    quote:
      "Don't waste your time with explanations: people only hear what they want to hear.",
    source: "Paulo Coelho",
    citation: "",
    year: 0,
    tags: "attitude, life, time"
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    source: "Oscar Wilde",
    citation: "",
    year: 1960,
    tags: ""
  },
  {
    quote:
      "Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.",
    source: "Mother Theresa",
    citation: "",
    year: 0,
    tags: "carpe-diem, future, past"
  },
  {
    quote:
      "Don't spend time beating on a wall, hoping to transform it into a door. ",
    source: "Coco Chanel",
    citation: "Just Listen",
    year: 0,
    tags: "failure, success, time"
  },
  {
    quote:
      "Books have a unique way of stopping time in a particular moment and saying: Let’s not forget this.",
    source: "Dave Eggers",
    citation: "",
    year: 0,
    tags: ""
  },
  {
    quote: "How did it get so late so soon?",
    source: "Dr. Seuss",
    citation: "",
    year: 0,
    tags: ""
  }
];

/**
 * getRandomQuote()
 * @return {number} a number randomly generated from 0 to size of quotes array
 */
function getRandomQuote() {
  // get a random number from 0 to the length of the quotes array
  var randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

/**
 * setBackgroundRandomColor()
 * @return {random rgb} a randomly generated rgb color
 */
function setBackgroundRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + r + "," + g + "," + b + ")";
  document.body.style.background = bgColor;
}

/**
 * printQuote()
 * @return {string} the html output string containing the random quote
 */
function printQuote() {
  // get a random quote object
  var quote = getRandomQuote();

  // start putting the quote html string
  var htmlOutput = "";
  htmlOutput += '<p class="quote">';
  htmlOutput += quote.quote; // getting the quote from the quote object
  htmlOutput += "</p>";
  htmlOutput += '<p class="source">' + quote.source; // getting the source of the quote from the quote object

  // check if the citiation property is empty and if not we append it to the
  // output variable
  if (quote.citation !== "") {
    htmlOutput += '<span class="citation">' + quote.citation + "</span>";
  }

  if (quote.tags !== "") {
    htmlOutput += '<span class="tags">tags: ' + quote.tags + "</span>";
  }

  // check if the year property is empty and if not we append it to the
  // output variable
  if (quote.year !== 0) {
    htmlOutput += '<span class="year"> ' + quote.year + "</span>";
  }
  htmlOutput += "</p>";

  // append the final output string into the dom element 'quote-box'
  var e = document.getElementById("quote-box");
  e.innerHTML = htmlOutput;
}

// when "Show another quote" button is clicked, call the printQuote function
// to show a new quote
document
  .getElementById("loadQuote")
  .addEventListener("click", printQuote, false);

// generate random quote every five seconds
window.setInterval(function() {
  printQuote();
  setBackgroundRandomColor();
}, 5000);
