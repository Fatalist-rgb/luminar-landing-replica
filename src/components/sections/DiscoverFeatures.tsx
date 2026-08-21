'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ASSETS } from '@/lib/constants';
import { featureGroups, featuresSection, type FeatureItem } from '@/data/features';
import { CtaButton } from '@/components/ui/CtaButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChevronIcon } from '@/components/ui/ChevronIcon';

type Key = `${number}:${number}`;

const keyOf = (g: number, i: number): Key => `${g}:${i}`;

/** Превью выбранной возможности: видео с постером либо статичный кадр. */
function Preview({ item, className = '' }: { item: FeatureItem; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    const play = v.play();
    if (play) play.catch(() => {});
  }, [item.video]);

  if (item.video) {
    return (
      <video
        key={item.video}
        ref={videoRef}
        className={`h-full w-full object-cover ${className}`}
        muted
        loop
        playsInline
        preload="none"
        poster={item.poster ? `${ASSETS.img}/${item.poster}` : undefined}
        aria-label={item.title}
      >
        <source src={`${ASSETS.video}/${item.video}`} type="video/mp4" />
      </video>
    );
  }

  if (item.poster) {
    return (
      <Image
        src={`${ASSETS.img}/${item.poster}`}
        alt={item.title}
        width={1280}
        height={720}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return <div className={`h-full w-full bg-[#161616] ${className}`} />;
}

export function DiscoverFeatures() {
  const [openGroups, setOpenGroups] = useState<Set<number>>(
    () => new Set(featureGroups.map((g, i) => (g.open ? i : -1)).filter((i) => i >= 0)),
  );
  const [active, setActive] = useState<Key>(() => {
    const gi = featureGroups.findIndex((g) => g.open);
    return keyOf(gi >= 0 ? gi : 0, 0);
  });

  const activeItem = useMemo(() => {
    const [g, i] = active.split(':').map(Number);
    return featureGroups[g]?.items[i] ?? featureGroups[0].items[0];
  }, [active]);

  const toggleGroup = (index: number) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section className="section-y bg-black" id="features">
      <div className="container-lum">
        <SectionHeading title={featuresSection.title} subtitle={featuresSection.subtitle} />

        <div className="mt-[30px] overflow-hidden rounded-[16px] bg-[#111] lg:mt-[36px] lg:grid lg:h-[530px] lg:grid-cols-[288px_1fr] lg:gap-0">
          {/* Список возможностей */}
          <div className="max-h-[520px] overflow-y-auto border-white/10 p-[10px] lg:m-[14px] lg:mr-0 lg:max-h-[502px] lg:rounded-[14px] lg:border lg:border-[var(--color-accent)]/60 lg:p-[6px]">
            {featureGroups.map((group, gi) => {
              const open = openGroups.has(gi);
              return (
                <div key={group.group} className="mb-[4px]">
                  <button
                    type="button"
                    onClick={() => toggleGroup(gi)}
                    aria-expanded={open}
                    aria-controls={`fgroup-${gi}`}
                    className="flex w-full items-center justify-between gap-[10px] px-[12px] py-[11px] text-[13px] font-semibold tracking-[0.06em] text-white/85 uppercase"
                  >
                    {group.group}
                    <ChevronIcon size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>

                  <ul
                    id={`fgroup-${gi}`}
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                      open ? 'max-h-[2400px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {group.items.map((item, ii) => {
                      const k = keyOf(gi, ii);
                      const isActive = k === active;
                      return (
                        <li key={item.title}>
                          <button
                            type="button"
                            onClick={() => setActive(k)}
                            aria-current={isActive ? 'true' : undefined}
                            className={`flex w-full items-center gap-[11px] rounded-[8px] px-[12px] py-[9px] text-left transition-colors ${
                              isActive ? 'text-white' : 'text-white/65 hover:text-white/90'
                            }`}
                            data-testid="feature-item"
                          >
                            {item.icon && (
                              <Image
                                src={`${ASSETS.icons}/${item.icon}`}
                                alt=""
                                width={18}
                                height={18}
                                className="h-[18px] w-[18px] shrink-0"
                              />
                            )}
                            <span className={`text-[15px] ${isActive ? 'font-semibold' : ''}`}>{item.title}</span>
                          </button>

                          {/* На мобильном превью раскрывается прямо под пунктом */}
                          {isActive && (
                            <div className="mt-[8px] mb-[12px] overflow-hidden rounded-[10px] lg:hidden">
                              <div className="aspect-video">
                                <Preview item={item} />
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Превью — только на десктопе */}
          <div className="hidden p-[14px] lg:block">
            <div className="aspect-[16/10] overflow-hidden rounded-[12px] bg-black">
              <Preview item={activeItem} />
            </div>
          </div>
        </div>

        <div className="mt-[40px] flex justify-center">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
