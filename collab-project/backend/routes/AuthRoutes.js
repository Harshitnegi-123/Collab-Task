import express from "express";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from 'crypto'
import { generateOTP, sendLoginOTP, sendVerificationEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all the necessary fields." });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    const otpExpires = Date.now() + 10*60*1000; //!0 minutes i guess.
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      verificationOTP: otp,
      verificationOTPExpires: otpExpires,
      isVerified: false,
    });
    await newUser.save();
    await sendVerificationEmail(newUser.email, otp);
    res.status(201).json({ message: "Check email for verification" });
  } catch (error) {
    console.error("Oops!! looks like an error occurred.", error);

    res.status(500).json({ error: "Server error, please try again later !" });
  }
});
router.post('/verify-email', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ 
            email: email, 
            verificationOTP: otp,
            verificationOTPExpires: { $gt: Date.now() } // Check if not expired
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired OTP." });
        }

        // Verification successful!
        user.isVerified = true;
        user.verificationOTP = null;
        user.verificationOTPExpires = null;
        await user.save();

        res.status(200).json({ message: "Email verified successfully! You can now log in." });

    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Something seems invalid here, check it again !" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    if(!user.isVerified){
      return res.status(401).json({error: "Email not verified, Verify again and continue !"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const otp = generateOTP();
    const otpExpires = Date.now() + 5*60*1000;
    user.loginOTP = otp;
    user.loginOTPExpires = otpExpires;
    await user.save();
    await sendLoginOTP(user.email, otp);
    res.status(200).json({message: "Credentials verified, Check for OTP !"});
    
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ error: "Server error, please try again" }); // Use 500 for server errors
  }
});

//verify login
router.post('/verify-login', async (req, res)=>{
  try{
    const{email,otp} = req.body;
    const user = await User.findOne({
      email: email,
      loginOTP: otp,
      loginOTPExpires: { $gt: Date.now()} //checking if not expired;

    });
    if(!user){
      return res.status(400).json({error: "Invalid OTP, try again !"})
    }
    user.loginOTP = null;
    user.loginOTPExpires = null;
    await user.save();
    const payload = {
            id: user._id,
            username: user.username,
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error verifying login:", error);
        res.status(500).json({ error: "Server error" });
    }
  }
)

//forgot password request token
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "If a email exists, resent link will be shared. " });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = resetExpires;
    await user.save();
    
    console.log("Send this link to the user:");
    console.log(resetToken);
    console.log("---------------");
    res.status(200).json({ message: "Reset link will be sent" });
  } catch (error) {
    console.error("Error occurred: ", error);
    res.status(500).json({ error: "Server error !" });
  }
});

//Submitting new password,

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Token and new password are required." });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Token is invalid or has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    console.log("PASSWORD RESET SUCCESSFULLY 👌");

    res.status(200).json({ message: "Password has been reset successfully!" });
  } catch (error) {
    console.error("Error in reset-password:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
