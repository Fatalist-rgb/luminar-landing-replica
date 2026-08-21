/** Сравнивает высоты и вертикальные позиции всех секций оригинала и копии. */
import { chromium } from 'playwright';
import fs from 'node:fs';

const ORIG = 'https://skylum.com/luminar';
const REPL = process.env.REPLICA || 'http://localhost:3210';

const ORIG_SEL = [
  ['hero', 'section.hero'],
  ['df', 'section.df-section'],
  ['banner', 'section.banner'],
  ['reasons', 'section.discover-second'],
  ['capabilities', 'section.sk-section.discover'],
  ['protools', 'div.possibilities'],
  ['spectacular', 'div.spectacular'],
  ['retouch', 'div.retouch'],
  ['photoshoot', 'div.photoshoot'],
  ['bottom', 'section.banner-bottom'],
  ['faq', 'section.luminar-ai-faq'],
  ['requirements', 'section.luminar-neo-requirements'],
  ['footer', 'footer.footer-new'],
];

const REPL_SEL = [
  ['hero', 'main > section:nth-child(1)'],
  ['df', 'main > section:nth-child(2)'],
  ['banner', 'main > section:nth-child(3)'],
  ['reasons', 'main > section:nth-child(4)'],
  ['capabilities', 'main > section:nth-child(5)'],
  ['protools', 'main > section:nth-child(6)'],
  ['spectacular', 'main > section:nth-child(7)'],
  ['retouch', 'main > section:nth-child(8)'],
  ['photoshoot', 'main > section:nth-child(9)'],
  ['bottom', 'main > section:nth-child(10)'],
  ['faq', 'main > section:nth-child(11)'],
  ['requirements', 'main > section:nth-child(12)'],
  ['footer', 'footer'],
];

const measure = async (page, sels) =>
  page.evaluate((list) => {
    const r = {};
    for (const [key, sel] of list) {
      const el = document.querySelector(sel);
      if (!el) { r[key] = null; continue; }
      const b = el.getBoundingClientRect();
      const h2 = el.querySelector('h1,h2');
      r[key] = {
        top: Math.round(b.top + window.scrollY),
        h: Math.round(b.height),
        title: (h2?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 44),
        titleFs: h2 ? getComputedStyle(h2).fontSize : null,
      };
    }
    r.__doc = Math.round(document.documentElement.scrollHeight);
    return r;
  }, sels);

const browser = await chromium.launch();
const out = {};

for (const [name, url, sels, wait] of [
  ['original', ORIG, ORIG_SEL, 4000],
  ['replica', REPL, REPL_SEL, 1500],
]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(wait);
  await page.evaluate(() => document.querySelectorAll('#cookie-information-template-wrapper,#coi-banner-wrapper').forEach((e) => e.remove()));
  await page.evaluate(async () => {
    const H = document.documentElement.scrollHeight;
    for (let y = 0; y < H; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  out[name] = await measure(page, sels);
  await ctx.close();
}

await browser.close();
fs.writeFileSync('./data/metrics-all.json', JSON.stringify(out, null, 1));

console.log('секция          высота ориг/копия   Δ     заголовок ориг / копия');
console.log('─'.repeat(96));
for (const [key] of ORIG_SEL) {
  const o = out.original[key];
  const r = out.replica[key];
  if (!o || !r) { console.log(`${key.padEnd(15)} ${o ? o.h : '—'}/${r ? r.h : '—'}`); continue; }
  const d = r.h - o.h;
  const flag = Math.abs(d) > 120 ? ' ⚠' : '';
  console.log(
    `${key.padEnd(15)} ${String(o.h).padStart(5)}/${String(r.h).padStart(5)}  ${String(d > 0 ? '+' + d : d).padStart(5)}${flag}  ` +
    `${(o.titleFs || '').padStart(5)}/${(r.titleFs || '').padEnd(5)} ${o.title.slice(0, 30)}`,
  );
}
console.log('─'.repeat(96));
console.log(`ВСЕГО высота документа: ${out.original.__doc} / ${out.replica.__doc}`);
