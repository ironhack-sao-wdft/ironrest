const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const ActivitySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  creatorName: { type: String, required: true, trim: true },
  type: { type: String, required: true, enum: ["outdoors", "indoors"] },
  description: { type: String, required: true, trim: true },
  instructions: { type: String, required: true, trim: true },
  usesMedia: {
    type: String,
    enum: ["video", "audio"],
  },
  pictureURL: { type: String, trim: true },
});

const ActivityModel = model("Activity", ActivitySchema);

module.exports = ActivityModel;
