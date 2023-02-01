/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chainKeys = [];
    let chains = {};
    for (let word of this.words) {
      if (!chainKeys.includes(word)) {
        chainKeys.push(word)
        let chainValues = [];
        for (let i = 0; i < (this.words.length); i++) {
          if (this.words[i] === word) {
            if (this.words[i + 1]) {
              chainValues.push(this.words[i + 1]);
            } else {
              chainValues.push(null)
            }
          }
        }
        chains[word] = [...chainValues];
      }
    }
    return chains

  }


  /** return random text from chains */

  makeText(numWords = 100) {

    let chain = this.makeChains()
    let chainKeys = Object.keys(chain)

    let firstWord = chainKeys[Math.floor(Math.random() * chainKeys.length)]
    let lastKey = firstWord
    let string = firstWord

    for (let i = 0; i < numWords - 1; i++) {

      let chainValues = chain[lastKey]
      let idx = Math.floor(Math.random() * chainValues.length)
      let nextWord = chainValues[idx]

      if (nextWord === null) {
        if (i === 0) {
          i--
          firstWord = [chainKeys[Math.floor(Math.random() * chainKeys.length)]][0]
          lastKey = firstWord
          string = firstWord
        } else {
          return string
        }
      } else {
        lastKey = nextWord
        string += ` ${nextWord}`
      }
    }

    return string

  }
}





module.exports = {
  MarkovMachine,
};