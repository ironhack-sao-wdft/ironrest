const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
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
  adress: {
    street: { type: String, required: true },
    number: { type: Number, required: true },
    zip: { type: "/^d{5}(?:[-s]d{4})?$/", required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [{ type: Types.ObjectId, ref: "Order" }],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
