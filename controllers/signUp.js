//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const signUp = express.Router();
// Get user model
const User = require("../models/users");

signUp.get("/", (req, res) => {
  res.render("signUp/signUp.ejs");
});

signUp.post("/", (req, res) => {
  if (req.body.password1 === req.body.password2) {
    req.body.password = req.body.password1;
    User.create(req.body, (err, user) => {
      if (err) console.log(err);
      else {
        console.log(user);
        res.redirect("/");
      }
    });
  } else {
    console.log(`passwords do not match`);
  }
});

module.exports = signUp;
