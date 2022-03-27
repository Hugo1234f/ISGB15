// Kör strict mode, kan t.ex inte använda odeklarerade variabler, t.ex myVariable = 33;
"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function () {
  // Datastruktur för vilka platser som är lediga respektive har brickor
  oGameData.gameField = Array("", "", "", "", "", "", "", "", "");

  // Player 1 tecken
  oGameData.playerOne = "X";

  // Player 2 tecken
  oGameData.playerTwo = "O";

  // Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
  oGameData.currentPlayer = "";

  // Player 1 namn
  oGameData.nickNamePlayerOne = "";

  // Player 2 namn
  oGameData.nickNamePlayerTwo = "";

  // Player 1 färg
  oGameData.colorPlayerOne = "";

  // Player 2 färg
  oGameData.colorPlayerTwo = "";

  // "Flagga" som indikerar om användaren klickat för checkboken.
  oGameData.timerEnabled = false;

  // Timerid om användaren har klickat för checkboxen.
  oGameData.timerId = null;

  // Boolean värde om spelet är igång.
  oGameData.gameRunning = false;
};

//Horizontal
oGameData.checkHorizontal = function () {
  if (
    (oGameData.gameField[0] === oGameData.playerOne &&
      oGameData.gameField[1] === oGameData.playerOne &&
      oGameData.gameField[2] === oGameData.playerOne) ||
    (oGameData.gameField[3] === oGameData.playerOne &&
      oGameData.gameField[4] === oGameData.playerOne &&
      oGameData.gameField[5] === oGameData.playerOne) ||
    (oGameData.gameField[6] === oGameData.playerOne &&
      oGameData.gameField[7] === oGameData.playerOne &&
      oGameData.gameField[8] === oGameData.playerOne)
  ) {
    return 1;
  }
  if (
    (oGameData.gameField[0] === oGameData.playerTwo &&
      oGameData.gameField[1] === oGameData.playerTwo &&
      oGameData.gameField[2] === oGameData.playerTwo) ||
    (oGameData.gameField[3] === oGameData.playerTwo &&
      oGameData.gameField[4] === oGameData.playerTwo &&
      oGameData.gameField[5] === oGameData.playerTwo) ||
    (oGameData.gameField[6] === oGameData.playerTwo &&
      oGameData.gameField[7] === oGameData.playerTwo &&
      oGameData.gameField[8] === oGameData.playerTwo)
  ) {
    return 2;
  }
  return 0;
};

//Vertical
oGameData.checkVertical = function () {
  if (
    (oGameData.gameField[0] === oGameData.playerOne &&
      oGameData.gameField[3] === oGameData.playerOne &&
      oGameData.gameField[6] === oGameData.playerOne) ||
    (oGameData.gameField[1] === oGameData.playerOne &&
      oGameData.gameField[4] === oGameData.playerOne &&
      oGameData.gameField[7] === oGameData.playerOne) ||
    (oGameData.gameField[2] === oGameData.playerOne &&
      oGameData.gameField[5] === oGameData.playerOne &&
      oGameData.gameField[8] === oGameData.playerOne)
  ) {
    return 1;
  }
  if (
    (oGameData.gameField[0] === oGameData.playerTwo &&
      oGameData.gameField[3] === oGameData.playerTwo &&
      oGameData.gameField[6] === oGameData.playerTwo) ||
    (oGameData.gameField[1] === oGameData.playerTwo &&
      oGameData.gameField[4] === oGameData.playerTwo &&
      oGameData.gameField[7] === oGameData.playerTwo) ||
    (oGameData.gameField[2] === oGameData.playerTwo &&
      oGameData.gameField[5] === oGameData.playerTwo &&
      oGameData.gameField[8] === oGameData.playerTwo)
  ) {
    return 2;
  }
  return 0;
};

//Diagonal LtR
oGameData.checkDiagonalLeftToRight = function () {
  if (
    oGameData.gameField[0] === oGameData.playerOne &&
    oGameData.gameField[4] === oGameData.playerOne &&
    oGameData.gameField[8] === oGameData.playerOne
  ) {
    return 1;
  }
  if (
    oGameData.gameField[0] === oGameData.playerTwo &&
    oGameData.gameField[4] === oGameData.playerTwo &&
    oGameData.gameField[8] === oGameData.playerTwo
  ) {
    return 2;
  }
  return 0;
};

