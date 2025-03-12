import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId, taskId } = await req.json();

    // Validate required fields
    if (!userId || !taskId) {
      return NextResponse.json(
        { message: "User ID and Task ID are required" },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!isValidObjectId(taskId)) {
      return NextResponse.json(
        { message: "Invalid User ID or Task ID format" },
        { status: 400 }
      );
    }

    // Fetch user with only necessary fields
    const user = await User.findById(userId).select(
      "_id username email participatedTasks"
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Find task in participatedTasks
    const taskIndex = user.participatedTasks.findIndex(
      (t) => t.task.toString() === taskId
    );

    if (taskIndex === -1) {
      return NextResponse.json(
        { message: "Task not started" },
        { status: 400 }
      );
    }

    const taskStatus = user.participatedTasks[taskIndex].status;

    // Check if the task is already claimed
    if (taskStatus === "claimed") {
      return NextResponse.json(
        { message: "Task has already been claimed." },
        { status: 400 }
      );
    }

    // Check if the task is completed before claiming
    if (taskStatus !== "completed") {
      return NextResponse.json(
        { message: "Task must be completed before claiming." },
        { status: 400 }
      );
    }

    // Update status to claimed
    user.participatedTasks[taskIndex].status = "claimed";
    await user.save();

    return NextResponse.json(
      { message: "Task claimed successfully!", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error claiming task:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
