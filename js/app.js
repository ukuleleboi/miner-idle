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
  autoMinerMultiplierCost: 1000,
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
  goldDate: 0,
  gloveCount: 0,
  gloveLock: false,
  glovenumber: 10,
  glove1: 0,
  glove2: 0,
  glove3: 0,
  glove4: 0,
  glove5: 0,
  glove6: 0,
  glove7: 0,
  glove8: 0,
  glove9: 0,
  glove1Multi: 1,
  glove2Multi: 1,
  glove3Multi: 1,
  glove4pick: 0,
  glove4pickmult: 0,
  glove4auto: 0,
  glove4automult: 0,
  glove5mult: 1,
  glove6mult: 1,
  glove7mult: 1,
  glove8mult: 1,
  glove9mult: 1,
  dummy: 0,
  lastBtn1: 0,
  lastBtn2: 0,
  gloveArray: [false, false, false, false, false, false, false, false, false],
  goldBars: 0,
  goldbarLevel: 0,
  minclicklvl: 0,
  minidlelvl: 0,
  minknoblvl: 0,
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
    gloves: null,
    checkGloves: null,
    bars: null,
    clickbar: null,
    idlebar: null,
    knobbar: null,
    goldknob: null,
  },

  __fps: 10,
};

Game.initialize = function () {
  Game.elements.gold = document.getElementById("goldamount");
  Game.elements.knobs = document.getElementById("knobs");
  Game.elements.bars = document.getElementById("barAmount");
  Game.elements.knobsonReset = document.getElementById("myButton5");
  Game.elements.knobsonReset.disabled = true;
  Game.elements.click = document.getElementById("goldPerClick");
  Game.elements.gps = document.getElementById("goldPerSecond");
  Game.elements.pickaxeButton = document.getElementById("myButton2");
  Game.elements.pickaxeMultiplier = document.getElementById("myButton3");
  Game.elements.miners = document.getElementById("myButton9");
  Game.elements.minerMultiplier = document.getElementById("myButton10");
  Game.elements.pickaxeKnob = document.getElementById("myButton22");
  Game.elements.xpMult = document.getElementById("myButton23");
  Game.elements.gloves = document.getElementById("myButton24");
  Game.elements.checkGloves = document.getElementById("myButton34");
  Game.elements.checkGloves.disabled = true;
  Game.elements.clickbar = document.getElementById("myButton45");
  Game.elements.idlebar = document.getElementById("myButton46");
  Game.elements.knobbar = document.getElementById("myButton47");
  Game.elements.goldknob = document.getElementById("myButton25");

  //document.getElementById("myButton11").disabled = true;
  loadFunction();
};


/*if (gloveArray[0] === true){
  Game.values.glove1Multi = Math.floor(Math.root(Game.values.glove1)) + 1;
} else {
  Game.values.glove1Multi = 1;
}*/

