// The code contains the following modules:
// 1) 
// refsToElemsModule
// This is where code set all variables
// 2) 
// callbacksModule
// This module adds event listeners to 
// appropriate elements and defines 
// their callback too
// 3)
// gameFlowController
// 4)
// Gameboard
// This stores an array for the gameboard
// and contains fns to get, set and 
// reset array gameboard 

//-------------------------


// The whole of this app's code is in the 
// following init function:
const init = () => {

  //---------------------------------------------------------------------
// DO NOT CODE ABOVE THIS LINE  
  //---------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------

// Now create a gameFlowController module:
let gameFlowController = (function () {   // ends line 1460
  // An fn that looks at the playerLibrary
  // object and makes text from it that 
  // will appear in the winners drawer
  // (which will show a list of players and
  // how many wins they've had).
  // This fn takes as arg the playerLibrary
  // object and returns a string with line
  // breaks in it, such as:
  // "bob 6 <br> jim 5<br> sue 4>".
  // Remember that playerLibrary looks like
/*
  {
    rita: { // stuff}, // these put in dynamically
    sue: {// stuff},
    bob: {// stuff},
        AIplayers: 
    {  // this object is hard coded
    Gandhi: { // stuff },
    Picard: { // stuff },
    T1000: { // stuff }
    }
                          }
*/
  let makeDrawerText = function(obj){
    
    let text = ""
    for (const x in obj) { // x is an object
    
    if (x !== "AIplayers") {
      
          text += obj[x].getName() + " " + obj[x].getNumOfWins() + " <br> ";
                           } // end if
if (x === "AIplayers") {
  text += obj[x]["Gandhi"].getName() + " " + obj[x]["Gandhi"].getNumOfWins() + " <br> " 
  text += obj[x]["Picard"].getName() + " " + obj[x]["Picard"].getNumOfWins() + " <br> " 
  text += obj[x]["T1000"].getName() + " " + obj[x]["T1000"].getNumOfWins() + " <br> " 
                       } // end if
                      } // end for in 
    
  return text
  // so now text == "Bob 6 <br> Sue 5 <br> Rita 4 <br>"
                                    } // end fn makeDrawerText
  
  //-------
  
    // An fn that increments a player's howManyWins score.
  // Code calls this fn when someone has won, whether 
  // human or AI
  let incrPlayerWins = function (player) {
    if (
      player === "Gandhi" ||
      player === "Picard" ||
      player === "T1000" 
       ) {
        playerLibrary["AIplayers"][player].incrementWins()
         } else  {
          playerLibrary[player].incrementWins()
                 }  // end if-else

                                         } //  end fn

  //-------------
    
  // An fn to empty the player library.
  // Code calls this fn when the user clicks
  // the Reset button:
let toastPlayerLib = function () {
for (let prop in playerLibrary) {
if (prop !== "AIplayers") {
  // Out of interest, this does NOT work:
  // delete playerLibrary.prop !!! 
  delete playerLibrary[prop]
                          } // end if
                                } // end for in
playerLibrary["AIplayers"].Gandhi.setNumOfWins(0)
playerLibrary["AIplayers"].Picard.setNumOfWins(0)
playerLibrary["AIplayers"].T1000.setNumOfWins(0)

                                 } // end fn toastPlayerLib                              



    // A function to reset the view.
  // This fn must:
  // 1) 
  // Remove all classes from each div in each square
  // Reset all innerHTML in the <p> in each square
  // 2)
  // Remove all background images from the squares
  
  let resetView = function (){
    // 1): 
    for (let i = 0; i < 9; i++) {
      refsToElemsModule.squareRefsArray1[i].style.backgroundImage = "none"
      refsToElemsModule.squareParray[i].innerHTML = ""      
                                } // end for
                             } // end fn
  
  //-----------
  
  // Some variables to hold the names 
  // of the players who are X and 0 
  // (plus getters and setters) 
  // The following will be set by user
  // whether gameType == "playAI" or "twoPlayer":
  let playerX = null
  // If gameType == twoPlayer the following will be set by user
  // but if gameType == playAI the following will be 
  // the name of the AI opponent ("Gandhi", "Picard" or "T1000")
  let player0 = null 
  
  let setPlayerX = function(X){
    playerX = X
                              } // end fn
  
  let getPlayerX = function(){
    return playerX 
                             } // end fn
  
  let setPlayer0 = function(zero){
    player0 = zero
                              } // end fn
  
  let getPlayer0 = function(){
    return player0 
                              } // end fn
    
  //-------
  
  // First an object to hold methods for
  // a player object and then a factory fn 
  // to create those player objects, then 
  // object playerLibrary to hold all player 
  // objects in key value pairs 
  // (eg {someName: someName, someName1: someName1, etc},
  // where ):
  
  const playerMethods = {
    getName() {
        return this.playerName;
              },
    setNumOfWins(num) {
         this.howManyWins = num;
                      },                           
    getNumOfWins() {
        return this.howManyWins;
                   },
  incrementWins(){
        this.howManyWins = this.howManyWins + 1
                 }                 
                       } // end obj
  // The factory fn:
  function createPerson(name) {
    let person = Object.create(playerMethods);
    person.playerName  = name;
    person.howManyWins = 0;
    return person;
                              } // end player-factory fn

// Now create playerLibrary so that 
// it looks like this:
/*  
playerLibrary = {
    AIplayers: 
{
Gandhi:  {playerName: "Gandhi", howManyWins: 0},
Picard:  {playerName: "Picard", howManyWins: 0},
T1000:  {playerName: "T1000", howManyWins: 0}
}
                  }
*/
let playerLibrary = {}
playerLibrary["AIplayers"] = { 
  Gandhi: createPerson("Gandhi"),
  Picard: createPerson("Picard"),
  T1000:  createPerson("T1000")
                          } // end AIplayers


  //---------
  // THE FOLLOWING VARS AND METHODS ARE NOT IN USE!!!
    // Two variables for user names.
  // When gameType == "twoPlayer" code 
  // employs both. When gameType == "playAI"
  // code employs only xName:
  let xName = null
  let zeroName = null
  
  // The getters and setters for the variables above:
  let setXname = function (nameOfX){
    xName = nameOfX
                                   } // end fn
  
  let getXname = function (){
    return xName
                            } // end fn
  
  let set0name = function (nameOf0){
    zeroName = nameOf0
                                   } // end fn
  
  let get0name = function (){
    return zeroName
                            } // end fn
  
  //-------
  
  // Now an fn that code calls after 
  // each player (human or AI) has had 
  // its/his go, regardless of the value of 
  // gameType). 
  // If gameType == "twoPlayer":
  // If X has played and now it's the turn of 
  // 0 …
  // If 0 has played and now it's the turn of 
  // X … 
  
  // This fn must:
  // 1) Determine whether anyone has won
  // 2) If so, regardless of game type, 
  // i) change value of currentPlayer
  // to "Game over"
  // ii) change the legend to "". 
  // iii) prevent click of squares from 
  // having an effect
  // iv) Call an fn that puts the winner's
  // score in the correct object in
  // the library of players. 
  // 3) If no one has won:
  // Flip the value of currentPlayer
  // depending on value of variable 
  // gameType. This fn is where code
  // switches from one player to the 
  // next. 
  // i) If the game is two player
  // a) change the value of 
  // currentPlayer to 
  // "Noughts" or "Crosses".
  // b) Change the legend to
  // "X to play" or 
  // "0 to play"
  // ii) If the game is human v AI:
  // a) Flip the value of currentPlayer
  // i) If it will be the turn of the AI
  // call the fn that plays the AI.
  // ii) If it will be the turn of the 
  // human change legend  
  // to "X to play"
  
  // But first some variables this fn 
  // will employ and the fns to get and set them:
  let gameType    = null
  // gameType has these two possible values:
  // "twoPlayer" or "playAI"
  
  // An fn to get gameType
  let getGameType = function(){
    return gameType
                              } // end fn
    
    // An fn to set gameType
    let setGameType = function(typeOfGame){
      gameType = typeOfGame
                                          } // end fn
  
  let whoseTurn = function(){
   let gameboard = Gameboard.getGameboard()
   // Remember that currentPlayer can have
   //  value "Crosses" or "Noughts"
   // regardless of the value of 
   // variable gameType. In the case of
   // human v AI, human is always X, AI always 0:
  let winner = null
  // 1) Has anyone won?
  winner = winnerOrNot(gameboard) 
  // winner will be either "0", "X" or "No winner"
  if (winner !== "No winner") { // ie there is a result
    let player = null
    let drawerText = null
    // 2 i):
    setCurrentPlayer("Game over")
    // 2) ii):
    refsToElemsModule.opponentLegendP.innerHTML = ""
    // 2) iii):
    callbacksModule.removePlaySquaresELs()
    // 2) iv):
  if (winner === "X") {
    player = getPlayerX() // Returns name user typed in for X
                      } // end if
  if (winner === "0") {
    player = getPlayer0() // Returns name user typed in for 0 
                      } // end if
  
  incrPlayerWins(player)
  
  
  
  // Update winner drawer but
  // don't show it yet
  drawerText = makeDrawerText(playerLibrary)
  refsToElemsModule.drawerDivPClass.innerHTML = drawerText
  // For some reason the winners drawer would always 
  // show when there was a winner, hence the following
  // lines are there to ensure that doesn't happen:
    refsToElemsModule.drawerDivClass.style.display = "none"

// Now set various texts (<p>s) here and there:
    if (getGameType() === "twoPlayer") {
      if (winner === "X"){
  
  // Set <p>s in the brown box to 
  // show "Congratulations, *winning player*"
  // and "0/X/Gandhi/Picard/T1000 wins!":
  refsToElemsModule.divCongratsP.innerHTML = `Congrats, ${getPlayerX()}`
  refsToElemsModule.displayDivP.innerHTML  = `${getPlayerX()} wins!`
                         } // end if
  
  if (winner === "0"){
  
  // Set <p>s in the brown box to 
  // show "Congratulations, *winning player*"
  // and "0/X/Gandhi/Picard/T1000 wins!":
  refsToElemsModule.divCongratsP.innerHTML = `Congrats, ${getPlayer0()}`
  refsToElemsModule.displayDivP.innerHTML  = `${getPlayer0()} wins!`
                     } // end if
  
                                       } // end if
  
    if (getGameType() === "playAI") {
      if (winner === "X"){
        // Set <p>s in the brown box to 
        // show "Congratulations, *winning player*"
        // and "0/X/Gandhi/Picard/T1000 wins!":
        refsToElemsModule.divCongratsP.innerHTML = `Congrats, ${getPlayerX()}`
        refsToElemsModule.displayDivP.innerHTML  = `${getPlayerX()} wins!`
                           } // end if
  
  if (winner === "0"){ // ie the AI opponent won
  // Set <p> in the brown box to 
  // "0/X/Gandhi/Picard/T1000 wins!":
  refsToElemsModule.displayDivP.innerHTML  = `${gameFlowController.getPlayer0()} wins!`   
                     } // end if
                                    } // end if
                              } // end if there is a winner
  
  // 3)
  if (winner === "No winner") {
  // The following fn checks to see 
  // whether all squares have been played.
  // If not it does nothing.
  // If they have it changes currentPlayer
  // to "Game over"
  gameFlowController.allSquaresPlayedOrNot()
  if (getCurrentPlayer()=="Game over") {
    // Set legend to indicate a draw:
    refsToElemsModule.opponentLegendP.innerHTML = "It's a draw!"
                                        } else {
  // Hand play to opponent (to contiinue game)
  // and  change the legend appropriately:
  
    if (getGameType() === "twoPlayer") {
      // 3) i) a):
      // Change currentPlayer:
      toggleCurrentPlayer()
      // 3) i) b):
      if (getCurrentPlayer()=="Crosses") {
        refsToElemsModule.opponentLegendP.innerHTML = "X to play"
                                             } // end if
      if (getCurrentPlayer()=="Noughts") {
        refsToElemsModule.opponentLegendP.innerHTML = "0 to play"
                                         } // end if 
                                       } // end if  
  // 3) ii)
  if (getGameType() === "playAI") {
  // 3) a):
      // Change currentPlayer:
      toggleCurrentPlayer()
      // 3) a) i):
      if (getCurrentPlayer()=="Noughts") { // If the AI is to play
       // Call the fn that plays the AI:
       AIfunctions.AIplayGame()  
                                         } // end if
      // 3) a) ii):
      if (getCurrentPlayer()=="Crosses") {  // If the human is to play
       // Change the legend:
       refsToElemsModule.opponentLegendP.innerHTML = "X to play"
                                         } // end if
                                   } // end if
                                            }// end if-else all squares 
                                             // have been played                                 
                              } // end if there is no winner
  
                             } // end fn whoseTurn
  
  //-------------
  
  // A variable for the 
  // AI player:  
  let AIplayer = null
  // This fn is the AI. (?????)
  // Two callbacks call this fn:
  // a) the callback for the click of 
  //    the "Select" button
  // b) the callback for the click a 
  //    gameboard square
  // This fn must:
  // i)   Determine whether the user
  // has won. If so this fn calls an fn
  // that draws a line through the 
  // winning trio of user Xs.
  // If user has not won, this fn must
  // determine whether there are free squares.
  // ii)  If there are free squares 
  // this fn must determine whether 
  // playing a square will let the AI win.
  // If so, play it.
  // If there is no immediate opportunity for the 
  // AI to win determine whether user is about to win.
  // iii) If the user is about to win
  // this fn must block the path 
  // of the user
  // iv)  If the user is NOT about to win 
  // this fn must find a square that will
  // create a sequence of two
  // v)   If no such square exists this
  // fn must play any free square.     
  
  let playGameAI = function (){
  let winner = null 
  // NOTE: The human opponent is always X 
  // i) Has user won? The following fn
  // actually check whether X or 0 has won 
  // but since the human is always X it'll
  // be fine here.
  // winnerOrNot returns "X", "0" or "No winner":
  winner = winnerOrNot(Gameboard.gameboardArr)
  
  // i)
  if (winner === "X") { // if the user has won
  // Draw a line through the winning triplet:
  // To come
  // Put "You win!" in <p> of class opponentLegendP
  // To come
                      } else {
  // If the user has NOT won:
  // Determine whether or not there are 
  // free spaces in which the AI 
  // can play and win:
  
                             } // end if-else
  
                              } // end fn
  
  //----------
  
  // An array that contains the legends for
  // the opponents:
  let oppLegends = [
  "Mahatma Gandhi: he'll probably let you win.",
  "Jean-Luc Picard: the Borg could not beat him. Can you?",
  "The T1000: let him win – for your own sake!"
                   ] // end arr
  
  let getOppLegends = function (){
    return oppLegends
                                 } // end fn
  
  //-------
  // A variable that holds a number that 
  // represents the image of
  // the opponent.
  // 0 is Gandhi.
  // 1 is Picard.
  // 2 is T1000:
  let currentOpponentInd = 0
  
  // An fn that changes currentOpponentInd
  // with every click of an arrow.
  let setOpponentInd = function (ind){
    currentOpponentInd = ind
                                     } // end fn
  
  // Now an fn to get the currentOpponentInd:
  let getOpponentInd = function (){
    return currentOpponentInd
                                  } // end fn
  
  //----
  
  // Create a variable that will represent 
  // the current player (ie noughts or crosses).
  // The value of currentPlayer can be:
  // "Game over", 
  // ...
    let currentPlayer = "Crosses"
    
    let setCurrentPlayer = function (Xor0orAIorEnd){
      currentPlayer = Xor0orAIorEnd
                                                   } // end fn
  
    let getCurrentPlayer = function (){
      return currentPlayer
                                      } // end fn
  
    let toggleCurrentPlayer  = function (){
      switch(currentPlayer) {
        case "Crosses":
          currentPlayer = "Noughts"
          break;
        case "Noughts":
          currentPlayer = "Crosses"
          break;
        default:
          // code block
                            } // end switch
                                          } // end fn
  
  // The following fn takes the gameboardArr
  // as arg and determines whether anyone 
  // has won. It 
  // 1) returns "X" when X has won
  // 2) returns "0" when 0 has won 
  // returns nothing when no-one has one
  let winnerOrNot = function (arr) {
  let winningSide = null
    // arr looks like this:
  /*
  [
  ["X", "0", ""],
  ["0", "0", ""],
  ["X", "0", ""]
  ]
  So there are eight ways in which 
  arr can show a win
  */
  // If the top line (TH) is a winning line:
  if (
    ( arr[0][0] == "X" &&
      arr[0][1] == "X" &&
      arr[0][2] == "X" ) ||
     ( arr[0][0] == "0" &&
       arr[0][1] == "0" &&
       arr[0][2] == "0" ) 
     ) {
      winningSide = arr[0][0]
      return winningSide
       }
  
  // If the middle line (MH) is a winning line:
  if (
    ( arr[1][0] == "X" &&
      arr[1][1] == "X" &&
      arr[1][2] == "X" ) ||
     ( arr[1][0] == "0" &&
       arr[1][1] == "0" &&
       arr[1][2] == "0" ) 
     ) {
      winningSide = arr[1][0]
      return winningSide
       }
  
  // If the bottom line (BH) is a winning line:
  if (
    ( arr[2][0] == "X" &&
      arr[2][1] == "X" &&
      arr[2][2] == "X" ) ||
     ( arr[2][0] == "0" &&
       arr[2][1] == "0" &&
       arr[2][2] == "0" ) 
     ) {
      winningSide = arr[2][0]
      return winningSide
       }
  
  // If the left vertical (LV) line is a winning line:
  if (
    ( arr[0][0] == "X" &&
      arr[1][0] == "X" &&
      arr[2][0] == "X" ) ||
     ( arr[0][0] == "0" &&
       arr[1][0] == "0" &&
       arr[2][0] == "0" ) 
     ) {
      winningSide = arr[0][0]
      return winningSide
       }
  
  // If the middle vertical (MV) line is a winning line:
  if (
    ( arr[0][1] == "X" &&
      arr[1][1] == "X" &&
      arr[2][1] == "X" ) ||
     ( arr[0][1] == "0" &&
       arr[1][1] == "0" &&
       arr[2][1] == "0" ) 
     ) {
      winningSide = arr[0][1]
      return winningSide
       }
  
  // If the right vertical (RV) line is a winning line:
  if (
    ( arr[0][2] == "X" &&
      arr[1][2] == "X" &&
      arr[2][2] == "X" ) ||
     ( arr[0][2] == "0" &&
       arr[1][2] == "0" &&
       arr[2][2] == "0" ) 
     ) {
      winningSide = arr[0][2]
      return winningSide
       }
  
  // If top-left to bottom right diagonal line
  // (LD) is a winning line:
  if (
    ( arr[0][0] == "X" &&
      arr[1][1] == "X" &&
      arr[2][2] == "X" ) ||
     ( arr[0][0] == "0" &&
       arr[1][1] == "0" &&
       arr[2][2] == "0" ) 
     ) {
      winningSide = arr[0][0]
      return winningSide
       }
  
  // If top-right to bottom left diagonal line
  // (RD) is a winning line:
  if (
    ( arr[0][2] == "X" &&
      arr[1][1] == "X" &&
      arr[2][0] == "X" ) ||
     ( arr[0][2] == "0" &&
       arr[1][1] == "0" &&
       arr[2][0] == "0" ) 
     ) {
      winningSide = arr[0][2]
      return winningSide
       }
  
       // If there is no winner:
       return "No winner"
                                    } // end fn
  
  //----------------------------
  // This fn 
  // 1) displays the winner
  // (either X or 0) 
  // 2) takes arg "0", "X" or "No winner" 
  let displayWinner = function (winner) { 
    let opponent = null
  // Arg winner will have value 
  // "0", "X" or "No winner"  
  let textToDisplay = null
    if (getGameType() === "playAI") {
      // gameType is either "twoPlayer" or "playAI"
      switch (getOpponentInd()) {
        case 0: 
          opponent = "Gandhi"
          break;
          case 1:
            opponent = "Picard"
          break;
          case 2:
            opponent = "T1000"
          break;
      
        default:
          break;
                  } // end switch
  if (winner === "0") {
    textToDisplay = opponent.concat(" wins!")
    refsToElemsModule.displayDivP.innerHTML = textToDisplay
                      } // end if
  if (winner === "X") {
    textToDisplay = "X wins!" 
    refsToElemsModule.displayDivP.innerHTML = textToDisplay
                      } // end if
                                    } // end if game type is "playAI"
    
    if (getGameType() === "twoPlayer") {
      if (winner === "0") {
        textToDisplay = "0 wins!" 
        refsToElemsModule.displayDivP.innerHTML = textToDisplay
                          } // end if
      if (winner === "X") {
        textToDisplay = "X wins!" 
        refsToElemsModule.displayDivP.innerHTML = textToDisplay
                          } // end if
                                    } // end if game type is "twoPlayer"
                                         } // end fn
  
  // 2) This fn resets
  // gameboardArr:
  let toastGameboardArray = function () { 
    // 2)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        Gameboard.setGameboard(i, j, "")      
                                  } // end inner (j) for
                                } // end outer (i) for
                                        } // end fn
  
  //--------------
  
  // The following fn checks to see 
  // whether all squares have been played.
  // If not it does nothing.
  // If they have it changes currentPlayer
  // to "Game over"
  let allSquaresPlayedOrNot = function (){
    let counter = 0
    let gameboard = Gameboard.getGameboard()
    for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // If there is still a square empty
      if (gameboard[i][j] !== "") {
        counter += 1
                                  } // end if
                                  } // end j for loop   
                                } // end i for loop
  if (counter == 9) { // If no more empty squares
    // set currentPlayer:
    setCurrentPlayer("Game over")
                    } // end if
                                         } // end fn
  
  
  //-------------------------------------
  // Following uses object deconstruction:  
    return { 
      setCurrentPlayer,
      getCurrentPlayer,
      toggleCurrentPlayer,
      winnerOrNot,
      displayWinner,
      toastGameboardArray, 
      setOpponentInd,
      getOpponentInd,
      getOppLegends, 
      setGameType,
      getGameType,
      whoseTurn,
      allSquaresPlayedOrNot,
      setXname,
      getXname,
      set0name,
      get0name, 
      createPerson,
      playerLibrary,
      setPlayerX,
      getPlayerX,
      setPlayer0,
      getPlayer0,
      resetView,
      toastPlayerLib,
      incrPlayerWins
               }
                                          })() // end gameFlowController module
                                       
