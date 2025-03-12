import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, taskId } = await req.json();

    // Validate required fields
    if (!userId || !taskId) {
      return NextResponse.json(
        { message: "Missing userId or taskId in request" },
        { status: 400 }
      );
    }

    // Validate `taskId` as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return NextResponse.json(
        { message: "Invalid taskId format" },
        { status: 400 }
      );
    }

    // Fetch user using `userId` directly (no conversion)
    const user = await User.findOne({ _id: userId }).select("participatedTasks");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Ensure participatedTasks exists and is an array
    if (!Array.isArray(user.participatedTasks)) {
      return NextResponse.json(
        { message: "User data is invalid" },
        { status: 500 }
      );
    }

    // Find the task in participatedTasks
    const taskData = user.participatedTasks.find(
      (t) => t.task.toString() === taskId
    );

    return NextResponse.json({
      status: taskData ? taskData.status : "not_started",
    });
  } catch (error) {
    console.error("Error fetching task status:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
