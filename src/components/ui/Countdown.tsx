'use client';

import { PROMO_DEADLINE } from '@/lib/constants';
import { useCountdown } from '@/hooks/useCountdown';

type Props = {
  /** `inline` — строка под кнопкой, `boxed` — плашки в прилипающем баре */
  variant?: 'inline' | 'boxed';
  className?: string;
};

const PLACEHOLDER = ['00', '00', '00', '00'] as const;
const SUFFIX = ['d', 'h', 'm', 's'] as const;

export function Countdown({ variant = 'inline', className = '' }: Props) {
  const time = useCountdown(PROMO_DEADLINE);
  const values = time ? [time.days, time.hours, time.minutes, time.seconds] : PLACEHOLDER;

  const label = `Осталось ${values[0]} дней ${values[1]} часов ${values[2]} минут ${values[3]} секунд`;

  if (variant === 'boxed') {
    return (
      <div
        className={`flex items-center gap-[3px] ${className}`}
        role="timer"
        aria-live="off"
        aria-label={label}
      >
        {values.map((v, i) => (
          <span key={SUFFIX[i]} className="flex items-center gap-[3px]">
            <span className="min-w-[38px] rounded-[6px] bg-white/12 px-[7px] py-[5px] text-center text-[13px] font-semibold tabular-nums">
              {v}
              {SUFFIX[i]}
            </span>
            {i < 3 && <span className="text-[13px] text-white/60">:</span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <p
      className={`text-[15px] font-semibold tabular-nums ${className}`}
      role="timer"
      aria-live="off"
      aria-label={label}
    >
      {values.map((v, i) => (
        <span key={SUFFIX[i]}>
          {v}
          {SUFFIX[i]}
          {i < 3 && <span className="mx-[6px] font-normal text-white/70">:</span>}
        </span>
      ))}
    </p>
  );
}
