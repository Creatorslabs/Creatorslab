import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId, creatorId } = await req.json();

    // Validate request
    if (!userId || !creatorId) {
      return NextResponse.json(
        { error: "User ID and Creator ID are required" },
        { status: 400 }
      );
    }

    // Prevent self-following
    if (userId === creatorId) {
      return NextResponse.json(
        { error: "You cannot follow yourself" },
        { status: 400 }
      );
    }

    // Ensure both users exist
    const [user, creator] = await Promise.all([
      User.findOne({ _id: userId }),
      User.findOne({ _id: creatorId }),
    ]);

    if (!user || !creator) {
      return NextResponse.json(
        { error: "User or Creator not found" },
        { status: 404 }
      );
    }

    // Update following/followers and add balance in one atomic operation
    await Promise.all([
      User.updateOne(
        { _id: userId },
        {
          $addToSet: { followingCreators: creatorId },
          $inc: { balance: 2.2 },
        }
      ),

      User.updateOne(
        { _id: creatorId },
        {
          $addToSet: { followers: userId },
        }
      ),
    ]);

    return NextResponse.json(
      { success: true, message: "Followed creator successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error following creator:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
