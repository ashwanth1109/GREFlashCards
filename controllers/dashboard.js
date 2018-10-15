const express = require("express");
const dashboard = express.Router();

const deck1 = require("../data/deck1");
// Get word model
const { User, Word } = require("../models/users");

dashboard.get("/easy/:id", (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  // console.log(user);

  User.findById({ _id: user._id }, (err, user) => {
    if (req.session.user) {
      Word.findById({ _id: user.easyWords[id] }, (err, word) => {
        if (err) {
          console.log("error");
          res.send(err);
        } else {
          res.render("app/dashboard.ejs", {
            user: user,
            id: id,
            words: user.easyWords,
            word: word
          });
        }
      });
      // User;
      // res.render("app/dashboard.ejs", {
      //   user: user,
      //   id: id,
      //   words: user.easyWords,
      //   word: user.easyWords[id]
      // });
      // // res.send("hello");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = dashboard;
