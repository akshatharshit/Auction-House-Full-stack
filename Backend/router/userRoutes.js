import {fetchLeaderboard, getProfile, login, logout, register} from "../controllers/userController.js";
import express from "express";
const router=express.Router();
import { isAuthenticated } from "../middleware/auth.js";

router.post("/register",register);
router.post("/login",login);
router.get("/me" ,isAuthenticated,getProfile);
router.get("/logout",isAuthenticated,logout);
router.get("/leaderboard", fetchLeaderboard);


export default router;

