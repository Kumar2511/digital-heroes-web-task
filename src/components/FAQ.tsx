import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/types';
import { cx } from '@/utils/format';

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export function FAQ({ items, className }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cx('flex flex-col gap-3', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.question}
            className="card overflow-hidden"
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-ink-900 hover:bg-ink-50/60"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cx(
                    'h-5 w-5 flex-none text-ink-400 transition-transform duration-300',
                    isOpen && 'rotate-180 text-brand-600'
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              hidden={!isOpen}
              className="px-6 pb-5 text-ink-500 leading-relaxed"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
