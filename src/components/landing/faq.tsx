'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does the free CV analysis work?',
    answer: 'Upload your CV and our AI will analyze it for ATS compatibility, formatting, skills, and experience. You will receive scores for each category along with key weaknesses to address.',
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept PDF and DOCX files up to 10MB in size. Our system extracts text from these formats for analysis.',
  },
  {
    question: 'How long does it take to get results?',
    answer: 'Free analysis is instant. Paid services typically take 1-2 minutes to generate, depending on the complexity of the request.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use industry-standard encryption and your data is never shared with third parties. You can delete your CV at any time.',
  },
  {
    question: 'Can I download the optimized CV?',
    answer: 'Yes. All paid packages include downloadable PDF and DOCX versions of your optimized documents.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa payments through PayHero. Simply enter your phone number and complete payment via STK Push.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about CVPro AI
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-primary">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
