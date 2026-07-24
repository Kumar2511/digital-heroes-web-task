import { Check } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import type { PricingPlan } from '@/types';
import { cx } from '@/utils/format';

interface PricingCardProps {
  plan: PricingPlan;
  billing: 'monthly' | 'yearly';
  className?: string;
}

export function PricingCard({ plan, billing, className }: PricingCardProps) {
  const price = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const isCustom = plan.monthlyPrice === 0;

  return (
    <Card
      className={cx(
        'relative flex flex-col p-8',
        plan.highlighted
          ? 'border-brand-500 ring-2 ring-brand-500/30 shadow-glow lg:scale-[1.03]'
          : '',
        className
      )}
    >
      {plan.badge && (
        <span
          className={cx(
            'absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold',
            plan.highlighted
              ? 'bg-brand-600 text-white'
              : 'bg-ink-100 text-ink-600'
          )}
        >
          {plan.badge}
        </span>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-ink-900">{plan.name}</h3>
        <p className="text-sm text-ink-500 min-h-[2.5rem]">{plan.description}</p>
      </div>

      <div className="mt-6 flex items-end gap-1">
        {isCustom ? (
          <span className="text-4xl font-bold text-ink-900">Custom</span>
        ) : (
          <>
            <span className="text-4xl font-bold text-ink-900">${price}</span>
            <span className="mb-1 text-sm text-ink-500">
              /user /mo{billing === 'yearly' && ', billed yearly'}
            </span>
          </>
        )}
      </div>

      <Button
        to={plan.href}
        variant={plan.highlighted ? 'primary' : 'secondary'}
        className="mt-6 w-full"
      >
        {plan.cta}
      </Button>

      <ul className="mt-8 flex flex-col gap-3.5" aria-label={`${plan.name} features`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-ink-700">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
