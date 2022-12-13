"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
   const wordDict1 = new Array(26).fill(0);
   const wordDict2 = new Array(26).fill(0);
   let commonWordsNum = 0;

   for (let i = 0; i < word.length; i++) {
        let index1 = word.toUpperCase().charCodeAt(i) - 'A'.charCodeAt(0);
        wordDict1[index1]++;
        let index2 = guess.toUpperCase().charCodeAt(i) - 'A'.charCodeAt(0);
        wordDict2[index2]++;
   }

   for (let j = 0; j < 26; j++) {
        commonWordsNum += Math.min(wordDict1[j], wordDict2[j]);
   }

   return commonWordsNum;
}
