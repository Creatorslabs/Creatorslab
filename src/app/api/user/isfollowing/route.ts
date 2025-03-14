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

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const isFollowing = user.followingCreators.includes(creatorId);

    return NextResponse.json({ isFollowing }, { status: 200 });
  } catch (error) {
    console.error("Error checking follow status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
