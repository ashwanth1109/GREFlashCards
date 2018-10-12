//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const signUp = express.Router();
// Get user model

signUp.get("/", (req, res) => {
  res.render("./signUp/index.ejs");
});

module.exports = signUp;
