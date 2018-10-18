//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//------------------------------------------------------------------------------------
// CREATE USER SCHEMA: email, password, easyWords, mediumWords, hardWords
//------------------------------------------------------------------------------------
const userSchema = Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  easyWords: [{ type: Schema.Types.ObjectId, ref: "Word" }],
  mediumWords: [{ type: Schema.Types.ObjectId, ref: "Word" }],
  hardWords: [{ type: Schema.Types.ObjectId, ref: "Word" }]
});

//------------------------------------------------------------------------------------
// CREATE WORD SCHEMA: userId, name, definition, notes, difficulty, familiarity
//------------------------------------------------------------------------------------
const wordSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  definition: { type: String, required: true },
  notes: String,
  difficulty: { type: Number, required: true, min: 1, max: 3 },
  familiarity: { type: Number, default: 1 }
});

//------------------------------------------------------------------------------------
// CREATE USER AND WORD MODELS
//------------------------------------------------------------------------------------
const User = mongoose.model("User", userSchema);
const Word = mongoose.model("Word", wordSchema);

module.exports = { User, Word };

//------------------------------------------------------------------------------------
// CODE GRAVEYARD
//------------------------------------------------------------------------------------
// //------------------------------------------------------------------------------------
// // // SET DEPENDENCIES
// // //------------------------------------------------------------------------------------
// // const mongoose = require("mongoose");
// // const Schema = mongoose.Schema;

// // const wordSchema = new Schema({
// //   name: { type: String, required: true },
// //   definition: { type: String, required: true },
// //   notes: String,
// //   familiarity: { type: Number, default: 1 },
// //   difficulty: { type: Number, min: 1, max: 3, required: true }
// // });

// // module.exports = mongoose.model("Word", wordSchema);

// class Word {
//   constructor(name, definition, notes, difficulty) {
//     this.name = name;
//     this.definition = definition;
//     this.notes = notes;
//     this.familiarity = 1;
//   }
// }

// module.exports = Word;