////-------------------------------------------------------------------
//-------------------------------------------------------------------

// Code creates all references to html elements 
// in the following module:  
let refsToElemsModule = (function (){  // This module ends on line 202
// First for the test button:
let testButton = document.querySelector(".testButton") ;
// The reset button:
let resetButtonID = document.getElementById('resetButtonID')
// The dialog box and its <p>:
let dialogBoxID     = document.getElementById('dialogBoxID')
let dialogBoxPClass = document.querySelector(".dialogBoxPClass")  
// The New game button:
let newGameButton = document.querySelector(".newGameButton") 
// The New game button enclosure:
let newGameEnclosure = document.querySelector(".newGameEnclosure") 
// The buttons (divs) that let the user choose the type of game
let twoPlayerButt  = document.getElementById('twoPlayerButt')
let aIButt         = document.getElementById('aIButt')
let playLibEncl    = document.querySelector(".playerLibEnclosing") ;
// The div containing the two buttons:
let buttEncl = document.getElementById('buttEncl')
// The div containing "Pick type of game":
let pickGameDiv = document.getElementById('pickGameDiv')
// The div containing the image of the AI opponent:
let playerImageBox = document.querySelector('.playerImageBox')
// The div containing "Pick your opponent":
let pickOpponent = document.querySelector('.pickOpponent')
// The divs for the left and right arrows and their event handlers:
let leftArrow    = document.getElementById('leftArrow')
let rightArrow   = document.getElementById('rightArrow')
let playerPicBox = document.getElementById('playerPicBox')

// The div that contains the three images of the opponents:
let divOfOpponents = document.getElementById('divOfOpponents')
// The <p> for the oppponent legend text:
let opponentLegendP = document.querySelector(".opponentLegendP") ;
// Now the div that contains the legends for the AI players:
let opponentLegend = document.querySelector(".opponentLegend") ;
// Now set some initial values of 
// references to elements:
// Set the classes of 
// The div that holds the three 
// opponent images and the div 
// that holds the opponent legend 
// on startup:
divOfOpponents.className = ''
divOfOpponents.classList.add("opponentsDiv")
divOfOpponents.classList.add("gandhiShows")
opponentLegendP.innerHTML = "Mahatma Gandhi: he'll probably let you win"

// The "Select" button:
let selButtClass = document.querySelector('.selButtClass')
// The <P> that contains the text "Select":
let selButtPClass = document.querySelector('.selButtPClass')

// The display div:
let displayDiv = document.querySelector('.displayDiv')
// The <p> inside the display div:
let displayDivP = document.getElementById('displayDivP')
// The div that encloses the squares
// and the lines in between them:
let enclosingDiv = document.querySelector(".enclosingDiv") ;

// These refs for the <p>s are never used!
// Now for the <p>s inside the square <div>s:
let p00 = document.getElementById('p0-0')
let p01 = document.getElementById('p0-1')
let p02 = document.getElementById('p0-2')
let p10 = document.getElementById('p1-0')
let p11 = document.getElementById('p1-1')
let p12 = document.getElementById('p1-2')
let p20 = document.getElementById('p2-0')
let p21 = document.getElementById('p2-1')
let p22 = document.getElementById('p2-2')

// Now an array to hold all of the refs for the <p>s
// of the squares:
let squareParray = [p00, p01, p02, p10, p11, p12, p20, p21, p22]

// Now for the square divs:
let s00 = document.getElementById('s00')
let s01 = document.getElementById('s01')
let s02 = document.getElementById('s02')
let s10 = document.getElementById('s10')
let s11 = document.getElementById('s11')
let s12 = document.getElementById('s12')
let s20 = document.getElementById('s20')
let s21 = document.getElementById('s21')
let s22 = document.getElementById('s22')

// The arrays below are identical and contain 
// vars that represent squares:
let squareRefsArray = 
[ s00, s01, s02, s10, s11, s12, s20, s21, s22 ] 

let squareRefsArray1 = 
[ s00, s01, s02, s10, s11, s12, s20, s21, s22 ] 

// For the + button (the click of which takes in 
// user inputs for names), the inputs, the div that
// encloses that button and those inputs:
let takeUserNames = document.querySelector(".takeUserNames") ;
// The inputs that the user fills with names for X and 0
let zeroInput = document.getElementById("zeroInput") 
let xInput    = document.getElementById("xInput") 
// The inputs that code fills with user selection from ddlists for X and 0
let zeroInput1 = document.getElementById("zeroInput1") 
let xInput1    = document.getElementById("xInput1") 
let userFormDiv = document.getElementById('userFormDiv')
let formXp = document.querySelector(".formXp") 
let form0p = document.querySelector(".form0p") 

// Now the congrats box and <p> that reads 
// congratulations T1000! 
let divCongrats = document.getElementById('divCongrats')
let divCongratsP = document.getElementById('divCongratsP')

// The "Winners" box
let hallOfFameDiv = document.querySelector(".hallOfFameDiv") 
// The drawer of winners (that appears/disappears on click of 
// the box above)
let drawerDivClass = document.querySelector(".drawerDivClass") 
// The <p> in the drawer above
let drawerDivPClass = document.querySelector(".drawerDivPClass") 

// Now for the dd lists:
// First the div the user clicks on to make the X list drop down:
let ddListMainDivXclass = document.querySelector(".ddListMainDivXclass") 
// Now the thing the user clicks on for the 0 list
let ddListMainDiv0class = document.querySelector(".ddListMainDiv0class") 
// The enclosure for the X dd list (an invisible div that holds the options)
let ddListEnclosureXid = document.getElementById("ddListEnclosureXid") 
// The enclosure for the 0 dd list (an invisible div that holds the options)
let ddListEnclosure0id = document.getElementById("ddListEnclosure0id") 
// The "Clear" option in both dd lists
let ddListClearPclass = document.querySelector(".ddListClearPclass") 
let ddListClearXid  = document.getElementById("ddListClearXid") 
let ddListClear0id  = document.getElementById("ddListClear0id") 
// The enclosure for the button that 
// accepts the user names the users 
// have typed in:
let takeUserNamesEnclosure = document.querySelector(".takeUserNamesEnclosure") 
// The drawer forthe instructions
let instrDrawerClass = document.querySelector(".instrDrawerClass") 
// The buton to click to show the drawer for the instructions:
let instrButtonClass = document.querySelector(".instrButtonClass") 

// The following uses object destructuring:
return {
  testButton,
  takeUserNames,
  userFormDiv,
  twoPlayerButt,
  aIButt,
  playLibEncl, 
  divOfOpponents,
  oppLegend,
  opponentLegend,
  opponentLegendP,
  buttEncl,
  pickGameDiv,
  playerImageBox,
  pickOpponent,
  leftArrow,
  rightArrow,
  playerPicBox,
  displayDiv, 
  displayDivP,
  divCongratsP, 
  enclosingDiv, 
  selButtClass,
  selButtPClass,
  newGameEnclosure,
  newGameButton,
  p00, 
  p01,
  p02, 
  p10,
  p11,
  p12,
  p20,
  p21,
  p22,
  s00,
s01,
s02,
s10,
s11,
s12,
s20,
s21,
s22,
squareRefsArray,
squareRefsArray1,
squareParray,
formXp,
form0p,
hallOfFameDiv,
drawerDivClass,
drawerDivPClass,
dialogBoxID,
dialogBoxPClass,
resetButtonID,
ddListMainDivXclass,
ddListMainDiv0class,
ddListEnclosureXid,
ddListEnclosure0id,
zeroInput1,
xInput1,
zeroInput,
xInput,
ddListClearPclass,
ddListClearXid,
ddListClear0id,
takeUserNamesEnclosure,
instrDrawerClass,
instrButtonClass
        }
                        })() // end module refsToElemsModule