Game.draw = function () {
  if ((Game.values.pickaxe) >= 1000) {
    Game.values.pickaxeCost = Infinity;
  }

  //document.getElementById("myButton36").style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
  // why doesnt that work?^
  if (Game.values.gloveArray[0] === true) {//all gold multi
    document.getElementById("myButton36").style.boxShadow = "0px 0px 12px 10px black";
    Game.values.glove1Multi = Math.floor(Math.cbrt(Game.values.glove1)) * 5;
  } else {
    document.getElementById("myButton36").style.boxShadow = "none";
    Game.values.glove1Multi = 1;
  }
  if (Math.floor(Math.cbrt(Game.values.glove1)) < 2) {
    document.getElementById("myButton36").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove1)) < 3) {
    document.getElementById("myButton36").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove1)) < 4) {
    document.getElementById("myButton36").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove1)) < 5) {
    document.getElementById("myButton36").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove1)) >= 5) {
    document.getElementById("myButton36").style.border = "5px solid transparent";
    document.getElementById("myButton36").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton36").style.borderImageSlice = "1";
  }

  if (Game.values.gloveArray[1] === true) {//idle gold multi
    document.getElementById("myButton37").style.boxShadow = "0px 0px 12px 10px black";
    Game.values.glove2Multi = Math.floor(Math.cbrt(Game.values.glove2)) * 15;
  } else {
    document.getElementById("myButton37").style.boxShadow = "none";
    Game.values.glove2Multi = 1;
  }
  if (Math.floor(Math.cbrt(Game.values.glove2)) < 2) {
    document.getElementById("myButton37").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove2)) < 3) {
    document.getElementById("myButton37").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove2)) < 4) {
    document.getElementById("myButton37").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove2)) < 5) {
    document.getElementById("myButton37").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove2)) >= 5) {
    document.getElementById("myButton37").style.border = "5px solid transparent";
    document.getElementById("myButton37").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton37").style.borderImageSlice = "1";
  }

  if (Game.values.gloveArray[2] === true) {//click gold multi
    document.getElementById("myButton38").style.boxShadow = "0px 0px 12px 10px black";
    Game.values.glove3Multi = Math.floor(Math.cbrt(Game.values.glove3)) * 15;
  } else {
    document.getElementById("myButton38").style.boxShadow = "none";
    Game.values.glove3Multi = 1;
  }
  if (Math.floor(Math.cbrt(Game.values.glove3)) < 2) {
    document.getElementById("myButton38").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove3)) < 3) {
    document.getElementById("myButton38").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove3)) < 4) {
    document.getElementById("myButton38").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove3)) < 5) {
    document.getElementById("myButton38").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove3)) >= 5) {
    document.getElementById("myButton38").style.border = "5px solid transparent";
    document.getElementById("myButton38").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton38").style.borderImageSlice = "1";
  }

  if (Game.values.gloveArray[3] === true) {//+10 bonus levels in 4 gold upgrades
    document.getElementById("myButton39").style.boxShadow = "0px 0px 12px 10px black";
    Game.values.glove4pick = Math.floor(Math.cbrt(Game.values.glove4)) * 10;
    Game.values.glove4pickmult = Math.floor(Math.cbrt(Game.values.glove4)) * 10;
    Game.values.glove4auto = Math.floor(Math.cbrt(Game.values.glove4)) * 10;
    Game.values.glove4automult = Math.floor(Math.cbrt(Game.values.glove4)) * 10;
  } else {
    document.getElementById("myButton39").style.boxShadow = "none";
    Game.values.glove4pick = 0;
    Game.values.glove4pickmult = 0;
    Game.values.glove4auto = 0;
    Game.values.glove4automult = 0;
  }
  if (Math.floor(Math.cbrt(Game.values.glove4)) < 2) {
    document.getElementById("myButton39").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove4)) < 3) {
    document.getElementById("myButton39").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove4)) < 4) {
    document.getElementById("myButton39").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove4)) < 5) {
    document.getElementById("myButton39").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove4)) >= 5) {
    document.getElementById("myButton39").style.border = "5px solid transparent";
    document.getElementById("myButton39").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton39").style.borderImageSlice = "1";
  }

  if (Game.values.gloveArray[4] === true) {// knobsonreset multiplier
    document.getElementById("myButton40").style.boxShadow = "0px 0px 12px 10px black";
    Game.values.glove5mult = Math.pow(2, Math.floor(Math.cbrt(Game.values.glove5)));
  } else {
    document.getElementById("myButton40").style.boxShadow = "none";
    Game.values.glove5mult = 1;
  }
  if (Math.floor(Math.cbrt(Game.values.glove5)) < 2) {
    document.getElementById("myButton40").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove5)) < 3) {
    document.getElementById("myButton40").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove5)) < 4) {
    document.getElementById("myButton40").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove5)) < 5) {
    document.getElementById("myButton40").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove5)) >= 5) {
    document.getElementById("myButton40").style.border = "5px solid transparent";
    document.getElementById("myButton40").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton40").style.borderImageSlice = "1";
  }

  if (Game.values.gloveArray[5] === true) {//goldsmith bars
    document.getElementById("myButton41").style.boxShadow = "0px 0px 12px 10px black";
    document.getElementById("myButton45").style.display = "flex";
    document.getElementById("myButton46").style.display = "flex";
    document.getElementById("myButton47").style.display = "flex";
    Game.elements.bars.style.display = "flex";
    Game.values.glove6mult = Math.floor(Math.cbrt(Game.values.glove6)) * 2;
  } else {
    document.getElementById("myButton41").style.boxShadow = "none";
    document.getElementById("myButton45").style.display = "none";
    document.getElementById("myButton46").style.display = "none";
    document.getElementById("myButton47").style.display = "none";
    Game.values.glove6mult = 1;
  }
  if (Math.floor(Math.cbrt(Game.values.glove6)) < 2) {
    document.getElementById("myButton41").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove6)) < 3) {
    document.getElementById("myButton41").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove6)) < 4) {
    document.getElementById("myButton41").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove6)) < 5) {
    document.getElementById("myButton41").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove6)) >= 5) {
    document.getElementById("myButton41").style.border = "5px solid transparent";
    document.getElementById("myButton41").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton41").style.borderImageSlice = "1";
  }

  if (Game.values.gloveArray[6] === true) {//knobs per second, 1%?
    document.getElementById("myButton42").style.boxShadow = "0px 0px 12px 10px black";
    Game.values.glove7mult = Math.floor(Math.cbrt(Game.values.glove7)) * 0.001 * Game.values.knobsonReset;
    Game.values.knobs += Math.round(Game.values.glove7mult * 100) / 100;
    Game.values.knobMultiplier += Math.round(Game.values.glove7mult * 10) / 100;
  } else {
    document.getElementById("myButton42").style.boxShadow = "none";
  }
  if (Math.floor(Math.cbrt(Game.values.glove7)) < 2) {
    document.getElementById("myButton42").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove7)) < 3) {
    document.getElementById("myButton42").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove7)) < 4) {
    document.getElementById("myButton42").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove7)) < 5) {
    document.getElementById("myButton42").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove7)) >= 5) {
    document.getElementById("myButton42").style.border = "5px solid transparent";
    document.getElementById("myButton42").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton42").style.borderImageSlice = "1";
  }

  if (Game.values.gloveArray[7] === true) {//5x trophy xp
    document.getElementById("myButton43").style.boxShadow = "0px 0px 12px 10px black";
    Game.values.glove8mult = Math.pow(5, Math.floor(Math.cbrt(Game.values.glove8)));
  } else {
    document.getElementById("myButton43").style.boxShadow = "none";
    Game.values.glove8mult = 1;
  }
  if (Math.floor(Math.cbrt(Game.values.glove8)) < 2) {
    document.getElementById("myButton43").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove8)) < 3) {
    document.getElementById("myButton43").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove8)) < 4) {
    document.getElementById("myButton43").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove8)) < 5) {
    document.getElementById("myButton43").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove8)) >= 5) {
    document.getElementById("myButton43").style.border = "5px solid transparent";
    document.getElementById("myButton43").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton43").style.borderImageSlice = "1";
  }

  if (Game.values.gloveArray[8] === true) {// +1 glove roll
    document.getElementById("myButton44").style.boxShadow = "0px 0px 12px 10px black";
    Game.values.glove9mult = Math.floor(Math.cbrt(Game.values.glove9)) + 1;
  } else {
    document.getElementById("myButton44").style.boxShadow = "none";
    Game.values.glove9mult = 1;
  }
  if (Math.floor(Math.cbrt(Game.values.glove9)) < 2) {
    document.getElementById("myButton44").style.border = "2mm ridge grey";
  } else if (Math.floor(Math.cbrt(Game.values.glove9)) < 3) {
    document.getElementById("myButton44").style.border = "2mm ridge green";
  } else if (Math.floor(Math.cbrt(Game.values.glove9)) < 4) {
    document.getElementById("myButton44").style.border = "2mm ridge #0011BA";
  } else if (Math.floor(Math.cbrt(Game.values.glove9)) < 5) {
    document.getElementById("myButton44").style.border = "2mm ridge #ff6800";
  } else if (Math.floor(Math.cbrt(Game.values.glove9)) >= 5) {
    document.getElementById("myButton44").style.border = "5px solid transparent";
    document.getElementById("myButton44").style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)";
    document.getElementById("myButton44").style.borderImageSlice = "1";
  }


  if (Game.values.glove1 >= 1) {
    document.getElementById('myButton36').style.display = 'inline-block';
  } else {
    document.getElementById('myButton36').style.display = 'none';
  }
  if (Game.values.glove2 >= 1) {
    document.getElementById('myButton37').style.display = 'inline-block';
  } else {
    document.getElementById('myButton37').style.display = 'none';
  }
  if (Game.values.glove3 >= 1) {
    document.getElementById('myButton38').style.display = 'inline-block';
  } else {
    document.getElementById('myButton38').style.display = 'none';
  }
  if (Game.values.glove4 >= 1) {
    document.getElementById('myButton39').style.display = 'inline-block';
  } else {
    document.getElementById('myButton39').style.display = 'none';
  }
  if (Game.values.glove5 >= 1) {
    document.getElementById('myButton40').style.display = 'inline-block';
  } else {
    document.getElementById('myButton40').style.display = 'none';
  }
  if (Game.values.glove6 >= 1) {
    document.getElementById('myButton41').style.display = 'inline-block';
  } else {
    document.getElementById('myButton41').style.display = 'none';
  }
  if (Game.values.glove7 >= 1) {
    document.getElementById('myButton42').style.display = 'inline-block';
  } else {
    document.getElementById('myButton42').style.display = 'none';
  }
  if (Game.values.glove8 >= 1) {
    document.getElementById('myButton43').style.display = 'inline-block';
  } else {
    document.getElementById('myButton43').style.display = 'none';
  }
  if (Game.values.glove9 >= 1) {
    document.getElementById('myButton44').style.display = 'inline-block';
  } else {
    document.getElementById('myButton44').style.display = 'none';
  }

  if (Game.values.knobMultiplier >= 1.5 && Game.values.trophyToken1 === true) {
    Game.values.trophyToken += 1;
    Game.values.trophyToken1 = false;
  }
  if (Game.values.knobMultiplier >= 6.0 && Game.values.trophyToken2 === true) {
    Game.values.trophyToken += 1;
    Game.values.trophyToken2 = false;
  }
  if (Game.values.knobMultiplier >= 51 && Game.values.trophyToken3 === true) {
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
      let xp = 0;
      for (let i = 1; i < level; i++)
        xp += this.equate(i);
      return Math.floor(xp / 4);
    };
    this.xp_to_level = function (xp) {
      let level = 1;
      while (this.level_to_xp(level) < xp)
        level++;
      return level;
    };
  }

  if (Game.values.idleerTrophy === true) {
    Game.values.idleXp += 0.1 * Game.values.xpMult * Game.values.glove8mult;
    const root = document.documentElement;
    let rs = new RSExp();
    root.style.setProperty('--my-end-width2', ((500 / (rs.level_to_xp(Game.values.idleerLevel) - (rs.level_to_xp(Game.values.idleerLevel - 1)))) * Game.values.idleXp + 'px'));
    if (Game.values.idleXp >= rs.level_to_xp(Game.values.idleerLevel) - (rs.level_to_xp(Game.values.idleerLevel - 1))) {
      Game.values.idleXp = 0;
      Game.values.idleerLevel += 1;
    }
  }
  if (Game.values.knoberTrophy === true) {
    Game.values.knobXp += 0.1 * (Math.log10(Game.values.knobMultiplier)) * Game.values.xpMult * Game.values.glove8mult;
    const root = document.documentElement;
    let rs = new RSExp();
    root.style.setProperty('--my-end-width3', ((500 / (rs.level_to_xp(Game.values.knoberLevel) - (rs.level_to_xp(Game.values.knoberLevel - 1)))) * Game.values.knobXp + 'px'));
    if (Game.values.knobXp >= rs.level_to_xp(Game.values.knoberLevel) - (rs.level_to_xp(Game.values.knoberLevel - 1))) {
      Game.values.knobXp = 0;
      Game.values.knoberLevel += 1;
    }
    Game.values.knobTrophyMultiplier = Math.pow(1.1, (Game.values.knoberLevel - 1));
  }

  Game.elements.gold.innerText = Math.floor(Game.values.goldAmount)/*.toExponential(2)*/ + " gold";  //writes the goldamount upon loading the site(files)
  Game.elements.knobs.innerText = (Math.round(Game.values.knobs * 100) / 100) + " knobs";
  Game.elements.bars.innerText = (Math.round(Game.values.goldBars * 100) / 100) + " gold bars";
  Game.elements.click.innerText = Math.round(((Game.values.pickaxe + Game.values.glove4pick) * Game.values.knobPickaxe) * (Game.values.pickaxeMultiplier + Game.values.glove4pickmult) * Game.values.knobMultiplier * Game.values.knobTrophyMultiplier * Math.pow(1.1, (Game.values.clickerLevel - 1 - Game.values.clickMult)) * Game.values.glove1Multi * Game.values.glove3Multi) + " " + "gold per click";  //writes the gold the player gains per click whenever it changes
  Game.elements.gps.innerText = Math.round((Game.values.idleGold + Number.EPSILON) * 100) / 10 + " gold per second";
  Game.elements.pickaxeButton.innerText = "pickaxes: " + (Game.values.pickaxe + Game.values.glove4pick) + " cost:" + (Game.values.pickaxeCost * Game.values.pickaxe) + "\n" + '"More pickaxes will mine +1 base gold.. how many hands do I have?"';  // the text for the second button
  Game.elements.pickaxeMultiplier.innerText = "pickaxe multi: " + (Game.values.pickaxeMultiplier + Game.values.glove4pickmult) + "x cost:" + Math.round(Game.values.pickaxeMultiplierCost * Game.values.pickaxeMultiplier) + "\n" + '"Multiplies pickaxe strength by +1x.. so do I or the pickaxes gain strength?"'; // the text for the third button
  Game.elements.miners.innerText = "Autominers: " + (Game.values.autoMiners + Game.values.glove4pickmult) + " cost:" + Game.values.autoMinersCost * Math.pow(10, Game.values.autoMiners) + "\n" + '"Mines 10% of your base gold per second.. how does it work, magic?"';
  Game.elements.minerMultiplier.innerText = "Autominer multi: " + (Math.round(Game.values.autoMinerMultiplier + Game.values.glove4automult) / 10 + 1) + "x cost: " + Math.round(Game.values.autoMinerMultiplierCost * Math.pow(1.4, (Game.values.autoMinerMultiplier - 1))) + "\n" + '"Multiplies autominer power by +0.1x.. magic multiplying magic."';
  Game.elements.knobsonReset.innerText = Game.values.knobsonReset + " " + "knobs";

  Game.elements.clickbar.innerText = "trade 1 trophy-level for 1 golden bar" + "\n" + "minimum trophy level: " + (Game.values.minclicklvl + 2);
  Game.elements.idlebar.innerText = "trade 1 trophy-level for 1 golden bar" + "\n" + "minimum trophy level: " + (Game.values.minidlelvl + 2);
  Game.elements.knobbar.innerText = "trade 1 trophy-level for 1 golden bar" + "\n" + "minimum trophy level: " + (Game.values.minknoblvl + 2);
  Game.elements.goldknob.innerText = "keep: " + Game.values.goldbarLevel + "%" + " costs: " + (Game.values.goldbarLevel + 1) + " gold bars" + "\n" + '"Trade bars in to keep a bit of alltime knobs after buying gloves"';

  Game.elements.pickaxeKnob.innerText = "pickaxe power multi: " + Game.values.knobPickaxe + "x cost: " + Math.floor(Math.pow(1.3, (Game.values.knobPickaxe + 1)));
  Game.elements.xpMult.innerText = "trophy xp multi: " + Game.values.xpMult + "x cost: " + Math.floor(Math.pow(10, Game.values.xpMult) * 10);
  if ((Game.values.knobsonReset * Game.values.glove5mult) >= 5000) {
    Game.values.gloveLock = true;
  }
  if (Game.values.gloveLock === false) {
    Game.elements.gloves.innerText = "reach 5000 knobs in one reset to discover!";
  } else {
    Game.elements.gloves.innerText = "buy a specialized glove, costs:" + Math.floor(5000 * Math.pow(1.05, Game.values.gloveCount)) + "\n" + '"So powerful it resets alltime knobs!?"';
    Game.elements.checkGloves.style.color = "white";
    Game.elements.checkGloves.style.background = "linear-gradient(to bottom, grey, black)";
    Game.elements.checkGloves.style.float = "right";
    Game.elements.checkGloves.style.margin = "0px 0px";
    Game.elements.checkGloves.style.width = "200px";
    Game.elements.checkGloves.style.height = "45px";
    Game.elements.checkGloves.style.border = "2px solid black";
    Game.elements.checkGloves.disabled = false;
  }

  Game.values.knobsonReset = Math.floor(Math.cbrt(Game.values.goldAmount / 100000)) * Game.values.glove5mult;

  if (Game.values.knobs < 1 && Game.elements.knobsonReset.disabled === true) {
    if (Game.values.goldAmount >= 100000) {
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

    if (Game.values.knobs >= Math.floor(Math.pow(10, Game.values.xpMult) * 10)) {
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

    if (Game.values.goldBars >= (Game.values.goldbarLevel + 1)) {
      Game.elements.goldknob.style.color = "black";
      Game.elements.goldknob.style.background = "#c2c2c2";
      Game.elements.goldknob.style.border = "solid black 2px";
      Game.elements.goldknob.style.cursor = "pointer";
    } else {
      Game.elements.goldknob.style.color = "black";
      Game.elements.goldknob.style.background = "#6d6d6d";
      Game.elements.goldknob.style.border = "solid black 2px";
      Game.elements.goldknob.style.cursor = "pointer";
    }

    if (Game.values.knobs >= (5000 * Math.pow(1.05, Game.values.gloveCount))) {
      Game.elements.gloves.style.color = "black";
      Game.elements.gloves.style.background = "#c2c2c2";
      Game.elements.gloves.style.border = "solid black 2px";
      Game.elements.gloves.style.cursor = "pointer";
    } else {
      //document.getElementById("myButton22").style = "color: black; background-color: #6d6d6d; border: solid black 2px;";
      Game.elements.gloves.style.color = "black";
      Game.elements.gloves.style.background = "#6d6d6d";
      Game.elements.gloves.style.border = "solid black 2px";
      Game.elements.gloves.style.cursor = "pointer";
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
  Game.values.idleGold = 0.01 * (Game.values.pickaxe + Game.values.glove4pick) * Game.values.knobPickaxe * (Game.values.pickaxeMultiplier + Game.values.glove4pickmult) * (Game.values.autoMiners + Game.values.glove4pickmult) * (0.9 + ((Game.values.autoMinerMultiplier + Game.values.glove4automult) / 10)) * Game.values.knobMultiplier * Game.values.knobTrophyMultiplier * Math.pow(1.1, (Game.values.idleerLevel - 1 - Game.values.idleMult)) * Game.values.glove1Multi * Game.values.glove2Multi;
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

let colors = ["#232323", "#dbdbdb"];    // an array applied to a variable that allows the background to change between the two options
let colors1 = ["white", "black"];   // an array applied to a variable that allows the text to change between the two options
let colorIndex = 0;                 // used as an index to see where in the color or color1 array the program is

let tooltip1 = document.getElementById('clickertooltip');
let tooltip2 = document.getElementById('idlertooltip');
let tooltip3 = document.getElementById('knobertooltip');
let tooltip4 = document.querySelectorAll('.knobmultitooltip');

let glovetip1 = document.getElementById('glove1tooltip');
let glovetip2 = document.getElementById('glove2tooltip');
let glovetip3 = document.getElementById('glove3tooltip');
let glovetip4 = document.getElementById('glove4tooltip');
let glovetip5 = document.getElementById('glove5tooltip');
let glovetip6 = document.getElementById('glove6tooltip');
let glovetip7 = document.getElementById('glove7tooltip');
let glovetip8 = document.getElementById('glove8tooltip');
let glovetip9 = document.getElementById('glove9tooltip');

document.addEventListener('mousemove', fn1, false);
document.addEventListener('mousemove', fn2, false);
document.addEventListener('mousemove', fn3, false);
document.addEventListener('mousemove', fn4, false);

document.addEventListener('mousemove', gt1, false);
document.addEventListener('mousemove', gt2, false);
document.addEventListener('mousemove', gt3, false);
document.addEventListener('mousemove', gt4, false);
document.addEventListener('mousemove', gt5, false);
document.addEventListener('mousemove', gt6, false);
document.addEventListener('mousemove', gt7, false);
document.addEventListener('mousemove', gt8, false);
document.addEventListener('mousemove', gt9, false);

function fn1(e) {
  tooltip1.style.left = e.pageX + 'px';
  tooltip1.style.top = (e.pageY - tooltip1.clientHeight) + 'px';
  tooltip1.innerHTML = "clicker trophy level: " + (Game.values.clickerLevel - 1) + "<br>" + "multiplier: " + Math.round(100 * Math.pow(1.1, (Game.values.clickerLevel - 1 - Game.values.clickMult))) / 100 + "x" + "<br>" + "\"multiplies gold per click\"";
}

function fn2(e) {
  tooltip2.style.left = e.pageX + 'px';
  tooltip2.style.top = (e.pageY - tooltip2.clientHeight) + 'px';
  tooltip2.innerHTML = "idler trophy level: " + (Game.values.idleerLevel - 1) + "<br>" + "multiplier: " + Math.round(100 * Math.pow(1.1, (Game.values.idleerLevel - 1 - Game.values.idleMult))) / 100 + "x" + "<br>" + "\"multiplies gold per second\"";
}

function fn3(e) {
  tooltip3.style.left = e.pageX + 'px';
  tooltip3.style.top = (e.pageY - tooltip3.clientHeight) + 'px';
  tooltip3.innerHTML = "knob trophy level: " + (Game.values.knoberLevel - 1) + "<br>" + "multiplier: " + Math.round(100 * Math.pow(1.1, (Game.values.knoberLevel - 1 - Game.values.knobMult))) / 100 + "x" + "<br>" + "\"multiplies passive knob multiplier\"";
}

function fn4(e) {
  for (let i = tooltip4.length; i--;) {
    tooltip4[i].style.left = e.pageX + 'px';
    tooltip4[i].style.top = e.pageY + 'px';
    let joe = document.getElementById("knobmultitooltip");
    joe.innerHTML = "alltime knobs: " + Math.round((Game.values.knobMultiplier - 1) * 10) + "<br>" + "multiplier: " + Math.round(100 * (Game.values.knobMultiplier - 1) * Game.values.knobTrophyMultiplier) / 100 + "x" + "<br>" + "\"multiplies gold per second/click\"" + "<br>" + '\"Knobs for your pickaxe handles.. they swing much easier somehow.\"';
  }
}

function gt1(e) {
  glovetip1.style.left = (e.pageX - glovetip1.clientWidth * 1.4) + 'px';
  glovetip1.style.top = (e.pageY - glovetip1.clientHeight * 2.4) + 'px';
  glovetip1.innerHTML = "multiplies all gold income with: " + (Math.floor(Math.cbrt(Game.values.glove1)) * 5) + "x" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove1)) + "<br>" + '"This glove is simple, yet you feel stronger and wiser"';
}

function gt2(e) {
  glovetip2.style.left = (e.pageX - glovetip2.clientWidth * 1.4) + 'px';
  glovetip2.style.top = (e.pageY - glovetip2.clientHeight * 2.4) + 'px';
  glovetip2.innerHTML = "multiplies idle gold income with: " + (Math.floor(Math.cbrt(Game.values.glove2)) * 15) + "x" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove2)) + "<br>" + '"You feel the urge to laze around and give your autominers more space"';

}

