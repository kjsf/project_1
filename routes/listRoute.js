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
      console.log(req.body);
      console.log(req.user);
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
      console.log(req.body.entry);
      const deleteEntry = await Lists.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { list: { entry: req.body.entry } } },
        { new: true }
      );
      console.log(deleteEntry);
      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  });

listRoute.post("/post", async (req, res, next) => {
  try {
    console.log(`got hit`);
    const entry = await Lists.create(req.body);
    res.status(200).json(entry);
  } catch (e) {
    next(e);
  }
});

module.exports = listRoute;
