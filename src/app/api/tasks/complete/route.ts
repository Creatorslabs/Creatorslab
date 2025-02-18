import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, taskId } = await req.json();

    if (!userId || !taskId) {
      return NextResponse.json(
        { message: "User ID and Task ID are required" },
        { status: 400 }
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find user and check if task exists in participatedTasks
      const user = await User.findById(userId)
        .select("_id username email participatedTasks balance")
        .session(session);

      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      // Locate task index
      const taskIndex = user.participatedTasks.findIndex(
        (t) => t.task.toString() === taskId
      );
      if (taskIndex === -1) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(
          { message: "Task not started" },
          { status: 400 }
        );
      }

      const taskStatus = user.participatedTasks[taskIndex]?.status;
      if (!["pending", "claimed"].includes(taskStatus)) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(
          { message: "Task must be pending or already claimed." },
          { status: 400 }
        );
      }

      // Update task status & increment balance atomically
      user.participatedTasks[taskIndex].status = "completed";
      user.balance += 0.3;

      await user.save({ session });

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        { message: "Task marked as completed", user },
        { status: 200 }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error marking task as completed:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
