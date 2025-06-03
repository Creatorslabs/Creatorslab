import { NextResponse } from "next/server";
import { Task } from "@/models/user";
import connectDB from "@/utils/connectDB";

export const GET = async (): Promise<NextResponse> => {
    try {
        await connectDB();
        const tasks = await Task.find().lean();


        return NextResponse.json(
            { message: "Tasks fetched successfully", tasks },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
};
