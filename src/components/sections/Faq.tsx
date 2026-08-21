'use client';

import { useState } from 'react';
import { faqCta, faqEntries, faqTitle } from '@/data/faq';
import { ChevronIcon } from '@/components/ui/ChevronIcon';

/** FAQ-аккордеон: по умолчанию раскрыт первый вопрос, как в оригинале. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-y-xs bg-black" id="faq">
      <div className="container-lum">
        <h2 className="h-section text-center">{faqTitle}</h2>

        <div className="mx-auto mt-[32px] max-w-[830px] md:mt-[44px]">
          {faqEntries.map((entry, i) => {
            const expanded = open === i;
            return (
              <div key={entry.q} className="border-b border-white/10 last:border-b-0">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-start gap-[16px] py-[18px] text-left"
                    data-testid="faq-question"
                  >
                    <ChevronIcon
                      size={18}
                      className={`mt-[3px] shrink-0 text-white/60 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                    />
                    <span className="flex-1 text-[16px] font-semibold md:text-[18px]">{entry.q}</span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="faq-answer pr-[10px] pb-[20px] pl-[34px] text-[15px] leading-[1.6] text-white/70 md:text-[16px]"
                      dangerouslySetInnerHTML={{ __html: entry.a }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-[34px] flex justify-center md:mt-[42px]">
          <a href={faqCta.href} className="btn-accent px-[26px]">
            {faqCta.label}
          </a>
        </div>
      </div>

      <style jsx global>{`
        .faq-answer p + p {
          margin-top: 14px;
        }
        .faq-answer ul,
        .faq-answer ol {
          margin-top: 12px;
          padding-left: 20px;
          list-style: disc;
        }
        .faq-answer li + li {
          margin-top: 6px;
        }
        .faq-answer a {
          color: var(--color-accent);
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
