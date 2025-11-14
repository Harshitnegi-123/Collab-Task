import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            uppercase: true,
            trim: true
        },
        
        password: {
            type: String, 
            required: true,
            unique: true,
        },
        passwordResetToken:{
            type: String
        },
        passwordResetExpires:{
            type :Date
        },
        isVerified:{
            type: Boolean,
            default: false,
        },
        verificationOTP:{
            type: String,
            default: null,
        },
        verificationOTPExpires:{
            type: Date,
            default: null,
        },
        loginOTP:{
            type: String,
            default: null,
        },
        loginOTPExpires:{
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);
const User = mongoose.model('User',UserSchema);
export default User;