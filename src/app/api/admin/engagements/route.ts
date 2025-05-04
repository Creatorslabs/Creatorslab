// API route for admin to manage engagement types

import { dbConnect } from '@/lib/mongoose';
import { Task } from '@/models/user';
import { NextRequest } from 'next/server';


// GET: Fetch all engagement types (admin only)
export async function GET(request: NextRequest) {
  await dbConnect();
  // Example: filter all tasks where type or platform is an engagement type
  const engagements = await Task.find({ type: 'engagement' });
  return new Response(JSON.stringify(engagements), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST: Create a new engagement type (admin only)
export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  // For now, create a task with type 'engagement'
  const engagement = await Task.create({ ...body, type: 'engagement' });
  return new Response(JSON.stringify(engagement), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
