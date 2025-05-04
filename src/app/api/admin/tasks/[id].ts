// API route for admin to update/delete a specific task
import { dbConnect } from '@/lib/mongoose';
import { Task } from '@/models/user';
import { NextRequest } from 'next/server';

// PUT: Update a task
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const id = params.id;
  const body = await request.json();
  const updated = await Task.findByIdAndUpdate(id, body, { new: true });
  return new Response(JSON.stringify(updated), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// DELETE: Remove a task
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const id = params.id;
  await Task.findByIdAndDelete(id);
  return new Response(JSON.stringify({ message: 'Task deleted', id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
