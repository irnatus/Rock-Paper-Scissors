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
function playRound(playerSelection, computerSelection){
  if(playerSelection === computerSelection){
    return 2;
  } 
  switch(playerSelection.toLowerCase()){
    case "rock": 
      return computerSelection === "scissors" ? 1 : 0;
    case "paper":
      return computerSelection ==="rock" ? 1 : 0;
    case "scissors":
      return computerSelection ==="paper" ? 1 : 0;
  }
}

//check to make sure no mistaken inputs.
function checkProperInput(playerSelection){
  if (playerSelection.toLowerCase() == "rock" ||
    playerSelection.toLowerCase() == "paper"||
    playerSelection.toLowerCase() == "scissors"){
      return true; 
    }
  else {
    return false;
  }
}

function game(){ 
  //setting scores to zero;
  let rounds = 0;
  let wins = 0;
  let losses = 0;
  
  //playing best outta 5 
  while (rounds != 5){
    //choosing rock paper or scissors
    let computerSelection = computerPlay();
    let playerSelection = window.prompt("Choose rock, paper, or scissors.");
    if (checkProperInput(playerSelection) == false){
      playerSelection = window.prompt("Improper selection, please try again. Choose rock, paper, or scissors.")
    }
  
    //messages to tell results
    let winRoundMess = `You win! ${playerSelection} beats ${computerSelection}`
    let loseRoundMess = `You lose! ${computerSelection} beats ${playerSelection}`
    let tieRoundMess = `It's a tie! The computer also chose ${computerSelection}`
    
    //play round
    switch (playRound(playerSelection, computerSelection)){
      case 0: 
        console.log(loseRoundMess);
        losses++; 
        break;
      case 1:
        console.log(winRoundMess);
        wins++;
        break;
      case 2:
        console.log(tieRoundMess);
        break;
    } 
    console.log(`The current score is ${wins} to ${losses}`)
    rounds++; 
  }
  
  //notifying final results
  let scoreMess = `You won ${wins} times and the computer won ${losses} times.`
  if(wins === losses){
    console.log(`${scoreMess} It's a tie!`);
  } else if(wins > losses){
    console.log(`${scoreMess} You win the best of 5!`);
  } else {
    console.log(`${scoreMess} You lost the best of 5...`); 
  }
}