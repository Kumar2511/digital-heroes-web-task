import type { ReactNode, ElementType } from 'react';
import { useInView } from '@/hooks/useInView';
import { cx } from '@/utils/format';

type RevealTag = 'div' | 'section' | 'li' | 'article';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Tag = as as ElementType;
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cx(
        'transition-all duration-700 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
