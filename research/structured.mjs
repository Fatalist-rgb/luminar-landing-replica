import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900},locale:'en-US'})).newPage();
await p.goto('https://skylum.com/luminar',{waitUntil:'domcontentloaded',timeout:90000});
await p.waitForTimeout(3500);
await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}window.scrollTo(0,0);});
await p.waitForTimeout(3500);

const d = await p.evaluate(() => {
  const n=s=>(s||'').replace(/\s+/g,' ').trim();
  const R={};

  // ===== HEADER =====
  const hdr=document.querySelector('header.header-aperty');
  const rows=[...hdr.querySelectorAll(':scope > .container-fluid > *')];
  R.header={
    rowsCount: rows.length,
    row1: [...hdr.querySelectorAll('a,button')].slice(0,20).map(a=>({t:n(a.innerText),href:a.getAttribute?.('href')||null,cls:(typeof a.className==='string'?a.className:'').slice(0,50)})),
    megaMenus: [...hdr.querySelectorAll('[class*=submenu],[class*=dropdown],[class*=mega]')].slice(0,8).map(e=>({cls:(typeof e.className==='string'?e.className:'').slice(0,60), text:n(e.innerText).slice(0,400)})),
  };

  // ===== DF: группы и фичи с медиа =====
  const df=document.querySelector('.df-section');
  const groups=[];
  df.querySelectorAll('[class*=accordion],[class*=group],[class*=category]').forEach(g=>{
    const head=n(g.querySelector('[class*=title],[class*=head],button,span')?.innerText||'');
    if(!/^[A-Z][A-Z\s&]{3,30}$/.test(head)) return;
    const items=[...g.querySelectorAll('li,[class*=item]')].map(li=>n(li.innerText)).filter(t=>t&&t.length<50);
    if(items.length) groups.push({group:head, items:[...new Set(items)]});
  });
  R.dfGroups=groups.slice(0,8);
  // соответствие фича -> медиа
  const mediaByFeature={};
  df.querySelectorAll('img,video').forEach(m=>{
    const src=m.currentSrc||m.src||m.querySelector?.('source')?.src||'';
    if(!src) return;
    const file=src.split('/').pop().split('?')[0];
    mediaByFeature[file]=(m.alt||'')||file;
  });
  R.dfMediaFiles=Object.keys(mediaByFeature).slice(0,80);

  // ===== POSSIBILITIES slides =====
  const ps=document.querySelector('.possibilities');
  R.psSlides=[...ps.querySelectorAll('.possibilities__slider-slide')].filter(s=>!s.className.includes('cloned')).map(s=>({
    title:n(s.querySelector('.sk-h2,[class*=title]')?.innerText),
    desc:n(s.querySelector('.sk-text,[class*=descr]')?.innerText),
    btns:[...s.querySelectorAll('.tab-switch-btn')].map(b=>n(b.innerText)),
    imgs:[...s.querySelectorAll('img')].map(i=>i.currentSrc||i.src),
    bgs:[...s.querySelectorAll('*')].map(e=>getComputedStyle(e).backgroundImage).filter(x=>x&&x!=='none'&&!x.startsWith('linear')).slice(0,6),
  }));

  // ===== SPECTACULAR / RETOUCH steps =====
  for(const [k,sel] of [['spectacular','.spectacular'],['retouch','.retouch']]){
    const e=document.querySelector(sel);
    R[k]={
      title:n(e.querySelector('[class*=title],h2')?.innerText),
      desc:n(e.querySelector('[class*=descr],p')?.innerText),
      steps:[...e.querySelectorAll('[class*=step],[class*=point],label,li')].map(x=>n(x.innerText)).filter(t=>t&&t.length<24),
      imgs:[...e.querySelectorAll('img')].map(i=>i.currentSrc||i.src),
      bgs:[...new Set([...e.querySelectorAll('*')].map(x=>getComputedStyle(x).backgroundImage).filter(x=>x&&x!=='none'&&!x.startsWith('linear')))].slice(0,12),
    };
  }

  // ===== PHOTOSHOOT =====
  const ph=document.querySelector('.photoshoot');
  R.photoshoot={title:n(ph.querySelector('h2,[class*=title]')?.innerText), desc:n(ph.querySelector('p,[class*=descr]')?.innerText),
    btn:n(ph.querySelector('a,button')?.innerText),
    imgs:[...ph.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src, cls:(typeof i.className==='string'?i.className:'').slice(0,60)}))};

  // ===== FAQ =====
  const faq=document.querySelector('.luminar-ai-faq');
  const qs=[...faq.querySelectorAll('[class*=question],[class*=faq__item] > *:first-child,dt,summary')].map(e=>n(e.innerText)).filter(t=>t.endsWith('?'));
  R.faqQuestions=[...new Set(qs)];
  try{ const ld=[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)).find(o=>o['@type']==='FAQPage');
    R.faq=ld.mainEntity.map(q=>({q:q.name, a:q.acceptedAnswer.text}));}catch(e){R.faq=null;}

  // ===== REQUIREMENTS =====
  const rq=document.querySelector('.luminar-neo-requirements');
  R.requirements={
    title:n(rq.querySelector('[class*=title],h2')?.innerText),
    toggles:[...rq.querySelectorAll('button,[class*=tab]')].map(e=>n(e.innerText)).filter(Boolean).slice(0,6),
    rows:[...rq.querySelectorAll('tr,[class*=row],li')].map(e=>n(e.innerText)).filter(t=>t&&t.length<200).slice(0,40),
  };

  // ===== FOOTER =====
  const f=document.querySelector('footer.footer-new');
  R.footer={
    cols:[...f.querySelectorAll('[class*=col],[class*=column]')].slice(0,10).map(c=>({
      head:n(c.querySelector('[class*=title],[class*=head],h3,h4,span')?.innerText).slice(0,40),
      links:[...c.querySelectorAll('a')].map(a=>({t:n(a.innerText),href:a.getAttribute('href')})).slice(0,15)})),
    social:[...f.querySelectorAll('[class*=social] a,[class*=soc] a')].map(a=>({href:a.getAttribute('href'), img:a.querySelector('img')?.src})),
    bottom:n([...f.children].pop()?.innerText).slice(0,200),
  };
  return R;
});
fs.writeFileSync('./data/structured.json', JSON.stringify(d,null,1));
console.log('DF groups:',d.dfGroups.length,'| PS slides:',d.psSlides.length,'| FAQ:',d.faq?.length,'| footer cols:',d.footer.cols.length);
await b.close();
