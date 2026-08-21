import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })).newPage();
await p.goto('https://skylum.com/luminar', { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(3000);
await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 450) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 130)); } });
await p.waitForTimeout(3000);
const d = await p.evaluate(() => {
  const n = s => (s || '').replace(/\s+/g, ' ').trim();
  const f = u => u ? String(u).replace(/^url\(["']?|["']?\)$/g, '').split('?')[0].split('/').pop() : null;
  const rs = document.querySelector('.discover-second');
  // карточки верхнего уровня
  const cards = [...rs.querySelectorAll(':scope .container li, :scope .container [class*=card]')].map(c => ({
    cls: (typeof c.className === 'string' ? c.className : '').slice(0, 60),
    title: n(c.querySelector('h3,b,strong,[class*=title]')?.innerText),
    desc: n(c.querySelector('p:not([class*=title])')?.innerText),
    media: [...c.querySelectorAll('img,video,source')].map(m => f(m.getAttribute('src') || m.getAttribute('poster') || m.currentSrc)).filter(Boolean),
    bg: [...new Set([...c.querySelectorAll('*')].map(e => f(getComputedStyle(e).backgroundImage)).filter(x => x && !x.includes('gradient')))],
  })).filter(c => c.title);
  return { cards, allMedia: [...new Set([...rs.querySelectorAll('img,video,source')].map(m => f(m.getAttribute('src') || m.getAttribute('poster'))).filter(Boolean))] };
});
console.log(JSON.stringify(d, null, 1));
fs.writeFileSync('./data/reasons.json', JSON.stringify(d, null, 1));
await b.close();
