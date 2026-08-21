import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900},locale:'en-US'})).newPage();
await p.goto('https://skylum.com/luminar',{waitUntil:'domcontentloaded',timeout:90000});
await p.waitForTimeout(3500);
await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,110));}window.scrollTo(0,0);});
await p.waitForTimeout(3000);

const d = await p.evaluate(() => {
  const n=s=>(s||'').replace(/\s+/g,' ').trim();
  const R={};
  // DF: точная структура групп
  const df=document.querySelector('.df-section');
  const dfRoot = df.querySelector('[class*=list], [class*=nav], [class*=menu], [class*=aside]') || df;
  R.dfClasses = [...new Set([...df.querySelectorAll('*')].map(e=>typeof e.className==='string'?e.className:'').filter(Boolean))].slice(0,60);
  // группы: ищем заголовки-категории
  R.dfGroups = [...df.querySelectorAll('*')].filter(e=>{
    const t=n(e.innerText); return e.children.length && /^[A-Z][A-Z\s&]{4,30}$/.test(n(e.firstElementChild?.innerText||''));
  }).slice(0,3).map(e=>n(e.innerText).slice(0,600));
  // все уникальные названия фич + связанные media
  const feat=[...df.querySelectorAll('li,[class*=item]')].map(e=>({t:n(e.innerText),cls:typeof e.className==='string'?e.className:''})).filter(x=>x.t&&x.t.length<50);
  R.dfFeatures=[...new Map(feat.map(f=>[f.t,f])).values()].slice(0,60);
  R.dfHtmlSample = df.outerHTML.slice(0,20000);

  // POSSIBILITIES: swiper-структура
  const ps=document.querySelector('.possibilities');
  R.psClasses=[...new Set([...ps.querySelectorAll('*')].map(e=>typeof e.className==='string'?e.className:'').filter(Boolean))].slice(0,40);
  R.psHtml = ps.outerHTML.slice(0,20000);

  // FAQ полностью
  const faq=document.querySelector('.luminar-ai-faq');
  R.faqHtml = faq.outerHTML.slice(0,25000);

  // REQUIREMENTS полностью
  R.reqHtml = document.querySelector('.luminar-neo-requirements').outerHTML.slice(0,20000);

  // HEADER полностью
  R.headerHtml = document.querySelector('header.header-aperty').outerHTML.slice(0,30000);

  // FOOTER полностью
  R.footerHtml = document.querySelector('footer.footer-new').outerHTML.slice(0,30000);

  // HERO полностью
  R.heroHtml = document.querySelector('section.hero').outerHTML.slice(0,15000);
  R.stickyHtml = document.querySelector('.luminar-neo-fix')?.outerHTML.slice(0,6000);
  R.bannerHtml = document.querySelector('section.banner').outerHTML.slice(0,15000);
  R.reasonsHtml = document.querySelector('.discover-second').outerHTML.slice(0,15000);
  R.discoverHtml = document.querySelector('.sk-section.discover').outerHTML.slice(0,12000);
  R.spectacularHtml = document.querySelector('.spectacular').outerHTML.slice(0,8000);
  R.retouchHtml = document.querySelector('.retouch').outerHTML.slice(0,8000);
  R.photoshootHtml = document.querySelector('.photoshoot').outerHTML.slice(0,12000);
  R.bottomHtml = document.querySelector('.banner-bottom').outerHTML.slice(0,8000);
  return R;
});
fs.writeFileSync('./data/html.json', JSON.stringify(d,null,1));
console.log('ok', Object.keys(d).length);
await b.close();
