class Word {
  constructor(id, deck, name, definition, difficulty) {
    this.id = id;
    this.deck = deck;
    this.name = name;
    this.definition = definition;
    this.difficulty = difficulty;
    this.familiarity = "Clueless";
  }
}

// Create a deck of words

const deck1Words = [
  // EASY WORDS
  ["involved", "complicated, and difficult to comprehend", 1],
  ["venerate", "to respect deeply", 1],
  ["disinterest", "unbiased, neutral", 1],
  ["vindicate", "to clear of accusation, blame or suspicion", 1],
  ["harangue", "a long pompous speech; a tirade", 1],
  ["laconic", "using very few words", 1],
  ["amalgam", "a mixture of multiple things", 1],
  ["egregious", "standing out in a negative way, shockingly bad", 1],
  ["auspicious", "favorable", 1],
  ["ambiguous", "open to more than one interpretation", 1],
  ["parochial", "narrowly restricted in scope or outlook", 1],
  ["restive", "restless", 1],
  ["parsimonious", "extremely frugal; miserly", 1],
  ["amorphous", "shapeless", 1],
  ["equivocal", "confusing or ambiguous", 1]
];

const Deck1 = [];

for (let i = 0; i < deck1Words.length; i++) {
  const item = deck1Words[i];
  const word = new Word(
    i + 1,
    1,
    deck1Words[i][0],
    deck1Words[i][1],
    deck1Words[i][2]
  );
  Deck1.push(word);
}

module.exports = Deck1;
