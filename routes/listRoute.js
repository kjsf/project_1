const express = require("express");
const Lists = require("../models/lists");
const authenticate = require("../config/authenticate");

const listRoute = express.Router();

listRoute
  .route("/")
  .get(authenticate.verifyUser, async (req, res, next) => {
    try {
      const list = await Lists.findOne({ user: req.user._id });
      res.render("buckets", { list });
    } catch (e) {
      next(e);
    }
  })
  .post(authenticate.verifyUser, async (req, res, next) => {
    try {
      const found = await Lists.findOne({ user: req.user._id });
      if (found === null) {
        await Lists.create({
          user: req.user._id,
          list: [{ entry: req.body.entry }],
        });
      } else {
        await Lists.findOneAndUpdate(
          { user: req.user._id },
          { $addToSet: { list: [{ entry: req.body.entry }] } },
          { new: true }
        );
      }
      res.status(200).json({ success: true });
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
  .delete(authenticate.verifyUser, async (req, res, next) => {
    try {
      await Lists.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { list: { entry: req.body.entry } } },
        { new: true }
      );
      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  });

module.exports = listRoute;
