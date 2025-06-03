import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, taskId } = await req.json();

    const user = await User.findById(userId).select("participatedTasks");

    if (!user) {
      return NextResponse.json({ participated: false });
    }

    const hasParticipated = user.participatedTasks.some(
      (t) => t.task.toString() === taskId
    );

    return NextResponse.json({ participated: hasParticipated });
  } catch (error) {
    console.error("Error checking participation:", error);
    return NextResponse.json({ participated: false });
  }
}
