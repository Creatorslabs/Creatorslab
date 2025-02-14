import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { sendVerificationEmail } from "@/utils/mailer";
import { User } from "@/models/user";
import crypto from "crypto";
import mongoose from "mongoose";

const generateReferralCode = (email: string) => {
  return crypto.createHash("sha256").update(email).digest("hex").slice(0, 8);
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, referrerCode } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    let user = await User.findOne({ email }).session(session);

    if (!user) {
      user = new User({
        email,
        providers: ["email"],
        role: "user",
        username: email.split("@")[0],
        referralCode: generateReferralCode(email),
        referredBy: null,
        balance: 3,
        isVerified: false,
        emailVerified: false,
        lastLoginDate: null,
      });

      await user.save({ session }); // Save the new user within the transaction
    }

    const lastOtpTime = user.otpExpires
      ? new Date(user.otpExpires).getTime()
      : 0;
    const now = Date.now();

    if (lastOtpTime > now - 60 * 1000) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "Wait before requesting a new OTP" },
        { status: 429 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = otp; // Ensure this field is used for verification
    user.otpExpires = new Date(now + 10 * 60 * 1000); // Expires in 10 minutes

    await user.save({ session });

    // Send OTP Email
    await sendVerificationEmail(email, otp);

    // Referral Logic
    if (referrerCode) {
      const referrer = await User.findOne({
        referralCode: referrerCode,
      }).session(session);

      if (referrer) {
        referrer.balance += 1;
        referrer.referralCount = (referrer.referralCount || 0) + 1;
        await referrer.save({ session });
      }
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Request OTP Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
