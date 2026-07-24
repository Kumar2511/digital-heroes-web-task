import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { CTA } from '@/components/CTA';
import { Stats } from '@/components/Stats';
import { STATS, SITE } from '@/utils/constants';
import { organizationJsonLd, breadcrumbJsonLd } from '@/utils/structuredData';

const VALUES = [
  {
    title: 'Automation first',
    description: 'If a task is repeatable, it should be automated. We build the tools to make that effortless.',
  },
  {
    title: 'Clarity over complexity',
    description: "Powerful doesn't have to mean complicated. Every feature should feel obvious the first time you use it.",
  },
  {
    title: 'Security as a baseline',
    description: 'Trust is earned. We hold ourselves to the same standards as the most regulated teams we serve.',
  },
  {
    title: 'Customer momentum',
    description: 'Our success is measured by how much faster our customers move after they adopt Nexora AI.',
  },
];

const TEAM = [
  { name: 'Elena Voss', role: 'Co-founder & CEO', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=320&h=320&fit=crop' },
  { name: 'Rahul Mehta', role: 'Co-founder & CTO', avatar: 'https://images.pexels.com/photos/220459/pexels-photo-220459.jpeg?auto=compress&cs=tinysrgb&w=320&h=320&fit=crop' },
  { name: 'Sara Lindqvist', role: 'Head of Product', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=320&h=320&fit=crop' },
  { name: 'Marcus Cole', role: 'Head of Engineering', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=320&h=320&fit=crop' },
];

const TIMELINE = [
  {
    year: '2025',
    title: 'Nexora AI Founded',
    description:
      'Nexora AI was established with a vision to simplify business operations through intelligent automation.',
  },
  {
    year: '2025',
    title: 'Platform Launch',
    description:
      'Released the first version of our AI workflow automation platform with collaboration and analytics features.',
  },
  {
    year: '2026',
    title: 'Business Expansion',
    description:
      'Expanded platform capabilities with cloud integrations, enterprise security, and advanced reporting.',
  },
  {
    year: '2026',
    title: 'Growing Customer Base',
    description:
      'Organizations across multiple industries adopted Nexora AI to improve productivity and streamline operations.',
  },
];

export function About() {
  useSeo({
title: 'About | Nexora AI',
description:
  'Learn about Nexora AI, our mission, values, and commitment to helping businesses automate workflows with intelligent AI solutions.',
    path: '/about',
    jsonLd: [
      organizationJsonLd,
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  });

  return (
    <>
      <PageHero
  eyebrow="About Us"
  title={
    <>
      Building the Future of
      <span className="text-gradient-light"> Intelligent Business Automation</span>
    </>
  }
  description="At Nexora AI, we help organizations automate workflows, improve collaboration, and make smarter business decisions through AI-powered technology."
/>

      <section className="section bg-white" aria-labelledby="mission-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">Our mission</span>
            <h2 id="mission-heading" className="text-3xl font-bold text-ink-900 sm:text-4xl">
              Empowering Businesses Through Intelligent Automation
            </h2>
            <p className="text-lg text-ink-500 leading-relaxed">
              Nexora AI was created to simplify business operations through intelligent automation. Our platform enables organizations of every size to automate repetitive processes, improve team collaboration, and make faster data-driven decisions without unnecessary complexity.
            </p>
            <p className="text-ink-500 leading-relaxed">
              Founded in {SITE.founded}, Nexora AI brings together experienced engineers, designers, and product specialists dedicated to building secure, scalable, and user-friendly AI solutions for modern businesses worldwide.
            </p>
          </div>
          <Reveal delay={80}>
            <div className="overflow-hidden rounded-4xl border border-ink-200 shadow-soft-lg">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=900&h=640&fit=crop"
                alt="Nexora AI team collaborating in a modern workspace"
                loading="lazy"
                decoding="async"
                width={900}
                height={640}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section bg-ink-50" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Company statistics</h2>
        <Container>
          <Stats stats={STATS} />
        </Container>
      </section>

      <section className="section bg-white" aria-labelledby="values-heading">
        <SectionTitle
          eyebrow="Values"
          title="What we believe"
          description="Our core values guide every product we build and every customer relationship we create."        />
        <Container className="mt-14">
          <ul className="grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <Reveal as="li" key={value.title} delay={(i % 2) * 100}>
                <Card className="h-full p-8">
                  <h3 className="text-xl font-semibold text-ink-900">{value.title}</h3>
                  <p className="mt-3 text-ink-500 leading-relaxed">{value.description}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section bg-ink-50" aria-labelledby="timeline-heading">
        <SectionTitle
          eyebrow="Our story"
          title="How we got here"
          description="A short timeline of the milestones that shaped Nexora AI."
        />
        <Container className="mt-14 max-w-3xl">
          <ol className="relative flex flex-col gap-8 border-l-2 border-ink-200 pl-8">
            {TIMELINE.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 100} className="relative">
                <span className="absolute -left-[2.6rem] flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white ring-4 ring-ink-50">
                  {i + 1}
                </span>
                <div className="text-sm font-semibold text-brand-600">{item.year}</div>
                <h3 className="mt-1 text-lg font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-1 text-ink-500 leading-relaxed">{item.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section id="careers" className="section bg-white" aria-labelledby="team-heading">
        <SectionTitle
          eyebrow="Team"
          title="Meet the Nexora AI Team"
description="A passionate team of engineers, designers, and innovators building intelligent automation solutions for businesses worldwide."
        />
        <Container className="mt-14">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <Reveal as="li" key={member.name} delay={(i % 4) * 80}>
                <Card hover className="flex h-full flex-col items-center gap-4 p-7 text-center">
                  <img
                    src={member.avatar}
                    alt={`Portrait of ${member.name}`}
                    loading="lazy"
                    decoding="async"
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-full object-cover ring-2 ring-ink-100"
                  />
                  <div>
                    <div className="font-semibold text-ink-900">{member.name}</div>
                    <div className="text-sm text-ink-500">{member.role}</div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CTA
  title="Let's Build Smarter Businesses Together"
  description="Whether you're a startup or an enterprise, Nexora AI is ready to help you automate workflows and accelerate growth."
  primaryLabel="Contact Us"
  secondaryLabel="Request a Demo"
/>
    </>
  );
}
