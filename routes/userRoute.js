const express = require("express");
const Users = require("../models/users");

const userRoute = express.Router();

userRoute.route("/").get((req, res) => {
  res.status(200).end(`USER ROUTE`);
});

module.exports = userRoute;
