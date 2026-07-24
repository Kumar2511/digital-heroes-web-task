export const SITE = {
  name: 'Nexora AI',
  tagline: 'Intelligent Workflow Automation for Modern Businesses',
  description:
    'Nexora AI empowers organizations to automate workflows, streamline operations, improve collaboration, and make faster business decisions using AI-powered automation.',
  url: 'https://nexora-ai.vercel.app',
  twitter: '@nexoraai',
  email: 'contact@nexora.ai',
  phone: '+1 (800) 555-2026',
  address: 'Innovation Park, Austin, Texas, USA',
  hours: 'Monday – Friday, 9:00 AM – 6:00 PM',
  founded: '2025',
};

export const NAV_LINKS = [
  { label: 'Product', href: '/product' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '/product' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '/product' },
  ],

  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/contact' },
  ],

  Resources: [
    { label: 'Documentation', href: '/product' },
    { label: 'Help Center', href: '/contact' },
    { label: 'Blog', href: '/about' },
  ],

  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/privacy' },
  ],
};

export const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com/nexoraai', icon: 'twitter' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/nexoraai', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/nexoraai', icon: 'github' },
  { label: 'YouTube', href: 'https://youtube.com/@nexoraai', icon: 'youtube' },
] as const;

export const TRUSTED_COMPANIES = [
  'Northwind',
  'Lumina',
  'Vertex',
  'Caelum',
  'Quantia',
  'Meridian',
] as const;

export const STATS: import('@/types').Stat[] = [
  { value: '12,000+', label: 'Teams automated', sublabel: 'across 70+ countries' },
  { value: '47M+', label: 'Workflows run', sublabel: 'every single month' },
  { value: '99.99%', label: 'Platform uptime', sublabel: 'SLA-backed reliability' },
  { value: '8.4 hrs', label: 'Saved per person', sublabel: 'weekly, on average' },
];

export const HOME_FEATURES: import('@/types').Feature[] = [
  {
    icon: 'workflow',
    title: 'AI Workflow Automation',
    description:
      'Automate repetitive business processes with intelligent AI-powered workflows that save time and improve productivity.',
  },
  {
    icon: 'analytics',
    title: 'Real-Time Business Analytics',
    description:
      'Monitor performance with live dashboards, customizable reports, and actionable insights for better decision-making.',
  },
  {
    icon: 'security',
    title: 'Enterprise-Grade Security',
    description:
      'Keep your business secure with encrypted data, role-based access control, compliance standards, and audit logs.',
  },
  {
    icon: 'collaboration',
    title: 'Smart Team Collaboration',
    description:
      'Collaborate efficiently with shared workspaces, approval workflows, notifications, and centralized communication.',
  },
  {
    icon: 'integrations',
    title: 'Seamless Cloud Integrations',
    description:
      'Connect effortlessly with CRM, ERP, HRMS, Google Workspace, Microsoft 365, Slack, and hundreds of business applications.',
  },
  {
    icon: 'cpu',
    title: 'AI Decision Engine',
    description:
      'Leverage predictive analytics and intelligent recommendations to optimize operations and accelerate business growth.',
  },
  {
    icon: 'cpu',
    title: 'AI actions built in',
    description:
      'Summarize documents, classify tickets, extract data, and draft replies with GPT-class models — wired directly into your steps as native actions.',
  },
  {
    icon: 'integrations',
    title: '300+ native integrations',
    description:
      'Connect Slack, HubSpot, Salesforce, Notion, Linear, Postgres, and the rest of your stack in minutes. Use webhooks or the HTTP step for anything else.',
  },
  {
    icon: 'analytics',
    title: 'Live analytics',
    description:
      'Track run volume, success rates, cost per execution, and time saved. Drill into any run to inspect inputs, outputs, and duration step by step.',
  },
  {
    icon: 'security',
    title: 'Enterprise-grade security',
    description:
      'SOC 2 Type II, GDPR-ready, SSO/SAML, granular RBAC, and audit logs. Your data is encrypted in transit and at rest, never used to train models.',
  },
  {
    icon: 'collaboration',
    title: 'Built for teams',
    description:
      'Share workspaces, comment on runs, request approvals, and review changes together. Versioning and environments keep production safe.',
  },
];

