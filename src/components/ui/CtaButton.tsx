import { PLANS_URL } from '@/lib/constants';
import { Countdown } from './Countdown';

type Props = {
  label?: string;
  /** Показывать таймер под кнопкой (как во всех CTA-блоках оригинала) */
  withTimer?: boolean;
  className?: string;
  /** Ширина кнопки: `fixed` — 312px как в оригинале, `full` — по контейнеру */
  width?: 'fixed' | 'full';
};

/**
 * CTA-блок оригинала: жёлтая кнопка «VIEW PLANS», под ней — обратный отсчёт
 * на тёмной подложке. Оба элемента заключены в общий скруглённый контейнер.
 */
export function CtaButton({ label = 'VIEW PLANS', withTimer = true, className = '', width = 'fixed' }: Props) {
  const button = (
    <a
      href={PLANS_URL}
      className={`btn-accent ${width === 'fixed' ? 'w-full max-w-[312px]' : 'w-full'}`}
      data-testid="cta-view-plans"
    >
      {label}
    </a>
  );

  if (!withTimer) return <div className={className}>{button}</div>;

  return (
    <div
      className={`inline-flex w-full max-w-[320px] flex-col items-center gap-[10px] rounded-[12px] bg-[#111]/85 p-[4px] pb-[10px] backdrop-blur-sm ${className}`}
    >
      {button}
      <Countdown />
    </div>
  );
}
