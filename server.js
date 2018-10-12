//------------------------------------------------------------------------------------
// SET DEPENDENCIES FOR BASIC SERVER
//------------------------------------------------------------------------------------
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const db = mongoose.connection;
const session = require("express-session");

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
// SET ROUTES
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
// GET ROUTE: HOMEPAGE
// http://localhost:3000/
//------------------------------------------------------------------------------------
app.get(`/`, (req, res) => {
  res.render(`index.ejs`);
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
