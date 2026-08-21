'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronIcon } from './ChevronIcon';

type Props = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** Управляемый режим — состояние держит родитель */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  chevronPosition?: 'left' | 'right';
};

/** Аккордеон с плавной анимацией высоты; работает и в управляемом, и в свободном режиме. */
export function Accordion({
  title,
  children,
  defaultOpen = false,
  open: controlled,
  onToggle,
  className = '',
  headerClassName = '',
  contentClassName = '',
  chevronPosition = 'left',
}: Props) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isControlled = controlled !== undefined;
  const open = isControlled ? controlled : uncontrolled;
  const id = useId();

  const toggle = () => {
    const next = !open;
    if (!isControlled) setUncontrolled(next);
    onToggle?.(next);
  };

  const chevron = (
    <ChevronIcon
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    />
  );

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        id={`${id}-trigger`}
        className={`flex w-full items-center gap-[14px] text-left ${headerClassName}`}
      >
        {chevronPosition === 'left' && chevron}
        <span className="flex-1">{title}</span>
        {chevronPosition === 'right' && chevron}
      </button>

      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className={contentClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
}
