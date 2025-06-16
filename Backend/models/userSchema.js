import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: [3, "Username atleast contain 3 character"],
        maxLength: [40, "Username user name cannot exceed 40 character"],
    },
    password: {
        type: String,
        selected: false,
        minLength: [8, "Password atleast contain 8 character"],
        maxLength: [100, "Password cannot exceed 100 character"],
    },
    email: String,
    address: String,
    phone: {
        type: String,
        minLength: [10, "Phone number must contain excat 10 digit"],
        maxLength: [10, "Phone number must contain excat 10 digit"],
    },
    profileImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    PaymentMethods: {
        bankTransfar: {
            bankAccountNumber: String,
            bankAccountName: String,
            bankName: String,
        },
        UpiId: {
            upiId: String
        },
        paypal: {
            paypalId: String
        }
    },
    role: {
        type: String,
        enum: ["Auctioneer", "Bidder", "Super Admin"],
    },
    unpaidCommission: {
        type: Number,
        default: 0
    },
    auctionWon: {
        type: Number,
        default: 0
    },
    monneySpent: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


// hashing the password using bcrypt
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// for matching the password with user
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id :  this._id}, process.env.JWT_SECRET_KEY, {
         expiresIn: process.env.JWT_EXPIRE,
        });
};



export const User = mongoose.model("user", userSchema);