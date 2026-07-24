import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/Container';
import { CTA } from '@/components/CTA';
import { SITE } from '@/utils/constants';
import { breadcrumbJsonLd } from '@/utils/structuredData';

const SECTIONS = [
  {
    heading: '1. Information we collect',
    body: [
      'Account information you provide when you sign up, such as your name, email address, and company name.',
      'Data you connect to Nexora AI through integrations, which is used solely to execute the workflows you design. We never use your data to train AI models.',
      'Usage data such as workflow run counts, logs, and device information, collected to operate, secure, and improve the platform.',
    ],
  },
  {
    heading: '2. How we use your information',
    body: [
      'To provide, maintain, and improve the Nexora AI platform and its features.',
      'To monitor and prevent fraud, abuse, and security incidents.',
      'To communicate with you about your account, product updates, and support requests.',
      'To comply with legal obligations and enforce our terms of service.',
    ],
  },
  {
    heading: '3. Data sharing and subprocessors',
    body: [
      'We do not sell your data. We share it only with subprocessors who help us run the platform — for example, cloud infrastructure and email delivery providers — under strict data processing agreements.',
      'A current list of subprocessors is available on request and is reviewed at least quarterly.',
    ],
  },
  {
    heading: '4. Data retention',
    body: [
      'We retain workflow run logs and history according to your plan — 14 days on Starter, 90 days on Professional, and one year or more on Enterprise.',
      'You can export or delete your data at any time from your workspace settings. Deletion is permanent and irreversible.',
    ],
  },
  {
    heading: '5. Security',
    body: [
      'Nexora AI is SOC 2 Type II certified. Data is encrypted in transit using TLS 1.3 and at rest using AES-256.',
      'Access to production systems is restricted, logged, and reviewed. We support SSO/SAML, SCIM, and granular role-based access control on Enterprise plans.',
    ],
  },
  {
    heading: '6. Your rights',
    body: [
      'Depending on your jurisdiction, you may have the right to access, correct, export, or delete your personal data, and to object to or restrict certain processing.',
      'To exercise any of these rights, contact us at privacy@Nexora AI.ai. We respond within 30 days.',
    ],
  },
  {
    heading: '7. International transfers',
    body: [
      'Nexora AI operates globally. When we transfer personal data across borders, we rely on Standard Contractual Clauses and other lawful transfer mechanisms.',
      'Enterprise customers can select their data residency region to keep data within a specific geography.',
    ],
  },
  {
    heading: '8. Changes to this policy',
    body: [
      'We may update this policy from time to time. We will notify you of material changes by email and post a summary of changes on this page at least 30 days before they take effect.',
    ],
  },
];

export function Privacy() {
  useSeo({
    title: 'Privacy Policy — How Nexora AI handles your data',
    description:
      'Nexora AI is SOC 2 Type II certified and GDPR-ready. Read our full privacy policy covering data collection, use, retention, security, and your rights.',
    path: '/privacy',
    jsonLd: breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ]),
  });

  const lastUpdated = 'June 2025';

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How we collect, use, and protect your data. Last updated ${lastUpdated}.`}
      />

      <section className="section bg-ink-50" aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="sr-only">Privacy policy details</h2>
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-10">
            <div className="rounded-3xl border border-brand-100 bg-brand-50/50 p-6">
              <p className="text-sm text-ink-700 leading-relaxed">
                This policy describes what {SITE.name} collects, why we collect it, and the choices
                you have. We wrote it in plain language because privacy shouldn't require a
                law degree to understand. If anything is unclear, email{' '}
                <a href="mailto:privacy@Nexora AI.ai" className="font-medium text-brand-700 underline underline-offset-2">
                  privacy@Nexora AI
                </a>
                .
              </p>
            </div>

            {SECTIONS.map((section) => (
              <section key={section.heading} className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-ink-900">{section.heading}</h2>
                <ul className="flex flex-col gap-3">
                  {section.body.map((para, i) => (
                    <li key={i} className="flex items-start gap-3 text-ink-600 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" aria-hidden="true" />
                      <span>{para}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className="flex flex-col gap-4 border-t border-ink-200 pt-8">
              <h2 className="text-2xl font-bold text-ink-900">Contact</h2>
              <p className="text-ink-600 leading-relaxed">
                Questions about this policy or your data? Email us at{' '}
                <a href="mailto:privacy@Nexora AI" className="font-medium text-brand-700 underline underline-offset-2">
                  privacy@Nexora AI
                </a>{' '}
                or write to us at {SITE.address}.
              </p>
            </section>
          </div>
        </Container>
      </section>

      <CTA
        title="Have a question about your data?"
        description="Our team is happy to walk you through how Nexora AI handles your information."
        primaryLabel="Contact us"
        secondaryLabel="View pricing"
      />
    </>
  );
}
