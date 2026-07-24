import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Reveal } from '@/components/Reveal';
import { TESTIMONIALS } from '@/utils/constants';

export function Testimonials() {
  return (
    <section className="section bg-white" aria-labelledby="testimonials-heading">
      <SectionTitle
  eyebrow="Success Stories"
  title="Trusted by Businesses Around the World"
  description="Organizations across multiple industries rely on Nexora AI to automate workflows, improve productivity, and accelerate digital transformation."
/>
      <Container className="mt-14">
        <ul className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 2) * 100}>
              <TestimonialCard testimonial={t} className="h-full" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
