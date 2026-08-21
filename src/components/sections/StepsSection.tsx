'use client';

import { useState } from 'react';
import type { StepsSection as StepsData } from '@/data/steps';
import { beforeAfterLabels } from '@/data/steps';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { StepSlider } from '@/components/ui/StepSlider';

/**
 * Секции «Just 4 steps…» и «Retouch portrait…».
 * Раскладка оригинала на 1440px: медиа 760px и текстовая колонка 380px, gap 30px;
 * у «Retouch» колонки меняются местами.
 */
export function StepsSection({ data }: { data: StepsData }) {
  // По умолчанию открыт предпоследний шаг — как в оригинале (ползунок на 71%)
  const [step, setStep] = useState(() => Math.max(0, data.steps.length - 2));
  const current = data.steps[step];

  const media = (
    <BeforeAfter
      key={data.title}
      before={data.before}
      after={current?.after ?? null}
      initial={50}
      labels={beforeAfterLabels}
      aspect="760 / 502"
      alt={`${data.title}: сравнение до и после`}
      className="w-full"
    />
  );

  const controls = (
    <div className="flex flex-col justify-center">
      <h2 className="h-section-sm">{data.title}</h2>
      <p className="text-section mt-[20px] max-w-[380px]">{data.description}</p>
      <StepSlider steps={data.steps} value={step} onChange={setStep} className="mt-[30px] max-w-[380px]" />
    </div>
  );

  const mediaFirst = data.mediaSide === 'left';

  return (
    <section className="section-y bg-black">
      <div className="container-lum">
        <div
          className={`grid items-center gap-[28px] lg:gap-[30px] ${
            mediaFirst ? 'lg:grid-cols-[2fr_1fr]' : 'lg:grid-cols-[1fr_2fr]'
          }`}
        >
          {mediaFirst ? (
            <>
              <div>{media}</div>
              <div>{controls}</div>
            </>
          ) : (
            <>
              <div className="order-2 lg:order-1">{controls}</div>
              <div className="order-1 lg:order-2">{media}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
