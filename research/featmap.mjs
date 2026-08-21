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
  const df=document.querySelector('.df-section');
  // навигация: группы и пункты
  const nav=[];
  df.querySelectorAll('[class*=df-nav],[class*=df-list],[class*=df-menu],ul').forEach(ul=>{
    const items=[...ul.children].map(li=>n(li.innerText)).filter(Boolean);
    if(items.length>2) nav.push({cls:(typeof ul.className==='string'?ul.className:''), items});
  });
  // все элементы с data-атрибутами
  const withData=[...df.querySelectorAll('[data-id],[data-slide],[data-target],[data-video],[data-src],[data-index]')].slice(0,60)
    .map(e=>({tag:e.tagName, cls:(typeof e.className==='string'?e.className:'').slice(0,60), text:n(e.innerText).slice(0,40), data:Object.fromEntries(Object.entries(e.dataset))}));
  // панели контента: сопоставление названия и медиа
  const panels=[...df.querySelectorAll('[class*=df-content] > *, [class*=slide], [class*=panel]')].slice(0,60).map(e=>({
    cls:(typeof e.className==='string'?e.className:'').slice(0,70),
    text:n(e.innerText).slice(0,60),
    media:[...e.querySelectorAll('img,video,source')].map(m=>(m.currentSrc||m.src||m.getAttribute('src')||m.getAttribute('data-src')||'').split('/').pop()).filter(Boolean).slice(0,3),
  })).filter(x=>x.media.length);
  return {nav:nav.slice(0,6), withData:withData.slice(0,30), panels};
});
fs.writeFileSync('./data/featmap.json', JSON.stringify(d,null,1));
console.log('nav lists:',d.nav.length,'withData:',d.withData.length,'panels:',d.panels.length);
d.nav.forEach(nn=>console.log('LIST', nn.cls.slice(0,40),'=>',nn.items.slice(0,15).join(' | ')));
console.log('--- panels sample ---');
d.panels.slice(0,14).forEach(x=>console.log(JSON.stringify(x.text),'=>',x.media.join(',')));
await b.close();
