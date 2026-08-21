import Image from 'next/image';
import { ASSETS } from '@/lib/constants';
import { devicesBanner } from '@/data/banners';
import { CtaButton } from '@/components/ui/CtaButton';
import { AppleIcon, WindowsIcon, IosIcon, AndroidIcon, WebIcon } from '@/components/ui/PlatformIcons';

const BULLET_ICONS: Record<string, React.ReactNode> = {
  tools: (
    <path d="M6 3.5l1.1 2.6 2.6 1.1-2.6 1.1L6 10.9 4.9 8.3 2.3 7.2l2.6-1.1L6 3.5zM13 9l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8L13 9z" fill="currentColor" />
  ),
  features: (
    <path d="M3 13.5c3-1 4.5-3 5.5-5.5S10.5 3.5 13 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  ),
  devices: (
    <>
      <rect x="2.5" y="3.5" width="8" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9.5" y="6.5" width="4.5" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" fill="var(--color-surface)" />
    </>
  ),
  award: (
    <path d="M8 2.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L8 11.2l-3.4 1.8.7-3.8L2.5 6.5l3.8-.5L8 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  ),
  shield: (
    <path d="M8 2.5l5 2v4c0 3-2.2 5-5 5.5-2.8-.5-5-2.5-5-5.5v-4l5-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  ),
};

/** Секция «Choose once, edit forever» — устройства слева, преимущества справа. */
export function DevicesBanner() {
  return (
    <section className="section-y bg-black">
      <div className="container-wide">
        <h2 className="h-section-lg text-center">
          {devicesBanner.titleLine1}
          <span className="text-[var(--color-accent)]">{devicesBanner.titleAccent}</span>
          <br className="hidden md:block" /> {devicesBanner.titleLine2}
        </h2>

        <div className="mt-[20px] w-full overflow-hidden rounded-[16px] border border-[var(--color-accent)]/25 bg-[linear-gradient(120deg,#1a1206_0%,#3a2408_45%,#120b03_100%)]">
          <div className="grid items-center gap-[24px] p-[22px] md:p-[40px] lg:grid-cols-[1fr_1fr] lg:gap-[100px] lg:px-[60px] lg:py-[105px]">
            <div>
              <Image
                src={`${ASSETS.img}/${devicesBanner.image}`}
                alt={devicesBanner.imageAlt}
                width={720}
                height={420}
                className="w-full"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <p className="mt-[8px] flex flex-wrap items-center justify-center gap-x-[6px] gap-y-[4px] text-[14px] text-white/80 lg:justify-start">
                <span>{devicesBanner.caption.desktopLabel}</span>
                <AppleIcon className="text-[#CCCDCC]" size={17} />
                <WindowsIcon className="text-[#CCCDCC]" size={17} />
                <span>{devicesBanner.caption.mobileLabel}</span>
                <IosIcon className="text-[#CCCDCC]" size={17} />
                <AndroidIcon className="text-[#CCCDCC]" size={17} />
                <WebIcon className="text-[#CCCDCC]" size={17} />
              </p>
            </div>

            <ul className="flex flex-col gap-[16px] md:gap-[22px]">
              {devicesBanner.bullets.map((b) => (
                <li key={b.text} className="flex items-center gap-[16px]">
                  <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] border border-white/15 bg-white/5 text-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      {BULLET_ICONS[b.icon]}
                    </svg>
                  </span>
                  <span className="text-[16px] md:text-[18px]">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[40px] flex justify-center">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
