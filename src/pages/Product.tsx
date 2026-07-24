import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { FeatureCard } from '@/components/FeatureCard';
import { Reveal } from '@/components/Reveal';
import { CTA } from '@/components/CTA';
import { Button } from '@/components/Button';
import { PRODUCT_FEATURES, INTEGRATIONS_LIST } from '@/utils/constants';
import { breadcrumbJsonLd, softwareApplicationJsonLd } from '@/utils/structuredData';

const WORKFLOW_NODES = [
  { label: 'New ticket in Zendesk', sub: 'Trigger', tone: 'trigger' },
  { label: 'AI: classify & prioritize', sub: 'AI action', tone: 'ai' },
  { label: 'Route to team', sub: 'Branch', tone: 'logic' },
  { label: 'Create Linear issue', sub: 'Action', tone: 'action' },
  { label: 'Notify in Slack', sub: 'Action', tone: 'action' },
];

const toneClass: Record<string, string> = {
  trigger: 'border-amber-200 bg-amber-50 text-amber-700',
  ai: 'border-brand-200 bg-brand-50 text-brand-700',
  logic: 'border-ink-200 bg-ink-50 text-ink-700',
  action: 'border-accent-200 bg-accent-50 text-accent-700',
};

export function Product() {
  useSeo({
    title: 'Product — Visual workflow automation with AI',
    description:
      'Explore the Nexora AI platform: a visual workflow builder, native AI actions, live analytics, enterprise security, and 300+ integrations.',
    path: '/product',
    jsonLd: [
      softwareApplicationJsonLd,
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/product' },
      ]),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow="Product"
        title={<>One platform for <span className="text-gradient-light">every workflow</span></>}
        description="Nexora AI brings the workflow builder, AI actions, analytics, security, and integrations together — so your team can automate end-to-end processes without stitching tools together."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/contact" variant="primary" size="lg" className="bg-white text-ink-900 hover:bg-ink-100">
            Start free trial
          </Button>
          <Button
            to="/pricing"
            variant="secondary"
            size="lg"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
          >
            View pricing
          </Button>
        </div>
      </PageHero>

      <section id="features" className="section bg-white" aria-labelledby="features-heading">
        <SectionTitle
          eyebrow="Capabilities"
          title="Built for the full automation lifecycle"
          description="Design, run, monitor, and improve — all in one place."
        />
        <Container className="mt-14">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_FEATURES.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={(i % 3) * 100}>
                <FeatureCard feature={feature} className="h-full" />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section bg-ink-50" aria-labelledby="workflow-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">Workflow builder</span>
            <h2 id="workflow-heading" className="text-3xl font-bold text-ink-900 sm:text-4xl">
              See the path, not just the code
            </h2>
            <p className="text-lg text-ink-500 leading-relaxed">
              Nexora AI's visual canvas shows every step, branch, and loop in your automation.
              Drop in triggers, actions, and AI steps; inspect data as it flows between them;
              and test against real records before you ship.
            </p>
            <ul className="flex flex-col gap-3 text-ink-700">
              {[
                'Drag-and-drop steps with branching and loops',
                'Inspect inputs and outputs at every node',
                'Versioning, environments, and one-click rollback',
                'Reusable templates across your workspace',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-soft">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                Customer support triage
              </div>
              <ol className="mt-5 flex flex-col gap-3">
                {WORKFLOW_NODES.map((node, i) => (
                  <li key={node.label} className="flex items-center gap-3">
                    <div className={`flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3 ${toneClass[node.tone]}`}>
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/70 text-xs font-bold">
                        {i + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{node.label}</span>
                        <span className="text-xs opacity-70">{node.sub}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-ink-50 px-4 py-2.5 text-xs text-ink-500">
                <span>Avg. duration: 2.4s</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Healthy
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section bg-white" aria-labelledby="analytics-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Runs today', value: '1,842', trend: '+8.2%' },
                { label: 'Success rate', value: '99.4%', trend: '+0.1%' },
                { label: 'Avg. latency', value: '2.1s', trend: '-0.3s' },
                { label: 'Cost / run', value: '$0.004', trend: '-$0.001' },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
                  <div className="text-xs uppercase tracking-wide text-ink-400">{m.label}</div>
                  <div className="mt-1 text-2xl font-bold text-ink-900">{m.value}</div>
                  <div className="text-xs text-green-600">{m.trend}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <span className="eyebrow">Analytics</span>
            <h2 id="analytics-heading" className="text-3xl font-bold text-ink-900 sm:text-4xl">
              Know what's working, in real time
            </h2>
            <p className="text-lg text-ink-500 leading-relaxed">
              Live dashboards track run volume, success rates, latency, and cost across every
              workflow. Drill into any run to inspect inputs, outputs, and timing for each step —
              so you can debug in minutes, not hours.
            </p>
            <ul className="flex flex-col gap-3 text-ink-700">
              {[
                'Workspace, team, and per-workflow views',
                'Alerts on failures, slowdowns, and cost spikes',
                'Exportable run logs and audit trails',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="security" className="section bg-ink-950 text-white" aria-labelledby="security-heading">
        <Container className="flex flex-col items-center gap-4 text-center mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200 ring-1 ring-inset ring-white/15">
            Security
          </span>
          <h2 id="security-heading" className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Enterprise-grade by default
          </h2>
          <p className="text-lg text-ink-300 leading-relaxed max-w-2xl">
            Security is not an add-on. Nexora AI is built to meet the standards of the most
            regulated teams in the world.
          </p>
        </Container>
        <Container className="mt-14">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'SOC 2 Type II', desc: 'Audited and certified annually.' },
              { title: 'GDPR & DPA', desc: 'Ready for EU data protection.' },
              { title: 'SSO / SAML', desc: 'Okta, Azure AD, Google Workspace.' },
              { title: 'Encryption', desc: 'TLS 1.3 in transit, AES-256 at rest.' },
              { title: 'RBAC', desc: 'Granular roles and permissions.' },
              { title: 'Audit logs', desc: 'Every action, exportable and searchable.' },
              { title: 'Data residency', desc: 'Choose your region on Enterprise.' },
              { title: 'No training', desc: 'Your data is never used to train models.' },
            ].map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="font-semibold text-white">{item.title}</div>
                <div className="mt-1 text-sm text-ink-400">{item.desc}</div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="integrations" className="section bg-ink-50" aria-labelledby="integrations-heading">
        <SectionTitle
          eyebrow="Integrations"
          title="Connects to the tools you already use"
          description="300+ native integrations, plus webhooks and an HTTP step for everything else."
        />
        <Container className="mt-12">
          <ul className="flex flex-wrap justify-center gap-3">
            {INTEGRATIONS_LIST.map((name) => (
              <li
                key={name}
                className="rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-medium text-ink-700 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg hover:border-brand-200"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-ink-500">
            Don't see your tool? Use the HTTP step or webhooks to connect anything with an API.
          </p>
        </Container>
      </section>

      <CTA />
    </>
  );
}
