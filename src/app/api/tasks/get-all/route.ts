import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Fetch all active tasks sorted by newest first
    const tasks = await Task.find({ status: "active" })
      .populate("creator", "_id username email")
      .sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
