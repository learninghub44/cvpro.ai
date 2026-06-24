'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Download, Lock } from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with actual data from Supabase
const mockReports = [
  {
    id: 1,
    type: 'CV Analysis',
    title: 'Software Engineer CV Analysis',
    date: '2024-01-15',
    score: 64,
    status: 'free',
  },
  {
    id: 2,
    type: 'CV Rewrite',
    title: 'Optimized CV - Software Engineer',
    date: '2024-01-14',
    score: null,
    status: 'premium',
  },
  {
    id: 3,
    type: 'Cover Letter',
    title: 'Cover Letter - TechCorp',
    date: '2024-01-13',
    score: null,
    status: 'premium',
  },
];

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Reports</h1>
          <p className="text-slate-600">
            View your CV analysis reports and generated documents
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Reports</CardTitle>
            <CardDescription>All reports generated from your CV uploads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-lg gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      {report.status === 'premium' ? (
                        <Lock className="w-6 h-6 text-accent" />
                      ) : (
                        <FileText className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{report.title}</p>
                      <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>{report.date}</span>
                        {report.score && (
                          <>
                            <span>•</span>
                            <span className="font-medium">Score: {report.score}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'free' ? (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Link href="/dashboard/pricing">
                          <Button variant="primary" size="sm">
                            Unlock Full Report
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
