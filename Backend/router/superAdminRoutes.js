import express from "express";
import {isAuthenticated,isAuthorized} from "../middleware/auth.js"
import {deleteAuctionItem,deletePaymentProof,fetchAllUsers,getAllPaymentProofs,getPaymentProofDetail,monthlyRevenus,updateProofStatus} from "../controllers/superAdminController.js"

const router = express.Router();

router.delete("/auctionitem/delete/:id",isAuthenticated,isAuthorized("Super Admin"),deleteAuctionItem);
router.get("/paymentproofs/getall",isAuthenticated,isAuthorized("Super Admin"),getAllPaymentProofs);
router.get("/paymentproofs/:id",isAuthenticated,isAuthorized("Super Admin"),getPaymentProofDetail);
router.put("/paymentproofs/status/u pdate/:id",isAuthenticated,isAuthorized("Super Admin"),updateProofStatus);
router.delete("/paymentproofs/delete/:id",isAuthenticated,isAuthorized("Super Admin"),deletePaymentProof);
router.get("/users/getall",isAuthenticated,isAuthorized("Super Admin"),fetchAllUsers); 
router.get("/monthlyincome",isAuthenticated,isAuthorized("Super Admin"),monthlyRevenus); 





export default router;