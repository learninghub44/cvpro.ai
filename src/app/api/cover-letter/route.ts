import { NextRequest, NextResponse } from 'next/server';
import { generateCoverLetter } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { cvText, jobTitle, companyName, jobDescription, experienceLevel } = await request.json();

    if (!cvText || !jobTitle || !companyName || !jobDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const coverLetter = await generateCoverLetter(
      cvText,
      jobTitle,
      companyName,
      jobDescription,
      experienceLevel || 'mid'
    );

    return NextResponse.json({ success: true, coverLetter });
  } catch (error) {
    console.error('Cover letter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
