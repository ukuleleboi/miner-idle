const InitialValues = {
  goldAmount: 0,
  pickaxe: 1,
  pickaxeMultiplier: 1,
  autoMinerMultiplier: 1,
  autoMiners: 0,
  knobs: 0,
  knobsonReset: 0,
  knobMultiplier: 1,
  knobTrophyMultiplier: 1,
  pickaxeCost: 10,
  pickaxeMultiplierCost: 100,
  autoMinersCost: 1000,
  autoMinerMultiplierCost: 10000,
  idleGold: 0,
  knobPickaxe: 1,
  saveInfo: false,
  clickerTrophy: false,
  clickerLevel: 2,
  clickXp: 0,
  clickMult: 1,
  idleerTrophy: false,
  idleerLevel: 2,
  idleXp: 0,
  idleMult: 1,
  knoberTrophy: false,
  knoberLevel: 2,
  knobXp: 0,
  knobMult: 1,
  trophyToken1: true,
  trophyToken2: true,
  trophyToken3: true,
  trophyToken: 0,
  xpMult: 1,
};

const Game = {
  values: {
    ...InitialValues,
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
    pickaxeKnob: null,
    xpMult: null,
    buymax: null,

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
  Game.elements.pickaxeKnob = document.getElementById("myButton22");
  Game.elements.xpMult = document.getElementById("myButton23");
  Game.elements.buymax = document.getElementById("myButton24");
  Game.elements.knobsonReset.disabled = true;
  //document.getElementById("myButton11").disabled = true;
  loadFunction();
};

Game.draw = function () {
  if (Game.values.knobMultiplier >= 1.5 && Game.values.trophyToken1 === true) {
    Game.values.trophyToken += 1;
    Game.values.trophyToken1 = false;
  }
  if (Game.values.knobMultiplier >= 2.0 && Game.values.trophyToken2 === true) {
    Game.values.trophyToken += 1;
    Game.values.trophyToken2 = false;
  }
  if (Game.values.knobMultiplier >= 2.5 && Game.values.trophyToken3 === true) {
    Game.values.trophyToken += 1;
    Game.values.trophyToken3 = false;
  }

  if (Game.values.trophyToken > 0) {
    document.getElementById('myButton29').style.display = "block";
    document.getElementById('myButton29').onclick = function () {
      document.getElementById('trophy-choice-background').style.display = 'block';
    }

    document.getElementById('trophy-choice-background').onclick = function () {
      document.getElementById('trophy-choice-background').style.display = 'none';

    }
    //document.querySelectorAll(".progress").forEach(el => el.style.display = "flex");
    //document.querySelectorAll(".btn-group5").forEach(el => el.style.display = "flex");
  } else {
    document.getElementById('myButton29').style.display = "none";
  }

  function RSExp() {
    this.equate = function (xp) {
      return Math.floor(xp + 300 * Math.pow(2, xp / 7));
    };
    this.level_to_xp = function (level) {
      var xp = 0;
      for (var i = 1; i < level; i++)
        xp += this.equate(i);
      return Math.floor(xp / 4);
    };
    this.xp_to_level = function (xp) {
      var level = 1;
      while (this.level_to_xp(level) < xp)
        level++;
      return level;
    };
  }

  if (Game.values.idleerTrophy === true) {
    Game.values.idleXp += 0.1 * Game.values.xpMult;
    const root = document.documentElement;
    var rs = new RSExp();
    root.style.setProperty('--my-end-width2', ((500 / (rs.level_to_xp(Game.values.idleerLevel) - (rs.level_to_xp(Game.values.idleerLevel - 1)))) * Game.values.idleXp + 'px'));
    if (Game.values.idleXp >= rs.level_to_xp(Game.values.idleerLevel) - (rs.level_to_xp(Game.values.idleerLevel - 1))) {
      Game.values.idleXp = 0;
      Game.values.idleerLevel += 1;
    }
  }
  if (Game.values.knoberTrophy === true) {
    Game.values.knobXp += (0.01 * (Game.values.knobMultiplier - 1)) * Game.values.xpMult;
    const root = document.documentElement;
    var rs = new RSExp();
    root.style.setProperty('--my-end-width3', ((500 / (rs.level_to_xp(Game.values.knoberLevel) - (rs.level_to_xp(Game.values.knoberLevel - 1)))) * Game.values.knobXp + 'px'));
    if (Game.values.knobXp >= rs.level_to_xp(Game.values.knoberLevel) - (rs.level_to_xp(Game.values.knoberLevel - 1))) {
      Game.values.knobXp = 0;
      Game.values.knoberLevel += 1;
    }
    Game.values.knobTrophyMultiplier = Math.pow(1.1, (Game.values.knoberLevel - 1));
  }

  Game.elements.gold.innerText = Math.floor(Game.values.goldAmount)/*.toExponential(2)*/ + " gold";  //writes the goldamount upon loading the site(files)
  Game.elements.knobs.innerText = Game.values.knobs + " knobs";
  Game.elements.click.innerText = Math.round((Game.values.pickaxe * Game.values.knobPickaxe) * Game.values.pickaxeMultiplier * Game.values.knobMultiplier * Game.values.knobTrophyMultiplier * Math.pow(1.1, (Game.values.clickerLevel - 1 - Game.values.clickMult))) + " " + "gold per click";  //writes the gold the player gains per click whenever it changes
  Game.elements.gps.innerText = Math.round((Game.values.idleGold + Number.EPSILON) * 100) / 10 + " gold per second";
  Game.elements.pickaxeButton.innerText = "pickaxes: " + (Game.values.pickaxe) + " cost:" + (Game.values.pickaxeCost * Game.values.pickaxe) + "\n" + '"More pickaxes will mine +1 base gold.. how many hands do I have?"';  // the text for the second button
  Game.elements.pickaxeMultiplier.innerText = "pickaxe multi: " + Game.values.pickaxeMultiplier + "x cost:" + Math.round(Game.values.pickaxeMultiplierCost * Game.values.pickaxeMultiplier) + "\n" + '"Multiplies pickaxe strength by +1x.. so do I or the pickaxes gain strength?"'; // the text for the third button
  Game.elements.miners.innerText = "Autominers: " + Game.values.autoMiners + " cost:" + Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners) + "\n" + '"Mines 10% of your base gold per second.. how does it work, magic?"';
  Game.elements.minerMultiplier.innerText = "Autominer multi: " + (Math.round(Game.values.autoMinerMultiplier) / 10 + 1) + "x cost: " + Math.round(Game.values.autoMinerMultiplierCost * Math.pow(1.4, (Game.values.autoMinerMultiplier - 1))) + "\n" + '"Multiplies autominer power by +0.1x.. magic multiplying magic."';
  Game.elements.knobsonReset.innerText = Game.values.knobsonReset + " " + "knobs";

  Game.elements.pickaxeKnob.innerText = "pickaxe power multi: " + Game.values.knobPickaxe + "x cost: " + Math.floor(Math.pow(1.3, (Game.values.knobPickaxe + 1)));
  Game.elements.xpMult.innerText = "trophy xp multi: " + Game.values.xpMult + "x cost: " + Math.floor(Math.pow(10, Game.values.xpMult) * 10);

  Game.values.knobsonReset = Math.floor(Math.cbrt(Game.values.goldAmount / 100000)) ;

  if (Game.values.knobs < 1 && Game.elements.knobsonReset.disabled === true) {
    if (Game.values.goldAmount >= 1000000) {
      Game.values.saveInfo = true;
      // Game.elements.knobsonReset.setAttribute("style", "color: black;" + "background: linear-gradient(to top, yellow, red);" + "border: solid black 2px; cursor: pointer;");
      Game.elements.knobsonReset.style.color = "black";
      Game.elements.knobsonReset.style.background = "linear-gradient(to top, yellow, red)";
      Game.elements.knobsonReset.style.border = "solid black 2px";
      Game.elements.knobsonReset.style.cursor = "pointer";
      document.getElementById("btn-group4").style = "border: solid 15px #232323; background-color: rgba(136, 136, 136, 0.4); display: block;";
      Game.elements.knobsonReset.disabled = false;
    }
  } else {
    const btn5 = document.getElementById("myButton5");
    btn5.addEventListener("mouseenter", function (event) {
      event.target.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
      event.target.style.transition = "box-shadow 0.2s ease-in-out, margin-top 0.2s ease-in-out, opacity 0.2s ease-in-out";
    }, false);
    btn5.addEventListener("mouseleave", function (event) {
      event.target.style.boxShadow = "";
      event.target.style.transition = "";
    }, false);

    const btn22 = document.getElementById("myButton22");
    btn22.addEventListener("mouseenter", function (event) {
      event.target.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
      event.target.style.transition = "box-shadow 0.2s ease-in-out, margin-top 0.2s ease-in-out, opacity 0.2s ease-in-out";
    }, false);
    btn22.addEventListener("mouseleave", function (event) {
      event.target.style.boxShadow = "";
      event.target.style.transition = "";
    }, false);

    if (Game.values.knobs >= Math.floor(Math.pow(1.3, (Game.values.knobPickaxe + 1)))) {
      //document.getElementById("myButton22").style = "color: black; background-color: #c2c2c2; border: solid black 2px; cursor: pointer;";
      Game.elements.pickaxeKnob.style.color = "black";
      Game.elements.pickaxeKnob.style.background = "#c2c2c2";
      Game.elements.pickaxeKnob.style.border = "solid black 2px";
      Game.elements.pickaxeKnob.style.cursor = "pointer";
    } else {
      //document.getElementById("myButton22").style = "color: black; background-color: #6d6d6d; border: solid black 2px;";
      Game.elements.pickaxeKnob.style.color = "black";
      Game.elements.pickaxeKnob.style.background = "#6d6d6d";
      Game.elements.pickaxeKnob.style.border = "solid black 2px";
      Game.elements.pickaxeKnob.style.cursor = "pointer";
    }

    if(Game.values.knobs >= Math.floor(Math.pow(10, Game.values.xpMult) * 10)){
      Game.elements.xpMult.style.color = "black";
      Game.elements.xpMult.style.background = "#c2c2c2";
      Game.elements.xpMult.style.border = "solid black 2px";
      Game.elements.xpMult.style.cursor = "pointer";
    } else {
      //document.getElementById("myButton22").style = "color: black; background-color: #6d6d6d; border: solid black 2px;";
      Game.elements.xpMult.style.color = "black";
      Game.elements.xpMult.style.background = "#6d6d6d";
      Game.elements.xpMult.style.border = "solid black 2px";
      Game.elements.xpMult.style.cursor = "pointer";
    }

    if (Game.values.goldAmount >= (Game.values.pickaxeCost * Game.values.pickaxe)) {
      Game.elements.buymax.style.color = "black";
      Game.elements.buymax.style.background = "#c2c2c2";
      Game.elements.buymax.style.border = "solid black 2px";
      Game.elements.buymax.style.cursor = "pointer";
    } else {
      //document.getElementById("myButton22").style = "color: black; background-color: #6d6d6d; border: solid black 2px;";
      Game.elements.buymax.style.color = "black";
      Game.elements.buymax.style.background = "#6d6d6d";
      Game.elements.buymax.style.border = "solid black 2px";
      Game.elements.buymax.style.cursor = "pointer";
    }
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
  if (Game.values.goldAmount >= Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners)) {
    Game.elements.miners.setAttribute("style", "background-color: #c2c2c2");
  } else {
    Game.elements.miners.setAttribute("style", "background-color: #6d6d6d");
  }
  if (Game.values.goldAmount >= Math.round(Game.values.autoMinerMultiplierCost * Math.pow(1.4, (Game.values.autoMinerMultiplier - 1)))) {
    Game.elements.minerMultiplier.setAttribute("style", "background-color: #c2c2c2");
  } else {
    Game.elements.minerMultiplier.setAttribute("style", "background-color: #6d6d6d");
  }

  if (Game.values.clickerTrophy === true) {
    document.querySelectorAll("img").forEach(el => el.style.display = "flex");
    document.querySelectorAll(".imgtext").forEach(el => el.style.display = "flex");
    document.getElementById("clickerbar").style.display = "flex";
  }
  if (Game.values.idleerTrophy === true) {
    document.querySelectorAll("img").forEach(el => el.style.display = "flex");
    document.querySelectorAll(".imgtext").forEach(el => el.style.display = "flex");
    document.getElementById("idlebar").style.display = "flex";
  }
  if (Game.values.knoberTrophy === true) {
    document.querySelectorAll("img").forEach(el => el.style.display = "flex");
    document.querySelectorAll(".imgtext").forEach(el => el.style.display = "flex");
    document.getElementById("knobbar").style.display = "flex";
  }

  if (Game.values.saveInfo === true) {
    document.getElementById("btn-group4").style = "border: solid 15px #232323; background-color: rgba(136, 136, 136, 0.4); display: block;";
  }

  /*if(Game.values.goldAmount > 999999){
    Game.elements.gold = Game.elements.gold.toExponential(2);
    console.log(Game.values.goldAmount.toExponential(5));
  }*/
};

