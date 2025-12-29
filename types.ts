
export interface Avatar {
  id: string;
  name: string;
  profession: string;
  language: string[];
  tone: string;
  image: string;
  isPremium: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export type Theme = 'light' | 'dark';

export interface CallRecord {
  id: string;
  avatarId: string;
  avatarName: string;
  date: string;
  duration: string;
  credits: number;
  type: 'video' | 'voice';
  status: 'completed' | 'missed';
}

export interface UserStats {
  remainingCredits: number;
  totalCalls: number;
  minutesUsed: number;
  satisfaction: number;
}