function gt3(e) {
  glovetip3.style.left = (e.pageX - glovetip3.clientWidth * 1.4) + 'px';
  glovetip3.style.top = (e.pageY - glovetip3.clientHeight * 2.4) + 'px';
  glovetip3.innerHTML = "multiplies clicking gold income with: " + (Math.floor(Math.cbrt(Game.values.glove3)) * 15) + "x" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove3)) + "<br>" + "\"A rugged glove is a miner's best friend\"";
}

function gt4(e) {
  glovetip4.style.left = (e.pageX - glovetip4.clientWidth * 1.4) + 'px';
  glovetip4.style.top = (e.pageY - glovetip4.clientHeight * 2.4) + 'px';
  glovetip4.innerHTML = "bonus levels to pickaxe-upgrades: " + (Math.floor(Math.cbrt(Game.values.glove4)) * 10) + "x" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove4)) + "<br>" + '"Conjuring more help is always helpful"';

}

function gt5(e) {
  glovetip5.style.left = (e.pageX - glovetip5.clientWidth * 1.4) + 'px';
  glovetip5.style.top = (e.pageY - glovetip5.clientHeight * 2.4) + 'px';
  glovetip5.innerHTML = "multiplies knobs per reset with: " + Math.pow(2, Math.floor(Math.cbrt(Game.values.glove5))) + "x" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove5)) + "<br>" + '"For every knob you find a second one appears in your hand"';

}

