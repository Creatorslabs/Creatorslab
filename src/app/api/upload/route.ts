// pages/api/upload.js (Next.js API route)
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');

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
    
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;

    const blob = await put(filename, file, {
      access: 'public',
      // You can add more options here as needed
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