//-----------------------------------------------------
//-----------------------------------------------------

// Now a module for adding event listeners 
// to elements and defining their callbacks.
// Note that this module only gets called once
// at init time (because it simply defines
// callbacks and adds them to elements'
// event listeners, so there's no need for 
// code elsewhere to call functions in this module):
let callbacksModule = (function (){  // ends on line 1885
// A callback to respond to the click of the
// div that reads "Instructions>". It simply
// shows the drawer if it's not visible, and 
// vice versa:
let showInstructions = function (){
  const style = getComputedStyle(refsToElemsModule.instrDrawerClass)
  const display = style.display
  if (display == "none") {
  refsToElemsModule.instrDrawerClass.style.display = "flex"
                        } // end if
if (display == "flex") {
  refsToElemsModule.instrDrawerClass.style.display = "none" 
                      } // end if
                                  } // end callback showInstructions
refsToElemsModule.instrButtonClass.addEventListener('click', showInstructions)

//--------------------------------------------------------
// Now callbacks that respond to the user's
// click of the "Clear" option in the 
// dd lists. First for the X dd list.
// This callback must:
// 1) clear the X dd list input for 
// existing x players
// 2) Re-enable the input where user 
// types in a name for the X player
// 3) Make disappear the div that 
// encloses the ddlist options 
// 4) set genMod.xDDlistInput to false
//    set genMod.xTypeInInput to true
// 7) Toggle the value of showDDlistOrNot
// 5) Set noBlanksX to false
// 6) Set newNameX to false
let clearDDlistInputX = function () {
// 1): 
refsToElemsModule.xInput1.value = ""
// 2):
refsToElemsModule.xInput.disabled = false
// 3)
refsToElemsModule.ddListEnclosureXid.style.display = "none"
// 4)
genMod.setXddListInput(false)
genMod.setXtypeInInput(true)
// 5)
genMod.setNoBlanksX(false)
// 6)
genMod.setNewNameX(false)
// 7)
toggleShowDDlistOrNot()
                                    } // end callback clearDDlistInput
refsToElemsModule.ddListClearXid.addEventListener('click', clearDDlistInputX)

// Now for the corresponding 0 dd list "Clear" option
// (everything is similar to callback above):
let clearDDlistInput0 = function () {
  // 1): 
  refsToElemsModule.zeroInput1.value = ""
  // 2):
  refsToElemsModule.zeroInput.disabled = false
  // 3)
refsToElemsModule.ddListEnclosure0id.style.display = "none"
// 4)
genMod.setZeroDDlistInput(false)
genMod.setZeroTypeInInput(true)
// 5)
genMod.setNoBlanks0(false)
// 6)
genMod.setNewName0(false)
// 7)
toggleShowDDlistOrNot()
                                      } // end callback clearDDlistInput
  refsToElemsModule.ddListClear0id.addEventListener('click', clearDDlistInput0)
  


//--------

// The callback for the options in 
// the dd list. This fn has to 
// 1) Make the drawer go back in
// 2) call an fn that will do 
// what's required depending on 
// the option the user has selected
// 3) set genMod.xDDlistInput to false
//    set genMod.xTypeInInput to true
// 4) set noBlanksX to true
// 5) set newNameX to true
// 6) Toggle showDDlistOrNot
let pickMEx = function() {
  // Take the selection and put it into the correct input
  // (the one that displays the ddlist option the user has 
  // selected).
  // 'this' is the div (option) the user has clicked in and 
  // this.firstChild is the <p> in that div.
  refsToElemsModule.xInput1.value = this.firstChild.innerHTML
  // Clear the input in which the user types in a name for X
  refsToElemsModule.xInput.value = ""
  // Disable the input in which the user types in a name for X
  refsToElemsModule.xInput.disabled = true
  // Make disappear the div that encloses the ddlist options 
  refsToElemsModule.ddListEnclosureXid.style.display = "none"
  // 3)
  genMod.setXddListInput(true)
  genMod.setXtypeInInput(false)
  // 4)
  genMod.setNoBlanksX(true)
  // 5
  genMod.setNewNameX(true)
  // 6
  toggleShowDDlistOrNot()
                          } // end fn

let pickME0 = function() {
  // Take the selection and put it into the correct input
  // 'this' is the div (option) the user has clicked in and 
  // this.firstChild is the <p> in that div.
  refsToElemsModule.zeroInput1.value = this.firstChild.innerHTML
  // Clear the input in which the user types in a name for X
  refsToElemsModule.zeroInput.value = ""
  // Disable the input in which the user types in a name for 0
  refsToElemsModule.zeroInput.disabled = true
  // Make disappear the div that encloses the ddlist options 
  refsToElemsModule.ddListEnclosure0id.style.display = "none"
  // 3)
  genMod.setZeroDDlistInput(true)
  genMod.setZeroTypeInInput(false)
  // 4)
  genMod.setNoBlanks0(true)
  // 5
  genMod.setNewName0(true)
  // 6)
  toggleShowDDlistOrNot()
                          } // end fn
  

//-------------------  

// A variable that callback showDropDown
// will toggle and read so that 
// it will know whether to show or hide the 
// dropdown list:
let showDDlistOrNot = true
let getShowDDlistOrNot = function(){
return showDDlistOrNot
                                   } // end fn

let toggleShowDDlistOrNot = function(){
  showDDlistOrNot = !showDDlistOrNot
                                      } // end fn


let setShowDDlistOrNot = function(veracity){
if(veracity) {
  showDDlistOrNot = true
             } // end if
if(!veracity) {
  showDDlistOrNot = false
              } // end if             
                                           } // end fn

//----------                                         
// The callback for the user's click
// of the ddlist (before or after it 
// drops down).
// This callback has to:
// 1) Get the list of things to show
// in the list
// 2) Make a drawer equal in height to 
// ((n x option height) + height of 
// the "Clear" option, which is 18px)
// 3) Populate the drawer with 
// n options. each option div will have the same 
// left value but a different top value.
// top = (i-1)*height
// 4) add event listeners to
// the options
// 5) roll the drawer down???
let showDropDown = function (el){
  let newDiv  = null
  let newPara = null
  let top     = null
  // Now an object that code will 
  // populate with only the human
  // player objects in playerLibrary:
  let humanPlayers = { }

  // Populate humanPlayers with all of 
  // the objects for the existing 
  // players except the AI players:
  let keysArr = Object.keys(gameFlowController.playerLibrary)
  for (let j = 0; j < (keysArr.length); j++) {
  if (keysArr[j] !== "AIplayers"){
humanPlayers[keysArr[j]] = gameFlowController.playerLibrary[keysArr[j]]
                                 } // end if
                                             } // end for

// Now make the option divs, giving each a 
// <p> that contains the name of a player,
// then appending each div to the ddlist
// enclosure div (code positions the option
// divs in a stack starting at the bottom of 
// the pre-existing div that reads "**Clear**") 
let keysArr1 = Object.keys(humanPlayers)
if (showDDlistOrNot) { // if the flag is true
  for (let i = 0; i < (keysArr1.length) ; i++) {
    // 20px is the clearance needed 
    // below the "Clear" option (18px +
    // border 1px + border 1px)
    top = 20+(i*37)
    top = top.toString()
    top = top.concat("px")  
  // Make each option div and give it a class:
  newDiv = document.createElement("DIV")
  newDiv.classList.add("ddListOptionDivClass")
  // Set the top attribute of the div:
  newDiv.style.top = top 
// make the <p> that goes in the option
// and set its class:
newPara = document.createElement("P")
newPara.classList.add("ddListOptionPClass")
// Set the new <p>'s innerHTML:
newPara.innerHTML = keysArr1[i]
// Append the <p> above to the <div> above:
newDiv.appendChild(newPara)
// Append the <div> above to the <div>
// for the drawer, first adding to it the 
// appropriate event listener:
if (el == refsToElemsModule.ddListMainDivXclass) {
  // Add a click event handler to the div:
  newDiv.addEventListener('click', pickMEx)
  refsToElemsModule.ddListEnclosureXid.appendChild(newDiv)
  // Now show the ddlist:
  refsToElemsModule.ddListEnclosureXid.style.display = "block"  
                                                 } // end if

if (el == refsToElemsModule.ddListMainDiv0class) {
  // Add a click event handler to the div:
  newDiv.addEventListener('click', pickME0)
  // Append the option to the ddlist enclosure:
  refsToElemsModule.ddListEnclosure0id.appendChild(newDiv)
  // Now show the ddlist:
  refsToElemsModule.ddListEnclosure0id.style.display = "block"  
                                                 } // end if
                                           } // end for
toggleShowDDlistOrNot() // set flag to false
                      } else { // If the flag is false
                               // hide the ddlist in question: 
if (el === refsToElemsModule.ddListMainDivXclass) {
  refsToElemsModule.ddListEnclosureXid.style.display = "none"  
                                                  } // end if

if (el === refsToElemsModule.ddListMainDiv0class) {
  refsToElemsModule.ddListEnclosure0id.style.display = "none"  
                                                  } // end if
toggleShowDDlistOrNot() // set flag to true
                             } // end if-else showDDlistOrNot
                              } // end callback showDropDown

// Need the following fn because we want to 
// feed showDropDown an arg:
let ddListMainCallBack = function(){
  showDropDown(this)
                                   } // end fn


//-------------------------------------------------------------------------
// An event listener for the Reset button.
// This  callback must
// 1) Reset
// i)    The "Congrats, Xxxx" <p>
// ii)   The gameboard array
// iii)  the view
// iv)   the winners drawer
// v)    the player library.
//       Toasting playerLibrary measn that 
//       the ddlists will be empty.
// vi)   the display <p>
// vii)  the opponentID (to 0 for Gandhi)  
// viii) the legend
// 2) Make invisibile
// i)   The enclosure for the Enter name form
// ii)  The enclosure for the plus button
// 3) Make visible
// i)   The enclosure for div containing "Pick type of game"
// ii)  The enclosure for buttons "Two player" and "Play the AI"


let reset = function(){
// 1)
// i)
refsToElemsModule.divCongratsP.innerHTML = ""
// ii)
gameFlowController.setGameType(null)
gameFlowController.toastGameboardArray()
// iii) 
gameFlowController.resetView()
// iv) 
refsToElemsModule.drawerDivPClass.innerHTML = ""
// v)
gameFlowController.toastPlayerLib()
// vi)
refsToElemsModule.displayDivP.innerHTML = ""
// vii) 
gameFlowController.setOpponentInd(0)
// viii)
refsToElemsModule.opponentLegendP.innerHTML = ""
// 2) i)
refsToElemsModule.userFormDiv.style.display = "none"
// 2) ii)
refsToElemsModule.takeUserNamesEnclosure.style.display = "none"
// 3) i)
refsToElemsModule.pickGameDiv.style.display = "flex"
// 3) ii)
refsToElemsModule.buttEncl.style.display    = "flex"
                      } // end callback

refsToElemsModule.resetButtonID.addEventListener('click', reset)

//-------------

// The callback for the button
// that reads "Winners".
// Clicking this button has to 
// 1) Make the drawer that contains the winners
// appear
// Note that drawerDivPClass (the <p> in the drawer)
// has already had its innerHTmL set to the list of 
// winners (in fn whoseTurn())
let showWinners = function(){
  // 1)
  const style = getComputedStyle(refsToElemsModule.drawerDivClass)
  const display = style.display

  if (display === "flex") {
      refsToElemsModule.drawerDivClass.style.display = "none"
                          }
  if (display === "none") {
      refsToElemsModule.drawerDivClass.style.display = "flex"
                          }
  
                            } // end fn
// Now add the even listener to the div:
refsToElemsModule.hallOfFameDiv.addEventListener('click', showWinners)

//----------

// 1) The callback for the click event listener for 
// the + button (takeUserNames, which the user clicks 
// after each player has entered his name in the 
// inputs). This fn has to
// a) set variables to the names 
// the users have entered in the 
// inputs (it'll be one name in the case of 
// gameType == "playAI", two names in the case of 
// gameType == "twoPlayer"):
// b) Make disappear the div surrounding: 
// the <p> for "Enter name", the "X:", 
// the "0:", the inputs and the button itself
// c) Make appear 
// i)   if the game type is "twoPlayer" 
//      the Legend box and New game button
// ii)  if the game type is "playAI" the
//      box that allows the user to choose
//      the AI opponent, the legend box
//      and New game button.
// 2) Create new player objects
// and put them imto the library for 
// players (object gameFlowController.playerLibrary):
let acceptUserNames = function (){ // ends line 1460
  // A variable for the time for which the 
  // dialog boxes show: 
  let myInterv = 0
  //
  let playerX = null
  let player0 = null
  // a):
  // First some flags (without which there would be too many
  // nested if statements):
  // This gets set to true if the X user input 
  // is not all spaces:
  let noBlanksX = genMod.getNoBlanksX()
  // This gets set to true if the 0 user input 
  // is not all spaces:
  let noBlanks0 = genMod.getNoBlanks0()
  // This gets set to true if the X user input 
  // and the 0 user input are NOT the same:
  let diffNames = genMod.getDiffNames()  
  // This gets set to true if the X user input 
  // does NOT already exist in playerLibrary:
  let newNameX  = genMod.getNewNameX()
  // This gets set to true if the 0 user input 
  // does NOT already exist in playerLibrary:
  let newName0  = genMod.getNewName0()

  // whetherAllBlank(inp) returns true if 
  // a name is all spaces or no text
  // whetherPlayerExists(inp) returns true if 
  // there is NOT an object with that key name
  // in the library.
  // whetherAllBlank returns true if the arg 
  // it rxes (ie the input) is no text or 
  // 1-5 consecutive spaces.
// If it's a two-player game:
if (gameFlowController.getGameType() === "twoPlayer") {
  // getXddListInput
  // If the X type-in input is active
  // check for 
  // i) whether name already exists 
  // ii) all spaces/no text
  // iii) whether players have chosen same name:
  if (genMod.getXtypeInInput()) {
    // i): 
    if ( genMod.whetherPlayerExists(refsToElemsModule.xInput.value) ){
      newNameX = true // user choice of X name NOT already in use
                                                                     }
  // ii): 
  if (!genMod.whetherAllBlank(refsToElemsModule.xInput.value)){
    noBlanksX = true // ie user choice of X name is NOT all spaces
                                                              } // end if
// Now compare the typed-in X input with either
// the typed in 0 input or the 0 ddlist input,
// depending on which is active:
if (genMod.getZeroTypeInInput()) { // If zero type-in input is active
  // compare X type-in input with zero type-in input:
  // iii) 
  if (refsToElemsModule.xInput.value !== refsToElemsModule.zeroInput.value) { // if x type-in input !== 
    diffNames = true // users' choices of names are NOT the same  
                                                                            } // end if
                                 } // end if
if (genMod.getZeroDDlistInput()) { // If zero ddlist input is active
  // compare X type-in input with zero ddlist input:
  // iii) 
  if (refsToElemsModule.xInput.value !== refsToElemsModule.zeroInput1.value) {
    diffNames = true // users' choices of names are NOT the same  
                                                                             }
                                  }  
                                } // end if X type-in input is active

  // If instead the X ddlist input is active, 
  // there is obviously no need to check 
  // whether the player exists already in 
  // playerLibrary. Code need only 
  // check whether the name chosen in xInput1
  // is the same as one in zeroInput or 
  // zeroInput1, depending on which is active:
  if (genMod.getXddListInput()) {
// Now compare the typed-in X input with either
// the typed in 0 input or the 0 ddlist input,
// depending on which is active:
if (genMod.getZeroTypeInInput()) { // If zero type-in input is active
  // compare X type-in input with zero type-in input:
  // iii) 
  if (refsToElemsModule.xInput1.value !== refsToElemsModule.zeroInput.value) { // if x type-in input !== 
    diffNames = true // users' choices of names are NOT the same  
                                                                            } // end if
                                 } // end if
if (genMod.getZeroDDlistInput()) { // If zero ddlist input is active
  // compare X type-in input with zero ddlist input:
  // iii) 
  if (refsToElemsModule.xInput1.value !== refsToElemsModule.zeroInput1.value) {
    diffNames = true // users' choices of names are NOT the same  
                                                                             }
                                  }  
                         } // end if X ddlist is active

  //--
  
// If the 0 type-in input is active
  // Do same as for X input above but 
  // there's no neeed to test whether 
  // X and 0 names are the same as 
  // that has already been done above:
  if (genMod.getZeroTypeInInput()) {
  if ( genMod.whetherPlayerExists(refsToElemsModule.zeroInput.value)) {
    newName0 = true // user choice of 0 name NOT already in use
                                                                      } //end if
  if (!genMod.whetherAllBlank(refsToElemsModule.zeroInput.value)){
    noBlanks0 = true // ie user choice of 0 name is NOT all spaces 
                                                                 } // end if
                                   } // end if

// If instead the 0 ddlist input is active, 
// there's obviously no need to check 
// whether a player already exists in
// playerLibrary nor whether the name is
// all spaces/no text. Neither is there a need
// to check whether it is a name already used
// in the X type-in or ddlist inputs as 
// this has already been done above. 
 
                                                      } // end if two-player game

//---

// If the game is human v AI:
if (gameFlowController.getGameType() === "playAI") {
  // If X type-in input active
  if (genMod.getXtypeInInput()) { 
  if ( genMod.whetherPlayerExists(refsToElemsModule.xInput.value) ){
    
    newNameX = true // Because user choice of X name NOT already in use
                                                                   }
  if (!genMod.whetherAllBlank(refsToElemsModule.xInput.value)){
    noBlanksX = true // ie user choice of X name is NOT all spaces
                                                              } // end if
                                 }
    newName0 = true 
    noBlanks0 = true
    diffNames = true
                                                   } // end if human v AI


//---

// Now code that looks at noBlanksX, 
// noBlanks0, newNameX, newName0 and 
// diffNames and shows certain dialog
// boxes or none depending on the 
// values of those variables. 
// There are three nested if statements here:

// First check that users have not 
// entered all spaces for X and 0 names:
if (noBlanksX && noBlanks0) { 
// Now check that users' choices for names 
// do not already exist in the library:
if ( newNameX && newName0  ) {
// Now check whether the names for X and 0 are the same:
  if ( diffNames == true // ie users' choices of X and 0 names are NOT the same
     )
   {
// All important code for this event handler goes in here:

// If it's a two-player game
if (gameFlowController.getGameType() === "twoPlayer") {
// First show the div that holds the legend
// and he div containing the New game button:
refsToElemsModule.oppLegend.style.display = "flex"
refsToElemsModule.newGameEnclosure.style.display = "flex"
// Now grab the names of the players.

// If the X player name is in the type-in input
// (ie if that input is active) get new-player
// name and create an object for that new 
// player in playerLibrary:
if (genMod.getXtypeInInput()) {
  playerX = refsToElemsModule.xInput.value
  let playerXobj = gameFlowController.createPerson(playerX)
gameFlowController.playerLibrary[playerX] = playerXobj
                              } // end if

// If the X player name is in the ddlist input
// (ie if that input is active) there's obviously
// no need to create a new player object in 
// playerLibrary:
if (genMod.getXddListInput()) {
  playerX = refsToElemsModule.xInput1.value
                              } // end if

// Same thinking now for the 0 player name:
if (genMod.getZeroTypeInInput()) {
  player0 = refsToElemsModule.zeroInput.value
  let player0obj = gameFlowController.createPerson(player0)
gameFlowController.playerLibrary[player0] = player0obj
                                 } // end if

// If the 0 player name is in the ddlist input
// (ie if that input is active):
if (genMod.getZeroDDlistInput()) {
  player0 = refsToElemsModule.zeroInput1.value
                                 } // end if

gameFlowController.setPlayerX(playerX)
gameFlowController.setPlayer0(player0)
                                      
                                                       } // end if two-player game
// If it's a human-versus-AI game
if (gameFlowController.getGameType() === "playAI") {
// 2)
// In the case of gameType == "playAI" code will 
// create the player objects (and put them in the player
// library) in the click handler for the Select button
// (because that's when the user selects the AI opponent,
// which will be player0). Code also makes the X and 0
// player objects at that stage (and adds them to the 
// library).

// If the X player name is in the type-in input
// (ie if that input is active):
if (genMod.getXtypeInInput()) {
  playerX = refsToElemsModule.xInput.value
                              } // end if

// If the X player name is in the ddlist input
// (ie if that input is active):
if (genMod.getXddListInput()) {
  playerX = refsToElemsModule.xInput1.value
                              } // end if

gameFlowController.setPlayerX(playerX)
// Code sets player0 in the event handler for the
// click of the Select button (because that's when
// the user chooses the AI opponent).

// c) ii):
// Make these visible:
refsToElemsModule.selButtPClass.style.display = "flex"  
refsToElemsModule.selButtClass.style.display = "flex"
refsToElemsModule.leftArrow.style.display = "block"
refsToElemsModule.rightArrow.style.display = "block"
refsToElemsModule.oppLegend.style.display = "flex"
refsToElemsModule.playLibEncl.style.display = "block"
refsToElemsModule.divOfOpponents.style.display = "block"
refsToElemsModule.playerImageBox.style.display = "block"
refsToElemsModule.pickOpponent.style.display = "flex"
refsToElemsModule.newGameEnclosure.style.display = "flex"

                                                  } // end if
// b):
// Make the user form and the + button itself invisible:
refsToElemsModule.userFormDiv.style.display = "none"
refsToElemsModule.takeUserNamesEnclosure.style.display = "none"

// End important code for this event handler:
   } else {
    
// Show dialog box:
let myText = "Names for X and 0 cannot be the same."
myInterv = 2000
genMod.showDialogBox(myText, myInterv)
          }// end if-else users' choices of names are the same
                               } else { // if-else name(s) already in library
// Show dialog box that depends on
// whether game type is two-player or human v AI:
if (gameFlowController.getGameType() === "playAI") {
  let myText = "Name for X player is already in use."
  myInterv = 2000
  genMod.showDialogBox(myText, myInterv)  
                                                   } // end if
if (gameFlowController.getGameType() === "twoPlayer") {
  let myText = "A player/players already exist with same typed-in name/names."
  myInterv = 2000
  genMod.showDialogBox(myText, myInterv)
                                                      } // end if
                                      }// end if-else name(s) already in library
                            } else { // ie at least one name is all blanks
// Show dialog box
let myText = "A name cannot be all spaces or no text!"
myInterv = 2000
genMod.showDialogBox(myText, myInterv)
                                    }// end if-else one or more names are blank

                                  } // end callback acceptUserNames
// Add the event listener to the + button 
refsToElemsModule.takeUserNames.addEventListener('click', acceptUserNames, false)



//---------

// 1) An fn that adds the event listener clickInSquare
// to all squares:
let addELtoAllSquares = function (){
for (let i = 0; i < refsToElemsModule.squareRefsArray1.length ; i++) {
  refsToElemsModule.squareRefsArray1[i].addEventListener('click', clickInSquare)
                            } // end for
                                   } // end fn

//----------------------

// 2)
// The callback for the New game button's click listener.
// This fn has to
// 1) toast the gameboard and update the view
//    Toast the message in the <p> divCongratsP 
// 2) remove event listener from all squares
// 3) make visible
//    Pick game div, enclosure for "Two player" and "Play the AI" buttons
// 4) Make invisible
// enclosure for itself, legend div, left&right arrows, Select button,
// AI player image box, div that reads "Pick your opponent",
// the div containing "Enter name"
// 5) Toast the text in the box that displays who wins
let startNewGame = function(){
// 1): 
gameFlowController.toastGameboardArray()
for (let j = 0; j < 9; j++) {
  refsToElemsModule.squareParray[j].innerHTML = ""  
                            } // end for
for (let k = 0; k < 9; k++) {
  refsToElemsModule.squareRefsArray1[k].style.backgroundImage = "none"
                            } // end for

refsToElemsModule.divCongratsP.innerHTML = ""
// 2):
for (let i = 0; i < refsToElemsModule.squareRefsArray1.length ; i++) {
  refsToElemsModule.squareRefsArray1[i].removeEventListener('click', clickInSquare)
                            } // end for
// 3):
refsToElemsModule.pickGameDiv.style.display = "flex"
refsToElemsModule.buttEncl.style.display    = "flex"
// 4):
// refsToElemsModule.newGameEnclosure.style.display = "none"
refsToElemsModule.oppLegend.style.display        = "none"
refsToElemsModule.leftArrow.style.display = "none"
refsToElemsModule.rightArrow.style.display = "none"
refsToElemsModule.pickOpponent.style.display = "none"
refsToElemsModule.selButtClass.style.display = "none"
refsToElemsModule.playerImageBox.style.display = "none"
refsToElemsModule.playLibEncl.style.display = "none"
refsToElemsModule.userFormDiv.style.display = "none"
// 5):
refsToElemsModule.displayDivP.innerHTML = ""
                             } // end fn
// Now set the click event handler for the 
// New game button to be fn startNewGame:
refsToElemsModule.newGameButton.addEventListener('click', startNewGame)

// 2)
//------
// Now the callback for the Select button.
// This callback has to 
// i)   Make elements disappear (eg the 
// arrows)
// ii)  Change innerHTML of the <p> in the
// div of class opponentLegend so that it reads 
// "*AI player* goes first". Callback needs to
// determine who the AI opponent is 
// iv) After a delay call the AI to start the game.

let startGame = function () {
// Code set variable gameFlowController.playerX after user 
// clicked the + button. However at that stage user had
// not yet chosen AI opponent nor made player objects.
// 
let player0 = null 
let AInum = gameFlowController.getOpponentInd()
switch (AInum) {
  case 0:
    player0 = "Gandhi"
    break;
    case 1:
      player0 = "Picard"
      break;
      case 2:
        player0 = "T1000"
        break;
      default:
      break;
               }
gameFlowController.setPlayer0(player0) // Not necessary!
let playerX = gameFlowController.getPlayerX()
  let playerXobj = gameFlowController.createPerson(playerX)
  gameFlowController.playerLibrary[playerX] = playerXobj

/* THIS BIT NO LONGER APPLIES:  
// If there's already a player object of key, eg, 
// "Gandhi" in the library, don't do anything. But if
// there isn't (ie this is the first time the user has
// played this AI opponent), create an object for the 
// AI opponent and put it in the library:
if (gameFlowController.playerLibrary[player0]) {
// Do nothing  
} else {
  // Make the object:
  let player0obj = gameFlowController.createPerson(player0)
  // Put the object just made into the playerLibrary:
  gameFlowController.playerLibrary[player0] = player0obj
       } // end if-else
*/

// i)
refsToElemsModule.selButtClass.style.display = "none"
refsToElemsModule.leftArrow.style.display = "none"
refsToElemsModule.rightArrow.style.display = "none"
refsToElemsModule.pickOpponent.style.display = "none"
refsToElemsModule.divOfOpponents.style.display = "none"
refsToElemsModule.playerImageBox.style.display = "none"
// ii) 
// Get value of AIopponent (0 is Gandhi, 1 is Picard, 2 is T1000)
// and act accordingly
let AIopponent = gameFlowController.getOpponentInd()
switch (AIopponent) {
  case 0:
    refsToElemsModule.opponentLegendP.innerHTML = "Gandhi goes first"    
    gameFlowController.setPlayer0("Gandhi")
  break;

  case 1:
    refsToElemsModule.opponentLegendP.innerHTML = "Picard goes first"    
    gameFlowController.setPlayer0("Picard")
  break;

  case 2:
    refsToElemsModule.opponentLegendP.innerHTML = "The T1000 goes first"
    gameFlowController.setPlayer0("T1000")
  break;

  default:
    break;
                    } // end switch
// iv): 
// After a short delay make the first move:
setTimeout(function() { 
// Here add the click event listener
// to all squares:
addELtoAllSquares()
// Now call an fn
// that plays the first move:
AIfunctions.AIplayGame()
                      }, 300)



                            } // end callback
// Add the event listener to the "Select" button:                            
refsToElemsModule.selButtClass.addEventListener('click', startGame)


//------
// 3)
//------
// The callback for the event listener 
// for the two-player button.
// This has to:
// 1) set the var that holds the game type
// to "twoPlayer"
// 2) set currentPlayer to "Crosses"
// 3) Set click event listener for all 
// squares
// 4) Make certain elements invisible, others 
// visible
// 5) Set legend to "X goes first"
// 6) Enable the type-in inputs and set their 
// opacities and those of associated elements
// 7) set the event listeners for the 
// ddlist divs that read "Existing >>" and 
// make visible those divs (necessary??).
// Also empty any text in all four inputs.
// 8) Make the + button visible (by making 
// its enclosing div visible)


let chooseTwoPlayerGame = function (){
  // 1): 
  gameFlowController.setGameType("twoPlayer")
  // 2): 
  gameFlowController.setCurrentPlayer("Crosses")
  // 3):
  for (let i = 0; i < 9; i++) {
    refsToElemsModule.squareRefsArray1[i].addEventListener('click', clickInSquare) 
                              } // end for
  // 4):
  // Make these two invisible:
  refsToElemsModule.pickGameDiv.style.display = "none"
  refsToElemsModule.buttEncl.style.display = "none"
  // Make visible the div containing text "Enter name":
  refsToElemsModule.userFormDiv.style.display = "block"
  // 5):
  refsToElemsModule.opponentLegendP.innerHTML = "X goes first"
  // 6)
  refsToElemsModule.xInput.disabled = false
  refsToElemsModule.zeroInput.disabled = false
  refsToElemsModule.xInput.style.opacity = "1"
  refsToElemsModule.zeroInput.style.opacity = "1"
  refsToElemsModule.zeroInput1.style.opacity = "1"
  refsToElemsModule.formXp.style.opacity = "1"
  refsToElemsModule.form0p.style.opacity = "1"
// 7)
refsToElemsModule.ddListMainDivXclass.addEventListener('click', ddListMainCallBack)
refsToElemsModule.ddListMainDiv0class.addEventListener('click', ddListMainCallBack)
refsToElemsModule.ddListMainDivXclass.style.display = "flex"
refsToElemsModule.ddListMainDiv0class.style.display = "flex"
refsToElemsModule.xInput.value = ""
refsToElemsModule.zeroInput.value = ""
refsToElemsModule.xInput1.value = ""
refsToElemsModule.zeroInput1.value = ""
// 8)
refsToElemsModule.takeUserNamesEnclosure.style.display = "flex"
                                     } // end callback
// Add the event handler above to the 
// Two player button:
refsToElemsModule.twoPlayerButt.addEventListener('click', chooseTwoPlayerGame)



//--------
// 4) 
//------
// The callback for the event listener 
// for the "Play the AI" button.
// This fn has to:
// 1) Set var gameType to "playAI"
// set currentPlayer to "AI"
// 2) Make visible  the div containing
// the text "Enter name" (and hence
// everything else it contains)
// 3)  Make the two-player and Play the AI
// buttons and the "Pick type of game" 
// divs and the div containing those
// buttons disappear. 
// 4)  Set starting legend to the one about Gandhi,
// but set the display of the legend box to "none."
// Set the starting image to that of Gandhi
// 5) Enable only the X input.
// Disable the 0 input and 
// give it and the box that 
// contains "0:" an opacity of 0.3 .
// Also make the text in the ddlist
// inputs "" (necessary as the 
// browser "helpfully" puts names 
// previously used in those inputs!)
// 6) Add the correct event listener
// to the X dd list and remove it 
// from the 0 dd list.
// Give the 0 dd list 
// an opacity of 0.3 
// 7) Make the + button visible
// 8) Make the New game button appear

let choosePlayAI = function (){
  
  // 1):
  gameFlowController.setGameType("playAI")
  gameFlowController.setCurrentPlayer("Noughts")
  // 2):
// Make visible the div containing text "Enter name":
refsToElemsModule.userFormDiv.style.display = "block"
  // 3):
  // Make these two invisible:
  refsToElemsModule.pickGameDiv.style.display = "none"
  refsToElemsModule.buttEncl.style.display = "none"
  // 4) 
  refsToElemsModule.divOfOpponents.className = ''
  refsToElemsModule.divOfOpponents.classList.add("opponentsDiv")
  refsToElemsModule.divOfOpponents.classList.add("gandhiShowsAfterPicard")
  refsToElemsModule.divOfOpponents.classList.add("gandhiShows")
  gameFlowController.setOpponentInd(0)
  refsToElemsModule.opponentLegendP.innerHTML = gameFlowController.getOppLegends()[0]
  refsToElemsModule.opponentLegend.style.display = "none"
  // 5)
refsToElemsModule.xInput.disabled = false
refsToElemsModule.formXp.style.opacity = "1"

refsToElemsModule.form0p.style.opacity = "0.3"
refsToElemsModule.zeroInput.style.opacity = "0.3"
refsToElemsModule.zeroInput1.style.opacity = "0.3"
refsToElemsModule.zeroInput.disabled = true
refsToElemsModule.zeroInput1.disabled = true
refsToElemsModule.zeroInput1.value = ""
refsToElemsModule.xInput1.value = ""
refsToElemsModule.zeroInput.value = ""
refsToElemsModule.xInput.value = ""
// 6) 
refsToElemsModule.ddListMainDivXclass.addEventListener('click', ddListMainCallBack)
refsToElemsModule.ddListMainDiv0class.removeEventListener('click', ddListMainCallBack)
refsToElemsModule.ddListMainDiv0class.style.display = "none"
// 7)
refsToElemsModule.takeUserNamesEnclosure.style.display = "flex"
// 8)
refsToElemsModule.newGameEnclosure.style.display = "flex"

                              } // end callback
// Set the event listener for the 
// "Play the AI" button:
refsToElemsModule.aIButt.addEventListener('click', choosePlayAI)

//--------


// 5) 
//------
// The callback for the event listener 
// for the left button
refsToElemsModule.leftArrow.addEventListener('click', prevImage)
// Now the callback for the left 
// arrow event listener (below).
// This fn must 
// 1) determine what pic is showing
// 2) Change the classes of the 
//    div of class opponentsDiv
//    depending on what image is 
//    showing. This will start an 
//    animation.
//    Remember that three opponent images are all in  
//    one div that the animation slides left or right
//    so that the appropriate image comes into view
//    in the transparent window.
// 3) Change the value of opponentInd  
function prevImage() {
  // 1) and 2):
  
switch (gameFlowController.getOpponentInd()) {
  case 0:
      // If Gandhi is showing 
      // do nothing
    break;
  case 1:
// If Picard is showing 
// go to Gandhi:
refsToElemsModule.divOfOpponents.className = ''
refsToElemsModule.divOfOpponents.classList.add("opponentsDiv")
refsToElemsModule.divOfOpponents.classList.add("gandhiShowsAfterPicard")
refsToElemsModule.divOfOpponents.classList.add("gandhiShows")
gameFlowController.setOpponentInd(0)
refsToElemsModule.opponentLegendP.innerHTML = gameFlowController.getOppLegends()[0]

    break;
  case 2:
// If T1000 is showing 
// go to Picard:
refsToElemsModule.divOfOpponents.className = ''
refsToElemsModule.divOfOpponents.classList.add("opponentsDiv")
refsToElemsModule.divOfOpponents.classList.add("picardShowsAfterTthous")
refsToElemsModule.divOfOpponents.classList.add("picardShows")
gameFlowController.setOpponentInd(1)
refsToElemsModule.opponentLegendP.innerHTML = gameFlowController.getOppLegends()[1]
    break;
      
  default:
    break;
} // end switch
                             } // end fn
//----------
//--------
// 5) 
//------
// The callback for the event listener 
// for the right arrow button
let nextImage = function () {
  switch (gameFlowController.getOpponentInd()) {
    case 0:
        // If Gandhi is showing 
        // go to Picard:
        refsToElemsModule.divOfOpponents.className = ''
        refsToElemsModule.divOfOpponents.classList.add("opponentsDiv")
        refsToElemsModule.divOfOpponents.classList.add("picardShowsAfterGandhi")
        refsToElemsModule.divOfOpponents.classList.add("picardShows")
        gameFlowController.setOpponentInd(1)
        refsToElemsModule.opponentLegendP.innerHTML = gameFlowController.getOppLegends()[1]
      break;
    case 1:
  // If Picard is showing 
  // go to T1000:
  refsToElemsModule.divOfOpponents.className = ''
  refsToElemsModule.divOfOpponents.classList.add("opponentsDiv")
  refsToElemsModule.divOfOpponents.classList.add("tThousShowsAfterPicard")
  refsToElemsModule.divOfOpponents.classList.add("tThousShows")
  gameFlowController.setOpponentInd(2)
  refsToElemsModule.opponentLegendP.innerHTML = gameFlowController.getOppLegends()[2]
      break;
    case 2:
  // If T1000 is showing 
  // do nothing:
  
      break;
        
    default:
      break;
  } // end switch
  
                            } // end fn
refsToElemsModule.rightArrow.addEventListener('click', nextImage)
//----------
//--------
// 6) 
//------
// Now a pair of fns that do essentially
// the same thing  
// Code calls one at the end of the 
// callback that responds to the human's 
// click of a square.
// Code calls the other at the end of 
// the fn that plays the AI's turn.
// These fns remove from the array of 
// square refs the clicked on square's 
// ref or the ref of the square into which the AI has 
// just put an image of (eg) Gandhi 
// (actually ine each case it replaces the ref with a *).
// Remember that the array of square refs 
// contains references to squares that are 
// eligible for having their click handler
// added or removed (as happens at the 
// end of each turn, whether the AI's 
// or the human's)
let removeSquareRefHuman = function(target){
// 'this' below will be the square the user has clicked:      
  let dataNum = parseInt(target.dataset.number)  // eg "3" -> 3
  // Now replace that reference with a "*"
  refsToElemsModule.squareRefsArray[dataNum] = "*"  
  // Actually make the square not respond to a click:
  target.removeEventListener('click', clickInSquare)
                                     } // end fn

let removeSquareRefAI = function(row,col){
  // First actually make the square not respond to a click:
  refsToElemsModule.squareRefsArray[(row*3 + col)].removeEventListener('click', clickInSquare)
  // Now replace that reference with a "*"
  refsToElemsModule.squareRefsArray[(row*3 + col)] = "*"  
  
                                         } // end fn

// Now two fns that may replace the two above!
let removeSquareELhuman = function(target){
  let dataNum = parseInt(target.dataset.number)  // eg "3" -> 3
  // Now remove the event listener from the square:
  refsToElemsModule.squareRefsArray1[dataNum].removeEventListener('click', clickInSquare)
                                          } // end fn

let removeSquareELai = function(row, col){
  refsToElemsModule.squareRefsArray1[(row*3 + col)].removeEventListener('click', clickInSquare)
                                         } // end fn
                                         
// 
//----------

// Now two fns, each called by fn whoseTurn
// under different circumstances

// First the fn that re-adds the event listener to 
// all of the play squares that remain in the 
// array of references to the play squares:
let addPlaySquaresELs = function(){
// Give each square an event listener:
for (let i = 0; i < 9; i++) {
  if (refsToElemsModule.squareRefsArray[i] !== "*") {
    refsToElemsModule.squareRefsArray[i].addEventListener('click', clickInSquare)  
                                                    } // end if
                            } // end for
                                  } // end fn

// Now the fn that removes the event listener
// from the play squares in the array of references 
// to play squares:
let removePlaySquaresELs = function(){
// Remove each square's event listener:
for (let i = 0; i < 9; i++) {
  if (refsToElemsModule.squareRefsArray[i] !== "*") {
    refsToElemsModule.squareRefsArray[i].removeEventListener('click', clickInSquare)  
                                                    } // end if
                            } // end for
                                     } // end fn
//------------
// Now the callback for the event listener above.
// This fn has to:
// 1) Poll gameFlowController to find out whether it's
// the turn of noughts or crosses
// 2) If the current player is crosses
// put an X in the <p> in the square div
// clicked on.
// Act accordingly if it's noughts instead
// Also set the class of the <p> in the square
// appropriately 
// 3) Change gameFlowController.currentPlayer
// 4) Set gameboardArr and lineObject
// 5) Work out whether a player has won.
// If so, display winner and don't allow the
// game to continue. Set currentPlayer to "Game over"
// If no winner let the game go on by calling
// whoseTurn().
// 7) remove the square clicked on from 
// the array of squares eligible for 
// having the click event listener removed
// or added.
// 8) Toast the legend if the gameType is
// "playAI"
function clickInSquare(e){
// First two helper functions:
  function getRow(idString){
    // <p> has id, eg, "p0-0"
    let row = null
    row = idString.slice(1, 2)
    row = parseInt(row)
    return row
                           } // end fn

  function getCol(idString){
    // <p> has id, eg, "p0-0"
    let col = null
    col = idString.slice(3)
    col = parseInt(col)
    return col
                           } // end fn

  let row  = null
  let col  = null
  let symb = null
  let winner = null

  // 1):
  let currentPlayer = gameFlowController.getCurrentPlayer()
  // 2):
  // Check that there isn't already a nought or cross
  // in the square. (NOT ACTUALLY NEEDED!!!)
  // If not 
  // i) set row, col and symb appropriately 
  // depending on who the current player is. 
  // Code will after this switch statement 
  // use those values to update the gameboard and 
  // lineObject
  // ii)  Put an X or 0 in the square
    if (this.firstElementChild.innerHTML == "") { // If the square is empty
    switch(currentPlayer) {
      case "Crosses":
      // set the class of the <p>
      this.firstElementChild.className = ""
      this.firstElementChild.classList.add('cross');  
      // put an X in the <p>  
      this.firstElementChild.innerHTML = "X"
      // set row, col and symb:
      // <p> has id, eg, "p0-0"
      symb = "X"
      col = getCol(this.firstElementChild.id)
      row = getRow(this.firstElementChild.id)
      // 8) 
      if (gameFlowController.getGameType() == "playAI") {
        refsToElemsModule.opponentLegendP.innerHTML = ""
                                                        } // end if
        break;
      case "Noughts":
      // set the class of the <p>
      this.firstElementChild.className = ""
      this.firstElementChild.classList.add('nought');  
      // put an 0 in the <p>  
      this.firstElementChild.innerHTML = "0"
      // set row, col and symb:
      symb = "0"
      col = getCol(this.firstElementChild.id)// value same as above
      row = getRow(this.firstElementChild.id)// value same as above
        break;
      default:
        
                          } // end switch
  // 3): NO LONGER NEEDED
  // 4): 
//update gameboard and lineObject.
// This puts the appropriate symbol
// in the appropriate place in 
// gameboard and lineObject:
  AIfunctions.updateGBandLO(row, col, symb)
// No need to call the fn that updates the view 
// because the switch statement is where the 
// "X" or "0" gets put into the square
// in question 

// 7)
// Now remove the event listener from the 
// just-clicked square:
removeSquareELhuman(e.target)
                                                    } // end if square empty
 
gameFlowController.whoseTurn() 
  
                        } // end callback clickInSquare

//-----------
// For test purposes:
function clickInSquare1(e){
  // For test purposes:
    
} // end fn 


// The following line uses object destructuring:
return {addPlaySquaresELs, 
  removePlaySquaresELs, 
  removeSquareRefHuman, 
  removeSquareRefAI,
  removeSquareELai, 
  removeSquareELhuman,
  getShowDDlistOrNot,
  toggleShowDDlistOrNot,
  setShowDDlistOrNot
}

//--------------------

                                        })() // end module callbacksModule
  
