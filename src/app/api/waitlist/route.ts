import Waitlist from "@/models/waitlist";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json(
        {
          message:
            "Oops! Looks like you forgot to enter your email. Please try again!",
        },
        { status: 400 }
      );

    await connectDB();

    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return NextResponse.json(
        {
          message:
            "You're already on the list! Stay tuned for exciting updates.",
        },
        { status: 409 }
      );
    }

    const newEntry = await Waitlist.create({ email });
    return NextResponse.json(
      {
        message:
          "You're in! Welcome aboard. We'll keep you posted on all the exciting updates!",
        data: newEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong on our end. Please try again later!",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
