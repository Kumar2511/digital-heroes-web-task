import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { cx } from '@/utils/format';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cx(
        'flex items-center gap-3 font-bold text-ink-900 hover:text-brand-600 transition-colors',
        className
      )}
      aria-label="Nexora AI - Home"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 text-white shadow-glow">
        <Sparkles className="h-5 w-5" />
      </span>

      <div className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight">
          Nexora
        </span>
        <span className="text-[11px] uppercase tracking-[0.25em] text-brand-600">
          AI
        </span>
      </div>
    </Link>
  );
}