// 

//-------------------------------------------------------  
//-------------------------------------------------------  

//    
// Now create a Gameboard module.
// It shouldn't have an uppercase letter
// but I don't want to bother to
// change it now!
// This will be a module that stores
// an array for the gameboard
let Gameboard = (function () {
let gameboardArr = [ 
["", "", ""], // top row
["", "", ""], // middle
["", "", ""]  // bottom
                   ] 
                   
// This function puts the noughts and crosses
// in the appropriate arrays 
// that represent the rows of the gameboard:
let setGameboard = function (row, col, symb){
  gameboardArr[row][col] = symb
                                            } // end changeGameboard

// This function simply returns gameboard
// array gameboardArr:
let getGameboard = function (){
  return gameboardArr
                              } // end changeGameboard

// use object deconstruction:
return {setGameboard, getGameboard}

                              })() // end Gameboard module
                              
//-----------------------------------------------------
//-----------------------------------------------------

// Now a module that contains AI fns:
let AIfunctions = (function () { // closed at line 1683
 
// An fn that looks at the gameboard and 
// 1) puts an X in those squares in the view 
// whose representions in the gameboard 
// array are "X"s
// 2) puts an image of the AI opponent  
// in those squares in the view whose
// representations in array gameboard
// are "0"s.
// In less unpleasant language:
// where array gameboard has an 
// array member that is an "X" put
// an X in the corresponding square in 
// the view. Where it has a member that
// is a "0" make the background image of
// the corresponding view square 
// the image of the AI opponent.  
// This fn takes as arg the gameboard 
// array 
let updateSquaresView = function(gameboardArray, AIpers) {
// Remember that gameboardArray is and array
// of three arrays
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    // JS arrays are passed by reference!
    if (gameboardArray[i][j] == "X") {
      let pRef = ("p".concat((i).toString()))    
      pRef = pRef.concat("-")
      pRef = pRef.concat((j).toString())
      // pRef is now, eg, "p2-1"
      document.getElementById(pRef).innerHTML = "X"
                                      } // end if
      if (gameboardArray[i][j] == "0") {
        let squareRef = ("s".concat((i).toString())).concat((j).toString())  
        // squareRef is now, eg, "s21"
        switch (AIpers) {
          case 0: // Gandhi
          document.getElementById(squareRef).style.backgroundImage = "url('./images/mG.jpg')";
            break;
             case 1: // Picard
            document.getElementById(squareRef).style.backgroundImage = "url('./images/jLp.jpg')";
              break;
               case 2: // T1000
              document.getElementById(squareRef).style.backgroundImage = "url('./images/tThous.jpg')";
                break;
           default:
            break;
                        } // end switch
                                        } // end if       
                              } // end inner for
                              } // end outer for
                                   } // end fn

