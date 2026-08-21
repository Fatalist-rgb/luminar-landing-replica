import type { ReactNode } from 'react';

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Размер заголовка: `lg` = 48px, `md` = 42px, `sm` = 40px (как в оригинале) */
  size?: 'lg' | 'md' | 'sm';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: 'center' | 'left';
};

const SIZE_CLASS = {
  lg: 'h-section-lg',
  md: 'h-section',
  sm: 'h-section-sm',
} as const;

/** Заголовок секции: H2 + необязательный подзаголовок. */
export function SectionHeading({
  title,
  subtitle,
  size = 'md',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  align = 'center',
}: Props) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className={`${SIZE_CLASS[size]} ${titleClassName}`}>{title}</h2>
      {subtitle && (
        <p
          className={`text-section mt-[14px] ${align === 'center' ? 'mx-auto max-w-[860px]' : ''} ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
