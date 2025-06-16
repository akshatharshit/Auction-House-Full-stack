import {placebid} from "../controllers/bidController.js";
import express from "express";
const router=express.Router();
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";
import { checkAuctionEndTime } from "../middleware/checkAuctionEndTime.js";

router.post("/place/:id",isAuthenticated,isAuthorized("Bidder"),checkAuctionEndTime,placebid);

export default router;