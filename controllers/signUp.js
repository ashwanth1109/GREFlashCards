//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const signUp = express.Router();
// Get user model

signUp.get("/", (req, res) => {
  res.send("sign up");
});

module.exports = signUp;
