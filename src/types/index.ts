import type { ReactNode } from 'react';

export type IconName =
  | 'workflow'
  | 'analytics'
  | 'security'
  | 'integrations'
  | 'collaboration'
  | 'automation'
  | 'speed'
  | 'shield'
  | 'plug'
  | 'chart'
  | 'users'
  | 'bolt'
  | 'clock'
  | 'check'
  | 'sparkles'
  | 'globe'
  | 'lock'
  | 'cpu'
  | 'layers'
  | 'git-branch'
  | 'target'
  | 'trending-up'
  | 'palette'
  | 'headphones';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

export interface Benefit {
  icon: IconName;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
  features: string[];
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface CompanyInfo {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export interface ChildProps {
  children: ReactNode;
}

export interface ComponentWithClassName extends ChildProps {
  className?: string;
}
