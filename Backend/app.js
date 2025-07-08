import { config, configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middleware/error.js";

import userRouter from "./router/userRoutes.js"
import auctionRoutes from "./router/auctionRoutes.js"
import bidRouter  from "./router/bidRoutes.js"
import commissionRouter from "./router/CommissionRoutes.js"
import superAdminRouter from "./router/superAdminRoutes.js"
import {endedAuctinCron} from "./automation/endedAuctionCron.js"
import {verifyCommissionCron} from "./automation/verifyCommissionCron.js"
const app=express();
config({
    path: "./config/config.env"   
});

app.use(cookieParser());

// connect frontend and backend
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:  ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/",
})
);
// calling user router
app.use("/api/v1/user", userRouter);
// calling auction router
app.use("/api/v1/auctionitem", auctionRoutes);
//  calling bid router
app.use("/api/v1/bid", bidRouter);
//  calling commission router
app.use("/api/v1/commission", commissionRouter);
// calling super admin router
app.use("/api/v1/superadmin", superAdminRouter);
// calling cron 
//endedAuctinCron();
//verifyCommissionCron();
// connecting to mongodb database
connection();
// error handler middleware
app.use(errorMiddleware);


export default app;
