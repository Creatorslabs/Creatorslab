import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
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
      // Fetch user balance
      const user = await User.findById(userId).session(session);
      if (!user) {
        throw new Error("User not found");
      }

      if (user.balance < 20) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(
          { error: "Insufficient balance to unfollow" },
          { status: 400 }
        );
      }

      // Perform unfollow operation
      await Promise.all([
        User.findByIdAndUpdate(
          userId,
          {
            $pull: { followingCreators: creatorId },
            $inc: { balance: -20 },
          },
          { session }
        ),

        User.findByIdAndUpdate(
          creatorId,
          {
            $pull: { followers: userId },
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
    console.error("Error unfollowing creator:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
