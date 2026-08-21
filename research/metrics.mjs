/** Точные геометрические метрики ключевых элементов оригинала и копии. */
import { chromium } from 'playwright';
import fs from 'node:fs';

const TARGETS = {
  original: 'https://skylum.com/luminar',
  replica: process.env.REPLICA || 'http://localhost:3210',
};

const PROBES = [
  ['header', 'header'],
  ['hero', 'section.hero, main > section:nth-child(1)'],
  ['heroBadge', '.hero__sale-label, main > section:nth-child(1) .badge-sale'],
  ['heroH1', 'h1'],
  ['heroCta', 'section.hero a[class*=btn], main > section:nth-child(1) [data-testid=cta-view-plans]'],
  ['heroVideo', 'section.hero video, main > section:nth-child(1) video'],
];

const out = {};
const browser = await chromium.launch();

for (const [name, url] of Object.entries(TARGETS)) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(name === 'original' ? 4000 : 1500);
  await page.evaluate(() => document.querySelectorAll('#cookie-information-template-wrapper,#coi-banner-wrapper').forEach((e) => e.remove()));
  await page.waitForTimeout(500);

  out[name] = await page.evaluate((probes) => {
    const r = {};
    for (const [key, sel] of probes) {
      const el = document.querySelector(sel);
      if (!el) { r[key] = null; continue; }
      const b = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      r[key] = {
        top: Math.round(b.top + window.scrollY),
        left: Math.round(b.left),
        w: Math.round(b.width),
        h: Math.round(b.height),
        fs: cs.fontSize,
        pt: cs.paddingTop,
        pb: cs.paddingBottom,
        bgSize: cs.backgroundSize,
        bgPos: cs.backgroundPosition,
        bgRepeat: cs.backgroundRepeat,
        bgColor: cs.backgroundColor,
      };
    }
    return r;
  }, PROBES);

  await ctx.close();
}

await browser.close();
fs.writeFileSync('./data/metrics.json', JSON.stringify(out, null, 1));

for (const key of PROBES.map((p) => p[0])) {
  const o = out.original[key];
  const r = out.replica[key];
  if (!o || !r) { console.log(`${key.padEnd(12)} orig=${o ? 'есть' : '—'} repl=${r ? 'есть' : '—'}`); continue; }
  console.log(
    `${key.padEnd(12)} top ${String(o.top).padStart(5)}/${String(r.top).padStart(5)}  ` +
    `h ${String(o.h).padStart(4)}/${String(r.h).padStart(4)}  ` +
    `w ${String(o.w).padStart(4)}/${String(r.w).padStart(4)}  fs ${o.fs}/${r.fs}`,
  );
}
console.log('\nhero bg:', JSON.stringify({ orig: [out.original.hero?.bgSize, out.original.hero?.bgPos, out.original.hero?.pt, out.original.hero?.pb], repl: [out.replica.hero?.bgSize, out.replica.hero?.bgPos, out.replica.hero?.pt, out.replica.hero?.pb] }));
