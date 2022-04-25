const readline = require('readline-sync');

class Hand {
  constructor() {
    this.hand = [];
    this.score = 0;
    this.busted = false;
  }

  add(card) {
    this.hand.push(card);
  }

  handAsAList() {
    let newArr = this.hand.map(subArr => subArr.join('-'));
    switch (newArr.length) {
      case 2:
        return newArr[0] + ' and ' + newArr[1];
      default:
        return newArr.slice(0,newArr.length - 1).join(', ') + ' and ' + newArr.slice(-1);
    }
  }

  isBust(maxScore) {
    return this.score > maxScore;
  }

  initializeNewRound() {
    this.hand = [];
    this.score = 0;
    this.busted = false;
  }

}

class Player extends Hand {
  constructor() {
    super();
    this.money = 5;
  }

  addMoney() {
    this.money += 1;
  }

  removeMoney() {
    this.money -= 1;
  }

  displayHand() {
    console.log(`You currently have the following cards: ${this.handAsAList()} for a total of ${this.score} points.`);
  }

  hit() {
    let anotherCard = readline.question('Would you like another card? Type yes or no: ');
    return anotherCard.toLowerCase() === 'yes';
  }

  displayFund() {
    console.log('');
    console.log(`You now have ${this.money} dollars.`);
  }

  playAgain() {
    let playAgain = readline.question('Do you want to play another round? Type yes or no: ');
    return playAgain.toLowerCase() === 'yes';
  }

}

class Dealer extends Hand {
  constructor() {
    super();
  }

  displayHiddenHand() {
    console.log(`The dealer has the following cards: ${this.hand[0].join('-')} and an unknown card.`);
  }

  displayHand() {
    console.log(`The dealer has the following cards: ${this.handAsAList()} for a total of ${this.score} points.`);
  }
}

class Deck {
  constructor(highCards, specialCard) {
    this.cards = {};
    this.colors = ['hearts','diamonds','clubs','spades'];
    this.highCards = highCards;
    this.specialCard = specialCard;
    this.currentCard = null;
  }

  initializeDeck() {
    let newDeck = {};
    this.colors.forEach(color => {
      newDeck[color] = [];
      for (let i = 2; i <= 10; i++) {
        newDeck[color].push(i);
      }
      this.highCards.forEach(card => newDeck[color].push(card));
      newDeck[color].push(this.specialCard);
    });
    this.cards = newDeck;
  }

  drawCard() {
    let possibleColors = Object.keys(this.cards);
    let selectedColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    let possibleCards = this.cards[selectedColor];
    let selectedCard = this.cards[selectedColor][Math.floor(Math.random() * possibleCards.length)];
    this.currentCard = [selectedCard, selectedColor];
  }

  removeCard() {
    let indexOfCard = this.cards[this.currentCard[1]].indexOf(this.currentCard[0]);
    this.cards[this.currentCard[1]].splice(indexOfCard, 1);
  }

  dealCard() {
    return this.currentCard;
  }

}

class TwentyOne {
  constructor() {
    this.deck = new Deck(TwentyOne.HIGH_CARDS, TwentyOne.SPECIAL_CARD);
    this.player = new Player();
    this.dealer = new Dealer();
    this.winner = null;
  }

  static MAX_POINT = 21;
  static HIGH_CARDS_VALUE = 10;
  static HIGH_ACE_VALUE = 11;
  static LOW_ACE_VALUE = 1;
  static HIGH_CARDS = ['Jack','Queen','King'];
  static SPECIAL_CARD = 'Ace';
  static START_FUND = 5;

  displayWelcomeMessage() {
    console.log(`Welcome to Twenty One! Get as close as you can to ${TwentyOne.MAX_POINT} without going over.`);
    console.log(`You start with ${TwentyOne.START_FUND} dollars. If you win a round you gain 1 dollar otherwise you lose 1 dollar.`);
    console.log('The game will stop when you have 0 or 10 dollars. You can also choose to stop after each round.');
    console.log('Good luck!');
  }

