import { NextRequest, NextResponse } from "next/server";
import { User, Task } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    await connectDB();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get user participated tasks
    const user = await User.findById(userId).select("participatedTasks");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const completedTaskIds = user.participatedTasks.map((t) => t.task);

    // Get available tasks (excluding completed ones)
    const tasks = await Task.find({
      status: "active",
      _id: { $nin: completedTaskIds },
    }).populate("creator", "_id username email");

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching available tasks:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
