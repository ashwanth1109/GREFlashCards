// //------------------------------------------------------------------------------------
// // SET DEPENDENCIES
// //------------------------------------------------------------------------------------
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const wordSchema = new Schema({
//   name: { type: String, required: true },
//   definition: { type: String, required: true },
//   notes: String,
//   familiarity: { type: Number, default: 1 },
//   difficulty: { type: Number, min: 1, max: 3, required: true }
// });

// module.exports = mongoose.model("Word", wordSchema);

class Word {
  constructor(name, definition, notes, difficulty) {
    this.name = name;
    this.definition = definition;
    this.notes = notes;
    this.familiarity = 1;
  }
}

module.exports = Word;
