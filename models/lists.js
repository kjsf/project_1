const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", unique: true },
  list: [
    {
      entry: { type: String, unique: true, required: true },
      status: { type: Boolean, default: false },
    },
  ],
});

const Lists = mongoose.model("list", listSchema);

module.exports = Lists;
