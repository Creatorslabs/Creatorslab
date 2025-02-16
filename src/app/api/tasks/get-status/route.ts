import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const taskId = searchParams.get("taskId");

    if (!userId || !taskId) {
      return NextResponse.json(
        { message: "Missing userId or taskId in request" },
        { status: 400 }
      );
    }

    // Fetch user
    const user = await User.findById(userId).select("participatedTasks");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
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
