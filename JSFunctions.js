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
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');

    //player 1 tecken
    oGameData.playerOne = "X";

    //Player 2 tecken
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Player 1 namn
    oGameData.nickNamePlayerOne = "";

    //Player 2 namn
    oGameData.nickNamePlayerTwo = "";

    //Player 1 färg
    oGameData.colorPlayerOne = "";

    //player 2 färg
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}

//Horizontal
oGameData.checkHorizontal = function() {
    if(oGameData.gameField[0] === oGameData.playerOne && oGameData.gameField[1] === oGameData.playerOne && oGameData.gameField[2] === oGameData.playerOne ||
        oGameData.gameField[3] === oGameData.playerOne && oGameData.gameField[4] === oGameData.playerOne && oGameData.gameField[5] === oGameData.playerOne ||
        oGameData.gameField[6] === oGameData.playerOne && oGameData.gameField[7] === oGameData.playerOne && oGameData.gameField[8] === oGameData.playerOne) {
        return 1;
    }
    if(oGameData.gameField[0] === oGameData.playerTwo && oGameData.gameField[1] === oGameData.playerTwo && oGameData.gameField[2] === oGameData.playerTwo ||
        oGameData.gameField[3] === oGameData.playerTwo && oGameData.gameField[4] === oGameData.playerTwo && oGameData.gameField[5] === oGameData.playerTwo ||
        oGameData.gameField[6] === oGameData.playerTwo && oGameData.gameField[7] === oGameData.playerTwo && oGameData.gameField[8] === oGameData.playerTwo) {
        return 2;
    }
    return 0;
}

//Vertical
oGameData.checkVertical = function() {
    if(oGameData.gameField[0] === oGameData.playerOne && oGameData.gameField[3] === oGameData.playerOne && oGameData.gameField[6] === oGameData.playerOne ||
        oGameData.gameField[1] === oGameData.playerOne && oGameData.gameField[4] === oGameData.playerOne && oGameData.gameField[7] === oGameData.playerOne ||
        oGameData.gameField[2] === oGameData.playerOne && oGameData.gameField[5] === oGameData.playerOne && oGameData.gameField[8] === oGameData.playerOne) {
        return 1;
    }
    if(oGameData.gameField[0] === oGameData.playerTwo && oGameData.gameField[3] === oGameData.playerTwo && oGameData.gameField[6] === oGameData.playerTwo ||
        oGameData.gameField[1] === oGameData.playerTwo && oGameData.gameField[4] === oGameData.playerTwo && oGameData.gameField[7] === oGameData.playerTwo ||
        oGameData.gameField[2] === oGameData.playerTwo && oGameData.gameField[5] === oGameData.playerTwo && oGameData.gameField[8] === oGameData.playerTwo) {
        return 2;
    }
    return 0;
}

//Diagonal LtR
oGameData.checkDiagonalLeftToRight = function() {
    if(oGameData.gameField[0] === oGameData.playerOne && oGameData.gameField[4] === oGameData.playerOne && oGameData.gameField[8] === oGameData.playerOne) {
        return 1;
    }
    if(oGameData.gameField[0] === oGameData.playerTwo && oGameData.gameField[4] === oGameData.playerTwo && oGameData.gameField[8] === oGameData.playerTwo) {
        return 2;
    }
    return 0;
}

//Diagonal RtL
oGameData.checkDiagonalRightToLeft = function() {
    if(oGameData.gameField[2] === oGameData.playerOne && oGameData.gameField[4] === oGameData.playerOne && oGameData.gameField[6] === oGameData.playerOne) {
        return 1;
    }
    if(oGameData.gameField[2] === oGameData.playerTwo && oGameData.gameField[4] === oGameData.playerTwo && oGameData.gameField[6] === oGameData.playerTwo) {
        return 2;
    }
    return 0;
}

