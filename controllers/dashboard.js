const express = require("express");
const dashboard = express.Router();

dashboard.get(`/`, (req, res) => {
  res.render("app/dashboard.ejs");
});

module.exports = dashboard;
