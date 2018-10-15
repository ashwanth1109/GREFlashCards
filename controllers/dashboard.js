const express = require("express");
const dashboard = express.Router();

const deck1 = require("../data/deck1");
// Get word model

dashboard.get("/easy/:id", (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  if (req.session.user) {
    res.render("app/dashboard.ejs", {
      user: user,
      id: id,
      words: user.easyWords,
      word: user.easyWords[id]
    });
  } else {
    res.redirect("/");
  }
});

module.exports = dashboard;
