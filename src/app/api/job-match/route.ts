import { NextRequest, NextResponse } from 'next/server';
import { analyzeJobMatch } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { cvText, jobDescription } = await request.json();

    if (!cvText || !jobDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const jobMatch = await analyzeJobMatch(cvText, jobDescription);

    return NextResponse.json({ success: true, jobMatch });
  } catch (error) {
    console.error('Job match error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
