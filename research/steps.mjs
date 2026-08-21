import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })).newPage();
await p.goto('https://skylum.com/luminar', { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(3500);
await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110)); } window.scrollTo(0, 0); });
await p.waitForTimeout(2500);
const d = await p.evaluate(() => {
  const n = s => (s || '').replace(/\s+/g, ' ').trim();
  const f = u => { if (!u) return null; const s = String(u).replace(/^url\(["']?|["']?\)$/g, ''); return s.split('?')[0].split('/').pop() || null; };
  const grab = sel => {
    const e = document.querySelector(sel);
    const before = f(e.querySelector('.ba-slider-new__img-before_1')?.style.backgroundImage);
    return {
      before,
      steps: [...e.querySelectorAll('[class*=slider-features_item]')].map(li => ({
        label: n(li.innerText),
        after: f(li.dataset.after) || null,
      })),
      labels: [...e.querySelectorAll('.ba-slider-new__label')].map(x => n(x.innerText)),
    };
  };
  return { spectacular: grab('.spectacular'), retouch: grab('.retouch') };
});
fs.writeFileSync('./data/steps.json', JSON.stringify(d, null, 1));
console.log(JSON.stringify(d, null, 1));
await b.close();
