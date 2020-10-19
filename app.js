const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// import routes
const userRoute = require("./routes/userRoute");
const listRoute = require("./routes/listRoute");

// connect to Atlas
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`Successfully connected to the DB`);
  }
);

app.use("/user", userRoute);
app.use("/bucketlist", listRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
});
