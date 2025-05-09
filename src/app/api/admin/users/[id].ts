// API route for admin to update/delete a specific user
import { dbConnect } from '@/lib/mongoose';
import { User } from '@/models/user';
import { NextRequest } from 'next/server';

// PUT: Update a user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const id = params.id;
  const body = await request.json();
  const updated = await User.findByIdAndUpdate(id, body, { new: true });
  return new Response(JSON.stringify(updated), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// DELETE: Remove a user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const id = params.id;
  await User.findByIdAndDelete(id);
  return new Response(JSON.stringify({ message: 'User deleted', id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
