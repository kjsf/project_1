const express = require("express");
const List = require("../models/lists");

const listRoute = express.Router();

listRoute.route("/").get((req, res) => {
  res.status(200).end(`LIST ROUTE`);
});

module.exports = listRoute;
