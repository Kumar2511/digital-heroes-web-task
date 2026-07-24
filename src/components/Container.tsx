import type { ReactNode } from 'react';
import { cx } from '@/utils/format';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer' | 'figure' | 'li';
}

export function Container({ children, className, as = 'div' }: ContainerProps) {
  const Tag = as;
  return <Tag className={cx('container-page', className)}>{children}</Tag>;
}
