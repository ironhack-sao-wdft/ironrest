const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: {type: String, default: "customer"}
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
