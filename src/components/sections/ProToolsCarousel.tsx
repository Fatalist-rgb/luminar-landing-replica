'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ASSETS } from '@/lib/constants';
import { proTools, proToolsSection, type ProTool } from '@/data/protools';
import { CtaButton } from '@/components/ui/CtaButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowIcon } from '@/components/ui/ChevronIcon';
import { beforeAfterLabels } from '@/data/steps';

/** Один слайд: сравнение до/после и переключатель Original / Apply. */
function Slide({ tool, active, load }: { tool: ProTool; active: boolean; load: boolean }) {
  const [applied, setApplied] = useState(true);

  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[#101010] transition-opacity duration-300 md:aspect-[1148/550] ${
        active ? 'opacity-100' : 'opacity-45'
      }`}
    >
      {/* Изображение «до» */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={load ? { backgroundImage: `url(${ASSETS.img}/${tool.before})` } : undefined}
        role="img"
        aria-label={`${tool.title}: исходное изображение`}
      />

      {/* Изображение «после» */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: load ? `url(${ASSETS.img}/${tool.after})` : undefined,
          opacity: applied ? 1 : 0,
          clipPath: 'inset(0 0 0 40%)',
        }}
        aria-hidden="true"
      />

      {/* Подписи BEFORE / AFTER */}
      {applied && (
        <div
          className="pointer-events-none absolute top-1/2 left-[40%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-[14px] text-[11px] font-semibold tracking-[0.08em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.7)]"
          aria-hidden="true"
        >
          <span>{beforeAfterLabels.before}</span>
          <span>{beforeAfterLabels.after}</span>
        </div>
      )}

      {/* Текст и переключатель */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,.75)_60%)] p-[18px] md:max-w-[560px] md:bg-none md:p-[38px]">
        <h3 className="text-[26px] leading-[1.15] font-semibold md:text-[36px]">{tool.title}</h3>
        <p className="mt-[6px] max-w-[430px] text-[14px] leading-[1.45] text-white/90 md:mt-[10px] md:text-[17px]">
          {tool.description}
        </p>

        <div
          className="mt-[16px] inline-flex w-full max-w-[500px] rounded-[8px] bg-white/12 p-[3px] backdrop-blur-sm md:mt-[24px]"
          role="group"
          aria-label={`Сравнение для ${tool.title}`}
        >
          <button
            type="button"
            onClick={() => setApplied(false)}
            aria-pressed={!applied}
            className={`flex-1 rounded-[6px] px-[14px] py-[9px] text-[13px] font-medium transition-colors ${
              !applied ? 'bg-white text-black' : 'text-white/85'
            }`}
          >
            {proToolsSection.originalLabel}
          </button>
          <button
            type="button"
            onClick={() => setApplied(true)}
            aria-pressed={applied}
            className={`flex-1 rounded-[6px] px-[14px] py-[9px] text-[13px] font-medium transition-colors ${
              applied ? 'bg-white text-black' : 'text-white/85'
            }`}
          >
            {tool.applyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProToolsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + proTools.length) % proTools.length;
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: 'smooth',
    });
    setIndex(clamped);
  }, []);

  // Синхронизируем индекс при свайпе
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        setIndex(best);
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollTo(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollTo(index + 1); }
  };

  return (
    <section className="section-y-top bg-black" id="pro-tools">
      <div className="container-lum">
        <SectionHeading title={proToolsSection.title} subtitle={proToolsSection.subtitle} size="sm" />
      </div>

      <div className="relative mt-[20px]">
        <div
          ref={trackRef}
          role="group"
          aria-roledescription="карусель"
          aria-label="Инструменты Pro Tools"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="no-scrollbar flex snap-x snap-mandatory gap-[16px] overflow-x-auto scroll-smooth px-[15px] md:gap-[24px] lg:px-[calc((100vw-1148px)/2)]"
          data-testid="protools-track"
        >
          {proTools.map((tool, i) => (
            <div
              key={tool.title}
              className="w-[calc(100%-30px)] shrink-0 snap-center sm:w-[85%] lg:w-[1148px]"
              aria-roledescription="слайд"
              aria-label={`${i + 1} из ${proTools.length}: ${tool.title}`}
            >
              <Slide tool={tool} active={i === index} load={Math.abs(i - index) <= 1} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollTo(index - 1)}
          aria-label="Предыдущий инструмент"
          className="absolute top-1/2 left-[8px] z-20 hidden h-[36px] w-[26px] -translate-y-1/2 items-center justify-center rounded-[6px] border border-white/25 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/80 lg:flex"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scrollTo(index + 1)}
          aria-label="Следующий инструмент"
          className="absolute top-1/2 right-[8px] z-20 hidden h-[36px] w-[26px] -translate-y-1/2 items-center justify-center rounded-[6px] border border-white/25 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/80 lg:flex"
        >
          <ArrowIcon />
        </button>
      </div>

      <div className="container-lum mt-[40px] flex justify-center">
        <CtaButton />
      </div>
    </section>
  );
}
