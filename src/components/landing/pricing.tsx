'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const packages = [
  {
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

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Pay only for what you need. No subscriptions, no hidden fees.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
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
                <Link href="/auth/register">
                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
