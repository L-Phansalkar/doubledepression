/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/
setStory();
updateCPSView(data.mood);
function updateMotivationView() {
  let motivationNum = document.getElementById("motivation_counter");

  const motivationQty = localStorage.getItem("motivation");
  motivationNum.innerText = motivationQty;

  unlockChoices(motivationQty);
  renderChoices(motivationQty);
}

function clickToMotivate() {
  var num = localStorage.getItem("motivation");
  num++;
  localStorage.setItem("motivation", num);
  updateMotivationView(localStorage.getItem("motivation"));
}
function setStory() {
  if (localStorage.getItem("story") === 0) {
    localStorage.setItem("story", 1);
  }
  let stId = localStorage.getItem("story") - 1;

  let storyText = document.getElementById("story_container");
  var story = window.data.story[stId].text;
  storyText.innerText = story;
}
function unlockChoices(motivationQty) {
  let stId = localStorage.getItem("story") - 1;
  var story = window.data.story[stId];

  for (let i = 0; i < story.choices.length; i++) {
    let choice = story.choices[i];
    let cost = choice.cost * 0.75;
    if (motivationQty >= cost) {
      choice.unlocked = true;
    }
  }
}

/**************
 *   SLICE 2
 **************/

function getUnlockedChoices() {
  let activeChoices = [];
  let stId = localStorage.getItem("story") - 1;
  var choicesArr = window.data.story[stId].choices;
  for (let i = 0; i < choicesArr.length; i++) {
    let choice = choicesArr[i];
    if (choice.unlocked === true) {
      activeChoices.push(choice);
    }
  }
  return activeChoices;
}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeChoicesDiv(choiceObj) {
  const containerDiv = document.createElement("div");
  containerDiv.className = "choice";
  const currentCost = choiceObj.cost;
  const html = `
  <div class="choices-column">
    <button type="button" id=${choiceObj.nextStoryId}>${choiceObj.title}</button>
  </div>
  <div class="choices-column">
    <div> MOTIVATION NEEDED: ${currentCost} </div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderChoices(motivationQty) {
  unlockChoices(motivationQty);
  let activeChoices = getUnlockedChoices();
  const choiceContainer = document.getElementById("choice_container");
  deleteAllChildNodes(choiceContainer);
  for (let i = 0; i < activeChoices.length; i++) {
    let choiceObj = activeChoices[i];
    choiceContainer.appendChild(makeChoicesDiv(choiceObj));
  }
}

/**************
 *   SLICE 3
 **************/

function updateCPSView(mood) {
  const cpsIndicator = document.getElementById("cps");
  cpsIndicator.innerText = mood;
}

function buyButtonClick(event, data) {
  if (event.target.tagName === "BUTTON") {
    const num = event.target.id;
    localStorage.setItem("story", num);
    let motiv = localStorage.getItem("motivation");
    motiv /= 10;
    localStorage.setItem("motivation", motiv);
    // event.target.storyid = next story Id
    // event.target.id = choice Title
    setStory();
    const choiceContainer = document.getElementById("choice_container");
    deleteAllChildNodes(choiceContainer);
    renderChoices();
    updateMotivationView();
    updateCPSView(data.totalCPS);
  }
}

function tick(data) {
  var num = JSON.parse(localStorage.getItem("motivation"));
  const mood = data.mood;
  if (num) {
    console.log("hi");
    num += mood;
    localStorage.setItem("motivation", num);
    updateMotivationView();
    //localStorage.setItem("motivation", num);
    //updateMotivationView();
    //renderProducers(data);
  }
}

/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === "undefined") {
  // Get starting data from the window object
  // (This comes from data.js)
  const data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigEnergy = document.getElementById("big_coffee");
  bigEnergy.addEventListener("click", () => clickToMotivate(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const choiceContainer = document.getElementById("choice_container");
  choiceContainer.addEventListener("click", (event) => {
    buyButtonClick(event, data);
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 10000);
}
// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateMotivationView,
    clickToMotivate,
    unlockChoices,
    getUnlockedChoices,
    makeChoicesDiv,
    deleteAllChildNodes,
    renderChoices,
    updateCPSView,
    buyButtonClick,
    tick,
  };
}