export const HOME_BENEFITS: import('@/types').Benefit[] = [
  {
    icon: 'clock',
    title: 'Save Valuable Time',
    description:
      'Automate repetitive workflows and free your team to focus on strategic initiatives that drive business growth.',
    stat: '65%',
    statLabel: 'less manual work',
  },
  {
    icon: 'trending-up',
    title: 'Increase Productivity',
    description:
      'Improve operational efficiency with AI-powered automation, real-time monitoring, and optimized business processes.',
    stat: '3×',
    statLabel: 'faster workflow execution',
  },
  {
    icon: 'bolt',
    title: 'Scale with Confidence',
    description:
      'Grow your business using secure, cloud-based automation designed to support teams of any size.',
    stat: '99.9%',
    statLabel: 'platform availability',
  },

  {
    icon: 'trending-up',
    title: 'Fewer errors, more consistency',
    description:
      'Every run follows the exact same logic, so data entry, handoffs, and approvals stop falling through the cracks.',
    stat: '93%',
    statLabel: 'fewer manual errors reported',
  },
  {
    icon: 'bolt',
    title: 'Ship automations in days',
    description:
      'Go from idea to production workflow in an afternoon — no engineering queue, no deployment pipeline, no tickets.',
    stat: '4×',
    statLabel: 'faster than custom scripts',
  },
];

export const HOW_IT_WORKS: import('@/types').Step[] = [
  {
    number: '01',
    title: 'Connect your tools',
    description:
      'Authenticate the apps your team already uses. Nexora AI handles OAuth, API keys, and token refresh automatically.',
    icon: 'plug',
  },
  {
    number: '02',
    title: 'Design your workflow',
    description:
      'Pick a trigger, add steps, and branch with conditions. Drop in AI actions to handle the fuzzy, unstructured parts.',
    icon: 'workflow',
  },
  {
    number: '03',
    title: 'Test and publish',
    description:
      'Run against sample data, inspect every step, then promote to production with versioning and rollback built in.',
    icon: 'git-branch',
  },
  {
    number: '04',
    title: 'Monitor and improve',
    description:
      'Watch live analytics, get alerts on failures, and iterate visually — no redeploy, no downtime, no engineering ticket.',
    icon: 'analytics',
  },
];

export const TESTIMONIALS: import('@/types').Testimonial[] = [
  {
    quote:
      'Nexora AI reduced our manual workload by nearly 60%. Our operations team now focuses on improving business processes instead of repetitive tasks.',
    name: 'Sarah Johnson',
    role: 'Operations Manager',
    company: 'NovaTech Solutions',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Deployment was seamless, and the integrations worked perfectly with our existing systems. Productivity improvements were noticeable within weeks.',
    name: 'Michael Chen',
    role: 'IT Director',
    company: 'Apex Logistics',
    avatar: 'https://images.pexels.com/photos/220459/pexels-photo-220459.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Real-time analytics and intelligent automation helped our teams make faster decisions and collaborate more effectively across departments.',
    name: 'Priya Sharma',
    role: 'Business Analyst',
    company: 'BrightEdge Consulting',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Nexora AI gave us a scalable automation platform without adding complexity. It has become an essential part of our daily business operations.',
    name: 'David Miller',
    role: 'Chief Operating Officer',
    company: 'Elevate Digital',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
    rating: 5,
  },
];

export const HOME_FAQS: import('@/types').FAQItem[] = [
  {
    question: 'Do I need to know how to code to use Nexora AIt?',
    answer:
      'No. The visual workflow builder handles branching, loops, and transformations without code. Developers can still drop into a code step or use the HTTP action for advanced cases, but the majority of our customers never write a line.',
  },
  {
    question: 'How does Nexora AI use AI?',
    answer:
      'AI actions are native steps you can drop into any workflow — summarize, classify, extract, translate, draft, and more. They run on managed GPT-class models, so there is nothing to host or tune. You can also bring your own model keys.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. Nexora AI is SOC 2 Type II certified and GDPR-ready. Data is encrypted in transit and at rest, never used to train models, and you control retention. Enterprise plans add SSO/SAML, SCIM, audit logs, and private cloud deployments.',
  },
  {
    question: 'Can I try it before committing?',
    answer:
      'Every plan includes a 14-day free trial with no credit card required. You can build and run real workflows against your live data during the trial so you know it works before you pay.',
  },
  {
    question: 'What happens when I hit my run limit?',
    answer:
      'Nothing breaks. We notify you before you reach the limit, and runs simply queue until the next cycle or you upgrade. You can also set hard caps to control spend, or switch to the Enterprise plan for custom volume.',
  },
];

export const PRICING_PLANS: import('@/types').PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Perfect for startups and small teams.',
    monthlyPrice: 19,
    yearlyPrice: 15,
    cta: 'Get Started',
    href: '/contact',
    features: [
      'Up to 5 team members',
      '5,000 workflow executions',
      'Basic AI automation',
      'Email support',
      'Analytics dashboard',
    ],
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses.',
    monthlyPrice: 59,
    yearlyPrice: 49,
    cta: 'Start Free Trial',
    href: '/contact',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Up to 25 team members',
      'Unlimited workflows',
      'Advanced AI automation',
      'Real-time analytics',
      'Priority support',
      'API integrations',
    ],
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large organizations.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: 'Contact Sales',
    href: '/contact',
    badge: 'Custom',
    features: [
      'Unlimited users',
      'SSO & SAML',
      'Dedicated account manager',
      'Custom integrations',
      '99.99% SLA',
      '24/7 premium support',
    ],
  },
];

