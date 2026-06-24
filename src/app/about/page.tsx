import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/landing/footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Target, Users, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">About CVPro AI</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Empowering job seekers with AI-powered tools to land their dream careers
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-slate-700 leading-relaxed">
              At CVPro AI, we believe everyone deserves access to professional career tools. Our mission is to 
              democratize career advancement by providing affordable, AI-powered solutions that help job seekers 
              stand out in competitive markets. We leverage cutting-edge technology to analyze, optimize, and 
              enhance your job application materials, giving you the best chance of success.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Results-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Our tools are designed with one goal: helping you get hired. Every feature is optimized for real-world results.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>User-Centric</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                We put our users first. Your feedback shapes our product, and we're constantly improving based on your needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                We stay ahead of the curve with the latest AI technology to give you cutting-edge career tools.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Trust & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Your data is secure with us. We use industry-standard encryption and never share your information.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-slate-700">
              <p>
                CVPro AI was founded with a simple observation: talented professionals were struggling to get noticed 
                in an increasingly competitive job market. Despite having excellent skills and experience, many were 
                being rejected by ATS systems before their applications ever reached human eyes.
              </p>
              <p>
                We set out to change this. By combining advanced AI technology with deep understanding of recruitment 
                processes, we built tools that help job seekers navigate the modern hiring landscape with confidence.
              </p>
              <p>
                Today, CVPro AI has helped thousands of professionals across Kenya and beyond optimize their CVs, 
                craft compelling cover letters, and prepare for interviews. Our pay-per-use model ensures professional 
                career tools are accessible to everyone, not just those who can afford expensive services.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Get in Touch</CardTitle>
            <CardDescription>Have questions? We'd love to hear from you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Email</h3>
                <p className="text-slate-600">support@cvpro.ai</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Location</h3>
                <p className="text-slate-600">Nairobi, Kenya</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Social</h3>
                <p className="text-slate-600">@cvproai</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
