import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { userId, taskId, proof } = await req.json();

    if (!userId || !taskId || !proof) {
      return NextResponse.json(
        { error: "User ID, Task ID, and proof are required" },
        { status: 400 }
      );
    }

    // Update user to add task participation
    const updatedUser = await User.findByIdAndUpdate(
      userId,
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
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser.participatedTasks);
  } catch (error) {
    console.error("Error submitting task participation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
