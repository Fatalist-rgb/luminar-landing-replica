import Image from 'next/image';
import { ASSETS } from '@/lib/constants';
import { bottomBanner } from '@/data/banners';
import { CtaButton } from '@/components/ui/CtaButton';
import { CheckIcon } from '@/components/ui/ChevronIcon';

/** Финальный CTA-баннер с устройствами и списком гарантий. */
export function BottomBanner() {
  return (
    <section className="section-y bg-black">
      <div className="container-lum">
        <div
          className="overflow-hidden rounded-[16px] border border-[var(--color-accent)]/25 bg-black bg-cover bg-center px-[18px] pt-[40px] pb-[26px] text-center md:px-[40px] md:pt-[56px] md:pb-[34px]"
          style={{ backgroundImage: `url(${ASSETS.img}/${bottomBanner.background})` }}
        >
          <p className="badge-sale text-[12px] font-semibold tracking-[0.06em] md:text-[13px]">
            {bottomBanner.badge}
          </p>

          <h2 className="h-section-sm mx-auto mt-[20px] max-w-[1128px]">{bottomBanner.title}</h2>
          <p className="text-section mx-auto mt-[12px] max-w-[620px]">{bottomBanner.description}</p>

          <div className="mt-[26px] flex justify-center">
            <CtaButton />
          </div>

          <Image
            src={`${ASSETS.img}/${bottomBanner.image}`}
            alt={bottomBanner.imageAlt}
            width={1080}
            height={420}
            className="mx-auto mt-[26px] w-full max-w-[1010px]"
            sizes="(max-width: 1024px) 100vw, 1010px"
          />

          <ul className="mt-[18px] flex flex-wrap items-center justify-center gap-x-[34px] gap-y-[10px] text-[15px] md:mt-[8px] md:text-[16px]">
            {bottomBanner.guarantees.map((g) => (
              <li key={g} className="flex items-center gap-[9px]">
                <CheckIcon className="text-[var(--color-accent)]" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
