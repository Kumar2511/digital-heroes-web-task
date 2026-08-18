import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '@/data/categories';
import type { Category, Condition } from '@/types';
import { cn } from '@/utils/cn';

interface FilterPanelProps {
  selectedCategories: Category[];
  selectedConditions: Condition[];
  onCategoryToggle: (cat: Category) => void;
  onConditionToggle: (cond: Condition) => void;
  onClear: () => void;
  className?: string;
}

export function FilterPanel({
  selectedCategories,
  selectedConditions,
  onCategoryToggle,
  onConditionToggle,
  onClear,
  className,
}: FilterPanelProps) {
  const hasFilters = selectedCategories.length > 0 || selectedConditions.length > 0;

  return (
    <div className={cn('rounded-2xl border border-border bg-card p-5', className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategories.includes(cat);
            return (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => onCategoryToggle(cat)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:bg-accent'
                  )}
                >
                  {cat}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Condition</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {CONDITIONS.map((cond) => {
            const active = selectedConditions.includes(cond);
            return (
              <li key={cond}>
                <button
                  type="button"
                  onClick={() => onConditionToggle(cond)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:bg-accent'
                  )}
                >
                  {cond}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
