//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const login = express.Router();
// Get user model
const { User } = require("../models/users");
const bcrypt = require("bcrypt");

login.get("/", (req, res) => {
  res.render("login/login.ejs", {
    user: undefined
  });
});

login.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log("User has logged in");
        req.session.user = user;
        if (user.easyWords.length > 0) {
          res.redirect(`/dashboard/easy/0`);
        } else {
          res.redirect("/dashboard/easy");
        }
      } else {
        res.send(`password incorrect: ${user}`);
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
