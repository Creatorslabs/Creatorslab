import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

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

    // Update both users concurrently for better performance
    await Promise.all([
      User.findByIdAndUpdate(userId, {
        $addToSet: { followingCreators: creatorId },
      }),
      User.findByIdAndUpdate(creatorId, { $addToSet: { followers: userId } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error following creator:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