function gt6(e) {
  glovetip6.style.left = (e.pageX - glovetip6.clientWidth * 1.4) + 'px';
  glovetip6.style.top = (e.pageY - glovetip6.clientHeight * 2.4) + 'px';
  glovetip6.innerHTML = "Goldsmith's gauntlets, you can smith gold bars with these: " + Game.values.glove6mult + "x" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove6)) + "<br>" + '"I thought these gave xp, instead of taking it!"';
}

function gt7(e) {
  glovetip7.style.left = (e.pageX - glovetip7.clientWidth * 1.4) + 'px';
  glovetip7.style.top = (e.pageY - glovetip7.clientHeight * 2.4) + 'px';
  glovetip7.innerHTML = "give 1% of your knobs on reset per second per glove power level: " + (Math.floor(Math.cbrt(Game.values.glove7) * 0.001 * Game.values.knobsonReset)) + "knobs/s" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove7)) + "<br>" + '"A glove that takes from the future, can I use this in other ways?"';
}

function gt8(e) {
  glovetip8.style.left = (e.pageX - glovetip8.clientWidth * 1.4) + 'px';
  glovetip8.style.top = (e.pageY - glovetip8.clientHeight * 2.4) + 'px';
  glovetip8.innerHTML = "multiplies trophy xp gain with: " + (Math.pow(5, Math.floor(Math.cbrt(Game.values.glove8)))) + "x" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove8)) + "<br>" + "\"It's as if you've turned into a sponge of knowledge\"";
}

