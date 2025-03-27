import Admin from "@/models/admin";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const createAdmin = async (req: NextRequest): Promise<NextResponse> => {
    try {
        await connectDB();
        const { username, email, password, role } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "All fields (username, email, password) are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 }
            );
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json(
                { error: "Admin with this email already exists." },
                { status: 400 }
            );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
            role: role ?? "admin",
        });

        await newAdmin.save();

        return NextResponse.json(
            { message: "Admin created successfully", admin: newAdmin },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating admin:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
};
