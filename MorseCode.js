const BSTree = require("./BinarySearch");
const alphabet = require("./alphabet");

class ScoreTree extends BSTree {
  constructor(value, score) {
    super(value);
    this.score = score;
  }
  insertNode(key, score) {
    //this function inserts a letter into the morse code tree - this should run once in the beginning
    if (!this.value) {
      this.value = key;
      this.score = score;
    } else if (score > this.score && this.rightChild) {
      this.rightChild.insertNode(key, score);
    } else if (score <= this.score && this.leftChild) {
      this.leftChild.insertNode(key, score);
    } else if (score <= this.score) {
      this.leftChild = new ScoreTree(key, score);
    } else {
      this.rightChild = new ScoreTree(key, score);
    }
  }
  findLetter(score, str = "") {
    // this method should record the path to a given letter
    if (score === this.score) {
      return str;
    } else if (score < this.score && this.leftChild) {
      str += ".";
      return this.leftChild.findLetter(score, str);
    } else if (score > this.score && this.rightChild) {
      str += "-";
      return this.rightChild.findLetter(score, str);
    }
  }
  translateWord(str) {
    //this method should translate a given word from text to Morse Code
    let char;
    let code = "'";
    let result = "";
    for (let i = 0; i < str.length; i++) {
      code = "";
      char = str[i];
      if (char === " ") {
        result += "/";
      } else {
        char = char.toUpperCase();
        code = this.findLetter(alphabet[char], code);
        result += code + " ";
      }
    }
    console.log(result);
  }
  translateMorse(str) {
    // this function should translate a given code from Morse to English
    const morseArr = str.split(" ");
    let result = "";
    let letter = "";
    for (const code of morseArr) {
      letter = "";
      if (code === "/") {
        result += " ";
      } else {
        letter = this.findCode(code);
        result += letter;
      }
    }
    console.log(result);
  }
  findCode(str) {
    // this method should record the path to a given letter
    if (str === "") {
      return this.value;
    } else {
      let char = str[0];
      if (char === ".") {
        //&&  this.leftChild) {
        return this.leftChild.findCode(str.slice(1));
      } else if (char === "-") {
        // && this.rightChild) {
        return this.rightChild.findCode(str.slice(1));
      }
    }
  }
}
//initializing the MorseCode tree
const morseCode = new ScoreTree("TOP", 50);
Object.keys(alphabet).forEach((l) => {
  morseCode.insertNode(l, alphabet[l]);
});

morseCode.translateWord("welcome"); // should print .-- . .-.. -.-. --- -- .
morseCode.translateWord("elevation is cool"); // should print . .-.. . ...- .- - .. --- -. /.. ... /-.-. --- --- .-..

morseCode.translateMorse("... --- ...");
morseCode.translateMorse(
  "-. .. -.-. . / .--- --- -... / --- -. / - .... . / .-.. . ... ... --- -.",
);
