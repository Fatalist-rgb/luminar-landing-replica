import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900},locale:'en-US'})).newPage();
await p.goto('https://skylum.com/luminar',{waitUntil:'domcontentloaded',timeout:90000});
await p.waitForTimeout(3500);
await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,110));}window.scrollTo(0,0);});
await p.waitForTimeout(3000);
const d = await p.evaluate(()=>{
  const n=s=>(s||'').replace(/\s+/g,' ').trim();
  const file=u=>(u||'').split('?')[0].split('/').pop()||'';
  const groups=[...document.querySelectorAll('.df-section .accordion-content-wr')].map(g=>({
    group: n(g.querySelector('.accordion-btn')?.childNodes[0]?.textContent || g.querySelector('.accordion-btn')?.innerText),
    open: g.classList.contains('show-content'),
    items: [...g.querySelectorAll('.accordion-content-subitem')].map(it=>{
      const v=it.querySelector('video');
      return {
        title: n(it.querySelector('.df-section-tabs__heading p')?.innerText),
        tab: it.dataset.tab || null,
        active: it.classList.contains('is-active'),
        icon: file(it.querySelector('.df-section-tabs__heading img')?.getAttribute('src')),
        poster: file(v?.getAttribute('poster')),
        video: file(v?.querySelector('source')?.getAttribute('src')),
      };
    }),
  }));
  // правая панель (изображение по умолчанию)
  const right=document.querySelector('.df-section__inner [class*=preview], .df-section__inner > *:last-child');
  return { groups, rightCls:(typeof right?.className==='string'?right.className:''), rightMedia:[...(right?.querySelectorAll('img,video,source')||[])].map(m=>file(m.currentSrc||m.getAttribute('src')||m.getAttribute('poster'))).slice(0,6) };
});
fs.writeFileSync('./data/features-map.json', JSON.stringify(d,null,1));
console.log('groups:', d.groups.length);
d.groups.forEach(g=>console.log(`- ${g.group} (${g.items.length}) open=${g.open}`));
console.log('\nSAMPLE:', JSON.stringify(d.groups[0]?.items.slice(0,3),null,1));
await b.close();
