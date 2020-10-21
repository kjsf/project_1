const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const errors = require("./errors");
const helmet = require("helmet");
const passport = require("passport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const db = process.env.MONGO_URI;

// middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

// import routes
const userRoute = require("./routes/userRoute");
const listRoute = require("./routes/listRoute");

// routes
app.use("/user", userRoute);
app.use("/bucketlist", listRoute);

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
    console.log(`Successfully connected to Atlas`);
    app.listen(PORT);
    console.log(`Server Listening at port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
})();
