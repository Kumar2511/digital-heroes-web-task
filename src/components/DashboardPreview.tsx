import { Container } from '@/components/Container';
import { useInView } from '@/hooks/useInView';
import { cx } from '@/utils/format';

const BARS = [42, 58, 35, 72, 64, 88, 76, 95, 68, 82, 60, 78];

export function DashboardPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Container className="relative -mt-8 pb-4 sm:-mt-12">
      <div ref={ref} />
      <div
        className={cx(
          'relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-soft-lg transition-all duration-1000',
          inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.98]'
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-20" aria-hidden="true" />
        <div className="relative flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <div className="ml-4 hidden items-center gap-1.5 rounded-md bg-white/5 px-3 py-1 text-xs text-ink-400 sm:flex">
            app.Nexora AI/dashboard
          </div>
        </div>

        <div className="relative grid gap-px bg-white/5 sm:grid-cols-[200px_1fr]">
          <aside className="hidden flex-col gap-1 bg-ink-900 p-4 sm:flex">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-accent-500 text-[10px]">FP</span>
              Acme Inc.
            </div>
            {['Dashboard', 'Workflows', 'Runs', 'Integrations', 'Analytics', 'Team'].map((item, i) => (
              <div
                key={item}
                className={cx(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-xs',
                  i === 0 ? 'bg-white/10 text-white' : 'text-ink-400'
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                {item}
              </div>
            ))}
          </aside>

          <div className="flex flex-col gap-4 bg-ink-900 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Workflow runs</div>
                <div className="text-xs text-ink-400">Last 12 weeks</div>
              </div>
              <div className="flex gap-2">
                <span className="rounded-md bg-white/5 px-2.5 py-1 text-[10px] text-ink-300">Weekly</span>
                <span className="rounded-md bg-brand-600 px-2.5 py-1 text-[10px] text-white">Monthly</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total runs', value: '47,281', trend: '+12.4%' },
                { label: 'Success rate', value: '99.2%', trend: '+0.3%' },
                { label: 'Time saved', value: '8.4 hrs', trend: '+1.1 hrs' },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] uppercase tracking-wide text-ink-500">{m.label}</div>
                  <div className="mt-1 text-lg font-bold text-white">{m.value}</div>
                  <div className="text-[10px] text-green-400">{m.trend}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex h-40 items-end gap-1.5">
                {BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand-600/40 to-brand-400"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { name: 'Lead enrichment', status: 'Running', color: 'bg-green-400' },
                { name: 'Ticket triage', status: 'Running', color: 'bg-green-400' },
                { name: 'Invoice reminder', status: 'Paused', color: 'bg-amber-400' },
                { name: 'Weekly report', status: 'Scheduled', color: 'bg-brand-400' },
              ].map((w) => (
                <div key={w.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className={cx('h-2 w-2 rounded-full', w.color)} />
                    <span className="text-xs text-white">{w.name}</span>
                  </div>
                  <span className="text-[10px] text-ink-400">{w.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
