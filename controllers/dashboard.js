const express = require("express");
const dashboard = express.Router();

const deck1 = require("../data/deck1");
// Get word model
const { User, Word } = require("../models/users");

dashboard.get("/easy", (req, res) => {
  const { user } = req.session;
  // console.log(user);

  if (req.session.user) {
    User.findById({ _id: user._id }, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        Word.findById(user.easyWords[0], (err, word) => {
          if (err) {
            res.send(err);
          } else {
            res.render("app/dashboard.ejs", {
              user: user,
              id: "0",
              words: user.easyWords,
              word: word
            });
          }
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

module.exports = dashboard;
