import { NextResponse } from 'next/server'
import { del } from '@vercel/blob'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const pathname = new URL(url).pathname

    const blobPath = pathname.startsWith('/') ? pathname.slice(1) : pathname

    await del(blobPath)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting blob:', error.message)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
