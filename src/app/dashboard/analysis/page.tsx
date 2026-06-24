'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with actual API response
const mockAnalysis = {
  ats_score: 62,
  formatting_score: 71,
  experience_score: 55,
  skills_score: 68,
  overall_score: 64,
  weaknesses: [
    'Missing quantifiable achievements',
    'Weak action verbs in experience section',
    'Skills section not optimized for ATS keywords',
    'Inconsistent formatting throughout',
  ],
};

export default function AnalysisPage() {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">CV Analysis Results</h1>
          <p className="text-slate-600">
            Here's how your CV performs across key metrics
          </p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p className="text-sm text-slate-600 mb-2">Overall Score</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-6xl font-bold ${getScoreColor(mockAnalysis.overall_score)}`}>
                    {mockAnalysis.overall_score}
                  </span>
                  <span className="text-2xl text-slate-400">%</span>
                </div>
                <p className={`text-lg font-medium mt-2 ${getScoreColor(mockAnalysis.overall_score)}`}>
                  {getScoreLabel(mockAnalysis.overall_score)}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${mockAnalysis.overall_score}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ATS Score</CardTitle>
              <CardDescription>Applicant Tracking System compatibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-4xl font-bold ${getScoreColor(mockAnalysis.ats_score)}`}>
                  {mockAnalysis.ats_score}
                </span>
                <span className="text-xl text-slate-400">%</span>
              </div>
              <p className={`text-sm font-medium ${getScoreColor(mockAnalysis.ats_score)}`}>
                {getScoreLabel(mockAnalysis.ats_score)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Formatting</CardTitle>
              <CardDescription>Visual structure and layout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-4xl font-bold ${getScoreColor(mockAnalysis.formatting_score)}`}>
                  {mockAnalysis.formatting_score}
                </span>
                <span className="text-xl text-slate-400">%</span>
              </div>
              <p className={`text-sm font-medium ${getScoreColor(mockAnalysis.formatting_score)}`}>
                {getScoreLabel(mockAnalysis.formatting_score)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Experience</CardTitle>
              <CardDescription>Work history presentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-4xl font-bold ${getScoreColor(mockAnalysis.experience_score)}`}>
                  {mockAnalysis.experience_score}
                </span>
                <span className="text-xl text-slate-400">%</span>
              </div>
              <p className={`text-sm font-medium ${getScoreColor(mockAnalysis.experience_score)}`}>
                {getScoreLabel(mockAnalysis.experience_score)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
              <CardDescription>Skills section optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-4xl font-bold ${getScoreColor(mockAnalysis.skills_score)}`}>
                  {mockAnalysis.skills_score}
                </span>
                <span className="text-xl text-slate-400">%</span>
              </div>
              <p className={`text-sm font-medium ${getScoreColor(mockAnalysis.skills_score)}`}>
                {getScoreLabel(mockAnalysis.skills_score)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Weaknesses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Areas to Improve</CardTitle>
            <CardDescription>Focus on these areas to increase your CV score</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockAnalysis.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Premium Upgrade CTA */}
        <Card className="border-accent border-2 bg-gradient-to-r from-accent/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    Unlock Full Analysis
                  </h3>
                  <p className="text-slate-600">
                    Get detailed recommendations, ATS optimization, and downloadable reports
                  </p>
                </div>
              </div>
              <Link href="/dashboard/pricing">
                <Button variant="primary" size="lg">
                  View Packages
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard/upload">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Upload Another CV
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
