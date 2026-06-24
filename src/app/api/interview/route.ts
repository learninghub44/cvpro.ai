import { NextRequest, NextResponse } from 'next/server';
import { generateInterviewQuestions } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { cvText, jobDescription } = await request.json();

    if (!cvText || !jobDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const interviewQuestions = await generateInterviewQuestions(cvText, jobDescription);

    return NextResponse.json({ success: true, interviewQuestions });
  } catch (error) {
    console.error('Interview questions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
