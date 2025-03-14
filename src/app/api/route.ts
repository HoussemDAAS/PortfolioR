import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic'; // Bypass caching

export async function POST(req: Request) {
  try {
    // Verify request format
    if (!req.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 415 }
      );
    }

    const body = await req.json();
    
    // Enhanced validation
    if (!body?.name?.trim() || !body?.text?.trim()) {
      return NextResponse.json(
        { error: 'Name and text are required' },
        { status: 400 }
      );
    }

    // Sanity document creation
    const result = await client.create({
      _type: 'testimonial',
      ...body,
      approved: false,
      _createdAt: new Date().toISOString()
    });

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Server error',
        sanityError: error.responseBody 
      },
      { status: 500 }
    );
  }
}