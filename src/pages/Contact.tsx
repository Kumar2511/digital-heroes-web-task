import { useState, type FormEvent } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Check, Mail, Phone, MapPin, Clock, Send, AlertCircle } from 'lucide-react';
import { COMPANY_INFO, SOCIAL_LINKS } from '@/utils/constants';
import { breadcrumbJsonLd } from '@/utils/structuredData';
import { cx } from '@/utils/format';

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.company.trim()) errors.company = 'Please enter your company name.';
  if (!values.message.trim()) errors.message = 'Please tell us how we can help.';
  else if (values.message.trim().length < 10) errors.message = 'A little more detail helps us help you.';
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false, email: false, company: false, message: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useSeo({
    title: 'Contact | Nexora AI',
description:
  'Contact Nexora AI for product demos, sales inquiries, technical support, or partnership opportunities. Our team typically responds within one business day.',
    path: '/contact',
    jsonLd: breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  });

  function update<K extends keyof FormState>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key]) {
      setErrors(validate({ ...values, [key]: value }));
    }
  }

  function handleBlur(key: keyof FormState) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, company: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setValues({ name: '', email: '', company: '', message: '' });
      setTouched({ name: false, email: false, company: false, message: false });
    }, 900);
  }

  const contactCards = [
    { icon: Mail, label: 'Email', value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { icon: Phone, label: 'Phone', value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone.replace(/[^+\d]/g, '')}` },
    { icon: MapPin, label: 'Office', value: COMPANY_INFO.address },
    { icon: Clock, label: 'Hours', value: COMPANY_INFO.hours },
  ];

  return (
    <>
      <PageHero
  eyebrow="Contact Us"
  title={
    <>
      Let's Build Smarter
      <span className="text-gradient-light"> Business Workflows</span>
    </>
  }
  description="Whether you need a product demo, technical support, or want to learn how Nexora AI can automate your business, we're here to help."
/>

      <section className="section bg-ink-50" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="sr-only">Contact form and company information</h2>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <ul className="grid gap-4 sm:grid-cols-2">
                {contactCards.map((c) => {
                  const Inner = (
                    <Card className="flex h-full flex-col gap-3 p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <c.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-ink-900">{c.label}</div>
                        <div className="mt-0.5 text-sm text-ink-500">{c.value}</div>
                      </div>
                    </Card>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="block h-full">{Inner}</a>
                      ) : (
                        Inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-ink-900">Find us on the map</h3>
                <div
                  className="mt-4 aspect-[16/10] overflow-hidden rounded-2xl border border-ink-200 bg-ink-100"
                  role="img"
aria-label="Map showing Nexora AI office location"                >
                  <iframe
                    title="Nexora AI office location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4035%2C37.7895%2C-122.3995%2C37.7915&layer=mapnik&marker=37.7905%2C-122.4015"
                    className="h-full w-full grayscale"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="mt-3 text-xs text-ink-500">
                  {COMPANY_INFO.address}
                </p>
              </Card>
            </Reveal>

            <Reveal delay={150}>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-ink-900">Follow us</h3>
                <ul className="flex gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-900 hover:text-white transition-colors"
                        aria-label={`${s.label} (opens in a new tab)`}
                      >
                        <SocialGlyph name={s.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <Card className="p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center" role="status" aria-live="polite">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-bold text-ink-900">Message sent</h3>
                  <p className="max-w-sm text-ink-500">
                    Thanks for reaching out. A member of our team will get back to you within one
                    business day.
                  </p>
                  <Button variant="secondary" onClick={() => setStatus('idle')}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-ink-900">
                      Full name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={values.name}
                      onChange={(e) => update('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={inputClass(!!errors.name)}
                      placeholder="John Smith"
                    />
                    {errors.name && <FieldError id="name-error">{errors.name}</FieldError>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-ink-900">
                      Work email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={values.email}
                      onChange={(e) => update('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={inputClass(!!errors.email)}
                      placeholder="jordan@company.com"
                    />
                    {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-sm font-medium text-ink-900">
                      Company <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      required
                      value={values.company}
                      onChange={(e) => update('company', e.target.value)}
                      onBlur={() => handleBlur('company')}
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                      className={inputClass(!!errors.company)}
                      placeholder="ABC Technologies Pvt. Ltd."
                    />
                    {errors.company && <FieldError id="company-error">{errors.company}</FieldError>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-ink-900">
                      How can we help? <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={values.message}
                      onChange={(e) => update('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={cx(inputClass(!!errors.message), 'resize-y min-h-[120px]')}
                      placeholder="Tell us about your business requirements..."
                    />
                    {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-ink-400">
                    By submitting, you agree to our privacy policy. We never share your data.
                  </p>
                </form>
              )}
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function inputClass(hasError: boolean): string {
  return cx(
    'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
    hasError ? 'border-red-300 focus:ring-red-400 focus:border-red-400' : 'border-ink-200'
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-center gap-1.5 text-xs text-red-600" role="alert">
      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </p>
  );
}

function SocialGlyph({ name }: { name: string }) {
  const common = 'h-4 w-4';
  switch (name) {
    case 'twitter':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.91l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      );
    case 'github':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}
