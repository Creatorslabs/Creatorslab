import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = "edge";


export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const type = form.get('type')

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    const fileExtension = file.name.split('.').pop();
    
    const filename = `${type}/${type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;

    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({
      url: blob.url,
      success: true
    });
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}