function gt9(e) {
  glovetip9.style.left = (e.pageX - glovetip9.clientWidth * 1.4) + 'px';
  glovetip9.style.top = (e.pageY - glovetip9.clientHeight * 2.4) + 'px';
  glovetip9.innerHTML = "adds extra rolls when you get more gloves: " + (Math.floor(Math.cbrt(Game.values.glove9)) + 1) + " total rolls" + "<br>" + "glove power level: " + Math.floor(Math.cbrt(Game.values.glove9)) + "<br>" + "\"More gloves is better right?\"";
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
  Game.values.goldAmount = Game.values.goldAmount + ((Game.values.pickaxe + Game.values.glove4pick) * Game.values.knobPickaxe) * (Game.values.pickaxeMultiplier + Game.values.glove4pickmult) * Game.values.knobMultiplier * Game.values.knobTrophyMultiplier * Math.pow(1.1, (Game.values.clickerLevel - 1 - Game.values.clickMult)) * Game.values.glove1Multi * Game.values.glove3Multi;
  if (Game.values.clickerTrophy === true) {
    Game.values.clickXp += Game.values.xpMult * Game.values.glove8mult;
    const root = document.documentElement;

    function RSExp() {
      this.equate = function (xp) {
        return Math.floor(xp + 300 * Math.pow(2, xp / 7));
      };
      this.level_to_xp = function (level) {
        let xp = 0;
        for (let i = 1; i < level; i++)
          xp += this.equate(i);
        return Math.floor(xp / 4);
      };
      this.xp_to_level = function (xp) {
        let level = 1;
        while (this.level_to_xp(level) < xp)
          level++;
        return level;
      };
    }

    let rs = new RSExp();
    root.style.setProperty('--my-end-width1', ((500 / (rs.level_to_xp(Game.values.clickerLevel) - (rs.level_to_xp(Game.values.clickerLevel - 1)))) * Game.values.clickXp + 'px'));
    if (Game.values.clickXp >= rs.level_to_xp(Game.values.clickerLevel) - (rs.level_to_xp(Game.values.clickerLevel - 1))) {
      Game.values.clickXp = 0;
      Game.values.clickerLevel += 1;
    }
  }
}