Game.update = function () {
  Game.values.goldAmount += Game.values.idleGold;
  Game.values.idleGold = 0.01 * Game.values.pickaxe * Game.values.knobPickaxe * Game.values.pickaxeMultiplier * Game.values.autoMiners * Math.pow(1.1, (Game.values.autoMinerMultiplier - 1)) * Game.values.knobMultiplier * Game.values.knobTrophyMultiplier * Math.pow(1.1, (Game.values.idleerLevel - 1 - Game.values.idleMult));
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

var colors = ["#232323", "#dbdbdb"];    // an array applied to a variable that allows the background to change between the two options
var colors1 = ["white", "black"];   // an array applied to a variable that allows the text to change between the two options
var colorIndex = 0;                 // used as an index to see where in the color or color1 array the program is

var tooltip1 = document.querySelectorAll('.clickertooltip');
var tooltip2 = document.querySelectorAll('.idlertooltip');
var tooltip3 = document.querySelectorAll('.knobertooltip');
var tooltip4 = document.querySelectorAll('.knobmultitooltip');

document.addEventListener('mousemove', fn1, false);
document.addEventListener('mousemove', fn2, false);
document.addEventListener('mousemove', fn3, false);
document.addEventListener('mousemove', fn4, false);

function fn1(e) {
  for (var i=tooltip1.length; i--;) {
    tooltip1[i].style.left = e.pageX + 'px';
    tooltip1[i].style.top = e.pageY + 'px';
    var joe = document.getElementById("clickertooltip");
    joe.innerHTML = "clicker trophy level: " + (Game.values.clickerLevel - 1) + "<br>" + "multiplier: " + Math.round(100 * Math.pow(1.1, (Game.values.clickerLevel - 1 - Game.values.clickMult))) / 100 + "x" + "<br>" + "\"multiplies gold per click\"";
  }
}
function fn2(e) {
  for (var i=tooltip2.length; i--;) {
    tooltip2[i].style.left = e.pageX + 'px';
    tooltip2[i].style.top = e.pageY + 'px';
    var joe = document.getElementById("idlertooltip");
    joe.innerHTML = "idler trophy level: " + (Game.values.idleerLevel - 1) + "<br>" + "multiplier: " + Math.round(100 * Math.pow(1.1, (Game.values.idleerLevel - 1 - Game.values.idleMult))) / 100 + "x" + "<br>" + "\"multiplies gold per second\"";
  }
}
function fn3(e) {
  for (var i=tooltip3.length; i--;) {
    tooltip3[i].style.left = e.pageX + 'px';
    tooltip3[i].style.top = e.pageY + 'px';
    var joe = document.getElementById("knobertooltip");
    joe.innerHTML = "knob trophy level: " + (Game.values.knoberLevel - 1) + "<br>" + "multiplier: " + Math.round(100 * Math.pow(1.1, (Game.values.knoberLevel - 1 - Game.values.knobMult))) / 100 + "x" + "<br>" + "\"multiplies passive knob multiplier\"";
  }
}
function fn4(e) {
  for (var i=tooltip4.length; i--;) {
    tooltip4[i].style.left = e.pageX + 'px';
    tooltip4[i].style.top = e.pageY + 'px';
    var joe = document.getElementById("knobmultitooltip");
    joe.innerHTML = "alltime knobs: " + ((Game.values.knobMultiplier - 1) * 10) + "<br>" + "multiplier: " + Math.round(100 * Game.values.knobMultiplier * Game.values.knobTrophyMultiplier) / 100 + "x" + "<br>" + "\"multiplies gold per second/click\"";
  }
}


//document.getElementsByClassName("button").style.borderColor = "white"; waarom werkt dit niet??


function saveFunction() {
  const saveState = Game.values;
  const saveStateString = JSON.stringify(saveState);
  localStorage.setItem("saveState", saveStateString);
}

window.setInterval(saveFunction, 500);

function loadFunction() {
  if (localStorage.getItem("saveState") != null) {
    const loadSaveStateString = localStorage.getItem("saveState");
    Game.values = {
      ...InitialValues,
      ...JSON.parse(loadSaveStateString),
    };
  }
  if (Game.values.saveInfo === true) {
    Game.elements.knobsonReset.style.color = "black";
    Game.elements.knobsonReset.style.background = "linear-gradient(to top, yellow, red)";
    Game.elements.knobsonReset.style.border = "solid black 2px";
    Game.elements.knobsonReset.style.cursor = "pointer";
    document.getElementById("btn-group4").style = "border: solid 15px #232323; background-color: rgba(136, 136, 136, 0.4); display: block;";
    Game.elements.knobsonReset.disabled = false;
    if (Game.values.knobs >= Math.floor(Math.pow(1.3, (Game.values.knobPickaxe + 1)))) {
      //document.getElementById("myButton22").style = "color: black; background-color: #c2c2c2; border: solid black 2px; cursor: pointer;";
      Game.elements.pickaxeKnob.style.color = "black";
      Game.elements.pickaxeKnob.style.background = "#c2c2c2";
      Game.elements.pickaxeKnob.style.border = "solid black 2px";
      Game.elements.pickaxeKnob.style.cursor = "pointer";
    } else {
      //document.getElementById("myButton22").style = "color: black; background-color: #6d6d6d; border: solid black 2px;";
      Game.elements.pickaxeKnob.style.color = "black";
      Game.elements.pickaxeKnob.style.background = "#6d6d6d";
      Game.elements.pickaxeKnob.style.border = "solid black 2px";
      Game.elements.pickaxeKnob.style.cursor = "pointer";
    }
    const btn5 = document.getElementById("myButton5");
    btn5.addEventListener("mouseenter", function (event) {
      event.target.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
      event.target.style.transition = "box-shadow 0.2s ease-in-out, margin-top 0.2s ease-in-out, opacity 0.2s ease-in-out";
    }, false);
    btn5.addEventListener("mouseleave", function (event) {
      event.target.style.boxShadow = "";
      event.target.style.transition = "";
    }, false);

    const btn22 = document.getElementById("myButton22");
    btn22.addEventListener("mouseenter", function (event) {
      event.target.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
      event.target.style.transition = "box-shadow 0.2s ease-in-out, margin-top 0.2s ease-in-out, opacity 0.2s ease-in-out";
    }, false);
    btn22.addEventListener("mouseleave", function (event) {
      event.target.style.boxShadow = "";
      event.target.style.transition = "";
    }, false);
  }

}

function resetFunction() {
  if (!confirm("hard RESET the game?")) return;
  localStorage.removeItem("saveState");
  Game.elements.knobsonReset.setAttribute("style", "color: transparent;" + "background: transparent;");
  Game.elements.knobsonReset.disabled = true;
  Game.elements.pickaxeKnob.setAttribute("style", "color: transparent;" + "background: transparent;" + "border: transparent");
  document.getElementById("btn-group4").style = "border: transparent;" + "background: transparent;";

  Game.values = {
    ...InitialValues,
  }
}

function onGoldClick() { // this function gets called whenever the first button gets clicked
  Game.values.goldAmount = Game.values.goldAmount + (Game.values.pickaxe * Game.values.knobPickaxe) * Game.values.pickaxeMultiplier * Game.values.knobMultiplier * Game.values.knobTrophyMultiplier * Math.pow(1.1, (Game.values.clickerLevel - 1 - Game.values.clickMult));
  if (Game.values.clickerTrophy === true) {
    Game.values.clickXp += 1 * Game.values.xpMult;
    const root = document.documentElement;

    function RSExp() {
      this.equate = function (xp) {
        return Math.floor(xp + 300 * Math.pow(2, xp / 7));
      };
      this.level_to_xp = function (level) {
        var xp = 0;
        for (var i = 1; i < level; i++)
          xp += this.equate(i);
        return Math.floor(xp / 4);
      };
      this.xp_to_level = function (xp) {
        var level = 1;
        while (this.level_to_xp(level) < xp)
          level++;
        return level;
      };
    }

    var rs = new RSExp();
    root.style.setProperty('--my-end-width1', ((500 / (rs.level_to_xp(Game.values.clickerLevel) - (rs.level_to_xp(Game.values.clickerLevel - 1)))) * Game.values.clickXp + 'px'));
    if (Game.values.clickXp >= rs.level_to_xp(Game.values.clickerLevel) - (rs.level_to_xp(Game.values.clickerLevel - 1))) {
      Game.values.clickXp = 0;
      Game.values.clickerLevel += 1;
    }
  }
}

function onPickaxeClick() { // this function gets called whenever the second button gets clicked
  if (Game.values.pickaxe < 1000) {
    if (Game.values.goldAmount >= (Game.values.pickaxeCost * Game.values.pickaxe)) { // 'if' makes it so the function only does something if sufficient goldamount has been accrued
      Game.values.pickaxe = Game.values.pickaxe + 1; // a simple multiplier that increases with +1 when its bought
      Game.values.goldAmount = Game.values.goldAmount - (Game.values.pickaxeCost * (Game.values.pickaxe - 1)); // the formula for decreasing gold amount whenever clicking this button, effectively 'cost'
      Game.values.pickaxeCost += Game.values.pickaxe; // scales the 'cost' higher than the increase in gold per click
    }
  } else {
    Game.values.pickaxeCost = NaN;
  }
}

function buymaxPickaxeFunction(){
  var a = 1000;
  a -= Game.values.pickaxe;
  for (var i = 0; i < a; i++) {
    if (Game.values.goldAmount >= (Game.values.pickaxeCost * Game.values.pickaxe)) {
      Game.values.pickaxe = Game.values.pickaxe + 1;
      Game.values.goldAmount = Game.values.goldAmount - (Game.values.pickaxeCost * (Game.values.pickaxe - 1));
      Game.values.pickaxeCost += Game.values.pickaxe;
    } else {
      i = 1000;
    }
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

function buymaxPickaxeMultiFunction(){
  var a = 1000;
  for (var i = 0; i < a; i++) {
    if (Game.values.goldAmount >= (Game.values.pickaxeMultiplierCost * Game.values.pickaxeMultiplier)) {
      Game.values.pickaxeMultiplier = Game.values.pickaxeMultiplier + 1;
      Game.values.goldAmount = Game.values.goldAmount - (Game.values.pickaxeMultiplierCost * (Game.values.pickaxeMultiplier - 1));
      Game.values.goldAmount = Math.trunc(Game.values.goldAmount);
      Game.values.pickaxeMultiplierCost = Game.values.pickaxeMultiplierCost * 2.2;
    } else {
      i = 1000;
    }
  }
}

function autoMiner() {
  if (Game.values.goldAmount >= Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners)) {
    Game.values.goldAmount = Game.values.goldAmount - (Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners));
    Game.values.autoMiners += 1;
  }
}

function buymaxAutominersFunction(){
  var a = 1000;
  for (var i = 0; i < a; i++) {
    if (Game.values.goldAmount >= Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners)) {
      Game.values.goldAmount = Game.values.goldAmount - (Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners));
      Game.values.autoMiners += 1;
    } else {
      i = 1000;
    }
  }
}

