const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//const helmet = require("helmet");
const passport = require("passport");
const errors = require("./config/errors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const db = process.env.MONGO_URI;

// connect to atlas and run server
(async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to DB`);
    app.listen(PORT);
    console.log(`Server Listening at port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
})();

// import routes
const listRoute = require("./routes/listRoute");
const authRoute = require("./routes/authRoute");

// middlewares
app.use(morgan("dev"));
//app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authRoute);
app.use("/list", listRoute);

// error handling
app.use(errors.handle404);
app.use(errors.errorHandler);