export const COMPARISON_ROWS: import('@/types').ComparisonRow[] = [
  { feature: 'Seats included', starter: '3', professional: '10', enterprise: 'Unlimited' },
  { feature: 'Workflow runs / month', starter: '1,000', professional: '25,000', enterprise: 'Custom' },
  { feature: 'Native integrations', starter: '50+', professional: '300+', enterprise: '300+' },
  { feature: 'AI actions', starter: false, professional: true, enterprise: true },
  { feature: 'Live analytics', starter: 'Basic', professional: 'Advanced', enterprise: 'Advanced' },
  { feature: 'Run history', starter: '14 days', professional: '90 days', enterprise: '1 year+' },
  { feature: 'Versioning & environments', starter: false, professional: true, enterprise: true },
  { feature: 'SSO / SAML', starter: false, professional: false, enterprise: true },
  { feature: 'Audit logs', starter: false, professional: false, enterprise: true },
  { feature: 'Data residency', starter: false, professional: false, enterprise: true },
  { feature: 'Uptime SLA', starter: '—', professional: '99.9%', enterprise: '99.99%' },
  { feature: 'Support', starter: 'Email', professional: 'Priority', enterprise: '24/7 + CSM' },
];

export const PRICING_FAQS = [
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes. Every plan includes a 14-day free trial with full access to core features. No credit card is required to get started.',
  },
  {
    question: 'Can I upgrade or downgrade my plan later?',
    answer:
      'Absolutely. You can change your subscription at any time, and your billing will be adjusted automatically.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Yes. Annual subscriptions include discounted pricing compared to monthly billing, helping businesses save on long-term usage.',
  },
  {
    question: 'Is my business data secure?',
    answer:
      'Yes. Nexora AI uses enterprise-grade security, encrypted data storage, secure cloud infrastructure, and regular backups to protect your information.',
  },
  {
    question: 'Do Enterprise plans include dedicated support?',
    answer:
      'Yes. Enterprise customers receive a dedicated account manager, priority technical support, onboarding assistance, and custom integrations.',
  },

  {
    question: 'Can I change plans later?',
    answer:
      'Absolutely. You can upgrade, downgrade, or cancel at any time from your workspace settings. Changes are prorated automatically and take effect immediately.',
  },
  {
    question: 'How is run volume counted?',
    answer:
      'A run is a single execution of a workflow, from trigger to completion. Retries and test runs in the builder do not count against your monthly quota.',
  },
  {
    question: 'Do you offer discounts for startups or nonprofits?',
    answer:
      'Yes. Eligible early-stage startups and registered nonprofits get up to 50% off Professional plans for the first year. Reach out to sales and we will get you set up.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'All major credit cards, ACH transfer, and wire transfer for annual Enterprise contracts. Invoicing is available on annual plans and above.',
  },
];

export const PRODUCT_FEATURES: import('@/types').Feature[] = [
  {
    icon: 'workflow',
    title: 'Visual workflow builder',
    description:
      'A drag-and-drop canvas for multi-step automations. Branch on conditions, loop over records, transform data, and chain hundreds of steps — all visually.',
  },
  {
    icon: 'cpu',
    title: 'AI automation',
    description:
      'Native AI actions for summarization, classification, extraction, translation, drafting, and sentiment. Bring your own model keys or use our managed models.',
  },
  {
    icon: 'analytics',
    title: 'Analytics',
    description:
      'Real-time dashboards for run volume, success rate, latency, and cost. Drill into any execution to inspect inputs, outputs, and timing for every step.',
  },
  {
    icon: 'security',
    title: 'Security',
    description:
      'SOC 2 Type II, GDPR-ready, encryption in transit and at rest, SSO/SAML, granular RBAC, audit logs, and configurable data residency.',
  },
  {
    icon: 'integrations',
    title: 'Integrations',
    description:
      '300+ native connectors plus webhooks and a flexible HTTP step for anything else. OAuth, API keys, and token refresh are handled for you.',
  },
  {
    icon: 'collaboration',
    title: 'Collaboration',
    description:
      'Shared workspaces, inline comments, approval requests, environments, and version history so teams build and review automations together.',
  },
];

export const INTEGRATIONS_LIST = [
  'Slack', 'HubSpot', 'Salesforce', 'Notion', 'Linear', 'GitHub',
  'Postgres', 'Stripe', 'Zendesk', 'Intercom', 'Airtable', 'Google Sheets',
  'Gmail', 'Outlook', 'Jira', 'Asana', 'Twilio', 'Shopify',
] as const;

export const COMPANY_INFO: import('@/types').CompanyInfo = {
  email: SITE.email,
  phone: SITE.phone,
  address: SITE.address,
  hours: SITE.hours,
};
