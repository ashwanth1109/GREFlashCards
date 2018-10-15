//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const deck = express.Router();

//------------------------------------------------------------------------------------
// GET SEED DATA
//------------------------------------------------------------------------------------
// const seed = require("../models/seed");

//------------------------------------------------------------------------------------
// IMPORT MODELS
//------------------------------------------------------------------------------------
let Word = require("../models/words");
const User = require("../models/users");

//------------------------------------------------------------------------------------
// SEED ROUTE
//------------------------------------------------------------------------------------
// deck.get("/seed", (req, res) => {
//   Word.create(seed, (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.redirect("/dashboard");
//     }
//   });
// });

//------------------------------------------------------------------------------------
// NEW ROUTE
//------------------------------------------------------------------------------------
deck.get("/new", (req, res) => {
  if (req.session.user) {
    res.render("app/new.ejs", {
      user: req.session.user
    });
  } else {
    res.redirect("/");
  }
});

//------------------------------------------------------------------------------------
// CREATE ROUTE
//------------------------------------------------------------------------------------
deck.post("/", (req, res) => {
  const { body } = req;
  // console.log(body);
  let difficulty;
  switch (body.difficulty) {
    case "Easy":
      difficulty = "easyWords";
      break;
    case "Medium":
      difficulty = "mediumWords";
      break;
    case "Hard":
      difficulty = "hardWords";
      break;
    default:
      difficulty = "hardWords";
  }
  const word = new Word(body.name, body.definition, body.notes);
  console.log(word);
  // const words = [];
  // words.push(word);
  User.findById(req.session.user._id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      user[difficulty].push(word);
      User.findByIdAndUpdate(
        req.session.user._id,
        user,
        { new: true },
        (err, updatedUser) => {
          if (err) {
            res.send(err);
          } else {
            console.log(updatedUser);
            res.redirect("/dashboard/easy/0");
          }
        }
      );
    }
  });
  // User.findByIdAndUpdate(
  //   req.session.user._id,
  //   { words: words },
  //   { new: true },
  //   (err, updatedUser) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       console.log(updatedUser);
  //       res.redirect("/dashboard");
  //     }
  //   }
  // );
});

//------------------------------------------------------------------------------------
// EXPORT
//------------------------------------------------------------------------------------
module.exports = deck;
