import type { ReactNode } from 'react';
import { cx } from '@/utils/format';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'li' | 'figure';
}

export function Card({ children, className, hover = false, as = 'div' }: CardProps) {
  const Tag = as;
  return (
    <Tag className={cx('card', hover && 'card-hover', className)}>{children}</Tag>
  );
}
