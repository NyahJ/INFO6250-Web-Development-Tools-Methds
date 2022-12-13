const {
  getSecretWord,
  isValidWord,
  calculateMatchingLetters,
  isSameWithSecretWord,
} = require("./game-helper");

class Game {
  constructor(secretWord) {
    this.secretWord = secretWord;
    this.numberOfValidGuesses = 0;
    this.guessedWords = [];
    this.isGameWon = false;
    this.message = "Type yourself or click the word cards above directly!";
  }

  guessWord(guessedWord) {
    if (this.checkIfTheWordIsGuessed(guessedWord)) {
      this.message = `You have already guessed "${guessedWord}"! Try a new word from the list!`;
      return;
    }

    if (isValidWord(guessedWord)) {
      ++this.numberOfValidGuesses;
      this.addGuessedWord(guessedWord);
    } else {
      this.message =
        "Ops! Invalid word! " +
        guessedWord +
        " is not in the word list. Try Again!";
      return;
    }

    this.isGameWon = isSameWithSecretWord(this.secretWord, guessedWord);
    if (this.isGameWon) {
      this.message = "Congratulations! You beat us! Hit RESTART to start again!";
    } else {
      this.message = "Good luck!";
    }
  }

  addGuessedWord(guessedWord) {
    const numberOfMatchingLetters = calculateMatchingLetters(
      this.secretWord,
      guessedWord
    );
    // Add the word to the beginning of the array
    this.guessedWords.unshift(new Guess(guessedWord, numberOfMatchingLetters));
  }

  // Check if the word is already guessed
  checkIfTheWordIsGuessed(guessedWord) {
    return this.guessedWords.some((word) => {
      return word.guessedWord === guessedWord;
    });
  }
}

class User {
  constructor(username) {
    this.username = username;
    this.game = new Game(getSecretWord());
    console.log( `Secret word for user "${this.username}" is "${this.game.secretWord}"` );
  }

  createNewGame() {
    this.game = new Game(getSecretWord());
  }
}

class Guess {
  constructor(guessedWord, numberOfMatchingLetters) {
    this.guessedWord = guessedWord;
    this.numberOfMatchingLetters = numberOfMatchingLetters;
  }
}


module.exports = { Game, User, Guess };