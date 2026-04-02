const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
    itemId: String,
    buyerId: String,
    sellerId: String,   
    offerPrice: Number,
    comment: String,
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("Offer", OfferSchema);