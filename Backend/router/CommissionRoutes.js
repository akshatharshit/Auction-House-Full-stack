import express from  'express';
import {proofOfComission} from "../controllers/CommissionControler.js";
import {isAuthenticated,isAuthorized} from "../middleware/auth.js";
const router = express.Router();
router.post("/proof",isAuthenticated,isAuthorized("Auctioneer"),proofOfComission);
export default router;