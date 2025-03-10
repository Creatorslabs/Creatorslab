import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, creatorId } = await req.json();

    if (!userId || !creatorId) {
      return NextResponse.json(
        { error: "User ID and Creator ID are required" },
        { status: 400 }
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Update following/followers and add balance in one atomic operation
      await Promise.all([
        User.findByIdAndUpdate(
          userId,
          {
            $addToSet: { followingCreators: creatorId },
            $inc: { balance: 0.3 },
          },
          { session }
        ),

        User.findByIdAndUpdate(
          creatorId,
          {
            $addToSet: { followers: userId },
          },
          { session }
        ),
      ]);

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({ success: true });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error following creator:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
