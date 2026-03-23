const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    sellerId: String,

    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },

    pickupTime: String,
    image: String
});

module.exports = mongoose.model("Item", ItemSchema);