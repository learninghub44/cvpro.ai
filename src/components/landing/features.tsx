'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText, Target, MessageSquare, Briefcase, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'CV Analysis',
    description: 'Get instant feedback on your CV with ATS scoring, formatting analysis, and skill assessment.',
  },
  {
    icon: Target,
    title: 'ATS Optimization',
    description: 'Rewrite your CV to pass applicant tracking systems and increase interview chances.',
  },
  {
    icon: MessageSquare,
    title: 'Cover Letter Generator',
    description: 'Create tailored cover letters for specific job applications in seconds.',
  },
  {
    icon: Briefcase,
    title: 'Interview Preparation',
    description: 'Get likely interview questions with sample answers based on your CV.',
  },
  {
    icon: Zap,
    title: 'Job Match Analysis',
    description: 'See how well your CV matches job descriptions and identify gaps.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared with third parties.',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Everything You Need to Get Hired
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our AI-powered tools help you at every step of your job search journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
