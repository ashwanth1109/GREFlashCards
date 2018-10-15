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

login.get("/userNameOrPasswordIncorrect", (req, res) => {
  res.render("login/login.ejs", {
    user: undefined
  });
});

login.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.redirect("/");
    } else {
      // console.log("user password" + user.password);
      if (user === null) {
        res.redirect("/login/userNameOrPasswordIncorrect");
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          console.log(`User has logged in`);
          req.session.user = user;
          if (user.easyWords.length > 0) {
            res.redirect("/dashboard/easy/0");
          } else {
            res.redirect("/");
          }
        } else {
          res.redirect("/login/userNameOrPasswordIncorrect");
        }
      }
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
    }
  });
  // res.redirect("/");
});

login.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = login;
