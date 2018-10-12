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
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//------------------------------------------------------------------------------------
// SET MIDDLEWARE FOR METHOD OVERRIDE AND BODY PARSER
// MIDDLEWARE GOES BETWEEN DEPENDENCIES AND ROUTE
//------------------------------------------------------------------------------------
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

//------------------------------------------------------------------------------------
// SET ROUTES
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
// GET ROUTE: TEST
// http://localhost:3000/
//------------------------------------------------------------------------------------
app.get(`/`, (req, res) => {
  res.send(`Test route is working. Express app is set up correctly`);
});

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