function onPickaxeClick() { // this function gets called whenever the second button gets clicked
  if ((Game.values.pickaxe + Game.values.glove4pick) < 1000) {
    if (Game.values.goldAmount >= (Game.values.pickaxeCost * Game.values.pickaxe)) { // 'if' makes it so the function only does something if sufficient goldamount has been accrued
      Game.values.pickaxe = Game.values.pickaxe + 1; // a simple multiplier that increases with +1 when its bought
      Game.values.goldAmount = Game.values.goldAmount - (Game.values.pickaxeCost * (Game.values.pickaxe - 1)); // the formula for decreasing gold amount whenever clicking this button, effectively 'cost'
      Game.values.pickaxeCost += Game.values.pickaxe; // scales the 'cost' higher than the increase in gold per click
    }
  }
}

function buymaxPickaxeFunction() {
  let a = 1000;
  a -= Game.values.pickaxe;
  for (let i = 0; i < a; i++) {
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

function buymaxPickaxeMultiFunction() {
  let a = 1000;
  for (let i = 0; i < a; i++) {
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

function buymaxAutominersFunction() {
  let a = 1000;
  for (let i = 0; i < a; i++) {
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

function buymaxAutominerMultiFunction() {
  let a = 1000;
  for (let i = 0; i < a; i++) {
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

function xpFunction() {
  if (Game.values.knobs >= Math.floor(Math.pow(10, Game.values.xpMult) * 10)) {
    Game.values.knobs = Game.values.knobs - Math.floor(Math.pow(10, Game.values.xpMult) * 10);
    Game.values.xpMult += 1;
  }
}

function gloveKnobFunction() {
  if (Game.values.goldBars >= (Game.values.goldbarLevel + 1)) {
    Game.values.goldbarLevel += 1;
    Game.values.goldBars -= (Game.values.goldbarLevel + 1);
  }
}

let nerd = false;

function gloveFunction() {
  let multi = (Game.values.knobMultiplier - 1) * 10;
  if (Game.values.knobs >= (5000 * Math.pow(1.05, Game.values.gloveCount))) {
    prestigeFunction()
    Game.values.knobMultiplier = 1 + (Game.values.goldbarLevel * 0.01 * multi * 0.1);
    Game.values.knobs = 0;
    Game.values.gloveCount += 1;

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    for (let i = 0; i < Game.values.glove9mult; i++) {
      Game.values.glovenumber = getRandomInt(9/*number of available pets*/) + 1;
      if (nerd === false && Game.values.glovenumber !== 1) {
        Game.values.glove1 += 1;
        nerd = true;
      } else if (nerd === false && Game.values.glovenumber === 1) {
        Game.values.glove2 += 1;
        nerd = true;
      }
      if (Game.values.glovenumber === 1) {
        Game.values.glove1 += 1;
      } else if (Game.values.glovenumber === 2) {
        Game.values.glove2 += 1;
      } else if (Game.values.glovenumber === 3) {
        Game.values.glove3 += 1;
      } else if (Game.values.glovenumber === 4) {
        Game.values.glove4 += 1;
      } else if (Game.values.glovenumber === 5) {
        Game.values.glove5 += 1;
      } else if (Game.values.glovenumber === 6) {
        Game.values.glove6 += 1;
      } else if (Game.values.glovenumber === 7) {
        Game.values.glove7 += 1;
      } else if (Game.values.glovenumber === 8) {
        Game.values.glove8 += 1;
      } else if (Game.values.glovenumber === 9) {
        Game.values.glove9 += 1;
      }
    }
  }
}


function glove1F() {//all gold multiplier 5x
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[0] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 0;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 0;
    Game.values.gloveArray[0] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function glove2F() {//idle gold multiplier 15x
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[1] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 1;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 1;
    Game.values.gloveArray[1] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function glove3F() {//click gold multiplier 15x
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[2] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 2;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 2;
    Game.values.gloveArray[2] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function glove4F() {//base levels for upgrades
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[3] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 3;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 3;
    Game.values.gloveArray[3] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function glove5F() {// knobmultiplier 2x
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[4] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 4;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 4;
    Game.values.gloveArray[4] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function glove6F() {//gold bars
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[5] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 5;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 5;
    Game.values.gloveArray[5] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function glove7F() {//knobs per second, 1%?
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[6] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 6;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 6;
    Game.values.gloveArray[6] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function glove8F() {//trophy xp
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[7] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 7;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 7;
    Game.values.gloveArray[7] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function glove9F() {// +1 glove roll
  if (Game.values.dummy === 0 || Game.values.dummy === 1) {
    Game.values.gloveArray[8] = true;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 8;
  } else {
    Game.values.gloveArray[Game.values.lastBtn2] = false;
    Game.values.lastBtn2 = Game.values.lastBtn1;
    Game.values.lastBtn1 = 8;
    Game.values.gloveArray[8] = true;
  }
  Game.values.dummy = Game.values.gloveArray.filter(function (x) {
    return Boolean(x)
  }).length;
  console.log(Game.values.gloveArray);
}

function checkGloveFunction() {
  document.getElementById('glove-choice-background').style.display = 'block';
  document.getElementById('myButton35').onclick = function () {
    document.getElementById('glove-choice-background').style.display = 'none';
    playClick();
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

function clickBar() {
  if (Game.values.clickerLevel > (Game.values.minclicklvl + 2)) {
    Game.values.clickerLevel -= 1;
    Game.values.goldBars += 1;
    Game.values.minclicklvl += 1;
  }
}

function idleTrophy() {
  Game.values.idleerTrophy = true;
  document.querySelectorAll(".trophybutton2").forEach(el => el.style.display = "none");
  Game.values.trophyToken -= 1;
  Game.values.idleMult = 0;
}

function idleBar() {
  if (Game.values.idleerLevel > (Game.values.minidlelvl + 2)) {
    Game.values.idleerLevel -= 1;
    Game.values.goldBars += 1;
    Game.values.minidlelvl += 1;
  }
}

function knobTrophy() {
  Game.values.knoberTrophy = true;
  document.querySelectorAll(".trophybutton3").forEach(el => el.style.display = "none");
  Game.values.trophyToken -= 1;
  Game.values.knobMult = 0;
}

function knobBar() {
  if (Game.values.knoberLevel > (Game.values.minknoblvl + 2)) {
    Game.values.knoberLevel -= 1;
    Game.values.goldBars += 1;
    Game.values.minknoblvl += 1;
  }
}

function darkFunction() { // this function gets called whenever the dark/light theme button gets clicked
  let col = document.getElementById("body"); // makes the html scripts body id a variable
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

let mute = false;

function playClick() {
  if (mute === false) {
    let clickSound = new Audio("js/click.wav");
    clickSound.volume = 0.2;
    clickSound.play();
  }
}

function muteFunction() {
  mute = mute === false;
  let dumy = document.getElementById("myButton21");
  if (mute === false) {
    dumy.innerText = "mute sound";
  } else {
    dumy.innerText = "unmute sound";
  }
}


document.getElementById("myButton11").onclick = function areaOne() {
  location.href = "index.html";
  Game.values.goldDate = Date.now();
}

document.getElementById("myButton12").onclick = function areaTwo() {
  location.href = "areaTwo.html";
  Game.values.goldDate = Date.now();
}

document.getElementById("myButton13").onclick = function areaThree() {
  location.href = "areaThree.html";
  Game.values.goldDate = Date.now();
}

document.getElementById("myButton14").onclick = function areaFour() {
  location.href = "areaFour.html";
  Game.values.goldDate = Date.now();
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
