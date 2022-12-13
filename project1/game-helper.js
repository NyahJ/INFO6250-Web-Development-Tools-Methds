// Read words from words.js
const words = require("./words.js");

// Return a random word as the secret word
const getSecretWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// Check if a word is valid, in the case-insensitive condition
const isValidWord = (guessedWord) => {
  return words.includes(guessedWord.toLowerCase());
};

// Check if the guessed word is same as the secret word
const isSameWithSecretWord = (secretWord, guessedWord) => {
  return secretWord.toLowerCase() === guessedWord.toLowerCase();
};

// Count the number of the matching letters
const calculateMatchingLetters = (secretWord, guessedWord) => {
   const wordDict1 = new Array(26).fill(0);
   const wordDict2 = new Array(26).fill(0);
   let matchingLetters = 0;

   for (let i = 0; i < secretWord.length; i++) {
        let index1 = secretWord.toUpperCase().charCodeAt(i) - 'A'.charCodeAt(0);
        wordDict1[index1]++;
        let index2 = guessedWord.toUpperCase().charCodeAt(i) - 'A'.charCodeAt(0);
        wordDict2[index2]++;
   }

   for (let j = 0; j < 26; j++) {
        matchingLetters += Math.min(wordDict1[j], wordDict2[j]);
   }

   return matchingLetters;
};



module.exports = {
  getSecretWord,
  isValidWord,
  calculateMatchingLetters,
  isSameWithSecretWord,
};