//Diagonal RtL
oGameData.checkDiagonalRightToLeft = function () {
  if (
    oGameData.gameField[2] === oGameData.playerOne &&
    oGameData.gameField[4] === oGameData.playerOne &&
    oGameData.gameField[6] === oGameData.playerOne
  ) {
    return 1;
  }
  if (
    oGameData.gameField[2] === oGameData.playerTwo &&
    oGameData.gameField[4] === oGameData.playerTwo &&
    oGameData.gameField[6] === oGameData.playerTwo
  ) {
    return 2;
  }
  return 0;
};

//Draw
oGameData.checkForDraw = function () {
  for (let i = 0; i < 9; i++) {
    if (oGameData.gameField[i] === "") {
      return 0;
    }
  }
  return 1;
};

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 */
oGameData.checkForGameOver = function () {
  //Oavgjort
  if (oGameData.checkForDraw()) {
    return 3;
  }

  //Horizontal
  if (oGameData.checkHorizontal() !== 0) {
    return oGameData.checkHorizontal();
  }

  //Vertical
  if (oGameData.checkVertical() !== 0) {
    return oGameData.checkVertical();
  }

  //Diagonal LtR
  if (oGameData.checkDiagonalLeftToRight() !== 0) {
    return oGameData.checkDiagonalLeftToRight();
  }

  //Diagonal RtL
  if (oGameData.checkDiagonalRightToLeft() !== 0) {
    return oGameData.checkDiagonalRightToLeft();
  }

  return 0;
};
///----------------------------------LABB 2-----------------------
//Väntar på att fönstret laddar in
window.addEventListener("load", () => {
  oGameData.initGlobalObject();
  createTimerButton();

  //Sätter klassen på gameArea till d-none
  let gameArea = document.getElementById("gameArea");
  if (gameArea) {
    gameArea.className = "d-none";
  } else {
    console.log("Error: Could not aquire gameArea Object");
  }

  //Lägger till en lysnare på start knappen som kör validateForm()
  let startBtn = document.getElementById("newGame");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      validateForm();
    });
  } else {
    console.log("Error: Could not aquire Start Button Object");
  }
});

// Funktion som validerar formuläret
function validateForm() {
  // Try-catch fångar upp exceptions
  try {
    // Hämtar element med id nick1 och nick2
    let nick1 = document.getElementById("nick1");
    let nick2 = document.getElementById("nick2");

    // Kollar om värdet på längden är mindre än 5, kasta fel meddelande
    if (nick1.value.length < 5 || nick2.value.length < 5) {
      throw new Error("Spelarnamnen måste vara minst 5 tecken långa.");
    }

    // Kollar om värdet på nick1 är samma som nick2, kasta fel meddelande
    if (nick1.value === nick2.value) {
      throw new Error("Spelarna måste ha olika namn.");
    }

    // Hämtar element med id color1 och color2
    let color1 = document.getElementById("color1");
    let color2 = document.getElementById("color2");

    // Kollar om värdet är vit färg, kasta fel meddelande
    if (color1.value === "#ffffff" || color2.value === "#ffffff") {
      throw new Error("Vit färg får inte användas.");
    }

    // Kollar om värdet är svart färg, kasta fel meddelande
    if (color1.value === "#000000" || color2.value === "#000000") {
      throw new Error("Svart färg får inte användas.");
    }

    // Kollar om värdet är samma färg, kasta fel meddelande
    if (color1.value === color2.value) {
      throw new Error("Spelarna måste använda olika färger.");
    }

    // Kallar på initiateGame funktionen
    initiateGame();
    // Fångar felmeddelanden
  } catch (e) {
    // Sätter felmeddelande till elementet med id errorMsg
    let msgBox = document.getElementById("errorMsg");
    msgBox.innerText = e;
  }
}

