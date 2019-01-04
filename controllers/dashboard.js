//------------------------------------------------------------------------------------
// SET DEPENDENCIES
//------------------------------------------------------------------------------------
const express = require("express");
const dashboard = express.Router();

//------------------------------------------------------------------------------------
// GET USER AND WORD MODEL
//------------------------------------------------------------------------------------
const { User, Word } = require("../models/users");

//------------------------------------------------------------------------------------
// GET SEED DATA
//------------------------------------------------------------------------------------
// const seed = require("../models/seed");

//------------------------------------------------------------------------------------
// I GOT THIS WORD DOWN ROUTE
//------------------------------------------------------------------------------------
dashboard.get("/changeFamiliarity/:id/:urlId", (req, res) => {
    const { id } = req.params;
    const { urlId } = req.params;
    Word.findById({ _id: id }, (err, word) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.send(err);
        } else {
            if (word.familiarity !== 5) {
                word.familiarity++;
                Word.findByIdAndUpdate(
                    { _id: word.id },
                    { familiarity: word.familiarity },
                    (err, updatedWord) => {
                        if (err) {
                            console.log(`Error: err`);
                            res.send(err);
                        } else {
                            console.log(`Updated Word is ${updatedWord}`);
                            res.redirect(`/dashboard/easy/${urlId}`);
                        }
                    }
                );
            } else {
                res.redirect(`/dashboard/easy/${urlId}`);
            }
        }
    });
});

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
    const { id } = req.params;
    const { user } = req.session;

    if (user) {
        User.findById({ _id: user._id }, (err, user) => {
            Word.find({ _id: { $in: user.easyWords } }, (err, words) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(`========================================`);
                    console.log(words);
                    console.log(`========================================`);
                    Word.findById({ _id: user.easyWords[id] }, (err, word) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.render("app/dashboard.ejs", {
                                user: user,
                                id: id,
                                words: words,
                                word: word,
                                home: false
                            });
                        }
                    });
                }
            });
        });
    } else {
        res.redirect("/");
    }
});

//------------------------------------------------------------------------------------
// NEW ROUTE
//------------------------------------------------------------------------------------
dashboard.get("/new", (req, res) => {
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
dashboard.post("/", (req, res) => {
    const { body } = req;
    const { _id } = req.session.user;
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
                }
            });
        });
    }
});

//------------------------------------------------------------------------------------
// EDIT ROUTE
//------------------------------------------------------------------------------------
dashboard.get("/:id/edit", (req, res) => {
    console.log("edit route reached");
    const { id } = req.params;
    const { user } = req.session;
    if (user) {
        User.findById({ _id: user._id }, (err, user) => {
            if (err) {
                console.log(`entering error in user`);
                res.send(err);
            } else {
                Word.findById({ _id: user.easyWords[id] }, (err, word) => {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log(`printing word in edit route`);
                        console.log(word);
                        res.render("app/edit.ejs", {
                            user: user,
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

//------------------------------------------------------------------------------------
// CODE GRAVEYARD
//------------------------------------------------------------------------------------

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
// CREATE ROUTE
//------------------------------------------------------------------------------------
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
// User;
// res.render("app/dashboard.ejs", {
//   user: user,
//   id: id,
//   words: user.easyWords,
//   word: user.easyWords[id]
// });
// // res.send("hello");
