import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import {User} from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email });

    return NextResponse.json(
      { success: true, exists: !!user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
