'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const packages = [
  {
    id: 'ats_analysis',
    name: 'ATS Analysis',
    price: 49,
    description: 'Full ATS Report',
    features: [
      'Complete ATS Score',
      'Keyword Analysis',
      'Formatting Review',
      'Skills Assessment',
      'Detailed Recommendations',
    ],
    popular: false,
  },
  {
    id: 'cv_rewrite',
    name: 'CV Rewrite',
    price: 149,
    description: 'ATS Optimization + New Formatting',
    features: [
      'ATS-Friendly Resume',
      'Keyword Optimization',
      'Improved Skills Section',
      'Better Experience Section',
      'Professional Formatting',
      'PDF & DOCX Export',
    ],
    popular: true,
  },
  {
    id: 'cv_cover_letter',
    name: 'CV + Cover Letter',
    price: 249,
    description: 'Complete CV Package',
    features: [
      'Everything in CV Rewrite',
      'Custom Cover Letter',
      'Job-Specific Tailoring',
      'Multiple Export Formats',
      'Priority Support',
    ],
    popular: false,
  },
  {
    id: 'complete_package',
    name: 'Complete Package',
    price: 499,
    description: 'Everything You Need',
    features: [
      'CV Rewrite',
      'Cover Letter',
      'Interview Questions',
      'Job Match Report',
      'Unlimited Revisions',
      'Priority Support',
    ],
    popular: false,
  },
];

export default function PricingPage() {
  const handlePurchase = (packageId: string) => {
    // TODO: Implement PayHero payment integration
    console.log('Purchasing package:', packageId);
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Choose Your Package</h1>
          <p className="text-slate-600">
            Select the package that best fits your needs. Pay only for what you use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative ${pkg.popular ? 'border-accent border-2 shadow-lg' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">KES {pkg.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={pkg.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full"
                  onClick={() => handlePurchase(pkg.id)}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>How payments work on CVPro AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-primary">M-Pesa Payments</p>
                  <p className="text-sm text-slate-600">
                    We use PayHero for secure M-Pesa payments. Simply enter your phone number and complete payment via STK Push.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-primary">Instant Access</p>
                  <p className="text-sm text-slate-600">
                    Once payment is confirmed, you will have immediate access to your purchased services.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-primary">No Subscriptions</p>
                  <p className="text-sm text-slate-600">
                    Pay only when you need a service. No recurring charges or hidden fees.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
