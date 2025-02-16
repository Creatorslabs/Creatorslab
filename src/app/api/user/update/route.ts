import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    // Parse request body
    const { userId, ...updates } = await req.json();

    // Validate input
    if (!userId || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "User ID and at least one update field are required" },
        { status: 400 }
      );
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "User profile updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
