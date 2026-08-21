import Image from 'next/image';
import { ASSETS } from '@/lib/constants';
import { capabilities, capabilitiesSection } from '@/data/capabilities';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Сетка из 10 иконок возможностей: 5×2 на десктопе, 2×5 на мобильном. */
export function Capabilities() {
  return (
    <section className="section-y-sm bg-black">
      <div className="container-lum">
        <SectionHeading title={capabilitiesSection.title} subtitle={capabilitiesSection.subtitle} size="lg" />

        <ul className="mt-[25px] grid grid-cols-2 gap-x-[16px] gap-y-[30px] sm:grid-cols-3 lg:grid-cols-5">
          {capabilities.map((c) => (
            <li key={c.title} className="flex min-h-[140px] flex-col items-center justify-start pt-[18px] text-center">
              <Image
                src={`${ASSETS.icons}/${c.icon}`}
                alt=""
                width={64}
                height={64}
                className="h-[64px] w-[64px]"
              />
              <span className="mt-[14px] text-[15px] font-semibold md:text-[16px]">{c.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
