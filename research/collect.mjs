import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const URL = 'https://skylum.com/luminar';
const OUT = path.resolve('./screens');
const DATA = path.resolve('./data');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(DATA, { recursive: true });

const KILL = `
  const sels = ['#cookie-information-template-wrapper','#coi-banner-wrapper','[id^=launcher]','iframe[title*="messaging"]','#ze-snippet','.zEWidget-launcher','iframe[id^=ze]','#onetrust-consent-sdk','.trustpilot-widget'];
  sels.forEach(s => document.querySelectorAll(s).forEach(e => e.remove()));
  document.querySelectorAll('iframe').forEach(f => { const src=f.src||''; if(/zendesk|zdassets|facebook|criteo|bing|doubleclick/.test(src)) f.remove(); });
`;

async function prep(page) {
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(3000);
  await page.evaluate(KILL);
  // прокрутка для lazy-load
  await page.evaluate(async () => {
    const H = document.documentElement.scrollHeight;
    for (let y = 0; y < H; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2500);
  await page.evaluate(KILL);
  await page.waitForTimeout(500);
}

const SECTIONS = [
  ['01-header', 'header.header-aperty'],
  ['02-hero', 'section.hero'],
  ['03-df', 'section.df-section'],
  ['04-banner', 'section.banner'],
  ['05-reasons', 'section.discover-second'],
  ['06-discover', 'section.sk-section.discover'],
  ['07-possibilities', 'div.possibilities'],
  ['08-spectacular', 'div.spectacular'],
  ['09-retouch', 'div.retouch'],
  ['10-photoshoot', 'div.photoshoot'],
  ['11-banner-bottom', 'section.banner-bottom'],
  ['12-faq', 'section.luminar-ai-faq'],
  ['13-requirements', 'section.luminar-neo-requirements'],
  ['14-footer', 'footer.footer-new'],
];

const VIEWPORTS = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
];

const browser = await chromium.launch();
for (const [vp, w, h] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, locale: 'en-US' });
  const page = await ctx.newPage();
  await prep(page);
  fs.mkdirSync(path.join(OUT, vp), { recursive: true });
  for (const [name, sel] of SECTIONS) {
    try {
      const el = page.locator(sel).first();
      if (!(await el.count())) { console.log(`skip ${vp}/${name}`); continue; }
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await page.evaluate(KILL);
      await el.screenshot({ path: path.join(OUT, vp, `${name}.png`), timeout: 30000 });
      console.log(`ok ${vp}/${name}`);
    } catch (e) { console.log(`ERR ${vp}/${name}: ${String(e).slice(0, 120)}`); }
  }
  await ctx.close();
}
await browser.close();
console.log('DONE');
