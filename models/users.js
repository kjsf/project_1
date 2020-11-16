const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-find-or-create");

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.plugin(findOrCreate);

const Users = mongoose.model("user", userSchema);

module.exports = Users;
