//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");

//------------------------------------------------------------------------------------
// GET USER MODEL
//------------------------------------------------------------------------------------
const { User } = require("../models/users");

//------------------------------------------------------------------------------------
// GET ROUTE TO SHOW LOGIN PAGE
//------------------------------------------------------------------------------------
login.get("/", (req, res) => {
  res.render("login/login.ejs", {
    user: undefined
  });
});

//------------------------------------------------------------------------------------
// GET ROUTE FOR WHEN USERNAME OR PASSWORD ENTERED INCORRECTLY
//------------------------------------------------------------------------------------
login.get("/userNameOrPasswordIncorrect", (req, res) => {
  res.render("login/login.ejs", {
    user: undefined
  });
});

//------------------------------------------------------------------------------------
// POST ROUTE FOR SUBMITTING LOGIN INFO TO SIGN IN
//------------------------------------------------------------------------------------
login.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.redirect("/");
    } else {
      if (user === null) {
        res.redirect("/login/userNameOrPasswordIncorrect");
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          console.log(`User has logged in`);
          req.session.user = user;
          if (user.easyWords.length > 0) {
            res.redirect("/dashboard/easy/0");
          } else {
            res.redirect("/dashboard");
          }
        } else {
          res.redirect("/login/userNameOrPasswordIncorrect");
        }
      }
    }
  });
});

//------------------------------------------------------------------------------------
// DELETE ROUTE FOR HANDLING LOG OUT FUNCTIONALITY
//------------------------------------------------------------------------------------
login.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = login;

//------------------------------------------------------------------------------------
// CODE GRAVEYARD
//------------------------------------------------------------------------------------
// if (
//   user.password &&
//   bcrypt.compareSync(req.body.password, user.password)
// ) {
//   console.log("User has logged in");
//   req.session.user = user;
//   if (user.easyWords.length > 0) {
//     res.redirect(`/dashboard/easy/0`);
//   } else {
//     res.redirect("/dashboard/easy");
//   }
// } else {
//   res.redirect("/login/passwordIncorrect");
// }

// res.send("finding a user");
