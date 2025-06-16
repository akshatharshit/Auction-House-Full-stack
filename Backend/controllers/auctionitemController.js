import { AsyncErrors } from "../middleware/AsyncError.js";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import ErrorHandler from "../middleware/error.js";
import {v2 as cloudinary} from  "cloudinary";
import mongoose from "mongoose";



export const addNewAuctionItem = AsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Auction item image is required", 400));
    }

    const { image } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(image.mimetype)) {
        return next(new ErrorHandler("profile image must be a png or jpeg or webp", 400));
    }

    const { title,
        description,
        startingBid,
        condition,
        category,
        startTime,
        endTime,
    } = req.body;

    // if (!title || !description || !startingBid || !condition || !category || !startTime || !endTime) {
    //     return next(new ErrorHandler("Please fill in all fields of items (details)", 400));
    // }
    
    const missingFields = [];
if (!title) missingFields.push("title");
if (!description) missingFields.push("description");
if (!startingBid) missingFields.push("startingBid");
if (!condition) missingFields.push("condition");
if (!category) missingFields.push("category");
if (!startTime) missingFields.push("startTime");
if (!endTime) missingFields.push("endTime");

if (missingFields.length > 0) {
    return next(new ErrorHandler(`Please fill in the following fields: ${missingFields.join(', ')}`, 400));
}


    // if (new Date(startTime) < Date.now()) {
    //     return next(new ErrorHandler("Start time must be in the future (starting time must be greater than present time)", 400));
    // }
    // if (new Date(startTime) >=  new Date.now(endTime)) {
    //     return next(new ErrorHandler("ending time must be in the future (ending time must be greater than starting time)", 400));
    // }
    if (new Date(startTime) < Date.now()) {
        return next(new ErrorHandler("Start time must be in the future (starting time must be greater than the present time)", 400));
    }
    
    if (new Date(startTime) >= new Date(endTime)) {
        return next(new ErrorHandler("Ending time must be greater than starting time", 400));
    }
    

    const alreadyOneAuctionActive = await Auction.find({
        createdBy: req.user._id,
        endTime:  { $gt: Date.now() },
    });
    // if(alreadyOneAuctionActive){
    //     return next(new ErrorHandler("You can't create multiple active auctions at the same time or you have a unpaid commission", 400));
    // }
    if (alreadyOneAuctionActive.length > 0) {
        return next(new ErrorHandler("You can't create multiple active auctions at the same time or you have an unpaid commission", 400));
    }
     


    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "profileImages_MERN_AUCTION_Auction",
        })
    
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error(
                "cloudinary error",
                cloudinaryResponse.error || "cloudinary error"
            );
            return next(new ErrorHandler("Failed to upload auction image", 500));
        }
        const auctionItem = await Auction.create({
            title,
        description,
        startingBid,
        condition,
        category,
        startTime,
        endTime,
        image:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        createdBy: req.user._id,
        });
        return res.status(201).json({
            success: true,
            message:  `Auction item created successfully and will be listed on ${startTime}`,
            auctionItem,
            });
    } catch (error) {
        return next(new ErrorHandler( error.message || "faild to creat auction", 500 ));
    }
});


export const getAllItems = AsyncErrors(async(req,res,next)=>{
    let items =  await Auction.find();
    res.status(200).json({
        success: true,
        items,
    });
});



export const getAuctionDetails = AsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
       return next(new ErrorHandler("Invalid Id format", 400));
   }
   const auctionItems = await Auction.findById(id);
   if(!auctionItems){
       return next(new ErrorHandler("Auction item not found", 404));
       }
       const bidders = auctionItems.bids.sort((a,b)=> b.bi-a.bid);
       res.status(200).json({
           success: true,
           auctionItems,
           bidders,
           }); 
});



export const getMyAuctionItems = AsyncErrors(async(req,res,next)=>{
      const items = await Auction.find({createdBy: req.user._id});
      res.status(200).json({
        success: true,
        items,
        });
});



export const removeFromAuction = AsyncErrors(async(req,res,next)=>{
     //3:33:08
     const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invalid Id format", 400));
    }
    const auctionItems = await Auction.findById(id);
    if(!auctionItems){
        return next(new ErrorHandler("Auction item not found", 404));
        }
        await auctionItems.deleteOne();
        res.status(200).json({
            success: true,
            message:"Auction item deleted succes"
            });

});



export const republishItems = AsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
       return next(new ErrorHandler("Invalid Id format", 400));
   }
   let auctionItems = await Auction.findById(id);
   if(!auctionItems){
       return next(new ErrorHandler("Auction item not found", 404));
       }
       if(!req.body.startTime ||  !req.body.endTime){
        return next(new ErrorHandler("Please fill in start and end time", 400));
       }

       if(new Date(auctionItems.endTime>Date.now())){
        return next(new ErrorHandler("Auction item is not ended yet", 400));
       }
       let data={
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        price: req.body.price,
       }
       if(data.startTime <Date.now()){
        return next(new ErrorHandler("Start time must be greater than current time", 400));
       }
       if(data.startTime >= data.endTime){
        return next(new ErrorHandler("Start time must be less than end time", 400));
       }
       if(auctionItems.highestBidder){
        const highestBidder = await User.findById(auctionItems.highestBidder);
        highestBidder.monneySpent -= auctionItems.currentBid;
        highestBidder.auctionWon -= -1;
        highestBidder.save();
       }
       //3/41/17
       data.bids=[];
       data.CommissionCalculated=false;
       data.currentBid=0;
       data.highestBidder=null;
       auctionItems = await Auction.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true,
        useFindAndModify: false,
       });
       await Bid.deleteMany({auctionItem: auctionItem._id});
       const createdBy = await User.findByIdAndUpdate(req.user._id,{unpaidCommission:0},{
        new:true,
        runValidators:false,
        useFindAndModify: false,
       });
       res.status(200).json({
        success: true,
        message: "Auction item republished successfully",
        auctionItems
        });
});