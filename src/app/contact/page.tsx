import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const whatsappNumber = '254101024580';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20need%20help%20with%20CVPro%20AI`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] px-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <MessageCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-3">Chat With Us</h1>
        <p className="text-slate-600 text-lg max-w-md mb-8">
          We're available on WhatsApp. Tap the button below to start a conversation.
        </p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
            <MessageCircle className="w-5 h-5" />
            Open WhatsApp
          </Button>
        </a>
        <p className="text-slate-400 text-sm mt-4">+254 101 024 580</p>
      </main>
      <Footer />
    </div>
  );
}
