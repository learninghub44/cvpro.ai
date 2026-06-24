'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { FileText, Sparkles, Download } from 'lucide-react';

export default function CoverLetterPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'entry' | 'mid' | 'senior'>('mid');
  const [generating, setGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');

  const handleGenerate = async () => {
    if (!jobTitle || !companyName || !jobDescription) {
      return;
    }

    setGenerating(true);
    try {
      // TODO: Call API to generate cover letter
      // const response = await fetch('/api/cover-letter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ cvText, jobTitle, companyName, jobDescription, experienceLevel }),
      // });
      // const data = await response.json();
      // setGeneratedLetter(data.coverLetter.cover_letter);
      
      // Simulate generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedLetter('Dear Hiring Manager,\n\nI am writing to express my strong interest in the ' + jobTitle + ' position at ' + companyName + '. With my background and experience, I am confident in my ability to contribute effectively to your team.\n\n[Generated cover letter content would appear here]');
    } catch (error) {
      console.error('Error generating cover letter:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    // TODO: Implement PDF/DOCX download
    console.log('Downloading cover letter');
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Cover Letter Generator</h1>
          <p className="text-slate-600">
            Create a tailored cover letter for your job application
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Enter the job information to generate a custom cover letter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Job Title"
                  type="text"
                  placeholder="Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <Input
                  label="Company Name"
                  type="text"
                  placeholder="TechCorp Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as 'entry' | 'mid' | 'senior')}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid-Level</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
                <Textarea
                  label="Job Description"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                />
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={generating || !jobTitle || !companyName || !jobDescription}
                  className="w-full"
                >
                  {generating ? (
                    'Generating...'
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Generated Cover Letter</CardTitle>
                <CardDescription>Your AI-generated cover letter will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedLetter ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-slate-50 rounded-lg min-h-[400px] whitespace-pre-wrap text-slate-700">
                      {generatedLetter}
                    </div>
                    <Button variant="outline" size="md" onClick={handleDownload} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download as PDF
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 mb-2">No cover letter generated yet</p>
                    <p className="text-sm text-slate-500">
                      Fill in the job details and click generate to create your cover letter
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
