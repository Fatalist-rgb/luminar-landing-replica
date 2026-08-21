'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ASSETS, SKYLUM } from '@/lib/constants';
import { primaryNav, secondaryNav, loginLink, type NavItem } from '@/data/navigation';
import { ChevronIcon } from '@/components/ui/ChevronIcon';
import { MobileMenu } from './MobileMenu';

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="6.5" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.8 17c.9-3.1 3.3-4.8 6.2-4.8s5.3 1.7 6.2 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Пункт с выпадающим меню: открывается по наведению, фокусу и клику. */
function NavDropdown({ item, align = 'left' }: { item: NavItem; align?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  const columns = item.columns ?? (item.children ? [{ links: item.children }] : []);

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => { cancelClose(); setOpen(true); }}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-[5px] py-[16px] text-[14px] text-white/85 transition-colors hover:text-white"
      >
        {item.label}
        <ChevronIcon size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute top-full z-50 ${align === 'right' ? 'right-0' : 'left-0'} ${
          open ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'
        } transition-opacity duration-150`}
      >
        <div className="mt-[2px] flex gap-[26px] rounded-[12px] border border-white/10 bg-[#0c0c0c] p-[20px] shadow-[0_18px_40px_rgba(0,0,0,.55)]">
          {columns.map((col, i) => (
            <ul key={i} className="flex min-w-[170px] flex-col gap-[10px]">
              {col.title && (
                <li className="mb-[2px] text-[11px] tracking-[0.08em] text-white/40 uppercase">{col.title}</li>
              )}
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block text-[14px] whitespace-nowrap text-white/80 transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* Верхний ряд — продукты Skylum */}
      <div className="border-b border-white/8">
        <div className="container-lum flex h-[54px] items-center justify-between gap-[20px]">
          <a href={SKYLUM} aria-label="Skylum" className="shrink-0">
            <Image
              src={`${ASSETS.icons}/SKYLUM_logo_white.svg`}
              alt="Skylum"
              width={82}
              height={13}
              priority
              className="h-[13px] w-auto"
            />
          </a>

          <nav aria-label="Продукты Skylum" className="hidden lg:block">
            <ul className="flex items-center gap-[26px]">
              {primaryNav.map((item) =>
                item.children ? (
                  <NavDropdown key={item.label} item={item} />
                ) : (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`relative block py-[16px] text-[14px] transition-colors hover:text-white ${
                        item.active ? 'text-white' : 'text-white/85'
                      }`}
                      aria-current={item.active ? 'page' : undefined}
                    >
                      {item.label}
                      {item.active && (
                        <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-t bg-white" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-[14px]">
            <a
              href={loginLink.href}
              className="hidden items-center gap-[7px] text-[14px] text-white/85 transition-colors hover:text-white lg:flex"
            >
              {loginLink.label}
              <UserIcon />
            </a>
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* Нижний ряд — разделы Luminar */}
      <div className="hidden lg:block">
        <div className="container-lum flex h-[60px] items-center justify-between gap-[20px] pt-[26px]">
          <a href={`${SKYLUM}/luminar`} aria-label="Luminar" className="shrink-0">
            <Image
              src={`${ASSETS.icons}/luminar-logo-new.svg`}
              alt="Luminar"
              width={126}
              height={24}
              priority
              className="h-[24px] w-auto"
            />
          </a>

          <nav aria-label="Разделы Luminar">
            <ul className="flex items-center gap-[30px]">
              {secondaryNav.map((item) =>
                item.columns || item.children ? (
                  <NavDropdown key={item.label} item={item} align="right" />
                ) : (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block py-[16px] text-[14px] text-white/85 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
