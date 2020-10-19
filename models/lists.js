const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", unique: true },
  list: [{ type: String, unique: true }],
});

const Lists = mongoose.model("list", listSchema);

module.exports = Lists;
