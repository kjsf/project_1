const express = require("express");
const Users = require("../models/users");

const userRoute = express.Router();

userRoute
  .route("/")
  .get((req, res) => {
    res.status(200).end(`SENDING ALL USERS`);
  })
  .post(async (req, res, next) => {
    try {
    } catch (e) {
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
    } catch (e) {
      next(e);
    }
  });

userRoute
  .route("/:userid")
  .get((req, res) => {
    res.status(200).end(`SENDING ALL USERS`);
  })
  .post(async (req, res, next) => {
    try {
    } catch (e) {
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
    } catch (e) {
      next(e);
    }
  });

module.exports = userRoute;
