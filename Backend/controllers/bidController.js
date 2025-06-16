import { AsyncErrors } from "../middleware/AsyncError.js"
import ErrorHandler from "../middleware/error.js"
import {Auction} from "../models/auctionSchema.js"
import {Bid} from  "../models/bidSchema.js"
import {User}  from "../models/userSchema.js"


export const placebid = AsyncErrors(async(req,res,next)=>{
    const {id}  = req.params;
    const auctionItem = await  Auction.findById(id);
    if(!auctionItem){
        return next(new ErrorHandler("Auction not found",404));
    }
     const {amount} = req.body;
     if(!amount){
        return next(new ErrorHandler("Please enter a valid amount",400));
     }
     // 4/12/00
     if(amount <= auctionItem.currentBid){
        return next(new ErrorHandler("Make sure that enter bid is greater than the current bid (for bid to be placed)",400));
     }
     if(amount <= auctionItem.startingBid){
        return next(new ErrorHandler("Make sure that enter bid is greater than the intial amount (for starting the auction)",400));
     }
     try {
        const existingBid = await Bid.findOne({
            "bidder.id":  req.user.id,
            auctionItem: auctionItem._id,
        });
        const existingBidInAuction = auctionItem.bids.find(bid => bid.userId.toString() ==  req.user._id.toString());
        if(existingBidInAuction && existingBid){
            existingBidInAuction.amount=amount;
            existingBid.amount=amount;
            await existingBidInAuction.save();
            await existingBid.save();
            auctionItem.currentBid= amount;
        }else{
            const bidderDetail = await  User.findById(req.user._id);
            const bid= await  Bid.create({
                amount,
                bidder:{
                    id:bidderDetail._id,
                    userName: bidderDetail.userName,
                    profileImage:  bidderDetail.profileImage?.url,
                    
                },
                auctionItem: auctionItem._id,

            });
            auctionItem.bids.push({
                userId: req.user._id,
                userName:  bidderDetail.userName,
                profileImage:  bidderDetail.profileImage?.url,
                amount,
            });
            auctionItem.currentBid= amount;
        }
        await  auctionItem.save();
        res.status(201).json({
            success: true,
            message: "Bid placed successfully",
            currentBid:  auctionItem.currentBid,
        });
     } catch (error) {
         return next(new ErrorHandler(error.message || "Failed to place  bid", 500));
     }
});