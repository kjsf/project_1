const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const errors = require("./config/errors");
const helmet = require("helmet");
const passport = require("passport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const db = process.env.MONGO_URI;

app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
//app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(passport.initialize());

// import routes
const userRoute = require("./routes/userRoute");
const listRoute = require("./routes/listRoute");

// routes
app.use("/user", userRoute);
app.use("/list", listRoute);

app.use("/buckets", (req, res) => {
  res.render("buckets");
});

app.use("/", (req, res) => {
  res.render("index");
});

// error handling
app.use(errors.handle404);
app.use(errors.errorHandler);

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
