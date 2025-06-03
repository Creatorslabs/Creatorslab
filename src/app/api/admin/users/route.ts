// API route for admin to manage users

import { User } from '@/models/user';
import connectDB from '@/utils/connectDB';
import { NextRequest } from 'next/server';

// GET: Fetch all users (admin only)
export async function GET(request: NextRequest) {
  await connectDB();
  const users = await User.find({});
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST: Create a new user (admin only)
export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const user = await User.create(body);
  return new Response(JSON.stringify(user), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
