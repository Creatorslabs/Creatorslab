import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Task } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    const { taskId } = await req.json();

    await connectDB();

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
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

    // Get a single active task by ID
    const task = await Task.findOne({
      _id: taskId,
      status: "active",
    }).populate("creator", "_id username email");

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error fetching task:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
