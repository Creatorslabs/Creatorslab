// API route for admin to update/delete a specific engagement type
import { NextRequest } from 'next/server';

// PUT: Update an engagement type
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await request.json();
  // TODO: Update engagement in DB using id and body
  return new Response(JSON.stringify({ message: 'Engagement updated', id, engagement: body }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// DELETE: Remove an engagement type
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  // TODO: Delete engagement from DB using id
  return new Response(JSON.stringify({ message: 'Engagement deleted', id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
