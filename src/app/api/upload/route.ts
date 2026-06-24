import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { extractTextFromFile, validateFile } from '@/lib/file-processing';
import { analyzeCV } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Upload to Supabase Storage
    const fileName = `${userId}/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, file);

    if (uploadError) {
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

    // Extract text from file
    const text = await extractTextFromFile(file);

    // Save to database
    const { data: resumeData, error: resumeError } = await supabase
      .from('resumes')
      .insert({
        user_id: userId,
        file_url: urlData.publicUrl,
        raw_text: text,
      })
      .select()
      .single();

    if (resumeError) {
      return NextResponse.json({ error: 'Failed to save resume' }, { status: 500 });
    }

    // Analyze CV with Groq
    const analysis = await analyzeCV(text);

    // Save analysis report
    const { error: reportError } = await supabase.from('reports').insert({
      user_id: userId,
      resume_id: resumeData.id,
      report_type: 'analysis',
      content: analysis,
    });

    if (reportError) {
      return NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      resumeId: resumeData.id,
      analysis,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
