// API route for admin to manage tasks
import { Task } from '@/models/user';
import connectDB from '@/utils/connectDB';
import { NextRequest } from 'next/server';

// GET: Fetch all tasks (admin only)
export async function GET(request: NextRequest) {
  await connectDB();
  const tasks = await Task.find({});
  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST: Create a new task (admin only)
export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const task = await Task.create(body);
  return new Response(JSON.stringify(task), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
