import { NextRequest, NextResponse } from 'next/server';
import { analyzeCV } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { cvText } = await request.json();

    if (!cvText) {
      return NextResponse.json({ error: 'CV text required' }, { status: 400 });
    }

    const analysis = await analyzeCV(cvText);

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
