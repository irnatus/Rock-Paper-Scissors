//initializing playerScore element to display
const playerScoreDiv = document.querySelector('#player-score');
const playerScore = document.createElement('p');
playerScore.textContent = 0;
playerScore.style.marginTop = "10px";
playerScore.style.fontSize = "36px";
playerScoreDiv.appendChild(playerScore);
let playerWins = 0;

//initializing computerScore element to display
const computerScoreDiv = document.querySelector('#computer-score');
const computerScore = document.createElement('p');
computerScore.textContent = 0;
computerScore.style.marginTop= "10px";
computerScore.style.fontSize = "36px";
computerScoreDiv.appendChild(computerScore);
let compWins = 0;

const infoBoard = document.querySelector('#info-board');
const resetButtonContainer = document.querySelector('#reset-button-container');
const resetButton = document.createElement('button');
const choiceButtons = document.querySelectorAll('.choice');

choiceButtons.forEach((button) => {
  button.addEventListener('click', playRound);
});

function computerPlay(){
  switch(Math.floor(Math.random() * 3)){
    case 0: 
      return "rock";
    case 1:
      return "paper";
    case 2: 
      return "scissors";
  }
}

//return 0 for lose, 1 for win, 2 for tie
function playRound(e){
  let playerSelection = e.target.id.toString();
  let computerSelection = computerPlay();
  if(playerSelection === computerSelection){
    result = 2;
  } 
  else {
    switch(playerSelection){
    case "rock": 
      result = computerSelection === "scissors" ? 1 : 0;
      break;
    case "paper":
      result = computerSelection ==="rock" ? 1 : 0;
      break;
    case "scissors":
      result = computerSelection ==="paper" ? 1 : 0; 
      break;
    }
  }
  logResults(result, playerSelection, computerSelection);
  updateScore();
  if(checkWin5()){
    endGame();
  }
}

//output result of the round into gamelog
function logResults(result, playerSelection, computerSelection){
  let log = document.createElement('p')
  log.style.margin ="0px";
  switch(result){
    case 0: 
      log.textContent = `You lose the round! ${computerSelection} beats ${playerSelection}.`;
      compWins++;
      break;
    case 1:
      log.textContent = `You win the round! ${playerSelection} beats ${computerSelection}.`;
      playerWins++;
      break;
    case 2:
      log.textContent = `It's a tie! The computer also chose ${computerSelection}.`;
      break;
  }
  infoBoard.appendChild(log);
}

function updateScore(){
  playerScore.textContent = playerWins;
  computerScore.textContent = compWins;
}

function checkWin5(){
  let log = document.createElement('p');
  log.style.margin ="0px";
  if(playerWins === 5){
    log.textContent = "Congratulations you beat the computer 5 times!";
    infoBoard.appendChild(log);
    return true;
  }else if (compWins === 5){
    log.textContent = "Sorry, the computer beat you 5 times! Please try again!";
    infoBoard.appendChild(log);
    return true;
  }
  else{
    return false;
  }
}

function reset(){
  playerWins = 0;
  compWins = 0;
  updateScore();
  clearInfoBoard(infoBoard);
  choiceButtons.forEach((button) => {
    button.addEventListener('click', playRound);
  });
  resetButtonContainer.removeChild(resetButton);
}

function clearInfoBoard(parent){
  while(parent.childElementCount !== 1){
    parent.removeChild(parent.lastChild);
  }
}

function endGame(){
  choiceButtons.forEach((button) => {
    button.removeEventListener('click', playRound);
  });
  resetButton.textContent = 'Press to reset';
  resetButton.style.padding = '16px';
  resetButton.style.marginBottom = '16px';
  resetButtonContainer.appendChild(resetButton);
  resetButton.addEventListener("click", reset);
}