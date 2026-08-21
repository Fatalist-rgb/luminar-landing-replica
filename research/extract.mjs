import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
const media = new Set();
page.on('response', r => {
  const u = r.url();
  if (/\.(png|jpe?g|webp|avif|svg|mp4|webm|woff2?|gif)(\?|$)/i.test(u)) media.add(u.split('?')[0] + (u.includes('?') ? '?' + u.split('?')[1].slice(0,40) : ''));
});
await page.goto('https://skylum.com/luminar', { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(3000);
await page.evaluate(async () => {
  const H = document.documentElement.scrollHeight;
  for (let y = 0; y < H; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110)); }
  window.scrollTo(0,0);
});
await page.waitForTimeout(3000);

const data = await page.evaluate(() => {
  const norm = s => (s||'').replace(/\s+/g,' ').trim();
  const secSel = [
    ['header','header.header-aperty'],
    ['sticky-bar','section.luminar-neo-fix'],
    ['hero','section.hero'],
    ['df','section.df-section'],
    ['banner','section.banner'],
    ['reasons','section.discover-second'],
    ['discover','section.sk-section.discover'],
    ['possibilities','div.possibilities'],
    ['spectacular','div.spectacular'],
    ['retouch','div.retouch'],
    ['photoshoot','div.photoshoot'],
    ['banner-bottom','section.banner-bottom'],
    ['faq','section.luminar-ai-faq'],
    ['requirements','section.luminar-neo-requirements'],
    ['footer','footer.footer-new'],
  ];
  const out = {};
  for (const [key, sel] of secSel) {
    const el = document.querySelector(sel);
    if (!el) { out[key] = null; continue; }
    const r = el.getBoundingClientRect();
    out[key] = {
      selector: sel,
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      html_len: el.outerHTML.length,
      text: norm(el.innerText),
      images: [...el.querySelectorAll('img')].map(i => ({
        src: i.currentSrc || i.src, alt: i.alt || '',
        w: i.naturalWidth, h: i.naturalHeight,
        dw: Math.round(i.getBoundingClientRect().width), dh: Math.round(i.getBoundingClientRect().height),
        srcset: (i.getAttribute('srcset')||'').slice(0,300),
        cls: (typeof i.className==='string'?i.className:'').slice(0,80)
      })),
      sources: [...el.querySelectorAll('source')].map(s => ({ srcset: (s.srcset||s.src||'').slice(0,300), type: s.type||'', media: s.media||'' })),
      videos: [...el.querySelectorAll('video')].map(v => ({ src: v.currentSrc || v.src, poster: v.poster, loop: v.loop, autoplay: v.autoplay, muted: v.muted, cls: (typeof v.className==='string'?v.className:'') })),
      bgImages: [...el.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).filter(b => b && b !== 'none' && !b.startsWith('linear-grad')).slice(0,20),
      links: [...el.querySelectorAll('a')].map(a => ({ t: norm(a.innerText).slice(0,50), href: a.getAttribute('href') })).slice(0,60),
      buttons: [...el.querySelectorAll('button')].map(b => ({ t: norm(b.innerText).slice(0,50), cls: (typeof b.className==='string'?b.className:'').slice(0,60) })).slice(0,40),
    };
  }
  // типографика
  const typo = {};
  const probe = (label, sel) => { const e = document.querySelector(sel); if (!e) return; const c = getComputedStyle(e);
    typo[label] = { ff: c.fontFamily, fs: c.fontSize, fw: c.fontWeight, lh: c.lineHeight, ls: c.letterSpacing, color: c.color }; };
  probe('body','body'); probe('h1','h1'); probe('h2','h2'); probe('h3','h3'); probe('p','p');
  probe('heroTitle','section.hero h1'); probe('btn','section.hero a.btn, section.hero .button, section.hero button');
  return { out, typo, docHeight: document.documentElement.scrollHeight };
});

fs.writeFileSync('./data/sections.json', JSON.stringify(data, null, 2));
fs.writeFileSync('./data/media.json', JSON.stringify([...media].sort(), null, 2));
console.log('sections keys:', Object.keys(data.out).length, 'media:', media.size);
await browser.close();
