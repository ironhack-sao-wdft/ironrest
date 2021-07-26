const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  image: {
    type: String,
    default: (src =
      "https://res.cloudinary.com/dbthudmai/image/upload/v1602808218/defaultAvatar_iebqlk.png"),
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
