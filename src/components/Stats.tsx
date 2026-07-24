import { useInView } from '@/hooks/useInView';
import type { Stat } from '@/types';
import { cx } from '@/utils/format';

interface StatsProps {
  stats: Stat[];
  className?: string;
}

export function Stats({ stats, className }: StatsProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cx(
        'grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink-200/70 lg:grid-cols-4',
        className
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cx(
            'bg-white px-6 py-10 text-center transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <div className="text-3xl font-bold text-gradient sm:text-4xl">{stat.value}</div>
          <div className="mt-2 text-sm font-semibold text-ink-900">{stat.label}</div>
          {stat.sublabel && (
            <div className="mt-1 text-xs text-ink-500">{stat.sublabel}</div>
          )}
        </div>
      ))}
    </div>
  );
}
