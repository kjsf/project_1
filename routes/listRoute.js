const express = require("express");
const Lists = require("../models/lists");

const listRoute = express.Router();

listRoute
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Lists.findOne({ user: "kez" });
      const list = data.list;
      res.render("buckets", { list });
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log(req.body);
      const addEntry = await Lists.findOneAndUpdate(
        { user: "kez" },
        { $addToSet: { list: [{ entry: req.body.entry }] } },
        { new: true }
      );
      console.log(addEntry);
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
  .delete(async (req, res, next) => {
    try {
      console.log(req.body.entry);
      const deleteEntry = await Lists.findOneAndUpdate(
        { user: "kez" },
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
