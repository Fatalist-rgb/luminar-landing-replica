'use client';

import { useState } from 'react';
import { requirementGroups, requirementsTitle } from '@/data/requirements';
import { ChevronIcon } from '@/components/ui/ChevronIcon';

/** Системные требования — свёрнуты по умолчанию, раскрываются по «SHOW MORE». */
export function Requirements() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-black pb-[46px]">
      <div className="container-lum">
        <div className="border-t border-white/10 pt-[26px]">
          <div className="flex items-center justify-between gap-[16px]">
            <h2 className="text-[18px] font-semibold md:text-[20px]">{requirementsTitle}</h2>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="requirements-panel"
              className="flex items-center gap-[8px] text-[13px] font-semibold tracking-[0.06em] text-white/80 uppercase transition-colors hover:text-white"
              data-testid="requirements-toggle"
            >
              {open ? 'Show less' : 'Show more'}
              <ChevronIcon size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div
            id="requirements-panel"
            className="grid transition-[grid-template-rows] duration-400 ease-out"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="grid gap-[30px] pt-[24px] md:grid-cols-2 md:gap-[48px]">
                {requirementGroups.map((group) => (
                  <div key={group.platform}>
                    <h3 className="text-[16px] font-semibold">{group.platform}</h3>
                    <dl className="mt-[12px]">
                      {group.rows.map((row) => (
                        <div
                          key={row.label}
                          className="flex flex-col gap-[2px] border-b border-white/8 py-[10px] last:border-b-0 sm:flex-row sm:gap-[16px]"
                        >
                          <dt className="w-full shrink-0 text-[14px] text-white/50 sm:w-[150px]">{row.label}</dt>
                          <dd className="text-[14px] text-white/85">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