function initiateGame() {
  //Göm formuläret
  let form = document.getElementById("divInForm").parentElement;
  if (form) {
    form.className = "d-none";
  }

  //Visa spelplanen
  let gameArea = document.getElementById("gameArea");
  if (gameArea) {
    gameArea.className = "";
  }

  //Rensa err medelande
  let msgBox = document.getElementById("errorMsg");
  if (msgBox) {
    msgBox.innerText = "";
  }

  //Spara spelarnamnen
  oGameData.nickNamePlayerOne = document.getElementById("nick1").value;
  oGameData.nickNamePlayerTwo = document.getElementById("nick2").value;

  //Spara spelarfärgerna
  oGameData.colorPlayerOne = document.getElementById("color1").value;
  oGameData.colorPlayerTwo = document.getElementById("color2").value;

  //Reseta spelplanen
  let gameSpaces = document.getElementsByTagName("td");
  for (let i = 0; i < gameSpaces.length; i++) {
    gameSpaces[i].textContent = "";
    gameSpaces[i].style.backgroundColor = "white";
  }

  let playerChar, playerName;
  let rand = Math.random();

  //Randomize the starting player
  if (rand < 0.5) {
    playerChar = oGameData.playerOne;
    playerName = oGameData.nickNamePlayerOne;
    oGameData.currentPlayer = oGameData.playerOne;
  } else {
    playerChar = oGameData.playerTwo;
    playerName = oGameData.nickNamePlayerTwo;
    oGameData.currentPlayer = oGameData.playerTwo;
  }

  //Set the current player text
  let currentPlayerTxt = document
    .getElementsByClassName("jumbotron")[0]
    .getElementsByTagName("h1")[0];
  if (!oGameData.timerEnabled) {
    console.log("not enabled");
    if (oGameData.currentPlayer === "X") {
      currentPlayerTxt.innerText =
        "Aktuell spelare är " +
        oGameData.nickNamePlayerOne +
        "(" +
        oGameData.currentPlayer +
        ")";
    } else if (oGameData.currentPlayer === "O") {
      currentPlayerTxt.innerText =
        "Aktuell spelare är " +
        oGameData.nickNamePlayerTwo +
        "(" +
        oGameData.currentPlayer +
        ")";
    }
  }
  // Sätter gameRunning variabel i oGameData objekt till true
  oGameData.gameRunning = true;
  // Lägger till en lyssnare på eggxecuteMove funktion som reagerar på click
  window.addEventListener("click", eggxecuteMove);
  // Startar timern
  startTimer();
}

// Initialiserar två variabler, time och timer
// Time håller tiden kvar och timer håller timerId
let time = 5;
let timer = oGameData.timerId;
function startTimer() {
  // Checkar om timer är true och om spelet körs
  if (oGameData.timerEnabled && oGameData.gameRunning) {
    // Sätter en timer till denna funktion på 1000ms (1 sek)
    timer = setTimeout(startTimer, 1000);
    // Time - 1
    time--;
    trackTimeLeft();
    console.log("Time left: " + time);
    // Retunerar true om time är 0
    if (time === 0) {
      console.log("swapping places...");
      // Resettar tiden till 5
      time = 5;
      // Kollar om currentplayer är playerOne
      // Om det är sant, byt plats på currentplayer
      if (oGameData.currentPlayer === oGameData.playerOne) {
        oGameData.currentPlayer = oGameData.playerTwo;
        document
          .getElementsByClassName("jumbotron")[0]
          .getElementsByTagName("h1")[0].innerText =
          oGameData.nickNamePlayerTwo + "(O)" + " Time left: " + time;
        console.log("curr player : " + oGameData.currentPlayer);
      } else if (oGameData.currentPlayer === oGameData.playerTwo) {
        oGameData.currentPlayer = oGameData.playerOne;
        document
          .getElementsByClassName("jumbotron")[0]
          .getElementsByTagName("h1")[0].innerText =
          oGameData.nickNamePlayerOne + "(X)" + " Time left: " + time;
        console.log("curr player : " + oGameData.currentPlayer);
      }
    }
  }
}

// Funktion för att resetta tiden, används vid ett klick event
function resetTimer() {
  return (time = 5);
}

// Funktion som uppdaterar spelar namnen med time left
function trackTimeLeft() {
  let jumbo = document.querySelector(".jumbotron");
  let jumbochild = jumbo.querySelector("h1");
  let txta = " Time left: " + time;
  let currP = returnCurrPlayer();

  console.log("jumbo: " + jumbo);
  console.log("child: " + jumbochild);

  console.log("value: " + jumbochild.innerText);
  jumbochild.innerHTML = currP + txta;
}

// Funktion som retunerar vilken spelare som är current spelaren
function returnCurrPlayer() {
  if (oGameData.currentPlayer === oGameData.playerOne) {
    console.log("Player one name: " + oGameData.nickNamePlayerOne);
    let pOne = oGameData.nickNamePlayerOne + "(" + oGameData.playerOne + ")";
    return pOne;
  } else {
    console.log("Player two name: " + oGameData.nickNamePlayerTwo);
    let pTwo = oGameData.nickNamePlayerTwo + "(" + oGameData.playerTwo + ")";
    return pTwo;
  }
}

