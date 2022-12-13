import React, { useState } from "react";
import compare from "./compare";

const Game = () => {
    const [currentWord, setCurrentWord] = useState("");
    const [lastWord, setLastWord] = useState("");
    const [message, setMessage] = useState("");
    const secretWord = "RECAT";

    const handleClick = (e) => {
        e.preventDefault();
        setLastWord(currentWord);
        displayResult(currentWord);
        setCurrentWord("");
    };

    const displayResult = (word) => {
        const result = compare(secretWord, currentWord);

        if (word.length !== secretWord.length) {
            setMessage(`Sorry, ${currentWord} was not a valid word`);
        } else if (result === secretWord.length) {
            setMessage(`Great! ${word} is the secret word!`);
        } else {
            setMessage(`${word} had ${result} letters in common with the secret word.`);
        }
    };


    return (
        <div>
            <h2>Welcome to the Word Guessing Game!</h2>
              <div className="container">
                <label>Enter your guessing word:</label>
                <form>
                  <input
                    placeholder="Type here"
                    type="text"
                    value={currentWord}
                    onChange={(e) => setCurrentWord(e.target.value)}
                  />
                  <button onClick={handleClick}>Guess</button>
                </form>
              </div>
              <p>
                Last Guessed Word: <span className="last-message">{lastWord}</span>
              </p>
              <p className="result-message">{message}</p>
          </div>
    );
};

export default Game;