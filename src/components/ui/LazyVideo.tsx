'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ASSETS } from '@/lib/constants';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type Props = {
  src: string;
  poster: string;
  /** Постер участвует в LCP — грузим с приоритетом */
  priority?: boolean;
  className?: string;
  videoClassName?: string;
  label: string;
  width?: number;
  height?: number;
  sizes?: string;
};

/**
 * Видео-петля, которая не мешает первой отрисовке: сначала показывается постер,
 * само видео подключается после загрузки страницы (или при попадании во вьюпорт).
 * При `prefers-reduced-motion` остаётся только постер.
 */
export function LazyVideo({
  src,
  poster,
  priority = false,
  className = '',
  videoClassName = '',
  label,
  width = 1280,
  height = 720,
  sizes,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;

    let idle: number | undefined;

    const activate = () => {
      // ждём простоя, чтобы видео не конкурировало с первой отрисовкой
      const schedule = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
      idle = schedule(() => setMounted(true)) as unknown as number;
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          if (document.readyState === 'complete') activate();
          else window.addEventListener('load', activate, { once: true });
        }
      },
      { rootMargin: '200px' },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
      window.removeEventListener('load', activate);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <Image
        src={`${ASSETS.img}/${poster}`}
        alt={label}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`h-full w-full object-cover transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />

      {mounted && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          } ${videoClassName}`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label={label}
          onCanPlay={() => setReady(true)}
        >
          <source src={`${ASSETS.video}/${src}`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
