const readline = require('readline-sync');
const choices = ['rock','paper','scissors','lizard','spock'];

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
      this.moveHistory.push(choices[randomIndex]);
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        choice = readline.question(`Please choose ${this.joinOr(choices)}: `);
        if (choices.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
      this.moveHistory.push(choice);
    },

    joinOr(array) {
      return array.slice(0,array.length - 1).join(', ') + ', or ' + array.slice(-1);
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createPlayer() {
  return {
    move: null,
    score: 0,
    moveHistory: [],

    updateScore() {
      this.score += 1;
    },
  };
}

const RPSGame = {

  MAX_SCORE: 5,
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log(`Welcome to ${choices.map(element => element[0].toUpperCase() + element.slice(1)).join(', ')}! Get to ${this.MAX_SCORE} points first!`);
  },

  displayGoodbyeMessage() {
    console.log(`Thank you for playing ${choices.map(element => element[0].toUpperCase() + element.slice(1)).join(', ')}. See you soon!`);
  },

  displayGameWinner() {
    console.log(`${this.human.score === this.MAX_SCORE ? 'You' : 'The computer'} reached the maximum score of ${this.MAX_SCORE}!`);
  },

  displayWinner() {
    console.clear();
    const WINNING_COMBINATIONS = {rock: ['lizard','scissors'], paper: ['spock','rock'], scissors: ['paper','lizard'],
                                  spock: ['rock','scissors'], lizard: ['spock','paper']};

    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (WINNING_COMBINATIONS[humanMove].includes(computerMove)) {
      this.human.updateScore();
      console.log('You win the round!');
    } else if (WINNING_COMBINATIONS[computerMove].includes(humanMove)) {
      this.computer.updateScore();
      console.log('Computer wins the round!');
    } else {
      console.log("It's a tie");
    }
    console.log(`You have ${this.human.score} point(s) and the computer has ${this.computer.score} point(s).`);
  },

  playAgain() {
    let answer = readline.question('Would you like to play again? (y/n): ');
    return answer.toLowerCase()[0] === 'y';
  },

  resetGame() {
    this.human.score = 0;
    this.computer.score = 0;
  },

  displayMoveHistory() {
    console.log(`You chose the following moves: ${this.human.moveHistory.join(', ')}.`)
    console.log(`The computer chose the following moves: ${this.computer.moveHistory.join(', ')}.`)
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (this.human.score < this.MAX_SCORE &&
          this.computer.score < this.MAX_SCORE) continue;
      this.displayGameWinner();
      if (!this.playAgain()) break;
      this.resetGame();
    }

    this.displayMoveHistory();
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
