const words = require("./words.js");

const loginPage = () => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Login Word Guessing Game</title>
      </head>
      <body>
        <div class="login-container">
          <div id="content" class="content-container">
            <form action="/login" method="POST">
                <h1> Game of Word Guessing </h1>
              <div class="text-input" id="login_username">
                <input name="username" placeholder="Enter your username" required>
                <div class="space">
                  <button class="login-button" type="submit">LOGIN</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>
    `;
};

const invalidUserNameHtml = (errorMessage) => {
  return `
    <link rel="stylesheet" href="/style.css" />
    <h2>${errorMessage}</h2>
    <h3>Please Try Again!</h3>
    <form method="GET" action="/">
    <button class="login-button" type="submit">Login</button>
    </form>
  `;
};

const homePage = (user) => {
  return `
  <!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="/style.css">
      <title>Word Guessing Game</title>
    </head>
    <body>
      <div id="word-guessing-game">
        <div class="page-title">
          <h2>Welcome to Game of Word Guessing, ${user.username}! </h2>
          <div class="logout">
            <form action="/logout" method="POST">
              <button class="logout-button" type="submit">LOGOUT</button>
            </form>
          </div>
        </div>
        <div>
          <p>Instruction :
            <br>
            1.The secret word is one of the words from Words List above.
            <br>
            2.A guess is invalid when the word has already been guessed or the word does not belong to the Words List.
            <br>
            3.History of your previous guessing and the number of matching letters are recorded for your reference.
            <br>
            4.The lower score, the better: Your score is the count of number of valid guesses you make.
            <br>
            5.If you win the match, click on RESTART button to start a new game. Btw, feel free to logout at anytime.
            <br>
          </p>
        </div>
        <div class="game-panel">
          <div class="word-list-panel">
          <h3 class="title">Words List: Click on the word cards to guess</h3>
            <div class="word-list">
              ${words.map((word) => `<p class="word">${word}</p>`).join("")}
            </div>

          <div class="game-panel-container">
            <p class="turns">
              Number Of Valid Guesses: ${user.game.numberOfValidGuesses}
              <br><br>
              <span className="score">
              ${
                user.game.guessedWords.length > 0
                  ? `
              Your Previous Valid Guess: ${user.game.guessedWords[0].guessedWord} matched ${user.game.guessedWords[0].numberOfMatchingLetters} letters with secret word`
                  : ""
              }
              </span>
            </p>
            <div class="control-panel">
              <div class="word-input">
                <form action="/guess" method="POST">
                  <input id="guess-field" name="guessedWord" placeholder="Select your guessing" required ${
                    user.game.isGameWon ? "disabled" : "enabled"
                  }>
                  <button class="guess-button" type="submit" ${
                    user.game.isGameWon ? "disabled" : "enabled"
                  }>GUESS</button>
                </form>
                <div class="message-panel">
                ${user.game.message}
                </div>
                <div class="controls">
                  <div class="restart">
                    <form action="/new-game" method="GET">
                      <button class="restart-button" type="submit">RESTART</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="accepted-guess-panel">
              <h3>History of Valid Guesses & Letters Matched </h3>
              <div class="history-panel">
                  ${user.game.guessedWords
                    .map(
                      (guess) =>
                        `<div><span class="word">You guessed "${guess.guessedWord}"</span> : <span class="word">matched ${guess.numberOfMatchingLetters} letters with secret word</span></div>`
                    )
                    .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <script>
        let words = document.querySelectorAll(".word");
        let guessField = document.querySelector("#guess-field");
        words.forEach(word => {
          word.addEventListener("click", (e) => {
            guessField.value = e.target.innerText;
          });
        });
      </script>
    </body>
  </html>
  `;
};

module.exports = { loginPage, invalidUserNameHtml, homePage };