const passport = require('passport')
const Users = require('../models/users')
const JwtStrategy = require('passport-jwt').Strategy,
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require(dotenv).config()


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
  Users.findOne({id: jwt_payload.sub}, (err, user) =>{
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      Users.findOrCreate({ googleId: profile.id }, (err, user) =>{
        return cb(err, user);
      });
    }
  )
);
