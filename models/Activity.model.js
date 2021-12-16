const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const ActivitySchema = new Schema({
<<<<<<< HEAD
  name: { type: String, required: true, unique: true, trim: true },
  creatorName: { type: String, trim: true, default: "Pause" },
  creatorURL: { type: String, trim: true },
  type: { type: String, required: true, enum: ["outdoors", "indoors"] },
  duration: { type: Number, required: true, enum: [15, 20, 25, 30] },
  description: { type: String, required: true, trim: true },
  instructions: { type: String, required: true, trim: true },
  mediaType: {
    type: String,
    trim: true,
    required: true,
    enum: ["video", "audio", "image"],
  },
=======
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 46,
  },
  creatorName: { type: String, trim: true },
  type: { type: String, required: true, enum: ["outdoors", "indoors"] },
  duration: { type: Number, required: true, enum: [15, 20, 25, 30] },
  description: { type: String, required: true, trim: true, maxLength: 140 },
  instructions: { type: String, required: true, trim: true, maxLength: 140 },
  // media: {
  //   type: String,
  //   trim: true,
  //   required: true,
  //   enum: ["video", "audio", "image"],
  // },
>>>>>>> 9a095ef89f49ac59eff8a79772d898d7b8824c31
  mediaURL: { type: String, trim: true, required: true },
});

const ActivityModel = model("Activity", ActivitySchema);

module.exports = ActivityModel;
