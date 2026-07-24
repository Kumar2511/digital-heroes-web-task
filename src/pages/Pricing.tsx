import { useState } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { PricingCard } from '@/components/PricingCard';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Reveal } from '@/components/Reveal';
import { Check, Minus } from 'lucide-react';
import { PRICING_PLANS, COMPARISON_ROWS, PRICING_FAQS } from '@/utils/constants';
import { breadcrumbJsonLd, faqJsonLd } from '@/utils/structuredData';
import { cx } from '@/utils/format';

export function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

  useSeo({
title: 'Pricing | Nexora AI',
description:
  'Choose the perfect Nexora AI plan for your business. Flexible pricing for startups, growing teams, and enterprise organizations.',
    path: '/pricing',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' },
      ]),
      faqJsonLd(PRICING_FAQS),
    ],
  });

  return (
    <>
      <PageHero
  eyebrow="Pricing"
  title={
    <>
      Flexible Pricing for
      <span className="text-gradient-light"> Every Business</span>
    </>
  }
  description="Simple, transparent pricing designed for startups, growing businesses, and enterprise organizations."
/>

      <section className="section bg-ink-50" aria-labelledby="plans-heading">
        <Container className="flex flex-col items-center gap-6">
          <div
            className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white p-1 shadow-soft"
            role="group"
            aria-label="Billing period"
          >
            {(['monthly', 'yearly'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                aria-pressed={billing === option}
                className={cx(
                  'rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-all',
                  billing === option
                    ? 'bg-ink-900 text-white shadow-soft'
                    : 'text-ink-600 hover:text-ink-900'
                )}
              >
                {option}
                {option === 'yearly' && (
                  <span className="ml-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
                    -17%
                  </span>
                )}
              </button>
            ))}
          </div>

          <ul className="grid w-full max-w-6xl items-stretch gap-6 lg:grid-cols-3">
            {PRICING_PLANS.map((plan, i) => (
              <Reveal as="li" key={plan.name} delay={i * 100} className="h-full">
                <PricingCard plan={plan} billing={billing} className="h-full" />
              </Reveal>
            ))}
          </ul>

          <p className="text-sm text-ink-500">
All plans include onboarding support, secure cloud hosting, and free product updates.          </p>
        </Container>
      </section>

      <section className="section bg-white" aria-labelledby="comparison-heading">
        <SectionTitle
          eyebrow="Plan Comparison"
title="Compare Our Plans"
description="Find the right plan based on your team's size, business goals, and automation requirements."
        />
        <Container className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-soft">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">Feature comparison across Starter, Professional, and Enterprise plans</caption>
                <thead>
                  <tr className="bg-ink-50">
                    <th scope="col" className="px-6 py-5 text-sm font-semibold text-ink-900">Feature</th>
                    <th scope="col" className="px-6 py-5 text-center text-sm font-semibold text-ink-900">Starter</th>
                    <th scope="col" className="px-6 py-5 text-center text-sm font-semibold text-brand-700 bg-brand-50/60">Professional</th>
                    <th scope="col" className="px-6 py-5 text-center text-sm font-semibold text-ink-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={row.feature} className={cx(i % 2 === 0 ? 'bg-white' : 'bg-ink-50/40')}>
                      <th scope="row" className="px-6 py-4 text-sm font-medium text-ink-900">{row.feature}</th>
                      <CompareCell value={row.starter} />
                      <CompareCell value={row.professional} highlight />
                      <CompareCell value={row.enterprise} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-ink-50" aria-labelledby="faq-heading">
        <SectionTitle
          eyebrow="Frequently Asked Questions"
title="Common Pricing Questions"
description="Everything you need to know before choosing the right Nexora AI plan."
        />
        <Container className="mt-12 max-w-3xl">
          <FAQ items={PRICING_FAQS} />
        </Container>
      </section>

     <CTA
  title="Ready to Transform Your Business?"
  description="Join organizations using Nexora AI to automate workflows, improve efficiency, and accelerate growth."
  primaryLabel="Get Started"
  secondaryLabel="Book a Demo"
/>
    </>
  );
}

function CompareCell({ value, highlight = false }: { value: string | boolean; highlight?: boolean }) {
  const isBool = typeof value === 'boolean';
  return (
    <td className={cx('px-6 py-4 text-center text-sm', highlight && 'bg-brand-50/40')}>
      {isBool ? (
        value ? (
          <Check className="mx-auto h-5 w-5 text-green-600" aria-label="Included" />
        ) : (
          <Minus className="mx-auto h-5 w-5 text-ink-300" aria-label="Not included" />
        )
      ) : (
        <span className={cx('font-medium', value === '—' ? 'text-ink-300' : 'text-ink-700')}>
          {value}
        </span>
      )}
    </td>
  );
}
