'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Target, Sparkles, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export default function JobMatchPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [matchData, setMatchData] = useState<{
    match_percentage: number;
    missing_skills: string[];
    missing_keywords: string[];
    recommended_improvements: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription) {
      return;
    }

    setAnalyzing(true);
    try {
      // TODO: Call API to analyze job match
      // const response = await fetch('/api/job-match', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ cvText, jobDescription }),
      // });
      // const data = await response.json();
      // setMatchData(data.jobMatch);
      
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMatchData({
        match_percentage: 74,
        missing_skills: ['SQL', 'Leadership', 'Project Management'],
        missing_keywords: ['Agile', 'Scrum', 'CI/CD'],
        recommended_improvements: [
          'Add SQL experience to your skills section',
          'Highlight leadership roles in your experience',
          'Include project management tools you have used',
          'Mention Agile/Scrum methodologies in your experience',
        ],
      });
    } catch (error) {
      console.error('Error analyzing job match:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getMatchLabel = (percentage: number) => {
    if (percentage >= 80) return 'Excellent Match';
    if (percentage >= 60) return 'Good Match';
    if (percentage >= 40) return 'Fair Match';
    return 'Poor Match';
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Job Match Analysis</h1>
          <p className="text-slate-600">
            See how well your CV matches a job description
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>Paste the job description to analyze compatibility</CardDescription>
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
                  onClick={handleAnalyze}
                  disabled={analyzing || !jobDescription}
                  className="w-full"
                >
                  {analyzing ? (
                    'Analyzing...'
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Analyze Match
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {!matchData ? (
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 mb-2">No analysis performed yet</p>
                  <p className="text-sm text-slate-500">
                    Paste a job description and click analyze to see how well your CV matches
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Match Score */}
                <Card>
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="text-center md:text-left">
                        <p className="text-sm text-slate-600 mb-2">Match Score</p>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-6xl font-bold ${getMatchColor(matchData.match_percentage)}`}>
                            {matchData.match_percentage}
                          </span>
                          <span className="text-2xl text-slate-400">%</span>
                        </div>
                        <p className={`text-lg font-medium mt-2 ${getMatchColor(matchData.match_percentage)}`}>
                          {getMatchLabel(matchData.match_percentage)}
                        </p>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${matchData.match_percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Missing Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      Missing Skills
                    </CardTitle>
                    <CardDescription>Skills mentioned in the job description that are not in your CV</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {matchData.missing_skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Missing Keywords */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      Missing Keywords
                    </CardTitle>
                    <CardDescription>Important keywords not found in your CV</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {matchData.missing_keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Improvements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      Recommended Improvements
                    </CardTitle>
                    <CardDescription>Actions you can take to improve your match score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {matchData.recommended_improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
