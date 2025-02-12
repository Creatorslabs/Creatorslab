import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import crypto from "crypto";
import { sendVerificationEmail } from "@/utils/mailer";

const generateReferralCode = (email: string) => {
  return crypto.createHash("sha256").update(email).digest("hex").slice(0, 8);
};

export async function POST(req: NextRequest) {
  console.log("Register hit!!");

  const { email, referrerCode } = await req.json();
  console.log("Email received:", email);

  await connectDB();

  const session = await mongoose.startSession();
  session.startTransaction();

  console.log("Mongoose session started");

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "User already registered" },
        { status: 400 }
      );
    }

    const referralCode = generateReferralCode(email);
    console.log("Referal code:", referralCode);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Generate OTP

    console.log("OTP", verificationCode);

    const newUser = new User({
      email,
      providers: ["email"],
      role: "user",
      username: email.split("@")[0],
      referralCode,
      referredBy: referrerCode || null,
      verificationCode,
      balance: 3,
      isVerified: false,
      emailVerified: false,
      lastLoginDate: null,
    });

    await newUser.save({ session });

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

    await sendVerificationEmail(email, verificationCode);

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      { success: true, message: "User registered!" },
      { status: 201 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
