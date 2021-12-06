const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstablishmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    pictureUrl: {
        type: String,
        trim: true,
        default: "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
    },
    address: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    openingHours: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ["market", "drugstore", "restaurant"],
        required: true,
        trim: true
    },
    products: [{type: Schema.Types.ObjectId, ref: "User"}],
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}],
    review: [{type: Schema.Types.ObjectId, ref: "Review"}],

})

const EstablishmentModel = model("Establishment", EstablishmentSchema);

module.exports = EstablishmentModel;