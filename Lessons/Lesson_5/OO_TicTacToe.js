// Tic Tac Toe is a 2 player game
// The board is a 3 by 3
// Players take turn by marking an available square with their marker
// The player to go first has an X whereas the second player has an O
// First player to have a row, a column or a diagonal wins

const readline = require('readline-sync');
const BOARD_LENGTH = 9;
const WINNING_PAIRS = [[0,1,2], [3,4,5], [6,7,8],
                       [0,3,6], [1,4,7], [2,5,8],
                       [0,4,8], [2,4,6]];

class Board {
  constructor() {
    this.board = ' '.repeat(BOARD_LENGTH).split('');
  }

  updateBoard(choice, marker) {
    this.board[choice] = marker;
  }

  logBoard() {
    console.log('');
    console.log('     |     |');
    console.log(`  ${this.board[0]}  |  ${this.board[1]}  |  ${this.board[2]}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${this.board[3]}  |  ${this.board[4]}  |  ${this.board[5]}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${this.board[6]}  |  ${this.board[7]}  |  ${this.board[8]}`);
    console.log('     |     |');
    console.log('');
  }
}

class AvailableSpots extends Board {
  constructor() {
    super();
  }

  initializeChoices() {
    for (let i = 1; i <= BOARD_LENGTH; i++) {
      this.board[i - 1] = i;
    }
  }

}

class Human {
  constructor() {
    this.marker = 'X';
    this.currentChoice = null;
  }

  chooseSpot(board) {
    let selection = Number(readline.question('Choose a spot from the available slots shown above to put your marker in: '));
    while (!(board.includes(selection) && selection !== ' ')) {
      selection = Number(readline.question('Make sure to select a number from the board shown above. Try again: '));
    }
    this.currentChoice = selection - 1;
  }
}

class Computer {
  constructor() {
    this.marker = 'O';
    this.currentChoice = null;
  }

  chooseSpot(availableSpots, gameBoard, checkWinner) {
    let chooseFrom = availableSpots.filter(element => element !== ' ');
    let selection = chooseFrom[Math.floor(Math.random() * chooseFrom.length)] - 1;

    for (let i = 0; i < chooseFrom.length; i++) {
      let newGameBoard = gameBoard.slice();
      newGameBoard[chooseFrom[i] - 1] = 'X';
      if (checkWinner(newGameBoard)) {
        selection = chooseFrom[i] - 1;
        break;
      }
    }

    for (let i = 0; i < chooseFrom.length; i++) {
      let newGameBoard = gameBoard.slice();
      newGameBoard[chooseFrom[i] - 1] = 'O';
      if (checkWinner(newGameBoard)) {
        selection = chooseFrom[i] - 1;
        break;
      }
    }

    this.currentChoice = selection;

  }
}

class TTTGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
    this.gameBoard = new Board();
    this.availableSlots = new AvailableSpots();
    this.winner = null;
  }

  displayWelcomeMessage() {
    console.log('Welcome to Tic Tac Toe! You will have the X marker and the computer will have the O marker. Good Luck!');
  }

  displayGoodbyeMessage() {
    console.log('Thank you for playing Tic Tac Toe. We hope to see you again in the near future!');
  }

  checkWinner(gameBoard) {
    for (let i = 0; i < WINNING_PAIRS.length; i++) {
      let currentSlots = WINNING_PAIRS[i].map(element => gameBoard[element]).filter(element => element !== ' ').join('');
      if (['XXX','OOO'].includes(currentSlots)) return true;
    }
    return false;
  }

  displayWinner() {
    let message = '';
    if (this.winner === 'X') {
      message = 'Congratulations! You won the game!';
    } else if (this.winner === 'O') {
      message = 'The computer won the game. Better luck next time!';
    } else {
      message = 'It\'s a tie.';
    }
    console.log(message);
  }

  isBoardFull() {
    return this.availableSlots.board.filter(element => element !== ' ').length !== 0;
  }

  play() {
    this.displayWelcomeMessage();
    this.availableSlots.initializeChoices();

    while (this.isBoardFull()) {

      this.availableSlots.logBoard();
      this.human.chooseSpot(this.availableSlots.board);
      this.gameBoard.updateBoard(this.human.currentChoice, this.human.marker);
      this.availableSlots.updateBoard(this.human.currentChoice, ' ');

      if (this.checkWinner(this.gameBoard.board)) {
        this.winner = 'X';
        break;
      }

      this.computer.chooseSpot(this.availableSlots.board, this.gameBoard.board, this.checkWinner);
      this.gameBoard.updateBoard(this.computer.currentChoice, this.computer.marker);
      this.availableSlots.updateBoard(this.computer.currentChoice, ' ');

      if (this.checkWinner(this.gameBoard.board)) {
        this.winner = 'O';
        break;
      }

      console.log('Here\'s the current state of the game.');
      this.gameBoard.logBoard();

    }

    this.gameBoard.logBoard();
    this.displayWinner();

  }

}

let game = new TTTGame();

game.play();