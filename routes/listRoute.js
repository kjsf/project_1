const express = require("express");
const Lists = require("../models/lists");

const listRoute = express.Router();

listRoute
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Lists.find();
      console.log(list);
      res.render("buckets", { list });
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const entry = await Lists.create(req.body);
      res.status(200).json(entry);
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
      const entry = await Lists.find();
      console.log(entry);
      res.status(200).json(entry);
    } catch (e) {
      next(e);
    }
  });

module.exports = listRoute;
