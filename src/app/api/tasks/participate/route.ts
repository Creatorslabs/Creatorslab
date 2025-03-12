import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { userId, taskId, proof } = await req.json();

    // Validate required fields
    if (!userId || !taskId || !proof) {
      return NextResponse.json(
        { error: "User ID, Task ID, and proof are required" },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return NextResponse.json(
        { error: "Invalid Task ID format" },
        { status: 400 }
      );
    }

    // Find and update user to add task participation
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          participatedTasks: {
            task: taskId,
            status: "pending",
            proof,
          },
        },
      },
      { new: true }
    ).select("participatedTasks");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({message: "Task Participation submitted", participatedTasks: updatedUser.participatedTasks});
  } catch (error) {
    console.error("Error submitting task participation:", error);
    return NextResponse.json(
      { error: "Internal Server Error: " + (error as Error).message },
      { status: 500 }
    );
  }
}
