import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId, taskId, proof } = await req.json();

    const user = await User.findById(userId).select("_id participatedTasks");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.participatedTasks.push({
      task: taskId,
      status: "completed",
      proof,
    });

    await user.save();

    return NextResponse.json(
      { message: "Task submitted successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting task:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
