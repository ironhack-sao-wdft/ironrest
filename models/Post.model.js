const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    content: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true],
    },
    tripCost: String,
    pros: {
      type: String,
      lowercase: true,
      trim: true,
    },
    cons: {
      type: String,
      lowercase: true,
      trim: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    image: {
      type: String,
      default: "",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Post", PostSchema);
