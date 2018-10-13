const express = require("express");
const dashboard = express.Router();

dashboard.get(`/`, (req, res) => {
  res.render("app/dashboard.ejs", {
    user: req.session.user
  });
});

module.exports = dashboard;
