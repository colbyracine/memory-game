const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", onCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let maxClick = false;
let clickedCard = null;
let cardCount = 0;
let match1 = null;
let match2 = null;

function onCardClick(e) {
  if (maxClick) return;
  const flippedCard = e.target;
  flippedCard.style.backgroundColor = flippedCard.classList[0];
  flippedCard.classList.add("flipped");

  if (!clickedCard) {
    clickedCard = flippedCard;
  } else if (clickedCard) {
    let match1 = clickedCard.className;
    let match2 = flippedCard.className;

    if (match1 === match2) {
      cardCount += 2;
      flippedCard.removeEventListener("click", onCardClick);
      clickedCard.removeEventListener("click", onCardClick);
      match1 = "";
      match2 = "";
      clickedCard = "";
    } else if (match1 !== match2) {
      setTimeout(function () {
        clickedCard.classList.remove("flipped");
        flippedCard.classList.remove("flipped");
        clickedCard.style.backgroundColor = "";
        flippedCard.style.backgroundColor = "";
        match1 = "";
        match2 = "";
        clickedCard = "";
      }, 1000);
    }
    if (cardCount === COLORS.length) alert("WINNER WINNER CHICKEN DINNER");
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
