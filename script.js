let food = [
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍋",
  "🍌",
  "🍍",
  // "🍎",
  // "🍏",
  // "🍐",
  // "🍒",
  // "🍓",
  // "🥝",
  // "🍅",
  // "🥑",
];

let totalCoins = 0; // Initialize totalCoins to 0

function getRandomFruit() {
  // Function to get a random fruit from the 'food' array
  let randomIndex = Math.floor(Math.random() * food.length);
  return food[randomIndex];
}

function initializeBoxes() {
  // Function to initialize the boxes with random fruits
  let boxes = document.getElementsByClassName("box");
  for (let box of boxes) {
    let fontSize = getFontSize(box);
    box.innerHTML = `<span style="font-size: ${fontSize}px">${getRandomFruit()}</span>`;
  }
}

function moveFruits() {
  // Function to move the fruits in the boxes
  let boxes = document.getElementsByClassName("box");
  for (let i = boxes.length - 1; i > 0; i--) {
    let currentBox = boxes[i];
    let previousBox = boxes[i - 1];
    currentBox.innerHTML = previousBox.innerHTML;
  }

  let firstBox = boxes[0];
  let fontSize = getFontSize(firstBox);
  firstBox.innerHTML = `<span style="font-size: ${fontSize}px">${getRandomFruit()}</span>`;
}

function getFontSize(box) {
  // Function to calculate the font size based on the box size
  let boxWidth = box.clientWidth;
  let boxHeight = box.clientHeight;
  return Math.min(boxWidth, boxHeight) * 0.8;
}

function delay(duration) {
  // Function to create a delay using a Promise
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
}

async function spin() {
  // Function to handle the spin button click event
  let spinButton = document.querySelector("button");
  spinButton.disabled = true;

  let durationInSeconds = 2; // Duration of the spin in seconds
  let intervalDelay = 50; // Initial delay between each iteration in milliseconds
  let totalIterations = (durationInSeconds * 1000) / intervalDelay; // Total number of iterations based on duration and delay

  let rate = Math.pow(8, 1 / totalIterations); // Rate at which the interval delay changes

  let centerBoxIds = ["box2", "box5", "box8"]; // IDs of the center row boxes

  let uniqueFruits = centerBoxIds.map((id) => {
    let box = document.getElementById(id);
    return box.innerText.trim();
  });

  let message = document.getElementById("message");
  let coinsMessage = document.getElementById("coins");

  message.innerText = "Spinning..."; // Change the message to "Spinning..."
  message.style.color = "black"; // Set text color to black
  message.classList.add("blink");

  for (let i = 0; i < totalIterations; i++) {
    moveFruits();
    await delay(intervalDelay);
    intervalDelay *= rate;

    let newFruit = document.getElementById("box5").innerText.trim();
    if (!uniqueFruits.includes(newFruit)) {
      uniqueFruits.push(newFruit);
    }
  }

  spinButton.disabled = false;

  let centerRowFruit1 = document.getElementById("box2").innerText.trim();
  let centerRowFruit2 = document.getElementById("box5").innerText.trim();
  let centerRowFruit3 = document.getElementById("box8").innerText.trim();

  if (
    centerRowFruit1 === centerRowFruit2 &&
    centerRowFruit2 === centerRowFruit3
  ) {
    message.innerText = "Gano 100 monedas 🎉";
    message.style.color = "red"; // Set text color to red
    totalCoins += 100;
  } else if (
    centerRowFruit1 === centerRowFruit2 ||
    centerRowFruit2 === centerRowFruit3 ||
    centerRowFruit1 === centerRowFruit3
  ) {
    message.innerText = "Gano 10 monedas 😃";
    message.style.color = "#e67e00"; // Set text color to orange
    totalCoins += 10;
  } else {
    message.innerText = "Gano 0 monedas 😞";
    message.style.color = "black"; // Set text color to black
  }

  coinsMessage.innerText = `Tiene ${totalCoins} monedas`;
  message.classList.remove("blink");
}

initializeBoxes();
