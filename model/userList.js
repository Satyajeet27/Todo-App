const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  userItem: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Item = model("note", itemSchema);

module.exports = Item;
