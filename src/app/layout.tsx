import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "CVPro AI - Upload Your CV. Get Hired Faster.",
  description: "AI-powered career platform that helps job seekers improve their CVs, generate professional cover letters, optimize for ATS systems, and prepare for interviews.",
  keywords: ["CV", "resume", "ATS", "job search", "cover letter", "interview preparation", "AI", "career"],
  authors: [{ name: "CVPro AI" }],
  creator: "CVPro AI",
  publisher: "CVPro AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cvpro.ai'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CVPro AI",
    title: "CVPro AI - Upload Your CV. Get Hired Faster.",
    description: "AI-powered career platform that helps job seekers improve their CVs, generate professional cover letters, optimize for ATS systems, and prepare for interviews.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVPro AI - Upload Your CV. Get Hired Faster.",
    description: "AI-powered career platform that helps job seekers improve their CVs, generate professional cover letters, optimize for ATS systems, and prepare for interviews.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
