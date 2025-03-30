import { NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export const GET = async () => {
    try {
        await connectDB();
        const users = await User.find();
        
        return NextResponse.json(
            { message: "Users fetched successfully", users },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" + (error as Error).message },
            { status: 500 }
        );
    }
};
