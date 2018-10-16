const express = require("express");
const dashboard = express.Router();

const deck1 = require("../data/deck1");
// Get word model
const { User, Word } = require("../models/users");

//------------------------------------------------------------------------------------
// EMPTY HOME PAGE ROUTE
//------------------------------------------------------------------------------------
dashboard.get("/", (req, res) => {
  const { user } = req.session;
  res.render("app/dashboard.ejs", {
    user: user,
    id: "-1",
    words: [],
    word: {
      name: "You are yet to add a word",
      definition: "You are yet to add a word",
      difficulty: 4,
      notes: "You are yet to add notes for this word"
    },
    home: true
  });
});

//------------------------------------------------------------------------------------
// INDEX + SHOW ROUTE
//------------------------------------------------------------------------------------
dashboard.get("/easy/:id", (req, res) => {
  // console.log(`entering dashboard 0 element get req`);
  const { user } = req.session;
  const { id } = req.params;
  // console.log(`logging user`);
  // console.log(user);

  User.findById({ _id: user._id }, (err, user) => {
    if (req.session.user) {
      Word.findById({ _id: user.easyWords[id] }, (err, word) => {
        // console.log(`logging word`);
        // console.log(word);
        if (err) {
          // console.log("error");
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

//------------------------------------------------------------------------------------
// DESTORY/DELETE ROUTE
//------------------------------------------------------------------------------------
dashboard.delete("/easy/:id", (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  console.log("entering delete route");
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
                console.log(id);
                if (user.easyWords.length < 1) {
                  console.log(`redirecting to dashboard`);
                  res.redirect("/dashboard");
                } else {
                  console.log("redirecting to 1st element");
                  res.redirect("/dashboard/easy/0");
                }
              }
            }
          );
          // res.redirect("/dashboard/easy/0");
        }
      });
    });
  }
});

//------------------------------------------------------------------------------------
// EDIT ROUTE
//------------------------------------------------------------------------------------
dashboard.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  if (user) {
    User.findById({ _id: user.id }, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        Word.findById({ _id: req.session.user.easyWords[id] }, (err, word) => {
          if (err) {
            res.send(err);
          } else {
            console.log(`printing word in edit route`);
            console.log(word);
            res.render("app/edit.ejs", {
              user: req.session.user,
              word: word,
              id: id
            });
          }
        });
      }
    });
  } else {
    res.redirect("/");
  }
});

//------------------------------------------------------------------------------------
// UPDATE ROUTE
//------------------------------------------------------------------------------------
dashboard.put("/:id", (req, res) => {
  console.log(`entering put route`);
  const { body } = req;
  const { user } = req.session;
  const { id } = req.params;

  let difficulty;
  switch (body.difficulty) {
    case "Easy":
      body.difficulty = 1;
      break;
    case "Medium":
      body.difficulty = 2;
      break;
    case "Hard":
      body.difficulty = 3;
      break;
    default:
      body.difficulty = 3;
  }

  console.log(body);

  if (user) {
    User.findById({ _id: user._id }, (err, user) => {
      if (err) {
        res.send(`Error: ${err}`);
      } else {
        const word = {
          _id: user.easyWords[id],
          userId: user._id,
          name: body.name,
          definition: body.definition,
          notes: body.notes,
          difficulty: body.difficulty
        };
        console.log(`word is `);
        console.log(word);
        // console.log("in update route finding word");
        // console.log(user.easyWords[id]);
        Word.findByIdAndUpdate(
          { _id: user.easyWords[id] },
          word,
          (err, updatedWord) => {
            if (err) {
              res.send(`Error ${err}`);
            } else {
              console.log(`updated word is`);
              console.log(updatedWord);
              res.redirect("/dashboard/easy/0");
            }
          }
        );
      }
    });
  }
});

module.exports = dashboard;