function autoMinerMultiplier() {
  if (Game.values.goldAmount >= Game.values.autoMinerMultiplierCost * Math.pow(1.4, (Game.values.autoMinerMultiplier - 1))) {
    Game.values.goldAmount = Game.values.goldAmount - Game.values.autoMinerMultiplierCost * Math.pow(1.4, (Game.values.autoMinerMultiplier - 1));
    Game.values.autoMinerMultiplier += 1;
  }
}

function buymaxAutominerMultiFunction(){
  var a = 1000;
  for (var i = 0; i < a; i++) {
    if (Game.values.goldAmount >= Game.values.autoMinerMultiplierCost * Math.pow(1.4, (Game.values.autoMinerMultiplier - 1))) {
      Game.values.goldAmount = Game.values.goldAmount - Game.values.autoMinerMultiplierCost * Math.pow(1.4, (Game.values.autoMinerMultiplier - 1));
      Game.values.autoMinerMultiplier += 1;
    } else {
      i = 1000;
    }
  }
}

function knobPickaxeFunction() {
  if (Game.values.knobs >= Math.floor(Math.pow(1.3, (Game.values.knobPickaxe + 1)))) {
    Game.values.knobs = Game.values.knobs - Math.floor(Math.pow(1.3, (Game.values.knobPickaxe + 1)));
    Game.values.knobPickaxe += 1;
  }
}

