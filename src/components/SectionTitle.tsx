import { cx } from '@/utils/format';
import { Container } from '@/components/Container';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionTitleProps) {
  return (
    <Container
      className={cx(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center mx-auto max-w-3xl',
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-ink-500 leading-relaxed max-w-2xl">{description}</p>
      )}
    </Container>
  );
}
