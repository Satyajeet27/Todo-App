const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    workItem: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const WORKITEM = model("note", itemSchema);

module.exports = WORKITEM;
