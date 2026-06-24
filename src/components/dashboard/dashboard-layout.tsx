'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Download, 
  BarChart3, 
  CreditCard, 
  User, 
  LogOut,
  Menu,
  X,
  PenTool,
  MessageSquare,
  Target,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload CV', href: '/dashboard/upload', icon: FileText },
  { name: 'Analysis', href: '/dashboard/analysis', icon: BarChart3 },
  { name: 'Cover Letter', href: '/dashboard/cover-letter', icon: PenTool },
  { name: 'Interview Prep', href: '/dashboard/interview', icon: MessageSquare },
  { name: 'Job Match', href: '/dashboard/job-match', icon: Target },
  { name: 'Pricing', href: '/dashboard/pricing', icon: Tag },
  { name: 'Orders', href: '/dashboard/orders', icon: BarChart3 },
  { name: 'Downloads', href: '/dashboard/downloads', icon: Download },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Account', href: '/dashboard/account', icon: User },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">CVPro AI</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-200">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-primary">CVPro AI</span>
              </Link>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-accent text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-200">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full justify-start text-slate-600 hover:text-red-500"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};
