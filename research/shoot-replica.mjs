/** Снимает посекционные скриншоты копии для сравнения с research/screens/. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const URL = process.env.TARGET || 'http://localhost:3210';
const OUT = path.resolve('./screens-replica');
fs.mkdirSync(OUT, { recursive: true });

const SECTIONS = [
  ['01-header', 'header'],
  ['02-hero', 'main > section:nth-child(1)'],
  ['03-df', 'main > section:nth-child(2)'],
  ['04-banner', 'main > section:nth-child(3)'],
  ['05-reasons', 'main > section:nth-child(4)'],
  ['06-discover', 'main > section:nth-child(5)'],
  ['07-possibilities', 'main > section:nth-child(6)'],
  ['08-spectacular', 'main > section:nth-child(7)'],
  ['09-retouch', 'main > section:nth-child(8)'],
  ['10-photoshoot', 'main > section:nth-child(9)'],
  ['11-banner-bottom', 'main > section:nth-child(10)'],
  ['12-faq', 'main > section:nth-child(11)'],
  ['13-requirements', 'main > section:nth-child(12)'],
  ['14-footer', 'footer'],
];

const VIEWPORTS = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
];

const browser = await chromium.launch();
const errors = [];

for (const [vp, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width, height }, locale: 'en-US' });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${vp}] ${m.text().slice(0, 160)}`); });
  page.on('pageerror', (e) => errors.push(`[${vp}] pageerror: ${String(e).slice(0, 160)}`));

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(async () => {
    const H = document.documentElement.scrollHeight;
    for (let y = 0; y < H; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  fs.mkdirSync(path.join(OUT, vp), { recursive: true });
  for (const [name, sel] of SECTIONS) {
    try {
      const el = page.locator(sel).first();
      if (!(await el.count())) { console.log(`skip ${vp}/${name}`); continue; }
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(650);
      await el.screenshot({ path: path.join(OUT, vp, `${name}.png`), timeout: 25000 });
      console.log(`ok ${vp}/${name}`);
    } catch (e) {
      console.log(`ERR ${vp}/${name}: ${String(e).slice(0, 110)}`);
    }
  }

  // проверка горизонтального скролла
  const overflow = await page.evaluate(() => ({
    doc: document.documentElement.scrollWidth,
    win: window.innerWidth,
  }));
  if (overflow.doc > overflow.win + 1) {
    errors.push(`[${vp}] горизонтальный скролл: ${overflow.doc} > ${overflow.win}`);
  }

  await ctx.close();
}

await browser.close();
if (errors.length) {
  console.log('\n=== ПРОБЛЕМЫ ===');
  [...new Set(errors)].forEach((e) => console.log(' -', e));
} else {
  console.log('\nОшибок консоли и переполнений нет.');
}
