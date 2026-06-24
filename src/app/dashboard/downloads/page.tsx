'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar } from 'lucide-react';

// Mock data - will be replaced with actual data from Supabase
const mockDownloads = [
  {
    id: 1,
    name: 'Optimized_CV_John_Doe.pdf',
    type: 'CV Rewrite',
    date: '2024-01-15',
    size: '245 KB',
  },
  {
    id: 2,
    name: 'Cover_Letter_TechCorp.docx',
    type: 'Cover Letter',
    date: '2024-01-14',
    size: '128 KB',
  },
  {
    id: 3,
    name: 'Interview_Questions_Software_Engineer.pdf',
    type: 'Interview Prep',
    date: '2024-01-13',
    size: '189 KB',
  },
];

export default function DownloadsPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Downloads</h1>
          <p className="text-slate-600">
            Access your downloaded documents and reports
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Downloads</CardTitle>
            <CardDescription>All documents you have downloaded from CVPro AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDownloads.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">No downloads yet</p>
                  <Button variant="primary">Upload Your First CV</Button>
                </div>
              ) : (
                mockDownloads.map((download) => (
                  <div
                    key={download.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-lg gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{download.name}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {download.date}
                          </span>
                          <span>•</span>
                          <span>{download.size}</span>
                          <span>•</span>
                          <span>{download.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
