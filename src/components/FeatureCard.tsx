import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import type { Feature } from '@/types';
import { cx } from '@/utils/format';

interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

export function FeatureCard({ feature, className }: FeatureCardProps) {
  return (
    <Card hover className={cx('group p-7 h-full flex flex-col gap-4', className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-transform duration-300 group-hover:scale-110">
        <Icon name={feature.icon} className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-ink-900">{feature.title}</h3>
      <p className="text-ink-500 leading-relaxed text-[0.95rem]">{feature.description}</p>
    </Card>
  );
}
