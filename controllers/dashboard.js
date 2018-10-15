const express = require("express");
const dashboard = express.Router();

const deck1 = require("../data/deck1");
// Get word model

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

dashboard.get("/yourDeck/:id", (req, res) => {
  const { id } = req.params;
  if (req.session.user) {
    res.render("app/yourDeck.ejs", {
      user: req.session.user,
      word: deck1[id],
      deck1: deck1
    });
  } else {
    res.redirect("/");
  }
});

module.exports = dashboard;
