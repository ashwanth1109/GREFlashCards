const express = require("express");
const dashboard = express.Router();

const deck1 = require("../data/deck1");

dashboard.get(`/`, (req, res) => {
  if (req.session.user) {
    res.render("app/dashboard.ejs", {
      user: req.session.user,
      deck1: deck1
    });
  } else {
    res.redirect("/");
  }
});

dashboard.get("/yourDeck", (req, res) => {
  if (req.session.user) {
    res.render("app/yourDeck.ejs");
  } else {
    res.redirect("/");
  }
});

module.exports = dashboard;
