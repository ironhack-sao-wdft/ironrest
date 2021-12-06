const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: { type: String, maxlength: 200 },
    establishmentId: { type: Schema.Types.ObjectId, ref: "Establishment" },
  });


  module.exports = mongoose.model("Review", reviewSchema);