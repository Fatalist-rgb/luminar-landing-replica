import { chromium } from 'playwright';
import fs from 'node:fs';

const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900}, locale:'en-US' })).newPage();
await p.goto('https://skylum.com/luminar', { waitUntil:'domcontentloaded', timeout:90000 });
await p.waitForTimeout(3500);
await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,110));}window.scrollTo(0,0);});
await p.waitForTimeout(3000);

const c = await p.evaluate(() => {
  const n = s => (s||'').replace(/\s+/g,' ').trim();
  const R = {};

  // ---------- HEADER ----------
  const hdr = document.querySelector('header.header-aperty');
  R.header = {
    topRow: [...hdr.querySelectorAll('.container-fluid > *')].map(e=>n(e.innerText)).slice(0,5),
    allLinks: [...hdr.querySelectorAll('a')].map(a=>({t:n(a.innerText), href:a.getAttribute('href'), cls:(typeof a.className==='string'?a.className:'').slice(0,60)})).filter(x=>x.t),
    logos: [...hdr.querySelectorAll('img,svg')].map(e=>e.tagName==='IMG'? e.src : 'inline-svg').slice(0,6),
    html: hdr.outerHTML.slice(0, 9000),
  };

  // ---------- HERO ----------
  const hero = document.querySelector('section.hero');
  R.hero = {
    text: n(hero.innerText),
    html: hero.outerHTML.slice(0, 9000),
  };

  // ---------- DF (features list + previews) ----------
  const df = document.querySelector('section.df-section');
  R.df = {
    title: n(df.querySelector('h2,h1')?.innerText),
    sub: n(df.querySelector('p')?.innerText),
    groups: [...df.querySelectorAll('.df-accordion__item, [class*=accordion]')].slice(0,20).map(e=>n(e.innerText).slice(0,300)),
    items: [...df.querySelectorAll('li, [class*=item]')].map(e=>n(e.innerText)).filter(t=>t && t.length<60).slice(0,80),
    mediaMap: [...df.querySelectorAll('video')].slice(0,60).map(v=>({src:(v.currentSrc||v.src||v.querySelector('source')?.src||''), cls:(typeof v.className==='string'?v.className:'').slice(0,60)})),
    imgMap: [...df.querySelectorAll('img')].slice(0,60).map(i=>({src:i.currentSrc||i.src, alt:i.alt})),
    htmlHead: df.outerHTML.slice(0, 7000),
  };

  // ---------- BANNER ----------
  const bn = document.querySelector('section.banner');
  R.banner = { text: n(bn.innerText), html: bn.outerHTML.slice(0,6000) };

  // ---------- REASONS ----------
  const rs = document.querySelector('section.discover-second');
  R.reasons = { text: n(rs.innerText), html: rs.outerHTML.slice(0,9000) };

  // ---------- DISCOVER icons ----------
  const dv = document.querySelector('section.sk-section.discover');
  R.discover = { text: n(dv.innerText), html: dv.outerHTML.slice(0,8000) };

  // ---------- POSSIBILITIES (swiper) ----------
  const ps = document.querySelector('div.possibilities');
  R.possibilities = {
    title: n(ps.querySelector('h2')?.innerText),
    sub: n(ps.querySelectorAll('p')[0]?.innerText),
    slides: [...ps.querySelectorAll('.swiper-slide')].map(s=>({t:n(s.innerText).slice(0,220), imgs:[...s.querySelectorAll('img')].map(i=>i.currentSrc||i.src), bgs:[...s.querySelectorAll('*')].map(e=>getComputedStyle(e).backgroundImage).filter(x=>x&&x!=='none'&&!x.startsWith('linear')).slice(0,4)})),
    html: ps.outerHTML.slice(0,7000),
  };

  // ---------- SPECTACULAR / RETOUCH ----------
  for (const [k, sel] of [['spectacular','div.spectacular'],['retouch','div.retouch']]) {
    const e = document.querySelector(sel);
    R[k] = { text: n(e.innerText), html: e.outerHTML.slice(0,6000),
      bgs: [...e.querySelectorAll('*')].map(x=>getComputedStyle(x).backgroundImage).filter(x=>x&&x!=='none'&&!x.startsWith('linear')).slice(0,12) };
  }

  // ---------- PHOTOSHOOT ----------
  const ph = document.querySelector('div.photoshoot');
  R.photoshoot = { text:n(ph.innerText), imgs:[...ph.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src, cls:(typeof i.className==='string'?i.className:'').slice(0,50)})), html: ph.outerHTML.slice(0,6000) };

  // ---------- BOTTOM BANNER ----------
  const bb = document.querySelector('section.banner-bottom');
  R.bannerBottom = { text:n(bb.innerText), html: bb.outerHTML.slice(0,5000) };

  // ---------- FAQ ----------
  const faq = document.querySelector('section.luminar-ai-faq');
  R.faq = { title:n(faq.querySelector('h2')?.innerText),
    items: [...faq.querySelectorAll('[class*=item],[class*=accordion] > div,dt,dd')].map(e=>n(e.innerText)).filter(t=>t.length>10).slice(0,40),
    html: faq.outerHTML.slice(0,14000) };
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent).find(t=>t.includes('FAQPage'));
  R.faqLD = ld || null;

  // ---------- REQUIREMENTS ----------
  const rq = document.querySelector('section.luminar-neo-requirements');
  R.requirements = { text:n(rq.innerText), html: rq.outerHTML.slice(0,12000) };

  // ---------- FOOTER ----------
  const f = document.querySelector('footer.footer-new');
  R.footer = { text:n(f.innerText), html: f.outerHTML.slice(0,16000) };

  return R;
});

fs.writeFileSync('./data/content.json', JSON.stringify(c, null, 1));
console.log('written, keys:', Object.keys(c).join(','));
await b.close();
