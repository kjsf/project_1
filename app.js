const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const errors = require("./errors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const db = process.env.MONGO_URI;

// middlewares
app.use(morgan("common"));
app.use(express.json());
app.use(helmet());

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
    });
    console.log(`Successfully connected to the DB`);
    app.listen(PORT);
    console.log(`Server Listening at port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
})();
