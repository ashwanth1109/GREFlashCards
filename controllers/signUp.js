//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const signUp = express.Router();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const db = mongoose.connection;
// Get user model

signUp.get("/", (req, res) => {
  res.render("signUp.ejs");
});

module.exports = signUp;
