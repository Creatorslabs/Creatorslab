import { User, Task } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, taskId } = await req.json();

    const task = await Task.findById(taskId);
    if (!task)
      return NextResponse.json({ message: "Task not found" }, { status: 404 });

    const user = await User.findById(userId).select(
      "_id username email participatedTasks"
    );

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Check if the user already started this task
    const existingTask = user.participatedTasks.find(
      (t) => t.task.toString() === taskId
    );
    if (existingTask)
      return NextResponse.json(
        { message: "Task already started!" },
        { status: 400 }
      );

    // Add task to participatedTasks
    user.participatedTasks.push({ task: taskId, status: "pending" });
    await user.save();

    return NextResponse.json(
      { message: "Task started successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
