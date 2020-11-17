const express = require("express");
const passport = require("passport");
const authenticate = require("../config/authenticate");

const authRoute = express.Router();

authRoute.get("/signin", (req, res, next) => {
  if (req.cookies["jwt"]) {
    res.status(302).redirect("/list");
  } else {
    res.status(302).redirect("/auth/google");
  }
});

authRoute.get("/signout", (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 }).redirect("/");
});

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