//--------------------------------
// This fn puts the correct image in 
// the square at the given coords.
// This fn that takes two args:
// 1) coords for a square
// 2) the variable that tells code 
// who the AI personality is (0, 1 or 2)
let placeImage = function (coordsArr, AIpers) {
let row = coordsArr[0]
let col = coordsArr[1]
// Set the background image 
// in the square:
row = row.toString()
col = col.toString()
let el = "s" + row.concat(col)
switch (AIpers) {
  case 0: // Gandhi
  document.getElementById(el).style.backgroundImage = "url('./images/mG.jpg')";
    break;

    case 1: // Picard
    document.getElementById(el).style.backgroundImage = "url('./images/jLp.jpg')";
      break;

      case 2: // T1000
      document.getElementById(el).style.backgroundImage = "url('./images/tThous.jpg')";
        break;
    
  default:
    break;
                } // end switch
                                               } // end fn placeImage
//--------------

// Now an object that holds eight
// arrays, each representing a 
// line (eg key 'TH' is top horizontal).
// The first member of the array for
// each key is an array that contains 
// the actual values of the texts in
// the squares.
// The second member is an array that 
// contains arrays of two members.
// The second member array's members 
// represent indexes for a position in 
// gameboard. 
// Each member of the second member array 
// contains two number members, the 
// first member being the index of the 
// array in gameboard, the second being 
// the index of the place in that 
// array. ie the two numbers represent
// row and place.
// Code will update the values of 
// the properties of this object 
// as the human/AI places a 0 or a X: 
let lineObject = {
'TH': [ ["", "", ""], [[0, 0], [0, 1], [0, 2] ] ],
'MH': [ ["", "", ""], [[1, 0], [1, 1], [1, 2] ] ],
'BH': [ ["", "", ""], [[2, 0], [2, 1], [2, 2] ] ],
'LV': [ ["", "", ""], [[0, 0], [1, 0], [2, 0] ] ],
'MV': [ ["", "", ""], [[0, 1], [1, 1], [2, 1] ] ],
'RV': [ ["", "", ""], [[0, 2], [1, 2], [2, 2] ] ],
'LD': [ ["", "", ""], [[0, 0], [1, 1], [2, 2] ] ],
'RD': [ ["", "", ""], [[0, 2], [1, 1], [2, 0] ] ]
                 } // end obj
