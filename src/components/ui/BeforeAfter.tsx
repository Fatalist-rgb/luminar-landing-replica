'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ASSETS } from '@/lib/constants';

type Props = {
  before: string;
  after: string | null;
  /** Стартовая позиция разделителя, % */
  initial?: number;
  labels?: { before: string; after: string };
  className?: string;
  /** Соотношение сторон контейнера */
  aspect?: string;
  alt?: string;
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Сравнение «до / после» с перетаскиваемым разделителем.
 * Управление: мышь, касание, стрелки клавиатуры (Home/End — края).
 */
export function BeforeAfter({
  before,
  after,
  initial = 50,
  labels = { before: 'BEFORE', after: 'AFTER' },
  className = '',
  aspect = '3 / 2',
  alt = 'Сравнение фотографии до и после обработки',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const onUp = () => setDragging(false);

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [dragging, setFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos((p) => clamp(p - step)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => clamp(p + step)); }
    else if (e.key === 'Home') { e.preventDefault(); setPos(0); }
    else if (e.key === 'End') { e.preventDefault(); setPos(100); }
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[12px] select-none ${dragging ? 'cursor-ew-resize' : 'cursor-pointer'} ${className}`}
      style={{ aspectRatio: aspect, touchAction: 'pan-y' }}
      onPointerDown={(e) => {
        e.preventDefault();
        setDragging(true);
        setFromClientX(e.clientX);
      }}
      data-testid="before-after"
    >
      {/* Слой «до» */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.img}/${before})` }}
        role="img"
        aria-label={alt}
      />

      {/* Слой «после» — обрезается по позиции разделителя */}
      {after && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-[clip-path] duration-100 ease-out"
          style={{
            backgroundImage: `url(${ASSETS.img}/${after})`,
            clipPath: `inset(0 0 0 ${pos}%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Подписи */}
      <div
        className="pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center gap-[14px] text-[11px] font-semibold tracking-[0.08em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.6)]"
        style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      >
        <span>{labels.before}</span>
        <span>{labels.after}</span>
      </div>

      {/* Разделитель */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Положение разделителя «до/после»"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% изображения «до»`}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setDragging(true);
        }}
        className="absolute top-0 bottom-0 z-10 w-[2px] -translate-x-1/2 cursor-ew-resize bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        style={{ left: `${pos}%` }}
      />
    </div>
  );
}