  dealInitialCards() {
    for (let i = 1; i <= 2; i++) {
      this.deck.drawCard();
      this.deck.removeCard();
      this.player.add(this.deck.dealCard());
      this.deck.drawCard();
      this.deck.removeCard();
      this.dealer.add(this.deck.dealCard());
    }
  }

  calculateInitialScore(participants) {
    for (let i = 0; i < participants.length; i++) {
      let participant = participants[i];
      participant.hand.forEach(card => {
        card = card[0];
        participant.score += this.cardValue(card, participant);
      });
    }
  }

  updateScore(participant) {
    let card = participant.hand.slice(-1)[0][0];
    participant.score += this.cardValue(card, participant);
  }

  cardValue(card, participant) {
    if (TwentyOne.HIGH_CARDS.includes(card)) {
      return TwentyOne.HIGH_CARDS_VALUE;
    } else if (card === TwentyOne.SPECIAL_CARD && ((participant.score + TwentyOne.HIGH_ACE_VALUE) <= TwentyOne.MAX_POINT)) {
      return TwentyOne.HIGH_ACE_VALUE;
    } else if (card === TwentyOne.SPECIAL_CARD && ((participant.score + TwentyOne.HIGH_ACE_VALUE) > TwentyOne.MAX_POINT)) {
      return TwentyOne.LOW_ACE_VALUE;
    } else {
      return Number(card);
    }
  }

  determineWinner() {
    switch (true) {
      case this.player.isBust(TwentyOne.MAX_POINT):
        this.winner = 'dealer';
        this.player.busted = true;
        break;
      case this.dealer.isBust(TwentyOne.MAX_POINT):
        this.winner = 'player';
        this.dealer.busted = true;
        break;
      case this.dealer.score >= this.player.score:
        this.winner = 'dealer';
        break;
      default:
        this.winner = 'player';
    }
  }

  updateMoney() {
    if (this.winner === 'player') {
      this.player.addMoney();
    } else {
      this.player.removeMoney();
    }
  }

  displayWinner() {
    console.log('ROUND SUMMARY:');
    this.dealer.displayHand();
    this.player.displayHand();
    console.log('');
    if (this.winner === 'dealer' && this.player.busted) {
      console.log('Busted! You went over the maximum. The dealer wins and you lose 1 dollar.');
    } else if (this.winner === 'player' && this.dealer.busted) {
      console.log('The dealer went above the maximum. You win 1 dollar!');
    } else if (this.winner === 'dealer') {
      console.log('The dealer wins. You lose 1 dollar.');
    } else {
      console.log('You win! You also receive 1 dollar.');
    }
  }

  displayGoodbyeMessage() {
    console.log('');
    console.log('Thank you for playing Twenty One! We hope to see you in the near future!');
  }

  play() {
    this.displayWelcomeMessage();
    console.log('');

    while (true) {
      this.deck.initializeDeck();

      this.dealInitialCards();
      this.calculateInitialScore([this.player, this.dealer]);

      this.dealer.displayHiddenHand();
      this.player.displayHand();

      while (true) {
        console.log('');
        if (this.player.hit()) {
          this.deck.drawCard();
          this.deck.removeCard();
          this.player.add(this.deck.dealCard());
          this.updateScore(this.player);
          this.player.displayHand();
          if (this.player.isBust(TwentyOne.MAX_POINT)) break;
        } else break;
      }

      console.log('');

      while (!this.player.isBust(TwentyOne.MAX_POINT) && !this.dealer.isBust(TwentyOne.MAX_POINT) && (this.dealer.score < (TwentyOne.MAX_POINT - 4))) {
        this.deck.drawCard();
        this.deck.removeCard();
        this.dealer.add(this.deck.dealCard());
        this.updateScore(this.dealer);
        this.dealer.displayHand();
        console.log('');
      }

      this.determineWinner();
      this.displayWinner();
      this.updateMoney();
      this.player.displayFund();

      if ([0,10].includes(this.player.money) || !this.player.playAgain()) break;

      this.player.initializeNewRound();
      this.dealer.initializeNewRound();
      console.clear();
    }

    this.displayGoodbyeMessage();

  }

}

let theGame = new TwentyOne();
theGame.play();