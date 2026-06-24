export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  file_url: string;
  raw_text: string;
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  resume_id: string;
  report_type: 'analysis' | 'rewrite' | 'cover_letter' | 'interview' | 'job_match';
  content: any;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transaction_reference: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  package_name: 'ats_analysis' | 'cv_rewrite' | 'cv_cover_letter' | 'complete_package';
  payment_id: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface CVAnalysis {
  ats_score: number;
  formatting_score: number;
  skills_score: number;
  experience_score: number;
  overall_score: number;
  weaknesses: string[];
  recommendations: string[];
}

export interface CoverLetterInput {
  job_title: string;
  company_name: string;
  job_description: string;
  experience_level: 'entry' | 'mid' | 'senior';
}

export interface InterviewPrep {
  questions: Array<{
    question: string;
    answer: string;
    type: 'technical' | 'behavioral';
  }>;
}

export interface JobMatch {
  match_percentage: number;
  missing_skills: string[];
  missing_keywords: string[];
  recommended_improvements: string[];
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}