//Draw
oGameData.checkForDraw = function() {
    for(let i = 0; i < 9; i++) {
        if(oGameData.gameField[i] === '') {return 0;}
    }
    return 1;
}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 */
oGameData.checkForGameOver = function() {

    //oavgjort
    if(oGameData.checkForDraw()) {return 3;}

    //horizontal
    if(oGameData.checkHorizontal() !== 0) {return oGameData.checkHorizontal();}

    //Vertical 
    if(oGameData.checkVertical() !== 0) {return oGameData.checkVertical();}

    //Diagonal LtR
    if(oGameData.checkDiagonalLeftToRight() !== 0) {return oGameData.checkDiagonalLeftToRight();}

    //Diagonal RtL
    if(oGameData.checkDiagonalRightToLeft() !== 0) {return oGameData.checkDiagonalRightToLeft();}

    return 0;

}
///----------------------------------LABB 2-----------------------

//Väntar på att fönstret laddar in
window.addEventListener("load", () => {
    oGameData.initGlobalObject();
    
    //Sätter klassen på gameArea till d-none
    let gameArea = document.getElementById("gameArea");
    if(gameArea) {
        gameArea.className = "d-none";
    }else {
        console.log("Error: Could not aquire gameArea Object");
    }

    //Lägger till en lysnare på start knappen som kör validateForm()
    let startBtn = document.getElementById("newGame");
    if(startBtn) {
        startBtn.addEventListener("click", () => {
            validateForm();
        });
    }else {
        console.log("Error: Could not aquire Start Button Object");
    }
});


function validateForm() {
    try {
        let nick1 = document.getElementById("nick1");
        let nick2 = document.getElementById("nick2");

        if(nick1.value.length < 5 || nick2.value.length < 5) {
            throw new Error("Spelarnamnen måste vara minst 5 tecken långa.");
        }

        if(nick1.value === nick2.value) {
            throw new Error("Spelarna måste ha olika namn.");
        }

        let color1 = document.getElementById("color1");
        let color2 = document.getElementById("color2");

        if(color1.value === "#ffffff" || color2.value === "#ffffff") {
            throw new Error("Vit färg får inte användas.");
        }

        if(color1.value === "#000000" || color2.value === "#000000") {
            throw new Error("Svart färg får inte användas.");
        }

        if(color1.value === color2.value) {
            throw new Error("Spelarna måste använda olika färger.");
        }
        
        initiateGame();

    }catch(e) {
        let msgBox = document.getElementById("errorMsg");
        msgBox.innerText = e;
        
    }


}


function initiateGame() {
    //göm formuläret
    let form = document.getElementById("divInForm").parentElement;
    if(form) {
        form.className = "d-none";
    }

    //visa spelplanen
    let gameArea = document.getElementById("gameArea");
    if(gameArea) {
        gameArea.className = "";
    }

    //rensa err medelande
    let msgBox = document.getElementById("errorMsg");
    if(msgBox) {
        msgBox.innerText = "";
    }

    //spara spelarnamnen
    oGameData.nickNamePlayerOne = document.getElementById("nick1").value;
    oGameData.nickNamePlayerTwo = document.getElementById("nick2").value;

    //spara spelarfärgerna
    oGameData.colorPlayerOne = document.getElementById("color1").value;
    oGameData.colorPlayerTwo = document.getElementById("color2").value;

    //reseta spelplanen
    let gameSpaces = document.getElementsByTagName("td");
    for(let i = 0; i < gameSpaces.length; i++) {
        gameSpaces[i].textContent = "";
        gameSpaces[i].style.backgroundColor = "white";
    }

    let playerChar, playerName;
    let rand = Math.random();

    //randomize the starting player
    if(rand < 0.5) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    }else {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    //Set the current player text
    let currentPlayerTxt = document.getElementsByClassName("jumbotron")[0].getElementsByTagName("h1")[0];
    if(oGameData.currentPlayer === "X") {
        currentPlayerTxt.innerText = "Aktuell spelare är " + oGameData.nickNamePlayerOne + '(' + oGameData.currentPlayer + ')';
    }else if(oGameData.currentPlayer === "O") {
        currentPlayerTxt.innerText = "Aktuell spelare är " + oGameData.nickNamePlayerTwo + '(' + oGameData.currentPlayer + ')';
    }
}




