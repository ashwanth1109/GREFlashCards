//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//------------------------------------------------------------------------------------
// IMPORT WORD MODEL
//------------------------------------------------------------------------------------
const Word = require("../models/words");

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  easyWords: [],
  mediumWords: [],
  hardWords: []
});

module.exports = mongoose.model("User", userSchema);
