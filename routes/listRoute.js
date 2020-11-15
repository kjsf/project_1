const express = require("express");
const Lists = require("../models/lists");

const listRoute = express.Router();

listRoute
  .route("/")
  .get((req, res) => {
    let list = ["skydive", "happiest billionaire", "land a job"];
    res.render("buckets", { list });
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

listRoute
  .route("/:userid")
  .get((req, res) => {
    res.status(200).end(`LIST ROUTE`);
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

module.exports = listRoute;
