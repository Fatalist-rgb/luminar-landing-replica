'use client';

import Image from 'next/image';
import { ASSETS, PLANS_URL, SKYLUM } from '@/lib/constants';
import { stickyBar } from '@/data/banners';
import { useScrollPast } from '@/hooks/useScrollPast';
import { Countdown } from '@/components/ui/Countdown';

/** Промо-бар, прилипающий к верху страницы после прокрутки первого экрана. */
export function StickyPromoBar() {
  const visible = useScrollPast('viewport');

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[90] transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      inert={!visible}
      data-testid="sticky-promo"
    >
      <div
        className="bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.img}/${stickyBar.background})` }}
      >
        <div className="container-lum flex h-[60px] items-center justify-between gap-[16px]">
          <a href={`${SKYLUM}/luminar`} aria-label="Luminar" className="hidden shrink-0 md:block">
            <Image
              src={`${ASSETS.icons}/luminar-logo-new.svg`}
              alt="Luminar"
              width={126}
              height={24}
              className="h-[24px] w-auto"
            />
          </a>

          <p className="hidden max-w-[330px] text-center text-[15px] leading-[1.25] font-semibold md:block">
            {stickyBar.text}
          </p>

          <div className="flex flex-1 items-center justify-end gap-[14px] md:flex-none">
            <Countdown variant="boxed" />
            <a href={PLANS_URL} className="btn-accent shrink-0 px-[24px]">
              {stickyBar.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
