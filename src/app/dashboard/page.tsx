'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  TrendingUp, 
  Download, 
  CreditCard, 
  ArrowRight,
  Upload
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Stats {
  totalReports: number;
  completedOrders: number;
  downloads: number;
  spentAmount: number;
}

interface Activity {
  id: string;
  type: string;
  date: string;
  status: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalReports: 0, completedOrders: 0, downloads: 0, spentAmount: 0 });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/auth/login'; return; }

      const [{ count: reportCount }, { data: orders }, { data: resumes }] = await Promise.all([
        supabase.from('reports').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('orders').select('amount, status, created_at, id').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('resumes').select('id, created_at, file_name').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
      ]);

      const completedOrders = orders?.filter(o => o.status === 'completed') ?? [];
      const totalSpent = completedOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

      setStats({
        totalReports: reportCount ?? 0,
        completedOrders: completedOrders.length,
        downloads: reportCount ?? 0,
        spentAmount: totalSpent,
      });

      const activity: Activity[] = (resumes ?? []).map(r => ({
        id: r.id,
        type: 'CV Analysis',
        date: new Date(r.created_at).toLocaleDateString('en-KE'),
        status: 'Completed',
      }));
      setRecentActivity(activity);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-slate-600">Here's an overview of your CVPro AI activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Reports</CardTitle>
              <FileText className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{loading ? '—' : stats.totalReports}</div>
              <p className="text-xs text-slate-500 mt-1">CV analyses completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Completed Orders</CardTitle>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{loading ? '—' : stats.completedOrders}</div>
              <p className="text-xs text-slate-500 mt-1">Services purchased</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Downloads</CardTitle>
              <Download className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{loading ? '—' : stats.downloads}</div>
              <p className="text-xs text-slate-500 mt-1">Documents downloaded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Spent</CardTitle>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{loading ? '—' : `KES ${stats.spentAmount}`}</div>
              <p className="text-xs text-slate-500 mt-1">Lifetime spending</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/dashboard/upload">
                <Button variant="outline" size="lg" className="w-full h-auto py-6 flex flex-col gap-2">
                  <Upload className="w-6 h-6" />
                  <span>Upload New CV</span>
                </Button>
              </Link>
              <Link href="/dashboard/reports">
                <Button variant="outline" size="lg" className="w-full h-auto py-6 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>View Reports</span>
                </Button>
              </Link>
              <Link href="/dashboard/pricing">
                <Button variant="primary" size="lg" className="w-full h-auto py-6 flex flex-col gap-2">
                  <CreditCard className="w-6 h-6" />
                  <span>Buy Services</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest CVPro AI activities</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-slate-500 text-sm text-center py-6">Loading activity...</p>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No activity yet. Upload your CV to get started.</p>
                <Link href="/dashboard/upload">
                  <Button variant="primary" size="sm" className="mt-4">Upload CV</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">{activity.type}</p>
                        <p className="text-sm text-slate-600">{activity.date}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {recentActivity.length > 0 && (
              <div className="mt-4 text-center">
                <Link href="/dashboard/orders">
                  <Button variant="ghost" size="sm">
                    View All Activity
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
