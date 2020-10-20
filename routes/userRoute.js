const express = require("express");
const Users = require("../models/users");

const userRoute = express.Router();

userRoute
  .route("/")
  .get((req, res) => {
    res.status(200).end(`USER ROUTE`);
  })
  .post(async (req, res, next) => {
    try {
    } catch (e) {
      next(e);
    }
  });

module.exports = userRoute;
