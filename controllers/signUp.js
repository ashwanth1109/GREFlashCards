//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const signUp = express.Router();
const bcrypt = require("bcrypt");

//------------------------------------------------------------------------------------
// GET USER MODEL
//------------------------------------------------------------------------------------
const { User } = require("../models/users");

//------------------------------------------------------------------------------------
// GET ROUTE FOR SIGN UP PAGE
//------------------------------------------------------------------------------------
signUp.get("/", (req, res) => {
  res.render("signUp/signUp.ejs", {
    user: undefined
  });
});

//------------------------------------------------------------------------------------
// POST ROUTE FOR CREATING AN USER
//------------------------------------------------------------------------------------
signUp.post("/", (req, res) => {
  if (req.body.password1 === req.body.password2) {
    req.body.password = bcrypt.hashSync(
      req.body.password1,
      bcrypt.genSaltSync(10)
    );
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
