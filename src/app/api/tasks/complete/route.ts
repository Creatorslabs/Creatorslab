import { Task, User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected
    const { userId, taskId } = await req.json();

    if (!userId || !taskId) {
      return NextResponse.json(
        { message: "User ID and Task ID are required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return NextResponse.json(
        { message: "Invalid Task ID format" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ _id: userId }).select(
      "_id username email participatedTasks balance"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch the task
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    const taskIndex = user.participatedTasks.findIndex(
      (t) => t.task.toString() === taskId
    );

    if (taskIndex === -1) {
      return NextResponse.json(
        { message: "Task not started or does not exist in user's tasks" },
        { status: 400 }
      );
    }

    const taskStatus = user.participatedTasks[taskIndex]?.status;
    if (!["pending", "claimed"].includes(taskStatus)) {
      return NextResponse.json(
        { message: "Task must be pending or already claimed." },
        { status: 400 }
      );
    }

    user.participatedTasks[taskIndex].status = "completed";
    user.balance += 0.3;

    if (!task.participants.includes(userId)) {
      task.participants.push(userId);
    }

    await user.save(); 
    await task.save(); 

    return NextResponse.json(
      { message: "Task marked as completed", user, task },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
