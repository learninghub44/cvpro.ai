import Groq from 'groq-sdk';

function getGroq() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is required to call Groq-powered API routes.');
  }

  return new Groq({ apiKey });
}

export async function analyzeCV(cvText: string) {
  const prompt = `
    Analyze this CV and provide scores for:
    - ATS compatibility (0-100)
    - Formatting quality (0-100)
    - Skills presentation (0-100)
    - Experience presentation (0-100)
    
    Also identify key weaknesses (max 5) and provide brief recommendations.
    
    CV Text:
    ${cvText}
    
    Return JSON in this format:
    {
      "ats_score": number,
      "formatting_score": number,
      "skills_score": number,
      "experience_score": number,
      "overall_score": number,
      "weaknesses": [string],
      "recommendations": [string]
    }
  `;

  const response = await getGroq().chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-70b-8192',
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function rewriteCV(cvText: string) {
  const prompt = `
    Rewrite this CV to be ATS-optimized and professionally formatted.
    
    CV Text:
    ${cvText}
    
    Return JSON in this format:
    {
      "professional_summary": string,
      "experience": [{title, company, dates, description}],
      "education": [{degree, institution, dates}],
      "skills": [string],
      "certifications": [string]
    }
  `;

  const response = await getGroq().chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-70b-8192',
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function generateCoverLetter(cvText: string, jobTitle: string, companyName: string, jobDescription: string, experienceLevel: string) {
  const prompt = `
    Generate a professional cover letter for a ${experienceLevel} position.
    
    CV:
    ${cvText}
    
    Job Title: ${jobTitle}
    Company: ${companyName}
    Job Description: ${jobDescription}
    
    Return JSON:
    {
      "cover_letter": string
    }
  `;

  const response = await getGroq().chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-70b-8192',
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function generateInterviewQuestions(cvText: string, jobDescription: string) {
  const prompt = `
    Generate 20 likely interview questions with sample answers based on this CV and job description.
    Mix of technical and behavioral questions.
    
    CV:
    ${cvText}
    
    Job Description:
    ${jobDescription}
    
    Return JSON:
    {
      "questions": [
        {
          "question": string,
          "answer": string,
          "type": "technical" | "behavioral"
        }
      ]
    }
  `;

  const response = await getGroq().chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-70b-8192',
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function analyzeJobMatch(cvText: string, jobDescription: string) {
  const prompt = `
    Analyze how well this CV matches the job description.
    
    CV:
    ${cvText}
    
    Job Description:
    ${jobDescription}
    
    Return JSON:
    {
      "match_percentage": number,
      "missing_skills": [string],
      "missing_keywords": [string],
      "recommended_improvements": [string]
    }
  `;

  const response = await getGroq().chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-70b-8192',
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}
