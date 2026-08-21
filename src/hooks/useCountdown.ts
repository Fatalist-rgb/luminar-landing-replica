'use client';

import { useEffect, useState } from 'react';

export type TimeLeft = { days: string; hours: string; minutes: string; seconds: string; finished: boolean };

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

function compute(deadline: number): TimeLeft {
  const diff = deadline - Date.now();
  if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00', finished: true };
  const total = Math.floor(diff / 1000);
  return {
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor((total % 86400) / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
    finished: false,
  };
}

/**
 * Единый обратный отсчёт для всех таймеров страницы.
 * До гидратации возвращает `null`, чтобы серверная и клиентская разметка совпадали.
 */
export function useCountdown(deadlineIso: string): TimeLeft | null {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const deadline = new Date(deadlineIso).getTime();
    setTime(compute(deadline));

    const id = window.setInterval(() => {
      const next = compute(deadline);
      setTime(next);
      if (next.finished) window.clearInterval(id);
    }, 1000);

    return () => window.clearInterval(id);
  }, [deadlineIso]);

  return time;
}
