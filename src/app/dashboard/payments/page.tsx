'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';

// Mock data - will be replaced with actual data from Supabase
const mockPayments = [
  {
    id: 'PAY-001',
    amount: 149,
    status: 'completed',
    method: 'M-Pesa',
    date: '2024-01-15',
    reference: 'MPESA123456',
  },
  {
    id: 'PAY-002',
    amount: 249,
    status: 'completed',
    method: 'M-Pesa',
    date: '2024-01-14',
    reference: 'MPESA789012',
  },
  {
    id: 'PAY-003',
    amount: 499,
    status: 'pending',
    method: 'M-Pesa',
    date: '2024-01-13',
    reference: 'MPESA345678',
  },
];

export default function PaymentsPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Payments</h1>
          <p className="text-slate-600">
            View your payment history and transaction details
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your recent transactions and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-lg gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">KES {payment.amount}</p>
                      <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                        <span>{payment.method}</span>
                        <span>•</span>
                        <span>{payment.date}</span>
                        <span>•</span>
                        <span className="font-mono">{payment.reference}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusIcon(payment.status)}
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Supported payment methods on CVPro AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-primary">M-Pesa</p>
                <p className="text-sm text-slate-600">Pay via PayHero integration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