// Now a getter and a setter 
// for the properties of lineObject:
let getLineObjProp = function (prop){
return lineObject[prop]
                                    } // end fn

let setLineObjProp = function (prop, value){
lineObject[prop] = value
                                           } // end fn

// Now an fn that looks for a given 
// square in the properties of lineObject
// and sets the appropriate member of 
// the array of values to 
// the given symbol.
// This fn takes as args: 
// 1) an array of coords, eg [0,2]
// 2) a symbol
let setLineObjArrays = function (coords, symb) {
for (const property in lineObject) {
  for (let i = 0; i < 3; i++) {
    if (genMod.compareArrays(lineObject[property][1][i],coords)) {
      lineObject[property][0][i] = symb
                                                                 } // end if
                              } // end for  
                                   } // end for-in
                                               } // end fn
//--------------------------------------

// Now an fn to update the gameboard
// and lineObject:
let updateGBandLO = function (row, col, Xor0) {
  // Update the gameboard:
  Gameboard.setGameboard(row, col, Xor0)
  // Now update lineObject:
  setLineObjArrays([row, col], Xor0)
                                             } // end fn

//--------------------------------------
// Now a function that plays the game
// on behalf of the AI.
// The callback for the Select button's
// click listener is the first to call
// this fn.
// This fn:
// 1) Looks for empty spaces
// 2) Checks whether AI can win on next move (remember 
// the AI is always 0). If so
// i) puts a "0" in the winning square in 
// array gameboard and object lineObject. 
// 
// ii) update the view. 
// 3) Call the fn that draws a loop around winning line
// 4) If the AI's next move would NOT let AI win, call the fn
// that determines whether the human can win on his next move, ie 
// whether two Xs are in a line with an empty space. In that case 
// block the line. Then update lineObject and gameboardArr
// and update the view.
// 5) If neither the AI can win on next move nor there is an X line
// that has to be blocked by the AI call the fn that places a 
// Gandhi (eg) in a square, next to another Gandhi if possible.
// Update lineObject and array gameboardArr and update the view
// 6) Make the square no longer respond to a click
let AIplayGame = function (){  
  // Only do anything after a 0.7s delay
  // (hence all code below is surrounded 
  // by setTimeout()) to give the 
  // impression that the AI is thinking:
  setTimeout(function(){  

  let winOrNot = []
  let winOrNot1 = []
  let gameboard = Gameboard.getGameboard()
  let winner = null
  // Get the AI personality ("Gandhi"/"Picard"/"T1000"):
let AIopponent = gameFlowController.getOpponentInd()

// 1):
let emptySquaresArr = findEmptySquares()
// emptySquaresArr is now, eg, [ [0,0], [0,2], [2,1], [2,2] ]
// emptySpacesArr is now, eg, 
// [[0, 1], [1, 2], [2, 0], [2, 1]]

// 2):
// Remember that checkForWinLine determines
// whether the give n symbol can win. It 
//   returns [false, "ZZ"] if no win possible
//           [ true, "MV", [1, 2] ] if win possible.
// Can 0 win on next move?:
winOrNot = checkForWinLine(emptySquaresArr, "0")
switch (winOrNot[0]) {  
// 3)
  case true: // If 0 can win on 0's next move
// Put a "0" in the space concerned
// in gameboard and lineObject (ie play)
// the winning move:
updateGBandLO(winOrNot[2][0], winOrNot[2][1], "0")
// Now update the squares view:
updateSquaresView(gameboard, AIopponent)
// Remove even listener from all squares:
// TO COME
// 4): call fn that draws loop around winning line
// TO COME
// Call whoseTurn, which will prevent the game 
// from continuing among other things:
// Get the player object that represents
// the winner and increments its number of wins:
let zeroObjectKey = gameFlowController.getPlayer0()
      let zeroObj = gameFlowController.playerLibrary[zeroObjectKey]
      gameFlowController.displayWinner(winner)
      // fn above also toasts gameboard
// Update the winners drawer (the innerHTML of drawerDivPClass):
// TO COME      
gameFlowController.whoseTurn()
  break;

    case false:  // If 0 cannot win on 0's next move
    // check whether there are any lines with
    // two Xs and a space that obviously need to be 
    // blocked:
    winOrNot1 = checkForWinLine(emptySquaresArr, "X")
    
// 5)
    if (winOrNot1[0]) { // Yes X could win on human's next go
      // Put in a blocking 0:
      updateGBandLO(winOrNot1[2][0], winOrNot1[2][1], "0")
// Remove the event listener from the square:
callbacksModule.removeSquareELai(winOrNot1[2][0], winOrNot1[2][1])
      // Now update the squares view:
      updateSquaresView(gameboard, AIopponent)
      gameFlowController.whoseTurn()
                     } // end if
// 6) 
    if (!winOrNot1[0]) { // If neither 0 nor X can win on next go
      // Call the fn that puts a 0 in 
      // array gameboardArr, first 
      // looking for a place next to
      // another 0, otherwise randomly.
      // The following fn also updates
      // lineObject and array 
      // gameboardArray:
      whichSquare()
// Remove the square from the array of 
// references to squares eligible for 
// having the click event listener added or 
// removed:
      // Now update the squares view:
      updateSquaresView(gameboard, AIopponent)
      gameFlowController.whoseTurn()
                      } // end if             
    break;
  
  default:
    break;
                     } // end switch
                        }, 700); // End the settimeout function
                            } // end fn AIplayGame

