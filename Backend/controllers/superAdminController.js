import mongoose from "mongoose";
import { AsyncErrors } from "../middleware/AsyncError.js"
import ErrorHandler from "../middleware/error.js"
import { Commission } from "../models/commissionSchema.js"
import { User } from "../models/userSchema.js"
import { Auction } from "../models/auctionSchema.js";
import { paymentProof } from "../models/commissionProofSchema.js";

export const deleteAuctionItem = AsyncErrors(async (req, res, next) => {
    //3:33:08
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid Id format", 400));
    }
    const auctionItems = await Auction.findById(id);
    if (!auctionItems) {
        return next(new ErrorHandler("Auction item not found", 404));
    }
    await auctionItems.deleteOne();
    res.status(200).json({
        success: true,
        message: "Auction item deleted succes"
    });

});

export const getAllPaymentProofs = AsyncErrors(async (req, res, next) => {
    let paymentProofs = await paymentProof.find();
    res.status(200).json({
        success: true,
        paymentProofs,
    });
});

export const getPaymentProofDetail = AsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const PaymentProofDetail = await paymentProof.findById(id);
    res.status(200).json({
        success: true,
        PaymentProofDetail,
    });

});

//5/21/24
export const updateProofStatus = AsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { status, amount } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid Id format", 400));
    }
    let proof = await paymentProof.findById(id);
    if (!proof) {
        return next(new ErrorHandler("Payment proof not found", 404));
    }
    proof = await paymentProof.findByIdAndUpdate(id, { status, amount },
        { new: true, runValidators: true, useFindAndModify: false },
    );
    res.status(200).json({
        success: true,
        message: "Payment proof status updated",
        proof,
    })
})

export const deletePaymentProof = AsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const proof = await paymentProof.findById(id);
    if (!proof) {
        return next(new ErrorHandler("Payment proof not found", 404));
    }
    await proof.deleteOne();
    res.status(200).json({
        success: true,
        message: "Payment proof deleted",
    });
})

export const fetchAllUsers = AsyncErrors(async (req, res, next) => {
    const users = await User.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    year: { $month: "$createdAt" },
                    role: "$role",
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                month: "$_id.month",
                year: "$_id.year",
                role: "$_id.role",
                count: 1,
                _id: 0,
            }
        },
        {
            $sort: {
                year: 1,
                month: 1,
            }
        }
    ]);

    const bidders = users.filter((user) => user.role === "Bidder");
    const auctioneers = users.filter((user) => user.role === "Auctioneer");

    const tranfromDataToMonthlyArray = (data, totalMonths = 12) => {
        const result = Array(totalMonths).fill(0);
        data.forEach(item => {
            result[item.month - 1] = item.count;
        });
        return result;
    };

    const biddersArray = tranfromDataToMonthlyArray(bidders);
    const auctioneersArray = tranfromDataToMonthlyArray(auctioneers);
    res.status(200).json({
        success: true,
        biddersArray,
        auctioneersArray,
    });

});


export const monthlyRevenus = AsyncErrors(async(req,res,next)=>{
      const payments = await Commission.aggregate([
      {
             $group:{
                _id:{
                    month:{$month: "$createdAt"},
                    year:{$year: "$createdAt"},

                },
                totalAmount:{
                    $sum: "$amount"
                },  
             }
      },
      {
        $sort:{"_id.year":1,"_id.month":1},
      }
    ]);
    const tranfromDataToMonthlyArray = (payments, totalMonths = 12) => {
        const result = Array(totalMonths).fill(0);
        payments.forEach(payment => {
            result[payment._id.month - 1] = payment.totalAmount;
        });
        return result;
    };
   const totalMonthlyRevenue= tranfromDataToMonthlyArray(payments);
   res.status(200).json({
    success: true,
    totalMonthlyRevenue,
    });
});

