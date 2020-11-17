const passport = require("passport");
const Users = require("../models/users");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.getToken = (user) => {
  return jwt.sign(
    {
      user,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 }
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies["jwt"]) {
    token = req.cookies["jwt"];
  }
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;

exports.JwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    Users.findOne({ _id: jwt_payload.user._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.status(403);
      const err = new Error(`Unauthorized: Please Login`);
      next(err);
    }
    req.user = user;
    next();
  })(req, res, next);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      Users.findOrCreate(
        {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        },
        (err, user) => {
          if (err) {
            return done(err, false);
          } else {
            return done(null, user);
          }
        }
      );
    }
  )
);
