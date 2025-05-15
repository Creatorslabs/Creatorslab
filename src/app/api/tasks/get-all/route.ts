import { NextResponse } from "next/server";
import { Task } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find({ status: "active" })
      .populate("creator", "_id username email photo")
      .sort({ createdAt: -1 });
    
    console.log(tasks[1])

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
