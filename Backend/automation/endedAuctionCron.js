import cron from  'node-cron';
import {Auction} from "../models/auctionSchema.js"
import {User} from "../models/userSchema.js"
import {calculateCommission} from "../controllers/CommissionControler.js"
import { Bid } from '../models/bidSchema.js';
import {sendEmail} from '../utils/sendemail.js'
export const endedAuctinCron = ()=>{
    cron.schedule("*/1 * * * *",async()=>{
       const now = new Date();
       const endedAuctins= await Auction.find({
        endTime:{$lt:now},
        CommissionCalculated: false,
       });
       for(const auction of endedAuctins){
        try{
            const commissionAmount = await calculateCommission(auction._id);
            auction.CommissionCalculated= true;
            const highestBidder = await Bid.findOne({
                 auctionItem : auction._id,
                 amount: auction.currentBid,
            });
        const auctioneer = await User.findById(auction.createdBy);
        auctioneer.unpaidCommission= commissionAmount; 
        if(highestBidder){
            auction.highestBidder= highestBidder.bidder.id;
            await auction.save();
            const bidder = await User.findById(highestBidder.bidder.id);
            await User.findByIdAndUpdate(auctioneer._id,{
                  $inc:{
                    monneySpent : highestBidder.amount,
                    auctionWon: 1,
                  }
            }, {new : true});
            await User.findByIdAndUpdate(auctioneer._id,{
                $inc:{
                  unpaidCommission : commissionAmount, 
                }
            },{new : true});
            const subject= `Congratulation You won the auction for ${auction.title}`;
            const message = `Dear ${bidder.userName} \n\n Congratulation! you have won the auction for ${auction.title} \n\n Now we have to 
            procced to next step . Please contact us to arrange the payment and delivery of the item.`
            console.log("Sending email to highet bidder ");
            sendEmail({email: bidder.email,subject, message});
            console.log("Succesfully email send to highest bidder ");
        }else{
            await auction.save();
        } 
        }catch(error){
        return next (console.error(error|| "Some error in ended auction cron"));
        }
       }
    });
};
