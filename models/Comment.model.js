const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Comment", CommentSchema);
