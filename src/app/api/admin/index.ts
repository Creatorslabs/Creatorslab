// Entry point for admin API routes
// You can expand this file to add more endpoints or route logic as needed.

export async function GET(request: Request) {
  // Example: return a simple status message
  return new Response(JSON.stringify({ status: 'Admin API root' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
