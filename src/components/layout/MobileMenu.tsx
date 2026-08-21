'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ASSETS, SKYLUM } from '@/lib/constants';
import { primaryNav, secondaryNav, loginLink } from '@/data/navigation';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { Accordion } from '@/components/ui/Accordion';

/** Бургер-меню: кнопка в шапке + полноэкранный оверлей на узких экранах. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-[34px] w-[34px] items-center justify-center lg:hidden"
      >
        <span className="relative block h-[14px] w-[22px]">
          <span className="absolute inset-x-0 top-0 h-[2px] rounded bg-white" />
          <span className="absolute inset-x-0 top-[6px] h-[2px] rounded bg-white" />
          <span className="absolute inset-x-0 top-[12px] h-[2px] rounded bg-white" />
        </span>
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Меню навигации"
        className={`fixed inset-0 z-[100] bg-black transition-opacity duration-250 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex h-[54px] items-center justify-between px-[15px]">
          <a href={SKYLUM} aria-label="Skylum">
            <Image src={`${ASSETS.icons}/SKYLUM_logo_white.svg`} alt="Skylum" width={82} height={13} className="h-[13px] w-auto" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
            className="flex h-[34px] w-[34px] items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Мобильная навигация"
          className="h-[calc(100dvh-54px)] overflow-y-auto px-[15px] pt-[10px] pb-[40px]"
        >
          <ul className="flex flex-col">
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.label} className="border-b border-white/10">
                  <Accordion
                    title={<span className="text-[17px] font-semibold">{item.label}</span>}
                    headerClassName="py-[15px] justify-between"
                    chevronPosition="right"
                    contentClassName="pb-[12px] flex flex-col gap-[12px] pl-[4px]"
                  >
                    {item.children.map((c) => (
                      <a key={c.label} href={c.href} className="text-[15px] text-white/75">
                        {c.label}
                      </a>
                    ))}
                  </Accordion>
                </li>
              ) : (
                <li key={item.label} className="border-b border-white/10">
                  <a
                    href={item.href}
                    className={`block py-[15px] text-[17px] font-semibold ${item.active ? 'text-[var(--color-accent)]' : 'text-white'}`}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>

          <p className="mt-[24px] mb-[10px] text-[11px] tracking-[0.08em] text-white/40 uppercase">Luminar</p>
          <ul className="flex flex-col">
            {secondaryNav.map((item) => {
              const links = item.columns?.flatMap((c) => c.links) ?? item.children;
              return links ? (
                <li key={item.label} className="border-b border-white/10">
                  <Accordion
                    title={<span className="text-[16px]">{item.label}</span>}
                    headerClassName="py-[14px] justify-between"
                    chevronPosition="right"
                    contentClassName="pb-[12px] grid grid-cols-2 gap-[10px] pl-[4px]"
                  >
                    {links.map((c) => (
                      <a key={c.label} href={c.href} className="text-[14px] text-white/75">
                        {c.label}
                      </a>
                    ))}
                  </Accordion>
                </li>
              ) : (
                <li key={item.label} className="border-b border-white/10">
                  <a href={item.href} className="block py-[14px] text-[16px] text-white">
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={loginLink.href}
            className="mt-[24px] flex items-center justify-center rounded-[8px] border border-white/25 py-[12px] text-[15px]"
          >
            {loginLink.label}
          </a>
        </nav>
      </div>
    </>
  );
}
