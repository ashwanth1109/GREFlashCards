//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const login = express.Router();
// Get user model

login.get("/", (req, res) => {
  res.render("login/login.ejs");
});

module.exports = login;
