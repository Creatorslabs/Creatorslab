import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Parse request body
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch user by _id
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Toggle role between "user" and "creator"
    user.role = user.role === "user" ? "creator" : "user";
    await user.save();

    return NextResponse.json(
      { success: true, message: `Role switched to ${user.role}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling role:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
