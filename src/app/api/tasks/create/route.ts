import { NextRequest, NextResponse } from "next/server";
import { Task, User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connectDB();

    // Required fields
    const requiredFields = [
      "creatorId",
      "type",
      "platform",
      "target",
      "rewardPoints",
      "status",
      "maxParticipants",
      "expiration",
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !(field in body));

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const {
      creatorId,
      type,
      platform,
      target,
      rewardPoints,
      maxParticipants,
      expiration,
    } = body;

    // Ensure only creators can create tasks
    const creator = await User.findById(creatorId);
    if (!creator || creator.role !== "creator") {
      return NextResponse.json(
        { error: "Unauthorized: You must be a creator." },
        { status: 401 }
      );
    }

    // Create new task
    const task = await Task.create({
      creator: creatorId,
      type,
      platform,
      target,
      rewardPoints,
      maxParticipants,
      expiration,
    });

    // Add task to creator's createdTasks list
    await User.findByIdAndUpdate(creatorId, {
      $push: { createdTasks: task._id },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" + (error as Error).message },
      { status: 500 }
    );
  }
}
