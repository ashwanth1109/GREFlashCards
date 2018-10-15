//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  easyWords: [{ type: Schema.Types.ObjectId, ref: "Word" }],
  mediumWords: [{ type: Schema.Types.ObjectId, ref: "Word" }],
  hardWords: [{ type: Schema.Types.ObjectId, ref: "Word" }]
});

const wordSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  definition: { type: String, required: true },
  notes: String,
  difficulty: { type: Number, required: true, min: 1, max: 3 },
  familiarity: { type: Number, default: 1 }
});

const User = mongoose.model("User", userSchema);
const Word = mongoose.model("Word", wordSchema);

module.exports = { User, Word };
