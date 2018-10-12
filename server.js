//------------------------------------------------------------------------------------
// SET DEPENDENCIES FOR BASIC SERVER
//------------------------------------------------------------------------------------
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const db = mongoose.connection;

//------------------------------------------------------------------------------------
// SET CONFIGURATION FOR APP PORT & MONGODB URI
//------------------------------------------------------------------------------------
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  `mongodb://localhost:27017/gre_flash` ||
  `mongodb://heroku_rkqjw5xq:kuqrdkkulvuumuhep87juukp0g@ds231133.mlab.com:31133/heroku_rkqjw5xq` ||
  process.env.MONGODB_URI;
const url = `mongodb://ashwanth:a123456@ds231133.mlab.com:31133/heroku_rkqjw5xq`;

//------------------------------------------------------------------------------------
// SET MIDDLEWARE FOR METHOD OVERRIDE AND BODY PARSER
// MIDDLEWARE GOES BETWEEN DEPENDENCIES AND ROUTE
//------------------------------------------------------------------------------------
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

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
// CONFIGURE DATABASE AND DATABASE CONNECTION
//------------------------------------------------------------------------------------
mongoose.connect(
  url,
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
