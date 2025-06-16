import { AsyncErrors } from "../middleware/AsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";


export const register = AsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("profile image is required", 400));
    }

    const { profileImage } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"]
    if (!allowedFormats.includes(profileImage.mimetype)) {
        return next(new ErrorHandler("profile image must be a png or jpeg or webp", 400));
    }

    const { userName, password, email, address, phone, role, bankAccountNumber, bankAccountName, bankName, upiId, paypalId, } = req.body;

    if (!userName || !password || !email || !address || !phone || !role) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }

    if (role === "Auctioneer") {
        if (!bankAccountNumber || !bankAccountName || !bankName || !upiId) {
            return next(new ErrorHandler("Please fill all the fields", 400)
            );
        }


        if (!paypalId) {
            return next(new ErrorHandler("Please fill paypalId field", 400)
            );
        }

        if (!upiId) {
            return next(new ErrorHandler("Please fill upiId field", 400)
            );
        }
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath, {
        folder: "profileImages_MERN_AUCTION_USER",
    })
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "cloudinary error",
            cloudinaryResponse.error || "cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload profile image", 500));
    }

    // storing all the user data in database
    const user = await User.create({
        userName,
        password,
        email,
        address,
        phone,
        role,
        profileImage: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        PaymentMethods: {
            bankTransfar: {
                bankAccountNumber,
                bankAccountName,
                bankName,
            },
            UpiId: {
                upiId
            },
            paypal: {
                paypalId
            }
        },
    });

    generateToken(user, "User Registered", 201, res);


    // return res.status(201).json({
    //     success: true,
    //     message: "User Registered",
    // });
});


export const login = AsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Full fill the form"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    generateToken(user, "Login successfully", 200, res);

});


export const getProfile = AsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});


export const logout = AsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged out",
    })
});


export const fetchLeaderboard = AsyncErrors(async (req, res, next) => {
    const users = await User.find({ monneySpent: { $gt: 0 } });
    const leaderboard = users.sort((a, b) => b.monneySpent - a.monneySpent);
    res.status(200).json({
        success: true,
        leaderboard,
    });
});