//---------------
// Now an fn to determine whether the 
// human has the chance to win 
// on his/her next go. This fn must
// 1) determine whether there are 
// two Xs and one space in any line
// 2) If so, block the line with a 0
// and return [true, "Blocked"]
// 3) If not, return [false, "Play a zero"]

let isHumanAboutToWin = function (){



                                   } // end fn
                                  
//---------------
// Now an fn that creates an object that 
// contains key-value pairs that 
// represent lines that contain two spaces 
// and one symbol (nought or X):
let oneXor0TwoSpaces = function(Xor0){
 // lineObject contains key-value pairs such as
 // 'BH': [ ["", "", ""], [[2, 0], [2, 1], [2, 2] ] ]
 // ie bottom horizontal: array of values, array of coords.
 let clone = Object.assign({}, lineObject)
 let myObject = { }
 let spaceCounter = 0
 let zeroCounter  = 0
 for (const property in clone) { // loop thru clone
   // For each key-value pair
   clone[property][0].forEach(element => {
   // For each member of the array value of each key 
     if (element == "") {
       spaceCounter += 1
                        } // end if
if (element == Xor0) {
 zeroCounter += 1
                     }  // end if
// Following line shows counters are being set correctly:
                                       }); // end forEach
     if (spaceCounter == 2 && zeroCounter == 1 ) {
       let keyValuesIN = Object.values(myObject)
       myObject[property] = clone[property]
                                                 }  // end if         
         spaceCounter = 0 
         zeroCounter  = 0 
                                } // end for in
// myObject now contains only array properties
// (lines) that have one zero/X and two spaces, 
// eg 'BH': [ ["", "0", ""], [[2, 0], [2, 1], [2, 2] ] ] 
// or 'RV': [ ["X", "", ""], [[0, 2], [1, 2], [2, 2] ] ] 
return myObject
                              } // end fn one0TwoSpaces

//---------------
// Now an fn that creates an object that 
// contains key-value pairs that 
// represent lines that contain three spaces:
let threeSpaces = function(){
  // lineObject contains key-value pairs such as
  // 'BH': [ ["", "", ""], [[2, 0], [2, 1], [2, 2] ] ]
  // ie bottom horizontal: array of values, array of coords.
  let clone = Object.assign({}, lineObject)
  let myObject = { }
  let spaceCounter = 0
  let zeroCounter  = 0
  for (const property in clone) { // loop thru clone
    // For each key-value pair
    clone[property][0].forEach(element => {
    // For each member of the array value of each key 
      if (element == "") {
        spaceCounter += 1
                         } // end if

 // Following line shows counters are being set correctly:
                                         }); // end forEach
      if (spaceCounter == 3 ) {
        let keyValuesIN = Object.values(myObject)
        myObject[property] = clone[property]
                              }  // end if         
          spaceCounter = 0 
                                 } // end for in
 // myObject now contains only array properties
 // (lines) that have three spaces, eg
 //    'TH': [ ["", "", ""], [[0, 0], [0, 1], [0, 2] ] ]
 // or 'RV': [ ["", "", ""], [[0, 2], [1, 2], [2, 2] ] ] 
 return myObject
                                   } // end fn threeSpaces
//---------------
// Now an fn to determine which square
// the AI should now play. Code calls this 
// function during the play of the AI
// and after it has determined that there
// are no spaces it can put a 0 in to win
// and that there are no X lines to block
// to prevent X from winning.
//This fn must 
// 1) Determine whether any of the 
// eight lines contain
// i)   two blank squares
// and one with a zero in it
// ii) three blank squares
// 2) If i), put a 0 next to the existing 
// zero in one of those lines, its 
// position randomly chosen (ie one side 
// or the other), choosing the line randomly.
// Then update gameboardArr and 
// lineObject and make square unclickable
// If 1) ii) put a 0 in a 
// randomly chosen square of the three
// then update gameboardArr and 
// lineObject and make square unclickable
// 3) If neither 1) i) nor 1) ii) put 
// a 0 in any empty space then update 
// gameboardArr and lineObject and make
// square unclickable

let whichSquare = function (){
let myKey = null
let randNum = null  
let AIpers = gameFlowController.getOpponentInd()
let row = null
let col = null
 // Create two objects:
 // i)    one that contains only array
 // properties (from the 8 possible 
 // lines) that have one zero and 
 // two spaces
 // ii)  one that contains only array
 // properties (lines) that have 
 // three spaces:
 let myObject0twoSpaces = Object.assign({}, oneXor0TwoSpaces("0"))
 // myObject0twoSpaces now looks like this (eg):
 // {
 // "LV": [["0", "", ""],[[0,0],[0,1],[0,2]] ], 
 // "RV": [["", "", "0"],
 // "RD": lalala 
 // }
 let myObject3Spaces    = Object.assign({}, threeSpaces())
 // myObject3Spaces now looks like this (eg):
 // {
 // "LV": [["", "", ""],[[0,0],[0,1],[0,2]] ], 
 // "RV": [["", "", ""],lalala
 // "RD": [["", "", ""],lalala
 // }
 
 // Now create variables that hold 
 // the value of the length of the 
 // objects just created (ie the number of keys):
let myObject0twoSpacesPropsNo = Object.keys(myObject0twoSpaces).length
let myObject3SpacesPropsNo    = Object.keys(myObject3Spaces).length 
// let myObjectXtwoSpacesPropsNo       = Object.keys(myObjectX).length

// If there is at least one line 
// that contains a zero and two spaces:
 if (myObject0twoSpacesPropsNo > 0) {
// 2)
// Now put a 0 in one of the free spaces
// in one of those lines (both picked randomly).
// First generate a random number from 0 to 
// (num of lines with 0&2spaces)-1. Then 
// get the key of the property at that 
// index in myObject0twoSpaces. Then get the 
// array at that key:
randNum = genMod.getRandomInt(myObject0twoSpacesPropsNo)
// Now get a property at a randomly
// selected key of myObject0twoSpacesPropsNo:
myKey   = Object.keys(myObject0twoSpaces)[randNum]
// myKey now contains the key name, eg "LV"
let myArray = myObject0twoSpaces[myKey]
// myArray is now, eg, [["0", "", ""],[[0,0],[0,1],[0,2]] ]
let myArray1 = []
let mySpaceIndex = 0
// Now pick one of the two vacant spaces at random:
for (let i = 0; i < myArray[0].length; i++) {
  if (myArray[0][i] == "") {
    myArray1.push(i)
                           } // end if
                                            } // end for
  // Now pick one of those spaces randomly:
  randNum = genMod.getRandomInt(2)
  // Now randNum is either 0 or 1
  mySpaceIndex = myArray1[randNum]
// Now update lineObject and 
// the gameboard array:
// First get the coords of the square
// just chosen randomly:
let rowColArr = null
rowColArr     = lineObject[myKey][1][mySpaceIndex]
// rowColArr is now, eg, [2,1]
// Now update the gameboard, lineObject
// and the view and make the square unclickable:
row = rowColArr[0]
col = rowColArr[1]
updateGBandLO(row, col, "0")
updateSquaresView(Gameboard.getGameboard(), AIpers) 
callbacksModule.removeSquareELai(row,col)
                                          } // end if myObject0twoSpacesPropsNo > 0
// But if there are no 
// lines with a zero and two 
// spaces:
if(myObject0twoSpacesPropsNo == 0) { 
// Find lines with three spaces:
if (myObject3SpacesPropsNo > 0) { // if there are lines with 
                                  // three spaces 
// Put a nought in one of the spaces
// in one of the lines
randNum = genMod.getRandomInt(myObject3SpacesPropsNo)
myKey = Object.keys(myObject3Spaces)[randNum]
// myKey now contains the key name, eg "LV".
// Now generate randomly a number
// that is either 0, 1 or 2:
randNum = genMod.getRandomInt(3)
// Remember that myObject3Spaces
// contains array properties, each 
// an array of arrays. The [1] array
// of that array of arrays is, in the
// case of all of the properties
// an array of arraysof coords, hence:
row = myObject3Spaces[myKey][1][randNum][0]
col = myObject3Spaces[myKey][1][randNum][1]
// Now update gameboard and lineObject
// and make square unclickable:
updateGBandLO(row, col, "0")
updateSquaresView(Gameboard.getGameboard(), AIpers) 
// callbacksModule.removeSquareRefAI(row,col)
callbacksModule.removeSquareELai(row,col)
// Now hand play to the human:
                                 } else { // if no lines with three spaces
                                          // AND no lines with two spaces & one 0
// But if there are no lines with 
// a 0 and two spaces AND no lines 
// with three spaces, get the empty spaces, 
// pick one at random and put a 0 in 
// it:
let myArray2 = findEmptySquares()
// findEmptySquares returns, eg, [ [0,0], [0,2], [2,1], [2,2] ]
// If there are empty spaces:
if (myArray2.length > 0){
// Pick one of the members of 
// myArray2 at random:
randNum = genMod.getRandomInt(myArray2.length)
let myCoords = myArray2[randNum]
// So array myCoords is now, eg, [0,2]
// Now update gameboard and lineObject
// (by putting "0" in the square indicated
// by myCoords) and update the view. Then 
// remove the reference to that square 
// from the square reference array 
// and add the click event listener 
// to the remaining square refs in 
// that array:
row = myCoords[0]
col = myCoords[1]
updateGBandLO(row, col, "0")
updateSquaresView(Gameboard.getGameboard(), AIpers) 
// callbacksModule.removeSquareRefAI(row,col)
callbacksModule.removeSquareELai(row,col)
                        } // end if
                                        } // end if there are lines with three spaces
                                   } // end if no lines with a 0 and 2 spaces
                              } // end fn whichSquare

//---------------
// Now an fn to 
// find empty squares (ie ones 
// that have not been played).
// This fn returns an array whose
// members show where the empty
// spaces are, eg it returns 
// [ [0,0], [0,2], [2,1], [2,2] ].
// Remember that gameboardArr is an 
// array of arrays and represents
// ing the gameboard like this:
// [
// ["0", "X", "X"],
// ["",  "",   ""],
// ["0", "",  "X"]
// ]:
let findEmptySquares = function(){
  let myArray = [ ]
  let emptySpacesArr = []
  let intermArr = Gameboard.getGameboard()
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (intermArr[i][j] == "") {
        myArray= [i,j]
        emptySpacesArr.push(myArray)
                                  } // end if
      
                                } // end inner for
                              } // end outer for
// emptySpacesArr is now, eg, 
// [[0, 1], [1, 2], [2, 0], [2, 1]]                              
return emptySpacesArr
                                 } // end fn
//------------
// Now an fn that determines whether
// code can fill an empty space to
// make a winning line (either for 
// the AI player or the human):
// This fn takes as args
// i)   the array of empty spaces (which
//      is, eg, [[0, 1], [1, 2], [2, 0], [2, 1]])
//      where [0, 1] means first row, second char.
// ii)  "X" or "0" depending on whether 
//      code wants to find out whether there's
//      the potential for X to win or 0 to 
//      win.
// This fn returns 
let checkForWinLine = function (arr,Xor0) {
  // Don't remove the line below!
  let winOrNotArr = [ ]
  for (let k = 0; k < arr.length; k++) {
  // arr[k] is an array, eg, [1,2]. 
  // Run the function in object 
  // functionsObj at key, eg, "12" (using
  // sq brack  format -- myObject["myKey"]. 
  // The fn below will return, eg, 
  // return [true, "TH"] when it has 
  // created a winning line.
  // Remember functionsObj is an obj
  // that looks like this:
  // {'00': function00, etc}
  let myMember0 = arr[k][0]
  myMember0 = myMember0.toString()
  let myMember1 = arr[k][1] 
  myMember1 = myMember1.toString()
  let fnVar = myMember0.concat(myMember1)
  // fnVar is now, eg, "12".
  // Remember that fn functionsObj[fnVar](Xor0)
  // returns either 
  // [false, "ZZ"] or 
  // [true, "MV", [1,1]] 
  winOrNotArr = functionsObj[fnVar](Xor0)
  // If Xor0 can win, jump out of the loop:
  if (winOrNotArr[0]) {
// Jump out of the loop:
    break
                      } // end if
                                       } // end for
return winOrNotArr
                                         } // end fn
