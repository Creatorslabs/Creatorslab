// API route for admin to manage users

import { dbConnect } from '@/lib/mongoose';
import { User } from '@/models/user';
import { NextRequest } from 'next/server';

// GET: Fetch all users (admin only)
export async function GET(request: NextRequest) {
  await dbConnect();
  const users = await User.find({});
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST: Create a new user (admin only)
export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const user = await User.create(body);
  return new Response(JSON.stringify(user), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