// Funktion som triggas på "click"
function eggxecuteMove(e) {
  // Kollar om nuvarande element som man klickar på är TD (table data) och att den är tom ("")
  if (e.target.tagName === "TD" && e.target.innerText === "") {
    let dataId = e.target.getAttribute("data-id");
    oGameData.gameField[dataId] = oGameData.currentPlayer;

    /* 
        Kollar om currentPlayer är spelare ett
        Om detta är fallet, sätt texten till spelare ett, 
        resetta tiden då detta triggas på ett click event
        sedan så säger vi att currentPlayer är nu spelare två
     */
    if (oGameData.currentPlayer === oGameData.playerOne) {
      e.target.style.backgroundColor = oGameData.colorPlayerOne;
      e.target.innerText = oGameData.playerOne;
      oGameData.currentPlayer = oGameData.playerTwo;
      document
        .getElementsByClassName("jumbotron")[0]
        .getElementsByTagName("h1")[0].innerText =
        oGameData.nickNamePlayerTwo + "(O)";
      resetTimer();
    } else {
      e.target.style.backgroundColor = oGameData.colorPlayerTwo;
      e.target.innerText = oGameData.playerTwo;
      oGameData.currentPlayer = oGameData.playerOne;
      document
        .getElementsByClassName("jumbotron")[0]
        .getElementsByTagName("h1")[0].innerText =
        oGameData.nickNamePlayerOne + "(X)";
      resetTimer();
    }

    // Hämtar ut int värde från funktionen checkForGameOver()
    let result = oGameData.checkForGameOver();
    // Detta triggas om spelare ett vinner, alternativt spelare två
    // Eller om det blir oavgjort
    if (result === 1 || result === 2 || result === 3) {
      clearTimeout(timer);
      let form = document.getElementById("divInForm").parentElement;
      form.className = "";

      if (result === 1) {
        document
          .getElementsByClassName("jumbotron")[0]
          .getElementsByTagName("h1")[0].innerText =
          "Spelare " + oGameData.nickNamePlayerOne + " vann";
      } else if (result === 2) {
        document
          .getElementsByClassName("jumbotron")[0]
          .getElementsByTagName("h1")[0].innerText =
          "Spelare " + oGameData.nickNamePlayerTwo + " vann";
      } else {
        document
          .getElementsByClassName("jumbotron")[0]
          .getElementsByTagName("h1")[0].innerText = "Oavgjort";
      }

      let gameArea = document.getElementById("gameArea");
      gameArea.className = "d-none";

      window.removeEventListener("click", window);
      oGameData.initGlobalObject();
    }
  }
}

// Funktion createTimerButton för att skapa input och label tag med JS
function createTimerButton() {
  // Hittar tag med id divInForm
  // Skapar ett element, input och label
  let parent = document.querySelector("#divInForm");
  let input = document.createElement("input");
  let label = document.createElement("label");

  // Sätter attribut på input till type="checkbox"
  let inAtt = input.setAttribute("type", "checkbox");
  // Sätter attribut på input till id="chkbox"
  let inId = input.setAttribute("id", "chkbox");

  // Sätter attribut på label till for="chkbox"
  let laAtt = label.setAttribute("for", "chkbox");
  // Sätter attribut på label till id="chkbox"
  let laId = label.setAttribute("id", "chkbox");
  // Skapar en text nod som vi sedan appendar till label
  let text = document.createTextNode(
    "Vill du begränsa tiden till 5 sekunder per drag?"
  );
  // Appendar input i parent
  parent.appendChild(input);
  // Appendar label i parent
  parent.appendChild(label);
  // Sätter texten i vår textnode i label
  label.appendChild(text);

  // Lägger en lyssnare på funktionen returnedBoxChecked som triggas på "click"
  input.addEventListener("click", returnBoxChecked);
}

// Funktion för att kolla om checkboxen är tickad
function returnBoxChecked() {
  // Hämtar ut elementById som har 'chkbox'
  let isChecked = document.getElementById("chkbox");
  // Om isChecked är checkad av (ticked off)
  if (isChecked.checked) {
    // Sätt timerEnabled till sant
    oGameData.timerEnabled = true;
    return true;
  } else {
    // Sätt timerEnabled till false
    oGameData.timerEnabled = false;
    return false;
  }
}
