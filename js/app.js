const Game = {
  values: {
    goldAmount: 0,
    pickaxe: 1,
    pickaxeMultiplier: 1,
    autoMinerMultiplier: 1,
    autoMiners: 0,
    knobs: 0,
    knobsonReset: 0,
    knobMultiplier: 1,
    pickaxeCost: 10,
    pickaxeMultiplierCost: 100,
    autoMinersCost: 1000,
    autoMinerMultiplierCost: 10000,
    idleGold: 0,
  },


  elements: {
    gold: null,
    knobs: null,
    knobsonReset: null,
    click: null,
    gps: null,
    pickaxeButton: null,
    pickaxeMultiplier: null,
    miners: null,
    minerMultiplier: null,
  },

  __fps: 10,
};

Game.initialize = function () {
  Game.elements.gold = document.getElementById("goldamount");
  Game.elements.knobs = document.getElementById("knobs");
  Game.elements.knobsonReset = document.getElementById("myButton5");
  Game.elements.click = document.getElementById("goldPerClick");
  Game.elements.gps = document.getElementById("goldPerSecond");
  Game.elements.pickaxeButton = document.getElementById("myButton2");
  Game.elements.pickaxeMultiplier = document.getElementById("myButton3");
  Game.elements.miners = document.getElementById("myButton9");
  Game.elements.minerMultiplier = document.getElementById("myButton10");
  Game.elements.knobsonReset.disabled = true;
  loadFunction();
};

Game.draw = function () {
  Game.elements.gold.innerText = Math.floor(Game.values.goldAmount)/*.toExponential(2)*/ + " gold";  //writes the goldamount upon loading the site(files)
  Game.elements.knobs.innerText = Game.values.knobs + " knobs";
  Game.elements.click.innerText = Game.values.pickaxe * Game.values.pickaxeMultiplier + " " + "gold per click";  //writes the gold the player gains per click whenever it changes
  Game.elements.gps.innerText = Math.round((Game.values.idleGold + Number.EPSILON) * 100) / 10 + " gold per second";
  Game.elements.pickaxeButton.innerText = "pickaxe amount: " + (Game.values.pickaxe - 1) + " costs:" + (Game.values.pickaxeCost * Game.values.pickaxe);  // the text for the second button
  Game.elements.pickaxeMultiplier.innerText = "pickaxe multiplier amount: " + (Game.values.pickaxeMultiplier - 1) + " costs:" + Math.round(Game.values.pickaxeMultiplierCost * Game.values.pickaxeMultiplier); // the text for the third button
  Game.elements.miners.innerText = "Autominers amount: " + Game.values.autoMiners + " costs:" + Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners);
  Game.elements.minerMultiplier.innerText = "Autominer multiplier amount: " + Game.values.autoMinerMultiplier + " costs: " + Math.round(Game.values.autoMinerMultiplierCost * Math.pow(1.3, (Game.values.autoMinerMultiplier - 1)));
  Game.elements.knobsonReset.innerText = Game.values.knobsonReset + " " + "knobs";
  Game.values.knobsonReset = Math.floor(Math.cbrt(Game.values.goldAmount / 1000000));

  //knob button unlock
  if (Game.values.goldAmount >= 1000000) {
    Game.elements.knobsonReset.setAttribute("style", "color: black;" + "background: linear-gradient(to top, yellow, orange);");
    Game.elements.knobsonReset.disabled = false;
  }

  if (Game.values.goldAmount >= Game.values.pickaxeCost * Game.values.pickaxe) { // this should be moved to the future tick section, it changes the other buttons style if a player can or can't afford them
    Game.elements.pickaxeButton.setAttribute("style", "background-color: #c2c2c2");
  } else {
    Game.elements.pickaxeButton.setAttribute("style", "background-color: #6d6d6d");
  }
  if (Game.values.goldAmount >= Game.values.pickaxeMultiplierCost * Game.values.pickaxeMultiplier) {
    Game.elements.pickaxeMultiplier.setAttribute("style", "background-color: #c2c2c2");
  } else {
    Game.elements.pickaxeMultiplier.setAttribute("style", "background-color: #6d6d6d");
  }
  if(Game.values.goldAmount >= Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners)){
    Game.elements.miners.setAttribute("style", "background-color: #c2c2c2");
  } else{
    Game.elements.miners.setAttribute("style", "background-color: #6d6d6d");
  }
  if(Game.values.goldAmount >= Math.round(Game.values.autoMinerMultiplierCost * Math.pow(1.3, (Game.values.autoMinerMultiplier - 1)))){
    Game.elements.minerMultiplier.setAttribute("style", "background-color: #c2c2c2");
  } else {
    Game.elements.minerMultiplier.setAttribute("style", "background-color: #6d6d6d");
  }
};

Game.update = function () {
  Game.values.goldAmount += Game.values.idleGold;
  Game.values.idleGold = 0.01 * Game.values.pickaxe * Game.values.pickaxeMultiplier * Game.values.autoMiners * Math.pow(1.1, (Game.values.autoMinerMultiplier - 1)) * Game.values.knobMultiplier;
};

Game.run = function (timestamp) {
  if (Game.__lastTimestamp == null) {
    Game.__lastTimestamp = timestamp;
  }

  const diff = timestamp - Game.__lastTimestamp;
  if (diff > (1000 / Game.__fps)) {
    const ticks = Math.floor(diff / (1000 / Game.__fps))

    Game.update(ticks);
    Game.draw();

    Game.__lastTimestamp = timestamp;
  }

  window.requestAnimationFrame(Game.run);
};

