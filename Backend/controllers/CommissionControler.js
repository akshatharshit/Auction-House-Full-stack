import {AsyncErrors} from "../middleware/AsyncError.js"
import ErrorHandler from "../middleware/error.js";
import  {paymentProof} from "../models/commissionProofSchema.js"
import {User} from "../models/userSchema.js"
import {v2 as  cloudinary} from "cloudinary"
import { Auction } from "../models/auctionSchema.js";
import mongoose from "mongoose";

export const calculateCommission = async (auctionId) => {
    if (!mongoose.Types.ObjectId.isValid(auctionId)) {
        throw new ErrorHandler("Invalid Auction Id format", 400); // Replace next with throw
    }
    const auction = await Auction.findById(auctionId);
    if (!auction) {
        throw new ErrorHandler("Auction not found", 404); // Ensure auction exists
    }
    const commissionRate = 0.05;
    const commission = auction.currentBid * commissionRate;
    const user = await User.findById(auction.createdBy);
    if (!user) {
        throw new ErrorHandler("User not found", 404); // Ensure user exists
    }
    return commission;
};

export const proofOfComission = AsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Please upload a screen shot of payment",400));
    }
   const {proof} = req.files;
   const {amount, comment}= req.body;
   const user = await User.findById(req.user._id);
   console.log(amount);
   console.log(comment);
   if(!amount || !comment){
    return next(new ErrorHandler("Please fill in all fields amount and comments",400));
   }
   if(user.unpaidCommission ===0){
    return res.status(200).json({
        success:true,
        message:"You have no unpaid commission to prove"
    }); 
   }
   if(user.unpaidCommission < amount){
    return next(new ErrorHandler(`amount exceed your unpaid commission so try again and enter ${user.unpaidCommission}`,403));
   }

   const allowedFormats = ["image/png", "image/jpeg", "image/webp"]
   if (!allowedFormats.includes(proof.mimetype)) {
       return next(new ErrorHandler("Screenshot you are uploading must be a png or jpeg or webp fromat ", 400));
   }

    const cloudinaryResponse = await cloudinary.uploader.upload(proof.tempFilePath, {
        folder: "MERN_AUCTION_USER_PAYTEMT_SCREENSHOT",
    })

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "cloudinary error",
            cloudinaryResponse.error || "cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload Screenshot of the payment", 500));
    }
   const commissionProof= await  paymentProof.create({
     userId :  req.user._id,
     proof:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
     },
     amount,
     comment,
   });
   return res.status(201).json({
    success:true,
    message:"Payment proof uploaded successfully it will  be verified by admin and you will be infromed via email in 24hours",
    commissionProof,
    });

});