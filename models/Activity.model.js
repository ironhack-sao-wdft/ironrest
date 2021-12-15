const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const ActivitySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  creatorName: { type: String, trim: true },
  type: { type: String, required: true, enum: ["outdoors", "indoors"] },
  duration: { type: Number, required: true, enum: [15, 20, 25, 30] },
  description: { type: String, required: true, trim: true },
  instructions: { type: String, required: true, trim: true },
  // media: {
  //   type: String,
  //   enum: ["video", "audio", "image"],
  //   required: true,
  // },
  mediaType: {
    type: String,
    trim: true,
    required: true,
    enum: ["video", "audio", "image"],
  },
  mediaURL: { type: String, trim: true, required: true },
});

const ActivityModel = model("Activity", ActivitySchema);

module.exports = ActivityModel;
