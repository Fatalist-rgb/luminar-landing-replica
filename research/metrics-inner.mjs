/** Точные внутренние метрики секций оригинала: заголовки, отступы, ключевые блоки. */
import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://skylum.com/luminar', { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(4000);
await page.evaluate(() => document.querySelectorAll('#cookie-information-template-wrapper,#coi-banner-wrapper').forEach((e) => e.remove()));
await page.evaluate(async () => {
  const H = document.documentElement.scrollHeight;
  for (let y = 0; y < H; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 110)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2000);

const d = await page.evaluate(() => {
  const g = (sel, root = document) => {
    const el = root.querySelector(sel);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      w: Math.round(b.width), h: Math.round(b.height),
      top: Math.round(b.top + window.scrollY),
      fs: cs.fontSize, lh: cs.lineHeight, fw: cs.fontWeight,
      pt: cs.paddingTop, pb: cs.paddingBottom,
      mt: cs.marginTop, mb: cs.marginBottom,
      gap: cs.gap, radius: cs.borderRadius, bg: cs.backgroundColor,
    };
  };
  const R = {};

  // Заголовки секций
  R.titles = {};
  for (const [k, sel] of [
    ['df', '.df-section .sk-h2'],
    ['banner', 'section.banner h2, section.banner .sk-h2'],
    ['reasons', '.discover-second h2, .discover-second .sk-h2'],
    ['capabilities', '.sk-section.discover h2, .sk-section.discover .sk-h2'],
    ['protools', '.possibilities .title'],
    ['spectacular', '.spectacular .title'],
    ['photoshoot', '.photoshoot .title, .photoshoot h2'],
    ['bottom', '.banner-bottom h2, .banner-bottom .title'],
    ['faq', '.luminar-ai-faq h2, .luminar-ai-faq .sk-h2'],
  ]) R.titles[k] = g(sel);

  // Подзаголовки
  R.subs = {};
  for (const [k, sel] of [
    ['df', '.df-section .df-section__subtitle'],
    ['capabilities', '.sk-section.discover .sk-text'],
    ['protools', '.possibilities .subtitle'],
    ['photoshoot', '.photoshoot .desc'],
  ]) R.subs[k] = g(sel);

  // Секционные отступы
  R.padding = {};
  for (const [k, sel] of [
    ['df', '.df-section'], ['banner', 'section.banner'], ['reasons', '.discover-second'],
    ['capabilities', '.sk-section.discover'], ['protools', '.possibilities'],
    ['spectacular', '.spectacular'], ['retouch', '.retouch'], ['photoshoot', '.photoshoot'],
    ['bottom', '.banner-bottom'], ['faq', '.luminar-ai-faq'],
  ]) {
    const e = document.querySelector(sel);
    if (!e) continue;
    const cs = getComputedStyle(e);
    R.padding[k] = { pt: cs.paddingTop, pb: cs.paddingBottom, mt: cs.marginTop, mb: cs.marginBottom };
  }

  // Ключевые внутренние блоки
  R.blocks = {
    dfInner: g('.df-section__inner'),
    dfPanel: g('.df-section-tabs__controls-wrap'),
    dfVideo: g('.df-section-video'),
    bannerInner: g('section.banner [class*=inner], section.banner [class*=wrap]'),
    bannerImg: g('section.banner img'),
    reasonsCard: g('.discover-second li, .discover-second [class*=card]'),
    capIcon: g('.sk-section.discover img'),
    capItem: g('.sk-section.discover li, .sk-section.discover [class*=item]'),
    ptSlide: g('.possibilities__slider-slide:not(.slick-cloned)'),
    ptBa: g('.possibilities .ba-slider-new'),
    specBa: g('.spectacular .ba-slider-new'),
    specLeft: g('.spectacular__inner-left'),
    specRight: g('.spectacular__inner-right'),
    specSlider: g('.spectacular__slider'),
    photoImg: g('.photoshoot__start-image.desktop'),
    photoBtn: g('.photoshoot a, .photoshoot button'),
    bottomImg: g('.banner-bottom img'),
    faqItem: g('.luminar-ai-faq [class*=item]'),
    footerCol: g('footer [class*=col]'),
  };

  // Сетки
  const grid = (sel) => {
    const e = document.querySelector(sel);
    if (!e) return null;
    const cs = getComputedStyle(e);
    return { display: cs.display, cols: cs.gridTemplateColumns, gap: cs.gap, w: Math.round(e.getBoundingClientRect().width) };
  };
  R.grids = {
    dfInner: grid('.df-section__inner'),
    specInner: grid('.spectacular__inner'),
    retouchInner: grid('.retouch__inner'),
    capList: grid('.sk-section.discover ul, .sk-section.discover [class*=list]'),
    reasonsList: grid('.discover-second ul, .discover-second [class*=list]'),
    bannerInner: grid('section.banner [class*=inner]'),
  };

  return R;
});

fs.writeFileSync('./data/metrics-inner.json', JSON.stringify(d, null, 1));

console.log('=== ЗАГОЛОВКИ (fs/lh/fw, w×h) ===');
for (const [k, v] of Object.entries(d.titles)) {
  if (!v) { console.log(`${k.padEnd(13)} —`); continue; }
  console.log(`${k.padEnd(13)} ${v.fs}/${v.lh}/${v.fw}  ${v.w}×${v.h}  mb=${v.mb}`);
}
console.log('\n=== ОТСТУПЫ СЕКЦИЙ ===');
for (const [k, v] of Object.entries(d.padding)) console.log(`${k.padEnd(13)} pt=${v.pt} pb=${v.pb} mt=${v.mt} mb=${v.mb}`);
console.log('\n=== БЛОКИ ===');
for (const [k, v] of Object.entries(d.blocks)) {
  if (!v) { console.log(`${k.padEnd(14)} —`); continue; }
  console.log(`${k.padEnd(14)} ${String(v.w).padStart(5)}×${String(v.h).padStart(4)}  r=${v.radius} gap=${v.gap}`);
}
console.log('\n=== СЕТКИ ===');
for (const [k, v] of Object.entries(d.grids)) if (v) console.log(`${k.padEnd(14)} ${v.display} cols=${v.cols} gap=${v.gap} w=${v.w}`);

await browser.close();
