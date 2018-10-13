//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const login = express.Router();
// Get user model
const User = require("../models/users");

login.get("/", (req, res) => {
  res.render("login/login.ejs", {
    user: undefined
  });
});

login.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (req.body.password === user.password) {
        console.log(`succesfully logged in as ${user}`);
        req.session.user = user;
        res.redirect("/dashboard");
      } else {
        console.log(`login failed: ${user}`);
      }
    }
  });
});

login.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = login;
