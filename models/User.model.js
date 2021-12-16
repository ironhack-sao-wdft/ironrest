const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true, maxLength: 46 },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
  favorites: [{ type: String }],
  blockedActivities: [{ type: String }],
  publishedActivities: [{ type: mongoose.Types.ObjectId, ref: "Activity" }],
  pictureURL: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dabmc9zrm/image/upload/v1639657132/pause/logo_qah10p.png",
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
