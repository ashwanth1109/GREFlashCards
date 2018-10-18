//------------------------------------------------------------------------------------
// SET DEPENDENCIES FOR BASIC SERVER
// EXPRESS, METHOD OVERRIDE, MONGOOSE, DOTENV, SESSION, MORGAN
//------------------------------------------------------------------------------------
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const db = mongoose.connection;
const session = require("express-session");
const morgan = require("morgan");

//------------------------------------------------------------------------------------
// SET CONFIGURATION FOR APP PORT & MONGODB URI
//------------------------------------------------------------------------------------
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//------------------------------------------------------------------------------------
// SET MIDDLEWARE FOR METHOD OVERRIDE AND BODY PARSER
// MIDDLEWARE GOES BETWEEN DEPENDENCIES AND ROUTE
//------------------------------------------------------------------------------------
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(morgan("combined"));

//------------------------------------------------------------------------------------
// SESSION MIDDLEWARE
//------------------------------------------------------------------------------------
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//------------------------------------------------------------------------------------
// ROUTES
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
// GET ROUTE: HOMEPAGE
// http://localhost:3000/
//------------------------------------------------------------------------------------
app.get(`/`, (req, res) => {
  res.render(`index.ejs`, {
    user: undefined
  });
});

//------------------------------------------------------------------------------------
// SIGN UP ROUTE CONTROLLER
//------------------------------------------------------------------------------------
const signUpController = require("./controllers/signUp.js");
app.use("/signUp", signUpController);

//------------------------------------------------------------------------------------
// LOGIN ROUTE CONTROLLER
//------------------------------------------------------------------------------------
const loginController = require("./controllers/login.js");
app.use("/login", loginController);

//------------------------------------------------------------------------------------
// DASHBOARD ROUTE CONTROLLER
//------------------------------------------------------------------------------------
const dashboardController = require("./controllers/dashboard.js");
app.use("/dashboard", dashboardController);

//------------------------------------------------------------------------------------
// CONFIGURE DATABASE AND DATABASE CONNECTION
//------------------------------------------------------------------------------------
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);
db.once("open", () => {
  console.log(`mongo is connected now`);
});

//------------------------------------------------------------------------------------
// SET APP LISTENER
//------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

//------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
// CODE GRAVEYARD
//------------------------------------------------------------------------------------

// //------------------------------------------------------------------------------------
// // DECK ROUTE CONTROLLER
// //------------------------------------------------------------------------------------
// const deckController = require("./controllers/deck.js");
// app.use("/deck", deckController);

// //------------------------------------------------------------------------------------
// // SET DEPENDENCIES
// //------------------------------------------------------------------------------------
// const express = require("express");
// const deck = express.Router();
// const mongoose = require("mongoose");

// //------------------------------------------------------------------------------------
// // GET SEED DATA
// //------------------------------------------------------------------------------------
// // const seed = require("../models/seed");

// //------------------------------------------------------------------------------------
// // IMPORT MODELS WORD AND USER
// //------------------------------------------------------------------------------------
// const { Word, User } = require("../models/users");

// //------------------------------------------------------------------------------------
// // SEED ROUTE
// //------------------------------------------------------------------------------------
// // deck.get("/seed", (req, res) => {
// //   Word.create(seed, (err, data) => {
// //     if (err) {
// //       res.send(err);
// //     } else {
// //       res.redirect("/dashboard");
// //     }
// //   });
// // });

// //------------------------------------------------------------------------------------
// // NEW ROUTE
// //------------------------------------------------------------------------------------
// deck.get("/new", (req, res) => {
//   if (req.session.user) {
//     res.render("app/new.ejs", {
//       user: req.session.user
//     });
//   } else {
//     res.redirect("/");
//   }
// });

// //------------------------------------------------------------------------------------
// // CREATE ROUTE
// //------------------------------------------------------------------------------------
// deck.post("/", (req, res) => {
//   const { body } = req;
//   const { _id } = req.session.user;
//   console.log(_id);
//   let difficulty;
//   switch (body.difficulty) {
//     case "Easy":
//       difficulty = 1;
//       break;
//     case "Medium":
//       difficulty = 2;
//       break;
//     case "Hard":
//       difficulty = 3;
//       break;
//     default:
//       difficulty = 3;
//   }
//   const homeWordId = req.session.user.easyWords[0];
//   console.log(`home word id is:`);
//   console.log(homeWordId);
//   // body.userId = _id;
//   console.log(`The word looks like this`);
//   console.log(body);

//   const word = new Word({
//     userId: _id,
//     name: body.name,
//     definition: body.definition,
//     notes: body.notes,
//     difficulty: difficulty,
//     familiarity: 1
//   });

//   word.save((err, word) => {
//     if (err) {
//       console.log(err);
//     }
//     if (word.difficulty === 1) {
//       User.findByIdAndUpdate(
//         { _id: _id },
//         { $push: { easyWords: word } },
//         { new: true },
//         (err, updatedUser) => {
//           if (err) {
//             res.send(err);
//           } else {
//             console.log(updatedUser);
//             res.redirect(`/dashboard/easy/0`);
//           }
//         }
//       );
//     }
//   });
//   // User.findById
//   // Word.create(body, (err, word) => {
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     console.log(word);
//   //     res.redirect("/dashboard/easy/0");
//   //   }
//   // });

//   // const words = [];
//   // words.push(word);
//   // User.findById(req.session.user._id, (err, user) => {
//   //   if (err) {
//   //     res.send(err);
//   //   } else {
//   //     user[difficulty].push(word);
//   //     User.findByIdAndUpdate(
//   //       req.session.user._id,
//   //       user,
//   //       { new: true },
//   //       (err, updatedUser) => {
//   //         if (err) {
//   //           res.send(err);
//   //         } else {
//   //           console.log(updatedUser);
//   //           res.redirect("/dashboard/easy/0");
//   //         }
//   //       }
//   //     );
//   //   }
//   // });
//   // User.findByIdAndUpdate(
//   //   req.session.user._id,
//   //   { words: words },
//   //   { new: true },
//   //   (err, updatedUser) => {
//   //     if (err) {
//   //       res.send(err);
//   //     } else {
//   //       console.log(updatedUser);
//   //       res.redirect("/dashboard");
//   //     }
//   //   }
//   // );
// });

// //------------------------------------------------------------------------------------
// // EXPORT
// //------------------------------------------------------------------------------------
// module.exports = deck;
