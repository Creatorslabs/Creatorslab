import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { generateReferralCode } from "@/actions/generate-referal-code";
import { generateRandomUsername } from "@/actions/generate-username";

export async function POST(req: NextRequest) {
  try {
    const { privyId, referrerCode } = await req.json();

    if (!privyId) {
      return NextResponse.json(
        { error: "Privy ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    let user = await User.findOne({ _id: privyId });

    if (!user) {
      user = new User({
        _id: privyId,
        username: generateRandomUsername(),
        referralCode: generateReferralCode(),
        balance: 25,
      });

      await user.save();

      if (referrerCode) {
        const referrer = await User.findOne({ referralCode: referrerCode });

        if (!referrer) {
          return NextResponse.json(
            { error: "Invalid referral code" },
            { status: 404 }
          );
        }

        if (referrer._id.toString() === privyId) {
          return NextResponse.json(
            { error: "You cannot refer yourself" },
            { status: 400 }
          );
        }

        await User.findByIdAndUpdate(
          referrer._id,
          { $inc: { balance: 3 } },
          { new: true }
        );
      }
    }

    return NextResponse.json(
      { message: "User authenticated", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
