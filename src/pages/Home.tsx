import { useSeo } from '@/hooks/useSeo';
import { Hero } from '@/components/Hero';
import { DashboardPreview } from '@/components/DashboardPreview';
import { TrustedBy } from '@/components/TrustedBy';
import { Features } from '@/components/Features';
import { Benefits } from '@/components/Benefits';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { Stats } from '@/components/Stats';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { STATS, HOME_FAQS } from '@/utils/constants';
import { organizationJsonLd, softwareApplicationJsonLd, faqJsonLd } from '@/utils/structuredData';

export function Home() {
  useSeo({
    title: 'Nexora AI - Automate Business Workflows with AI',
    description:
      'Nexora AI helps businesses automate repetitive workflows, manage operations, improve team collaboration, and increase productivity using Artificial Intelligence.',
    path: '/',
    jsonLd: [organizationJsonLd, softwareApplicationJsonLd, faqJsonLd(HOME_FAQS)],
  });

  return (
    <>
      <Hero />
      <DashboardPreview />
      <TrustedBy />
      <Features />
      <Benefits />
      <HowItWorks />

      <section className="section bg-ink-50" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Platform statistics</h2>
        <Container>
          <Stats stats={STATS} />
        </Container>
      </section>

      <Testimonials />

      <section className="section bg-ink-50" aria-labelledby="faq-heading">
        <SectionTitle
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything you need to know about Nexora AI before you get started."
        />
        <Container className="mt-12 max-w-3xl">
          <FAQ items={HOME_FAQS} />
        </Container>
      </section>

      <CTA />
    </>
  );
}
