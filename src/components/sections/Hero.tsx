import { ASSETS } from '@/lib/constants';
import { hero } from '@/data/hero';
import { CtaButton } from '@/components/ui/CtaButton';
import { CheckIcon } from '@/components/ui/ChevronIcon';
import { PlatformsLine } from '@/components/ui/PlatformsLine';
import { LazyVideo } from '@/components/ui/LazyVideo';

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-black bg-no-repeat pt-[96px] pb-[60px] lg:pt-[140px] lg:pb-[100px]"
      style={{
        backgroundImage: `url(${ASSETS.img}/${hero.background})`,
        // Оригинал не растягивает фон, а задаёт ему фиксированную ширину
        backgroundSize: '2330px auto',
        backgroundPosition: '50% 0%',
      }}
    >
      <div className="container-lum relative z-10">
        <div className="flex flex-col items-center text-center">
          <p className="badge-sale text-[14px] md:text-[16px]">{hero.badge}</p>

          <h1 className="h-hero mx-auto mt-[15px] max-w-[975px]">{hero.title}</h1>

          <ul className="mt-[16px] flex flex-col items-center gap-[8px] text-[14px] text-white/90 sm:flex-row sm:gap-[26px] md:text-[16px]">
            {hero.benefits.map((b) => (
              <li key={b} className="flex items-center gap-[8px]">
                <CheckIcon className="text-[var(--color-accent)]" />
                {b}
              </li>
            ))}
          </ul>

          <CtaButton className="mt-[32px]" />
        </div>
      </div>

      {/* Медиа первого экрана */}
      <div className="relative z-10 mt-[32px] lg:mt-[28px]">
        <div className="mx-auto w-full max-w-[1300px] px-[15px]">
          <LazyVideo
            src={hero.video}
            poster={hero.poster}
            priority
            width={1270}
            height={714}
            sizes="(max-width: 1300px) 100vw, 1270px"
            label="Демонстрация Luminar на разных устройствах"
            className="aspect-[1270/714] w-full rounded-[10px]"
          />
        </div>

        <div className="container-lum mt-[16px] md:mt-[20px]">
          <PlatformsLine className="justify-center text-center" />
        </div>
      </div>
    </section>
  );
}
