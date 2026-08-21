'use client';

import { useEffect, useState } from 'react';

/** true, когда страница прокручена ниже `offset` пикселей (или ниже высоты вьюпорта). */
export function useScrollPast(offset: number | 'viewport' = 'viewport'): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const check = () => {
      frame = 0;
      const threshold = offset === 'viewport' ? window.innerHeight * 0.8 : offset;
      setPast(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [offset]);

  return past;
}