function xpFunction(){
  if (Game.values.knobs >= Math.floor(Math.pow(10, Game.values.xpMult) * 10)) {
    Game.values.knobs = Game.values.knobs - Math.floor(Math.pow(10, Game.values.xpMult) * 10);
    Game.values.xpMult += 1;
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

function clickTrophy() {
  Game.values.clickerTrophy = true;
  //document.getElementById("myButton26").style.display = "none";
  Game.values.trophyToken -= 1;
  document.querySelectorAll(".trophybutton1").forEach(el => el.style.display = "none");
  Game.values.clickMult = 0;
}

function idleTrophy() {
  Game.values.idleerTrophy = true;
  document.querySelectorAll(".trophybutton2").forEach(el => el.style.display = "none");
  Game.values.trophyToken -= 1;
  Game.values.idleMult = 0;
}

function knobTrophy() {
  Game.values.knoberTrophy = true;
  document.querySelectorAll(".trophybutton3").forEach(el => el.style.display = "none");
  Game.values.trophyToken -= 1;
  Game.values.knobMult = 0;
}

function darkFunction() { // this function gets called whenever the dark/light theme button gets clicked
  var col = document.getElementById("body"); // makes the html scripts body id a variable
  if (colorIndex >= colors.length) {
    colorIndex = 0;
  }
  col.style.backgroundColor = colors[colorIndex];
  if (colorIndex >= colors1.length) {
    colorIndex = 0;
  }
  col.style.color = colors1[colorIndex];
  if (colorIndex === 0) {
    for (const s of document.getElementsByClassName("button")) {//waarom werkt dit niet voor "button button2" class?
      s.style.border = "2px solid white";
    }
  } else {
    for (const s of document.getElementsByClassName("button")) {//waarom werkt dit niet voor "button button2" class?
      s.style.border = "2px solid #232323";
    }
  }
  if (colorIndex === 0) {
    for (const s of document.getElementsByClassName("btn-group3")) {//waarom werkt dit niet voor "button button2" class?
      s.style.border = "15px solid white";
    }
  } else {
    for (const s of document.getElementsByClassName("btn-group3")) {//waarom werkt dit niet voor "button button2" class?
      s.style.border = "15px solid #232323";
    }
  }
  if (colorIndex === 0) {
    for (const s of document.getElementsByClassName("btn-group4")) {//waarom werkt dit niet voor "button button2" class?
      s.style.border = "15px solid white";
    }
  } else {
    for (const s of document.getElementsByClassName("btn-group4")) {//waarom werkt dit niet voor "button button2" class?
      s.style.border = "15px solid #232323";
    }
  }
  colorIndex++;
}

var mute = false;

function playClick() {
  if (mute === false) {
    var clickSound = new Audio("js/click.wav");
    clickSound.volume = 0.2;
    clickSound.play();
  }
}

function muteFunction() {
  mute = mute === false;
  var dummy = document.getElementById("myButton21");
  if (mute === false) {
    dummy.innerText = "mute sound";
  } else {
    dummy.innerText = "unmute sound";
  }
}


document.getElementById("myButton11").onclick = function areaOne() {
  location.href = "index.html";
}

document.getElementById("myButton12").onclick = function areaTwo() {
  location.href = "areaTwo.html";
}

document.getElementById("myButton13").onclick = function areaThree() {
  location.href = "areaThree.html";
}

document.getElementById("myButton14").onclick = function areaFour() {
  location.href = "areaFour.html";
}

document.getElementById("myButton15").onclick = function areaFive() {
  location.href = "areaFive.html";
}

document.getElementById("myButton16").onclick = function areaSix() {
  location.href = "areaSix.html";
}

document.getElementById("myButton17").onclick = function areaSeven() {
  location.href = "areaSeven.html";
}

document.getElementById("myButton18").onclick = function areaEight() {
  location.href = "areaEight.html";
}

document.getElementById("myButton19").onclick = function areaNine() {
  location.href = "areaNine.html";
}

document.getElementById("myButton20").onclick = function areaTen() {
  location.href = "areaTen.html";
}
