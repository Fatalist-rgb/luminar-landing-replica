'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ASSETS } from '@/lib/constants';
import { galleryPresets, gallerySection } from '@/data/gallery';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * «Edit a whole photoshoot in one click»: одно нажатие применяет следующий пресет
 * ко всей подборке сразу. Коллаж отдаётся в трёх размерах — как в оригинале.
 */
export function PhotoshootGallery() {
  const [index, setIndex] = useState(0);
  const preset = galleryPresets[index];

  const applyNext = () => setIndex((i) => (i + 1) % galleryPresets.length);

  return (
    <section className="section-y bg-black">
      <div className="container-lum">
        <SectionHeading title={gallerySection.title} subtitle={gallerySection.description} size="sm" />

        <div className="relative mt-[60px]">
          {/* Коллаж: три варианта по ширине экрана */}
          <div className="relative">
            {galleryPresets.map((p) => (
              <div
                key={p.id}
                className={`transition-opacity duration-500 ${p.id === preset.id ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'}`}
                aria-hidden={p.id !== preset.id}
              >
                <Image
                  src={`${ASSETS.img}/${p.base}-lg-min.webp`}
                  alt={p.id === preset.id ? `Подборка фотографий, пресет «${p.label}»` : ''}
                  width={1600}
                  height={425}
                  className="hidden w-full lg:block"
                  sizes="1200px"
                  priority={p.id === 'start'}
                />
                <Image
                  src={`${ASSETS.img}/${p.base}-sm-min.webp`}
                  alt=""
                  width={1380}
                  height={936}
                  className="hidden w-full sm:block lg:hidden"
                  sizes="100vw"
                />
                <Image
                  src={`${ASSETS.img}/${p.base}-xs-min.webp`}
                  alt=""
                  width={880}
                  height={598}
                  className="w-full sm:hidden"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>

          {/* Кнопка применения пресета */}
          <div className="relative z-10 -mt-[26px] flex flex-col items-center pb-[30px] md:-mt-[34px]">
            <button
              type="button"
              onClick={applyNext}
              className="btn-accent px-[26px] shadow-[0_6px_24px_rgba(0,0,0,.55)]"
              data-testid="apply-preset"
            >
              {gallerySection.cta}
            </button>

            <span className="mt-[8px] flex items-center gap-[6px] text-[15px] font-semibold text-white md:ml-[190px]">
              <Image
                src={`${ASSETS.img}/${gallerySection.tryIcon}`}
                alt=""
                width={28}
                height={20}
                className="h-[20px] w-auto"
              />
              {gallerySection.tryHint}
            </span>

            <p className="sr-only" aria-live="polite">
              Применён пресет {preset.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
