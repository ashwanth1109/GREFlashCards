//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const deck = express.Router();
const mongoose = require("mongoose");

//------------------------------------------------------------------------------------
// GET SEED DATA
//------------------------------------------------------------------------------------
// const seed = require("../models/seed");

//------------------------------------------------------------------------------------
// IMPORT MODELS
//------------------------------------------------------------------------------------
const { Word, User } = require("../models/users");

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
  const { _id } = req.session.user;
  console.log(_id);
  let difficulty;
  switch (body.difficulty) {
    case "Easy":
      difficulty = 1;
      break;
    case "Medium":
      difficulty = 2;
      break;
    case "Hard":
      difficulty = 3;
      break;
    default:
      difficulty = 3;
  }
  const homeWordId = req.session.user.easyWords[0];
  console.log(`home word id is:`);
  console.log(homeWordId);
  // body.userId = _id;
  console.log(`The word looks like this`);
  console.log(body);

  const word = new Word({
    userId: _id,
    name: body.name,
    definition: body.definition,
    notes: body.notes,
    difficulty: difficulty,
    familiarity: 1
  });

  word.save((err, word) => {
    if (err) {
      console.log(err);
    }
    if (word.difficulty === 1) {
      User.findByIdAndUpdate(
        { _id: _id },
        { $push: { easyWords: word } },
        { new: true },
        (err, updatedUser) => {
          if (err) {
            res.send(err);
          } else {
            console.log(updatedUser);
            res.redirect(`/dashboard/easy/0`);
          }
        }
      );
    }
  });
  // User.findById
  // Word.create(body, (err, word) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(word);
  //     res.redirect("/dashboard/easy/0");
  //   }
  // });

  // const words = [];
  // words.push(word);
  // User.findById(req.session.user._id, (err, user) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     user[difficulty].push(word);
  //     User.findByIdAndUpdate(
  //       req.session.user._id,
  //       user,
  //       { new: true },
  //       (err, updatedUser) => {
  //         if (err) {
  //           res.send(err);
  //         } else {
  //           console.log(updatedUser);
  //           res.redirect("/dashboard/easy/0");
  //         }
  //       }
  //     );
  //   }
  // });
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
