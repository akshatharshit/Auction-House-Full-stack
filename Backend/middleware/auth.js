import {User} from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { AsyncErrors } from "./AsyncError.js";

// login data provided by user is valid or not
export const isAuthenticated = AsyncErrors(async(req,res,next)=>{
      const token = req.cookies.token;
      if(!token){
        return next(new ErrorHandler("Please login to access this route..",400));
      } 
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);
      next();
});

// athority for acessing the options avilable
export const isAuthorized = (...roles)=>{
     return (req,res,next)=>{
      if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`${req.user.role} are not authorized to access this route..`,403));
        }
        next();
     }
};