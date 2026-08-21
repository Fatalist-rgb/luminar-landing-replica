import { chromium } from 'playwright';
import fs from 'node:fs';

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })).newPage();
await p.goto('https://skylum.com/luminar', { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(3500);
await p.evaluate(async () => {
  const H = document.documentElement.scrollHeight;
  for (let y = 0; y < H; y += 450) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(3000);

const d = await p.evaluate(() => {
  const n = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const file = (u) => {
    if (!u) return null;
    const m = String(u).match(/url\(["']?(.+?)["']?\)/);
    const s = m ? m[1] : String(u);
    if (!s || s === 'none') return null;
    return s.split('?')[0].split('/').pop() || null;
  };
  const R = {};

  const hero = document.querySelector('section.hero');
  R.hero = {
    badge: n(hero.querySelector('[class*=sale],[class*=badge]')?.innerText),
    h1: n(hero.querySelector('h1')?.innerText),
    benefits: [...hero.querySelectorAll('li,[class*=benefit] > *')].map((e) => n(e.innerText)).filter((t) => t && t.length < 60),
    cta: n(hero.querySelector('a[class*=btn],.sk-btn')?.innerText),
    bg: file(getComputedStyle(hero).backgroundImage),
    video: file(hero.querySelector('video source')?.getAttribute('src') || hero.querySelector('video')?.getAttribute('src')),
    poster: file(hero.querySelector('video')?.getAttribute('poster')),
    imgs: [...hero.querySelectorAll('img')].map((i) => ({ f: file(i.getAttribute('src')), alt: i.alt, cls: (typeof i.className === 'string' ? i.className : '').slice(0, 50) })),
    platformsText: n(hero.querySelector('[class*=platform],[class*=devices]')?.innerText),
    bgLayers: [...hero.querySelectorAll('*')].map((e) => ({ cls: (typeof e.className === 'string' ? e.className : '').slice(0, 40), bg: file(getComputedStyle(e).backgroundImage) })).filter((x) => x.bg).slice(0, 12),
  };

  const bn = document.querySelector('section.banner');
  R.banner = {
    title: n(bn.querySelector('h2,[class*=title]')?.innerText),
    bullets: [...bn.querySelectorAll('li,[class*=list] > *')].map((e) => ({ t: n(e.innerText), icon: file(e.querySelector('img')?.getAttribute('src')) })).filter((x) => x.t && x.t.length < 60),
    imgs: [...bn.querySelectorAll('img')].map((i) => ({ f: file(i.getAttribute('src') || i.currentSrc), alt: i.alt, cls: (typeof i.className === 'string' ? i.className : '').slice(0, 50) })),
    sources: [...bn.querySelectorAll('source')].map((s) => ({ srcset: file(s.getAttribute('srcset')), media: s.media })),
    bgLayers: [...new Set([...bn.querySelectorAll('*')].map((e) => file(getComputedStyle(e).backgroundImage)).filter(Boolean))].slice(0, 8),
    platformsText: n(bn.querySelector('[class*=platform]')?.innerText),
  };

  const rs = document.querySelector('.discover-second');
  R.reasons = {
    title: n(rs.querySelector('h2,[class*=title]')?.innerText),
    cards: [...rs.querySelectorAll('[class*=card],[class*=item]')].map((c) => ({
      t: n(c.querySelector('h3,[class*=title],b,strong')?.innerText),
      d: n(c.querySelector('p,[class*=descr],[class*=text]')?.innerText),
      img: file(c.querySelector('img')?.getAttribute('src') || c.querySelector('img')?.currentSrc),
      video: file(c.querySelector('video source')?.getAttribute('src') || c.querySelector('video')?.getAttribute('src')),
      poster: file(c.querySelector('video')?.getAttribute('poster')),
    })).filter((x) => x.t),
    html: rs.outerHTML.slice(0, 6000),
  };

  const dv = document.querySelector('.sk-section.discover');
  R.capabilities = {
    title: n(dv.querySelector('h2,[class*=title]')?.innerText),
    sub: n(dv.querySelector('p,[class*=subtitle]')?.innerText),
    items: [...dv.querySelectorAll('[class*=item],li')].map((e) => ({ t: n(e.innerText), icon: file(e.querySelector('img')?.getAttribute('src')) })).filter((x) => x.t && x.icon),
  };

  const ps = document.querySelector('.possibilities');
  R.protools = {
    title: n(ps.querySelector('h2,.title')?.innerText),
    sub: n(ps.querySelector('.subtitle,p')?.innerText),
    slides: [...ps.querySelectorAll('.possibilities__slider-slide')].filter((s) => !s.className.includes('slick-cloned')).map((s) => ({
      title: n(s.querySelector('.sk-h2')?.innerText),
      desc: n(s.querySelector('.sk-text')?.innerText),
      btns: [...s.querySelectorAll('.tab-switch-btn')].map((x) => n(x.innerText)),
      allBgs: [...new Set([...s.querySelectorAll('*')].map((e) => file(getComputedStyle(e).backgroundImage)).filter(Boolean))],
      imgs: [...s.querySelectorAll('img')].map((i) => file(i.getAttribute('src') || i.currentSrc)).filter(Boolean),
      html: s.outerHTML.slice(0, 2500),
    })),
  };

  for (const [k, sel] of [['spectacular', '.spectacular'], ['retouch', '.retouch']]) {
    const e = document.querySelector(sel);
    R[k] = {
      title: n(e.querySelector('.sk-h2,h2,[class*=title]')?.innerText),
      desc: n(e.querySelector('.sk-text,p,[class*=descr]')?.innerText),
      steps: [...e.querySelectorAll('[class*=step],[class*=label],[class*=point]')].map((x) => n(x.innerText)).filter((t) => t && t.length < 24),
      allBgs: [...new Set([...e.querySelectorAll('*')].map((x) => file(getComputedStyle(x).backgroundImage)).filter(Boolean))],
      html: e.outerHTML.slice(0, 4000),
    };
  }

  const ph = document.querySelector('.photoshoot');
  R.photoshoot = {
    title: n(ph.querySelector('h2,[class*=title]')?.innerText),
    desc: n(ph.querySelector('p,[class*=descr]')?.innerText),
    btn: n(ph.querySelector('a,button')?.innerText),
    imgs: [...ph.querySelectorAll('img')].map((i) => ({
      f: file(i.getAttribute('src') || i.currentSrc),
      cls: (typeof i.className === 'string' ? i.className : '').slice(0, 60),
      srcset: (i.getAttribute('srcset') || '').split(',').map((s) => file(s.trim().split(' ')[0])).filter(Boolean),
    })),
    html: ph.outerHTML.slice(0, 5000),
  };

  const bb = document.querySelector('.banner-bottom');
  R.bottom = {
    badge: n(bb.querySelector('[class*=sale],[class*=badge]')?.innerText),
    title: n(bb.querySelector('h2,[class*=title]')?.innerText),
    desc: n(bb.querySelector('p,[class*=descr]')?.innerText),
    guarantees: [...bb.querySelectorAll('li,[class*=guarantee] > *')].map((x) => n(x.innerText)).filter((t) => t && t.length < 50),
    imgs: [...bb.querySelectorAll('img')].map((i) => file(i.getAttribute('src') || i.currentSrc)).filter(Boolean),
    bgs: [...new Set([...bb.querySelectorAll('*')].map((x) => file(getComputedStyle(x).backgroundImage)).filter(Boolean))],
  };

  const f = document.querySelector('footer.footer-new');
  R.footerHtml = f.outerHTML.slice(0, 20000);

  return R;
});

fs.writeFileSync('./data/rest.json', JSON.stringify(d, null, 1));
console.log('hero.imgs', d.hero.imgs.length, '| banner.bullets', d.banner.bullets.length, '| reasons', d.reasons.cards.length, '| caps', d.capabilities.items.length, '| protools', d.protools.slides.length, '| gallery', d.photoshoot.imgs.length);
await b.close();
