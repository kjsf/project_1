const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleid: String,
});

const Users = mongoose.model("user", userSchema);

module.exports = Users;
