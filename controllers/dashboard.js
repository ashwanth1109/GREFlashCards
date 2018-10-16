const express = require("express");
const dashboard = express.Router();

const deck1 = require("../data/deck1");
// Get word model
const { User, Word } = require("../models/users");

dashboard.get("/", (req, res) => {
  const { user } = req.session;
  res.render("app/dashboard.ejs", {
    user: user,
    id: "-1",
    words: [],
    word: {
      name: "You are yet to add a word",
      definition: "You are yet to add a word",
      difficulty: 4
    },
    home: true
  });
});

dashboard.get("/easy/:id", (req, res) => {
  console.log(`entering dashboard 0 element get req`);
  const { user } = req.session;
  const { id } = req.params;
  console.log(`logging user`);
  console.log(user);

  User.findById({ _id: user._id }, (err, user) => {
    if (req.session.user) {
      Word.findById({ _id: user.easyWords[id] }, (err, word) => {
        console.log(`logging word`);
        console.log(word);
        if (err) {
          console.log("error");
          res.send(err);
        } else {
          res.render("app/dashboard.ejs", {
            user: user,
            id: id,
            words: user.easyWords,
            word: word,
            home: false
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

dashboard.delete("/easy/:id", (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  if (req.session.user) {
    User.findById({ _id: user._id }, (err, user) => {
      Word.findOneAndRemove({ _id: user.easyWords[id] }, (err, word) => {
        if (err) {
          res.send(err);
        } else {
          user.easyWords.splice(id, 1);
          User.findByIdAndUpdate(
            { _id: user._id },
            { easyWords: user.easyWords },
            { new: true },
            (err, updatedUser) => {
              if (err) {
                res.send(err);
              } else {
                console.log(req.session.user);
                res.redirect("/dashboard/easy/0");
              }
            }
          );
          // res.redirect("/dashboard/easy/0");
        }
      });
    });
  }
});

module.exports = dashboard;
