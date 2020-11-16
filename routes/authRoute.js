const express = require("express");
const passport = require("passport");
const authenticate = require("../config/authenticate");

const authRoute = express.Router();

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRoute.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res
      .cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
      .redirect("/list");
  }
);

module.exports = authRoute;
