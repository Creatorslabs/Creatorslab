import { Task, User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId)
      .populate({
        path: "participatedTasks.task",
        model: Task,
        populate: {
          path: "creator",
          select: "username", // Only fetch the creator's name
        },
      })
      .populate("createdTasks");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