Game.initialize();
window.requestAnimationFrame(Game.run);

var colors = ["black", "white"];    // an array applied to a variable that allows the background to change between the two options
var colors1 = ["white", "black"];   // an array applied to a variable that allows the text to change between the two options
var colorIndex = 0;                 // used as an index to see where in the color or color1 array the program is


function saveFunction() {
  const saveState = Game.values;
  const saveStateString = JSON.stringify(saveState);
  localStorage.setItem("saveState", saveStateString);
  //alert("save ")
}

window.setInterval(saveFunction, 15000);

function loadFunction() {
  if (localStorage.getItem("saveState") != null) {
    const loadSaveStateString = localStorage.getItem("saveState");
    Game.values = JSON.parse(loadSaveStateString);
  }
}

function resetFunction() {
  if (!confirm("hard RESET the game?")) return;
  localStorage.removeItem("saveState");
  Game.elements.knobsonReset.setAttribute("style", "color: transparent;" + "background: transparent;");
  Game.values = {
    goldAmount: 0,
    pickaxe: 1,
    pickaxeMultiplier: 1,
    autoMinerMultiplier: 1,
    autoMiners: 0,
    knobs: 0,
    knobsonReset: 0,
    pickaxeCost: 10,
    pickaxeMultiplierCost: 100,
    autoMinersCost: 1000,
    autoMinerMultiplierCost: 10000,
    idleGold: 0,
  }
}

function onGoldClick() { // this function gets called whenever the first button gets clicked
  Game.values.goldAmount = Game.values.goldAmount + Game.values.pickaxe * Game.values.pickaxeMultiplier; // the formula that updates goldamount for click damage
}

function onPickaxeClick() { // this function gets called whenever the second button gets clicked
  if (Game.values.goldAmount >= (Game.values.pickaxeCost * Game.values.pickaxe)) { // 'if' makes it so the function only does something if sufficient goldamount has been accrued
    Game.values.pickaxe = Game.values.pickaxe + 1; // a simple multiplier that increases with +1 when its bought
    Game.values.goldAmount = Game.values.goldAmount - (Game.values.pickaxeCost * (Game.values.pickaxe - 1)); // the formula for decreasing gold amount whenever clicking this button, effectively 'cost'
    Game.values.pickaxeCost += Game.values.pickaxe; // scales the 'cost' higher than the increase in gold per click
  }
}

function onPickaxeMultiplier() {  // this function gets called whenever the third button gets clicked
  if (Game.values.goldAmount >= (Game.values.pickaxeMultiplierCost * Game.values.pickaxeMultiplier)) { // 'if' makes it so the function only does something if sufficient goldamount has been accrued
    Game.values.pickaxeMultiplier = Game.values.pickaxeMultiplier + 1; // a simple multiplier that increases with +1 when its bought
    Game.values.goldAmount = Game.values.goldAmount - (Game.values.pickaxeMultiplierCost * (Game.values.pickaxeMultiplier - 1)); // the formula for decreasing gold amount whenever clicking this button, effectively 'cost'
    Game.values.goldAmount = Math.trunc(Game.values.goldAmount); //rounds the goldamount down to whole integers, doesn't work????????
    Game.values.pickaxeMultiplierCost = Game.values.pickaxeMultiplierCost * 2.2; // scales the 'cost' higher than the increase in gold per click
  }
}

function autoMiner() {
  if (Game.values.goldAmount >= Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners)) {
    Game.values.goldAmount = Game.values.goldAmount - (Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners));
    Game.values.autoMiners += 1;
  }
}

function autoMinerMultiplier() {
  if (Game.values.goldAmount >= Game.values.autoMinerMultiplierCost * Math.pow(1.14, (Game.values.autoMinerMultiplier - 1))) {
    Game.values.goldAmount = Game.values.goldAmount - Game.values.autoMinerMultiplierCost * Math.pow(1.14, (Game.values.autoMinerMultiplier - 1));
    Game.values.autoMinerMultiplier += 1;
  }
}

function prestigeFunction() { // function that gets called when the first prestige layers button gets clicked
  if (!confirm("Reset your progress for shiny knobs?")) return;
    Game.values.knobs += Game.values.knobsonReset;
    Game.values.knobMultiplier += (Game.values.knobsonReset * 0.1);
    Game.values.goldAmount = 0;
    Game.values.pickaxe = 1;
    Game.values.pickaxeMultiplier = 1;
    Game.values.autoMinerMultiplier = 1;
    Game.values.autoMiners = 0;
    Game.values.knobsonReset = 0;
    Game.values.pickaxeCost = 10;
    Game.values.pickaxeMultiplierCost = 100;
    Game.values.autoMinersCost = 1000;
    Game.values.autoMinerMultiplierCost = 10000;
    Game.values.idleGold = 0;
}

function darkFunction() { // this function gets called whenever the dark/light theme button gets clicked
  var col = document.getElementById("body"); // makes the html scripts body id a variable
  if (colorIndex >= colors.length) { //
    colorIndex = 0;
  }
  col.style.backgroundColor = colors[colorIndex];
  if (colorIndex >= colors1.length) {
    colorIndex = 0;
  }
  col.style.color = colors1[colorIndex];
  colorIndex++;
}
var mute = false;
function playClick(){
  if(mute === false){
    var clickSound = new Audio("js/click.wav");
    clickSound.volume = 0.2;
    clickSound.play();
  }
}

function muteFunction(){
  mute = mute === false;
  var dummy = document.getElementById("myButton21");
  if(mute === false){
    dummy.innerText = "mute sound";
  } else {
    dummy.innerText = "unmute sound";
  }
}
