import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    const { creatorId } = await req.json();
    
    console.log("creatorId:", creatorId);
    

  await connectDB();

  if (!creatorId) {
    return NextResponse.json(
      { error: "Creator ID is required" },
      { status: 400 }
    );
  }

  const tasks = await Task.find({ creator: creatorId }).populate(
    "creator",
    "_id username email"
  );

  return NextResponse.json(tasks);
} catch (error) {
  console.error("Error fetching tasks by creator:", (error as Error).message);
  return NextResponse.json([]);
}

}
