import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Task } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    const { taskId, userId } = await req.json();

    await connectDB();

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: "Task ID and User ID are required" },
        { status: 400 }
      );
    }

    // Validate taskId as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return NextResponse.json(
        { error: "Invalid Task ID format" },
        { status: 400 }
      );
    }

    // Find the task to get the creator's ID
    const task = await Task.findById(taskId);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Fetch other tasks by the same creator, excluding the current task
    const otherTasks = await Task.find({
      creator: task.creator,
      _id: { $ne: taskId }, // Exclude the given task
      status: "active",
      participants: { $ne: userId } // Ensure user has not participated
    }).populate("creator", "_id username email photo");

    // Get total number of tasks by the creator
    const totalTasksByCreator = await Task.countDocuments({ creator: task.creator });

    return NextResponse.json({ otherTasks, totalTasksByCreator });
  } catch (error) {
    console.error("Error fetching other tasks:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
