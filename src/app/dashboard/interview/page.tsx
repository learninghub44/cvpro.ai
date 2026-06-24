'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { MessageSquare, Sparkles, Download, Code, Users } from 'lucide-react';

export default function InterviewPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<Array<{
    question: string;
    answer: string;
    type: 'technical' | 'behavioral';
  }>>([]);

  const handleGenerate = async () => {
    if (!jobDescription) {
      return;
    }

    setGenerating(true);
    try {
      // TODO: Call API to generate interview questions
      // const response = await fetch('/api/interview', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ cvText, jobDescription }),
      // });
      // const data = await response.json();
      // setQuestions(data.interviewQuestions.questions);
      
      // Simulate generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setQuestions([
        {
          question: 'Tell me about yourself and your experience.',
          answer: 'I am a software engineer with 3 years of experience in building web applications...',
          type: 'behavioral',
        },
        {
          question: 'What is your experience with React and Next.js?',
          answer: 'I have been working with React for 3 years and Next.js for 2 years on various projects...',
          type: 'technical',
        },
        {
          question: 'Describe a challenging project you worked on.',
          answer: 'One challenging project was building a real-time collaboration tool...',
          type: 'behavioral',
        },
      ]);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    // TODO: Implement PDF download
    console.log('Downloading interview questions');
  };

  const technicalQuestions = questions.filter(q => q.type === 'technical');
  const behavioralQuestions = questions.filter(q => q.type === 'behavioral');

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Interview Preparation</h1>
          <p className="text-slate-600">
            Get likely interview questions with sample answers based on your CV
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>Paste the job description to generate relevant questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  label="Job Description"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                />
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={generating || !jobDescription}
                  className="w-full"
                >
                  {generating ? (
                    'Generating...'
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Questions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {questions.length === 0 ? (
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 mb-2">No questions generated yet</p>
                  <p className="text-sm text-slate-500">
                    Paste a job description and click generate to get interview questions
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {technicalQuestions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-accent" />
                        Technical Questions
                      </CardTitle>
                      <CardDescription>
                        {technicalQuestions.length} questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {technicalQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg">
                          <p className="font-semibold text-primary mb-2">Q: {q.question}</p>
                          <p className="text-sm text-slate-600">A: {q.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {behavioralQuestions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-accent" />
                        Behavioral Questions
                      </CardTitle>
                      <CardDescription>
                        {behavioralQuestions.length} questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {behavioralQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg">
                          <p className="font-semibold text-primary mb-2">Q: {q.question}</p>
                          <p className="text-sm text-slate-600">A: {q.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Button variant="outline" size="lg" onClick={handleDownload} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download as PDF
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
