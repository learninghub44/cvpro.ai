'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, CreditCard, FileText } from 'lucide-react';

// Mock data - will be replaced with actual data from Supabase
const mockStats = {
  totalUsers: 156,
  revenue: 45670,
  orders: 89,
  conversionRate: 12,
};

const mockRecentOrders = [
  {
    id: 'ORD-001',
    user: 'john@example.com',
    package: 'CV Rewrite',
    amount: 149,
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    user: 'jane@example.com',
    package: 'Complete Package',
    amount: 499,
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: 'ORD-003',
    user: 'bob@example.com',
    package: 'CV + Cover Letter',
    amount: 249,
    status: 'pending',
    date: '2024-01-14',
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">
            Monitor platform performance and user activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Users
              </CardTitle>
              <Users className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockStats.totalUsers}</div>
              <p className="text-xs text-slate-500 mt-1">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Revenue
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">KES {mockStats.revenue.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Total earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Orders
              </CardTitle>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockStats.orders}</div>
              <p className="text-xs text-slate-500 mt-1">Total orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Conversion Rate
              </CardTitle>
              <FileText className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockStats.conversionRate}%</div>
              <p className="text-xs text-slate-500 mt-1">Signups to purchases</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest platform orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Package</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-sm text-primary">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-slate-700">{order.user}</td>
                      <td className="py-3 px-4 text-sm text-slate-700">{order.package}</td>
                      <td className="py-3 px-4 text-sm text-slate-700">KES {order.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'completed'
                              ? 'bg-success/10 text-success'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Popular Packages */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Packages</CardTitle>
            <CardDescription>Most purchased packages on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span className="text-sm text-slate-700">CV Rewrite</span>
                </div>
                <span className="text-sm font-medium text-primary">45 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-slate-300 rounded-full" />
                  <span className="text-sm text-slate-700">Complete Package</span>
                </div>
                <span className="text-sm font-medium text-primary">28 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-slate-300 rounded-full" />
                  <span className="text-sm text-slate-700">CV + Cover Letter</span>
                </div>
                <span className="text-sm font-medium text-primary">16 orders</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
