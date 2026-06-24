'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Save, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // TODO: Implement Supabase profile update
      console.log('Saving profile:', { fullName, email });
      setMessage('Profile updated successfully');
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Account Settings</h1>
          <p className="text-slate-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <Input
                    label="Full Name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    disabled
                  />
                  {message && (
                    <p className={`text-sm ${message.includes('success') ? 'text-success' : 'text-red-500'}`}>
                      {message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                    <Save className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                  >
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/auth/login" className="block">
                  <Button variant="outline" size="md" className="w-full justify-start text-slate-600 hover:text-red-500">
                    <LogOut className="mr-2 w-4 h-4" />
                    Sign Out
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-start text-red-500 hover:bg-red-50"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Pay-Per-Use</p>
                    <p className="text-sm text-slate-600">No active subscription</p>
                  </div>
                </div>
                <Link href="/dashboard/pricing">
                  <Button variant="primary" size="sm" className="w-full">
                    View Packages
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
