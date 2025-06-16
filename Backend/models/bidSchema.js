import mongoose, { Schema } from "mongoose";

const bidSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    bidder: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        UserName: {
            type: String,
        },
        profileImage: {
            type: String,
        }
    },
    auctionItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
        required: true
    }
});

export const Bid=mongoose.model("Bid",bidSchema);