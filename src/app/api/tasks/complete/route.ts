import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, taskId } = await req.json();

    const user = await User.findById(userId).select(
      "_id username email participatedTasks"
    );

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Find the task in participatedTasks
    const taskIndex = user.participatedTasks.findIndex(
      (t) => t.task.toString() === taskId
    );
    if (taskIndex === -1)
      return NextResponse.json(
        { message: "Task not started" },
        { status: 400 }
      );

    const taskStatus = user.participatedTasks[taskIndex]?.status;

    if (!["pending", "claimed"].includes(taskStatus)) {
      return NextResponse.json(
        { message: "Task must be pending or has already been claimed." },
        { status: 400 }
      );
    }

    // Update status to completed
    user.participatedTasks[taskIndex].status = "completed";
    user.balance += 0.3;
    await user.save();

    return NextResponse.json(
      { message: "Task marked as completed", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
