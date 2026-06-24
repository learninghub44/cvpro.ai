'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Upload, User, LogOut } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">CVPro AI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-slate-600 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/#features" className="text-slate-600 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="text-slate-600 hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="text-slate-600 hover:text-primary transition-colors">
              FAQ
            </Link>

          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
