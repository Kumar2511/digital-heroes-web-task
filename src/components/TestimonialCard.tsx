import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import type { Testimonial } from '@/types';
import { cx } from '@/utils/format';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card as="figure" className={cx('flex h-full flex-col gap-5 p-7', className)}>
      <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Icon key={i} name="sparkles" className="h-4 w-4 text-amber-500" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="flex-1 text-ink-700 leading-relaxed text-[0.95rem]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-ink-100 pt-5">
        <img
          src={testimonial.avatar}
          alt={`Portrait of ${testimonial.name}`}
          loading="lazy"
          decoding="async"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-ink-900 text-sm">{testimonial.name}</span>
          <span className="text-sm text-ink-500">
            {testimonial.role}, {testimonial.company}
          </span>
        </div>
      </figcaption>
    </Card>
  );
}
