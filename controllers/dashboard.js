const express = require("express");
const dashboard = express.Router();

dashboard.get(`/`, (req, res) => {
  if (req.session.user) {
    res.render("app/dashboard.ejs", {
      user: req.session.user
    });
  } else {
    res.redirect("/");
  }
});

module.exports = dashboard;
