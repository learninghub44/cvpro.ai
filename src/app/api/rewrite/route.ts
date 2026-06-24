import { NextRequest, NextResponse } from 'next/server';
import { rewriteCV } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { cvText } = await request.json();

    if (!cvText) {
      return NextResponse.json({ error: 'CV text required' }, { status: 400 });
    }

    const rewrittenCV = await rewriteCV(cvText);

    return NextResponse.json({ success: true, rewrittenCV });
  } catch (error) {
    console.error('Rewrite error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
