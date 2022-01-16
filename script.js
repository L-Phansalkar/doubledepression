/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  let coffeeNum = document.getElementById('coffee_counter');
  coffeeNum.innerText = coffeeQty;
}

function clickCoffee(data) {
  data.coffee +=1;
  updateCoffeeView(data.coffee);
  renderProducers(data);
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  for (let i=0; i<producers.length; i++){
    let machine = producers[i];
    let cost = machine.price;
    cost *= .5;
    if (coffeeCount >= cost){
      machine.unlocked = true
    }
  }
}

function getUnlockedProducers(data) {
  let activeProducers = []
  let producerArr = data.producers
  for (let i=0; i<producerArr.length; i++){
    let machine = producerArr[i];
    if (machine.unlocked === true){
      activeProducers.push(machine);
    }
  }
  return activeProducers
}

function makeDisplayNameFromId(id) {
  let sentence = id.toLowerCase();
  let sentArr = sentence.split('_');
  for(var i = 0; i< sentArr.length; i++){
    sentArr[i] = sentArr[i][0].toUpperCase() + sentArr[i].slice(1);
  }
   return sentArr.join(" ")
}


// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Beats/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} beats</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}}

function renderProducers(data) {
  unlockProducers(data.producers, data.coffee);
  let activeProducers = getUnlockedProducers(data);
  const producerContainer = document.getElementById('producer_container');
  deleteAllChildNodes(producerContainer);
  for (let i=0; i<activeProducers.length; i++){
    let producerObj = activeProducers[i];
    producerContainer.appendChild(makeProducerDiv(producerObj));
  }
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
  let producerArr = data.producers;
  for (let i=0; i<producerArr.length; i++){
    let currentProducer = producerArr[i];
    if (currentProducer.id === producerId){
      return currentProducer
    }
  }
}

function canAffordProducer(data, producerId) {
  let currentProducer = getProducerById(data,producerId);
  if (currentProducer.price <= data.coffee){
    return true
  } else return false
}

function updateCPSView(cps) {
  const cpsIndicator = document.getElementById('cps');
  cpsIndicator.innerText = cps;
}

function updatePrice(oldPrice) {
  oldPrice *= 1.25;
  return Math.floor(oldPrice);
}

function attemptToBuyProducer(data, producerId) {
  let yesNo = canAffordProducer(data,producerId);
  if(yesNo == false){
    return yesNo;
  } else {
    let machine  = getProducerById(data,producerId);
    machine.qty += 1;
    data.coffee -= machine.price;
    machine.price = updatePrice(machine.price);
    data.totalCPS += machine.cps
    return yesNo;
  }
}

function buyButtonClick(event, data) {
  if (event.target.tagName === "BUTTON"){
    const buyMachine = event.target.id;
    const machineId = buyMachine.slice(4);
    if (canAffordProducer(data, machineId) === false){
      window.alert("Not stressed enough - pile more on first!")
    } else {
      attemptToBuyProducer(data,machineId);
      renderProducers(data);
      updateCoffeeView(data.coffee);
      updateCPSView(data.totalCPS);
    }
  }
}

function tick(data) {
  data.coffee += data.totalCPS;
  updateCoffeeView(data.coffee);
  renderProducers(data);
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
if (typeof process === 'undefined') {
  // Get starting data from the window object
  // (This comes from data.js)
  const data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById('big_coffee');
  bigCoffee.addEventListener('click', () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById('producer_container');
  producerContainer.addEventListener('click', event => {
    buyButtonClick(event, data);
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);
}
// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick
  };
}
