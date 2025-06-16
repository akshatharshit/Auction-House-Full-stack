import {User} from "../models/userSchema.js"
import {AsyncErrors} from "../middleware/AsyncError.js"
import ErrorHandler from "../middleware/error.js"

export const trackCommissionStatus = AsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.user._id);
    if(user.unpaidCommission>0){
         return next(new  ErrorHandler("You have unpaid commission",403));
    }
    next();
});