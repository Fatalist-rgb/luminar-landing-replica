import Image from 'next/image';
import { ASSETS } from '@/lib/constants';
import { reasonCards, reasonsTitle, type ReasonCard } from '@/data/reasons';
import { CtaButton } from '@/components/ui/CtaButton';
import { LazyVideo } from '@/components/ui/LazyVideo';

function Card({ card }: { card: ReasonCard }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[16px] bg-[#0d0d0d]">
      <div className="aspect-[16/9] w-full overflow-hidden bg-black">
        {card.video ? (
          <LazyVideo
            src={card.video}
            poster={card.image}
            width={720}
            height={405}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            label={card.title}
            className="h-full w-full"
          />
        ) : (
          <Image
            src={`${ASSETS.img}/${card.image}`}
            alt={card.title}
            width={720}
            height={405}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="px-[20px] pt-[22px] pb-[30px]">
        <h3 className="text-[17px] font-semibold md:text-[18px]">{card.title}</h3>
        <p className="mt-[10px] text-[15px] leading-[1.5] text-white/65 md:text-[16px]">{card.description}</p>
      </div>
    </article>
  );
}

/** «5 reasons why Luminar is the best photo editor for you» — bento 2 + 3. */
export function Reasons() {
  const top = reasonCards.filter((c) => c.span === 'half');
  const bottom = reasonCards.filter((c) => c.span === 'third');

  return (
    <section className="section-y bg-black">
      <div className="container-lum">
        <h2 className="h-section-lg text-center">
          {reasonsTitle.map((line, i) => (
            <span key={line} className="block">
              {line}
              {i === 0 && <span className="hidden">{' '}</span>}
            </span>
          ))}
        </h2>

        <div className="mt-[40px] grid gap-[32px] md:grid-cols-2">
          {top.map((c) => (
            <Card key={c.title} card={c} />
          ))}
        </div>

        <div className="mt-[32px] grid gap-[32px] md:grid-cols-2 lg:grid-cols-3">
          {bottom.map((c) => (
            <Card key={c.title} card={c} />
          ))}
        </div>

        <div className="mt-[40px] flex justify-center">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