//------------
// Now nine functions, each of which 
// looks at the spaces on either
// side of an empty space and if
// both of those squares have 
// the given symbol in them 
// the fn returns, eg, [true, "BH"]. 
// Each of these fns take one arg,
// "X" or "0". 
// Code calls "functionXY" when
// the empty space is at X,Y --
// eg code calls function12 when 
// the empty space is the third 
// square in the middle row.
// When there's a winning line 
// these functions return, eg, 
// [true, "BH"], where member[1] 
// is one of the folllowing:
// "TH" -- top horizontal
// "MH" -- middle horizontal
// "BH" -- bottom horizontal
// "LV" -- left vertical
// "MV" -- middle vertical
// "RV" -- right vertical
// "LD" -- left diagonal
// "RD" -- right diagonal.
// If no wining line these 
// fns return [false, "ZZ"]
let function00 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[0][1] == Xor0 &&
    arr[0][2] == Xor0 
    ) {
      
      return [true, "TH", [0,0]]
      } // end if

if (
  arr[1][0] == Xor0 &&
  arr[2][0] == Xor0 
  ) {
    
    return [true, "LV", [0,0]]
    } // end if

if (
  arr[1][1] == Xor0 &&
  arr[2][2] == Xor0 
  ) {
    
    return [true, "LD", [0,0]]
    } // end if
    return [false, "ZZ"]    
                           } // end function00

let function01 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[0][0] == Xor0 &&
    arr[0][2] == Xor0 
    ) {
      
      return [true, "TH", [0,1]]
      } // end if

  if (
    arr[1][1] == Xor0 &&
    arr[2][1] == Xor0 
    ) {
      
      return [true, "MV", [0,1]]
      } // end if
      return [false, "ZZ"]
                           } // end function01

let function02 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[0][0] == Xor0 &&
    arr[0][1] == Xor0 
    ) {
      
      return [true, "TH", [0,2]]
      } // end if

  if (
    arr[1][1] == Xor0 &&
    arr[2][0] == Xor0 
    ) {
      
      return [true, "RD", [0,2]]
      } // end if      

if (
    arr[1][2] == Xor0 &&
    arr[2][2] == Xor0 
    ) {
      
      return [true, "RV", [0,2]]
      } // end if
      return [false, "ZZ"]      
                           } // end function02
                           
let function10 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[1][1] == Xor0 &&
    arr[1][2] == Xor0 
    ) {
      
      return [true, "MH", [1,0]]
      } // end if  

if (
    arr[0][0] == Xor0 &&
    arr[2][0] == Xor0 
    ) {
      
      return [true, "LV", [1,0]]
      } // end if        
      return [false, "ZZ"]      
                           } // end function10

let function11 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[0][0] == Xor0 &&
    arr[2][2] == Xor0 
    ) {
      
      return [true, "LD", [1,1]]
      } // end if  

  if (
    arr[0][1] == Xor0 &&
    arr[2][1] == Xor0 
    ) {
      
      return [true, "MV", [1,1]]
      } // end if        

  if (
    arr[0][2] == Xor0 &&
    arr[2][0] == Xor0 
    ) {
      
      return [true, "RD", [1,1]]
      } // end if  
      
  if (
    arr[1][0] == Xor0 &&
    arr[1][2] == Xor0 
    ) {
      
      return [true, "MH", [1,1]]
      } // end if        
      return [false, "ZZ"]
                           } // end function11

let function12 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[0][2] == Xor0 &&
    arr[2][2] == Xor0 
    ) {
      
      return [true, "RV", [1,2]]
      } // end if  

  if (
    arr[1][0] == Xor0 &&
    arr[1][1] == Xor0 
    ) {
      
      return [true, "MH", [1,2]]
      } // end if        
      return [false, "ZZ"]
                           } // end function12
                           
let function20 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[0][0] == Xor0 &&
    arr[1][0] == "0" 
    ) {
      
      return [true, "LV", [2,0]]
      } // end if  

  if (
    arr[1][1] == Xor0 &&
    arr[0][2] == Xor0 
    ) {
      
      return [true, "RD", [2,0]]
      } // end if  

  if (
    arr[2][1] == Xor0 &&
    arr[2][2] == Xor0 
    ) {
      
      return [true, "BH", [2,0]]
      } // end if  
      return [false, "ZZ"]
                           } // end function20
                           
let function21 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[0][1] == Xor0 &&
    arr[1][1] == Xor0 
    ) {
      
      return [true, "MV", [2,1]]
      } // end if  

  if (
    arr[2][0] == Xor0 &&
    arr[2][2] == Xor0 
    ) {
      
      return [true, "BH", [2,1]]
      } // end if  
      return [false, "ZZ"]
                           } // end function21
  
// Code calls the following fn when here's an empty 
// space at 2,2
let function22 = function(Xor0){
  let arr = Gameboard.getGameboard()
  if (
    arr[0][2] == Xor0 &&
    arr[1][2] == Xor0 
    ) {
      
      return [true, "RV", [2,2]]
      } // end if  

if (
    arr[0][0] == Xor0 &&
    arr[1][1] == Xor0 
    ) {
      
      return [true, "LD", [2,2]]
      } // end if  

if (
    arr[2][0] == Xor0 &&
    arr[2][1] == Xor0 
    ) {
      
      return [true, "BH", [2,2]]
      } // end if  
// If there are no winning lines
// return this:      
return [false, "ZZ"]
                           } // end function22

//------------
// Now an object that contains 
// key-value pairs. A key has this 
// form: "02" and the values are fns
// found in this module.
// Fn checkForWinLine of this module
// looks at this object to determine which
// fn it should call:
// REMEMBER: Object literal property 
// names have to be strings
let functionsObj = {
  '00': function00,
  '01': function01,
  '02': function02,
  '10': function10,
  '11': function11,
  '12': function12,
  '20': function20,
  '21': function21,
  '22': function22
                    } // end fnobj
  
  
// The following line uses object deconstruction:
return {functionsObj, whichSquare, AIplayGame, placeImage, updateGBandLO}



                                })() //end module AIfunctions

//-----------------------------------------------------
//-----------------------------------------------------

// Now a module that contains 
// some general fns and globally 
// available variables, etc: 
let genMod = (function (){  // ends line 3334
// Now variables that fns such as callback 
// acceptUserInputs read and maybe set:

  let noBlanksX = false
  let noBlanks0 = false
  let diffNames = false  
  let newNameX  = false
  let newName0  = false

// Now getters and setters for 
// the variables above:

let getNoBlanksX = function(){
  return noBlanksX
                             }

let setNoBlanksX = function(veracity){
  noBlanksX = veracity
                                     }

//--

let getNoBlanks0 = function(){
  return noBlanks0
                             }

let setNoBlanks0 = function(veracity){
  noBlanks0 = veracity
                                     }

//--

let getDiffNames = function(){
  return diffNames
                             }

let setDiffNames = function(veracity){
  diffNames = veracity
                                     }

//--

let getNewNameX = function(){
  return newNameX
                             }

let setNewNameX = function(veracity){
  newNameX = veracity
                                     }

//--

let getNewName0 = function(){
  return newName0
                             }

let setNewName0 = function(veracity){
  newName0 = veracity
                                     }


//-------------------------------------
// The following four variables 
// show which inputs are active.
// The callack acceptUserInputs
// looks at these and the callbacks 
// for clicking in the inputs 
// set them:
let xTypeInInput      = true
let xDDlistInput      = false
let zeroTypeInInput   = true
let zeroDDlistInput   = false

let toggleXtypeInInput = function(){
  xTypeInInput = !xTypeInInput
                                   } // end fn
let getXtypeInInput = function(){
return xTypeInInput
                                } // end fn

let setXtypeInInput = function(veracity){
xTypeInInput = veracity
                                        } // end fn

//--
let toggleXddListInput = function(){
  xDDlistInput = !xDDlistInput
                                   } // end fn
let getXddListInput = function(){
return xDDlistInput
                                } // end fn

let setXddListInput = function(veracity){
  xDDlistInput = veracity
                                        } // end fn
//--
let toggleZeroTypeInInput = function(){
  zeroTypeInInput = !zeroTypeInInput
                                      } // end fn
let getZeroTypeInInput = function(){
return zeroTypeInInput
                                   } // end fn

let setZeroTypeInInput = function(veracity){
  zeroTypeInInput = veracity
                                           } // end fn
//--
let toggleZeroDDlistInput = function(){
  zeroDDlistInput = !zeroDDlistInput
                                      } // end fn
let getZeroDDlistInput = function(){
return zeroDDlistInput
                                   } // end fn

let setZeroDDlistInput = function(veracity){
  zeroDDlistInput = veracity
                                           } // end fn
//----
// The following fn is straight from MDN.
// If max is 3 it returns 0, 1 or 2:
  let getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
                                    } // end fn

//-------------
// The following fn looks at the 
// members of one array and 
// determines whether they are 
// the same as the corresponding 
// members of a second array.
// This fn assumes both arrays 
// have the same number of 
// members. It takes two args,
// the arrays.
// This fn returns true/false:
let compareArrays = function(arr1,arr2){
  for (let i = 0; i < arr1.length; i++) {
  if (arr1[i] !== arr2[i]) {
    return false
                           } // end if
                                        } // end for
    return true  
                                       } // end fn
//--------
// Now an fn that checks for whether
// an input is all blanks. This fn
// takes a string as arg and returns
// true if input is all blank or 
// false if input is NOT all blank
let whetherAllBlank = function(inp){
  if (
    inp === "     " || // five spaces
    inp === "    " || // four spaces
    inp === "   " || // three spaces
    inp === "  " || // two spaces
    inp === " " || // one space
    inp === ""     // no text
     ) 
  { 
    return true
  } // end if
  return false                
                                   } // end fn

//-------
// Now an fn to check whether the player library 
// already contains a player object of the name
// the user has typed in the input.
// This fn must:
// 1) take as arg what the user typed into an input
// 2) check whether a key of that name exists in
// the player library object.
// 3) return true if the name already exists, false otherwise:
let whetherPlayerExists = function(inp){
  // If there's no object (in the library) corresponding to that key
  if (typeof(gameFlowController.playerLibrary[inp]) !== "object") {
    // If an object under the given key does NOT exist in the library:  
    return true
                                                                  } // end if
  return false
                                       } // end fn

//--------

// Now an fn to show the dialog box for 
// a few seconds.
// This fn takes as args the text that will
// appear in the box and the interval in ms:
let showDialogBox = function(text, interv){
  refsToElemsModule.dialogBoxID.style.display = "flex" 
  refsToElemsModule.dialogBoxPClass.innerHTML = text
  setTimeout(function(){  
    refsToElemsModule.dialogBoxID.style.display = "none"
                       }, interv)
  
                                          } // end fn 

// Now an fn to show the dialog box for 
// a few seconds.
// This fn takes as args the text that will
// appear in the box and the interval in ms:
let showDialogBoxDismiss = function(text){
  refsToElemsModule.dialogBoxID.style.display = "flex" 
  refsToElemsModule.dialogBoxPClass.innerHTML = text
                                                  } // end fn 

//--------
// The following line employs object deconstruction:
return {
  getRandomInt, 
  compareArrays, 
  showDialogBox,
  whetherAllBlank, 
  whetherPlayerExists,
  showDialogBoxDismiss,
  toggleXtypeInInput,
getXtypeInInput,
setXtypeInInput,
toggleXddListInput,
getXddListInput,
setXddListInput,
toggleZeroTypeInInput,
getZeroTypeInInput,
setZeroTypeInInput,
toggleZeroDDlistInput,
getZeroDDlistInput,
setZeroDDlistInput,
getNoBlanksX,
setNoBlanksX,
getNoBlanks0,
setNoBlanks0,
getDiffNames,
setDiffNames,
getNewNameX,
setNewNameX,
getNewName0,
setNewName0
       }
                         } )() // end module genMod -- begins line 3105

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------














// DON'T CODE BENEATH THIS LINE
// EXCEPT FOR STUFF YOU WANT TO TEST IN 
// CHROME CONSOLE 
//-------------------------------------------------------




 } // end init function

 window.onload = init;


 


// BENEATH THIS LINE IS STUFF THAT 
// CAN BE TESTED YOU WANT TO TEST IN 
// CHROME CONSOLE 
//-------------------------------------------------------

/*
How this app works
==================
A) User clicks the button that reads "Play the AI"
1) certain elements vanish.
left and right arrows appear, as does the "Select" button,
a window for an image of the AI personality and a 
div for the legend.
2) Use hits the arrows to select an AI personality.
The legend changes as does the image in the small
square window.
3) User hits "Select" button
The button's click event listener calls 
function startGame 
4) startGame makes the arrows, etc disappear.
The div containing the legend stays.
startGame polls the gameFlowController for the 
variable that tells code which AI personality 
the user has chosen.
startGame puts text "*AI personality* goes first " in 
the legend div.
After a delay startGame calls fn AIplayGame 
of module AIfunctions to kick the game off.
5) Function AIplayGame
1) Looks for empty spaces
2) Checks whether AI can win 
on next move.
3) If so, puts Gandhi (eg) in that 
empty square then calls the fn that 
draws a loop around winning line
4) If no winning line, calls the fn
that determines whether the human
can win on his next move, ie 
whether two Xs are in a line with 
an empty space. In that case this fn
blocks that line.
5) If none of the above applies 
call the fn that places a 
Gandhi (eg) in a square 

*/

  









