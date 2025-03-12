import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

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

    // Fetch user balance
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.balance < 20) {
      return NextResponse.json(
        { error: "Insufficient balance to unfollow" },
        { status: 400 }
      );
    }

    // Perform unfollow operation
    await Promise.all([
      User.updateOne(
        { _id: userId },
        {
          $pull: { followingCreators: creatorId },
          $inc: { balance: -20 },
        }
      ),
      User.updateOne(
        { _id: creatorId },
        {
          $pull: { followers: userId },
        }
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unfollowing creator:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
