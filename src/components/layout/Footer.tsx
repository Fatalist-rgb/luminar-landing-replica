'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { ASSETS } from '@/lib/constants';
import {
  aiRecommends,
  copyright,
  footerColumns,
  languages,
  newsletter,
  socials,
  type FooterColumn as FooterColumnData,
  type FooterLink,
} from '@/data/footer';
import { ChevronIcon } from '@/components/ui/ChevronIcon';
import { AiServiceIcon } from '@/components/ui/AiServiceIcon';

/** Ссылка футера: обычная или со сворачиваемым списком подпунктов. */
function FooterEntry({ link }: { link: FooterLink }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  if (!link.children) {
    return (
      <li>
        <a href={link.href} className="text-[15px] text-white transition-colors hover:text-[var(--color-accent)]">
          {link.label}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex items-center gap-[7px] text-[15px] text-white transition-colors hover:text-[var(--color-accent)]"
      >
        {link.label}
        <ChevronIcon size={13} className={`text-white/60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-[8px] pt-[8px] pl-[10px]">
            {link.children.map((c) => (
              <li key={c.label}>
                <a href={c.href} className="text-[14px] text-white/60 transition-colors hover:text-[var(--color-accent)]">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

/**
 * Колонка футера. На десктопе — обычный список под заголовком,
 * на мобильном тот же заголовок работает как переключатель аккордеона.
 */
function FooterColumn({ column }: { column: FooterColumnData }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-white/10 lg:border-b-0">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-[10px] py-[15px] text-[13px] tracking-[0.06em] text-white/50 uppercase lg:cursor-default lg:border-b lg:border-white/15 lg:py-0 lg:pb-[10px]"
        >
          {column.title}
          <ChevronIcon
            size={14}
            className={`transition-transform lg:hidden ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h2>

      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-300 lg:!grid-rows-[1fr] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-[13px] pb-[16px] lg:pt-[16px] lg:pb-0">
            {column.links.map((link) => (
              <FooterEntry key={link.label} link={link} />
            ))}
          </ul>

          {column.extra && (
            <>
              <p className="pb-[10px] text-[13px] tracking-[0.06em] text-white/50 uppercase lg:mt-[24px] lg:border-b lg:border-white/15">
                {column.extra.title}
              </p>
              <ul className="flex flex-col gap-[13px] pb-[16px] lg:pt-[16px] lg:pb-0">
                {column.extra.links.map((link) => (
                  <FooterEntry key={link.label} link={link} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const inputId = useId();
  const statusId = useId();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setStatus(valid ? 'ok' : 'error');
  };

  return (
    <form onSubmit={submit} noValidate className="mt-[16px]">
      <label htmlFor={inputId} className="sr-only">
        {newsletter.placeholder}
      </label>
      <input
        id={inputId}
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== 'idle') setStatus('idle');
        }}
        placeholder={newsletter.placeholder}
        aria-invalid={status === 'error'}
        aria-describedby={status === 'idle' ? undefined : statusId}
        data-testid="newsletter-email"
        className="w-full rounded-[8px] border border-white/25 bg-transparent px-[14px] py-[11px] text-[15px] text-white placeholder:text-white/45 focus:border-white/60 focus:outline-none"
      />
      <button
        type="submit"
        className="mt-[10px] w-full rounded-[8px] bg-white px-[18px] py-[12px] text-[13px] font-semibold tracking-[1.04px] text-black uppercase transition-colors hover:bg-white/90"
      >
        {newsletter.submit}
      </button>

      {status !== 'idle' && (
        <p
          id={statusId}
          role="status"
          data-testid="newsletter-status"
          className={`mt-[10px] text-[13px] ${status === 'ok' ? 'text-[var(--color-accent)]' : 'text-red-400'}`}
        >
          {status === 'ok' ? newsletter.successMessage : newsletter.errorMessage}
        </p>
      )}

      <p className="mt-[12px] text-[14px] leading-[1.45] text-white/55">
        {newsletter.note}{' '}
        <a href={newsletter.noteLink.href} className="text-white/80 underline">
          {newsletter.noteLink.label}
        </a>
      </p>
    </form>
  );
}

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(languages[0]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-[8px] text-[15px] text-white/85 transition-colors hover:text-white"
      >
        {current.label}
        <ChevronIcon size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Язык интерфейса"
          className="absolute bottom-full left-0 z-20 mb-[8px] min-w-[150px] rounded-[10px] border border-white/12 bg-[#0c0c0c] p-[6px] shadow-[0_14px_36px_rgba(0,0,0,.6)]"
        >
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === current.code}
                onClick={() => {
                  setCurrent(l);
                  setOpen(false);
                }}
                className={`w-full rounded-[6px] px-[12px] py-[8px] text-left text-[14px] transition-colors hover:bg-white/8 ${
                  l.code === current.code ? 'text-[var(--color-accent)]' : 'text-white/80'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-black pt-[46px]">
      <div className="container-lum">
        <div className="lg:grid lg:grid-cols-6 lg:gap-[26px]">
          {footerColumns.map((col) => (
            <FooterColumn key={col.title} column={col} />
          ))}

          <div className="pt-[22px] lg:pt-0">
            <h2 className="pb-[10px] text-[13px] tracking-[0.06em] text-white/50 uppercase lg:border-b lg:border-white/15">
              {newsletter.title}
            </h2>
            <NewsletterForm />

            <h3 className="mt-[26px] pb-[10px] text-[13px] tracking-[0.06em] text-white/50 uppercase lg:border-b lg:border-white/15">
              {aiRecommends.title}
            </h3>
            <p className="mt-[14px] text-[15px] leading-[1.45] text-white/85">{aiRecommends.text}</p>
            <ul className="mt-[14px] flex flex-wrap gap-[10px]">
              {aiRecommends.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-white/8 text-white transition-colors hover:bg-white/15"
                  >
                    <AiServiceIcon name={item.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Нижняя строка */}
      <div className="mt-[36px] border-t border-white/10">
        <div className="container-lum flex flex-col items-center gap-[18px] py-[24px] md:flex-row md:justify-between">
          <LanguageSwitcher />

          <ul className="flex items-center gap-[14px]">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block opacity-70 transition-opacity hover:opacity-100"
                >
                  <Image src={`${ASSETS.icons}/${s.icon}`} alt="" width={20} height={20} className="h-[20px] w-[20px]" />
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[14px] text-white/60">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
