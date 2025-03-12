import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if last login was at least 24 hours ago
    const lastLoginDate = user.lastLoginDate || new Date(0);
    const now = new Date();
    const timeDiff = now.getTime() - lastLoginDate.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 24) {
      return NextResponse.json(
        { error: "Daily reward already claimed" },
        { status: 400 }
      );
    }

    // Update balance and last login time
    user.balance += 2;
    user.lastLoginDate = now;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Daily login reward granted", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing daily login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
