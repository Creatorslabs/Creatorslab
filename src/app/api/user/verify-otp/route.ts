import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { signJwt } from "@/utils/jwt";
import { User } from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.verificationCode !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    if (user.otpExpires && new Date(user.otpExpires) < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 410 });
    }

    user.verificationCode = null;
    user.otpExpires = null;
    user.isVerified = true;
    user.emailVerified = true;
    await user.save();

    const token = signJwt(user.toObject());

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
