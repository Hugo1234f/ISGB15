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
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

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
 * Funktionen tar inte emot några värden.
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




