import { NextResponse } from "next/server";
import { User, Task } from "@/models/user";
import connectDB from "@/utils/connectDB";

export const GET = async (): Promise<NextResponse> => {
    try {
        await connectDB();

        const [users, tasks] = await Promise.all([
            User.find(),
            Task.find().lean(),
        ]);

        const userCount = users.length;
        const taskCount = tasks.length;

        return NextResponse.json(
            {
                message: "Dashboard data fetched successfully",
                userCount,
                taskCount,
                users,
                tasks,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
};
