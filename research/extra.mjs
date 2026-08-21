import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const ctx = await b.newContext({viewport:{width:1440,height:900},locale:'en-US'});
const p = await ctx.newPage();
const media = new Set();
p.on('response', r=>{const u=r.url(); if(/media\.macphun\.com/.test(u) && /\.(png|jpe?g|webp|avif|svg|mp4|webm|gif|woff2?)(\?|$)/i.test(u)) media.add(u.split('?')[0]+(u.includes('?')?'?'+u.split('?')[1]:''));});
await p.goto('https://skylum.com/luminar',{waitUntil:'domcontentloaded',timeout:90000});
await p.waitForTimeout(3000);
await p.evaluate(()=>{document.querySelectorAll('#cookie-information-template-wrapper,#coi-banner-wrapper').forEach(e=>e.remove())});
await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,130));}});
await p.waitForTimeout(2500);

// кликаем по всем пунктам списка фич
const feats = await p.locator('.df-section li, .df-section [class*=item]').all().catch(()=>[]);
console.log('feature items:', feats.length);
for (const f of feats.slice(0,60)) { try{ await f.click({timeout:1200, force:true}); await p.waitForTimeout(220);}catch(e){} }

// разворачиваем группы аккордеона
const accs = await p.locator('.df-section [class*=accordion] button, .df-section [class*=title]').all().catch(()=>[]);
for (const a of accs.slice(0,12)) { try{ await a.click({timeout:900, force:true}); await p.waitForTimeout(280);}catch(e){} }
for (const f of (await p.locator('.df-section li').all()).slice(0,80)) { try{ await f.click({timeout:900, force:true}); await p.waitForTimeout(180);}catch(e){} }

// карусель Pro Tools: листаем и переключаем Original/Apply
for (let i=0;i<8;i++){
  try{ await p.locator('.possibilities .slick-next, .possibilities [class*=next]').first().click({timeout:1200,force:true}); await p.waitForTimeout(500);}catch(e){}
  for (const btn of (await p.locator('.possibilities .tab-switch-btn').all())) { try{ await btn.click({timeout:900,force:true}); await p.waitForTimeout(320);}catch(e){} }
}
// шаговые слайдеры
for (const sel of ['.spectacular input[type=range]','.retouch input[type=range]']) {
  const el = p.locator(sel).first();
  if (await el.count()) for (const v of [0,1,2,3,4]) { try{ await el.fill(String(v)); await el.dispatchEvent('input'); await el.dispatchEvent('change'); await p.waitForTimeout(380);}catch(e){} }
}
// клики по подписям шагов
for (const s of (await p.locator('.spectacular [class*=step], .retouch [class*=step], .spectacular label, .retouch label').all())) { try{ await s.click({timeout:800,force:true}); await p.waitForTimeout(300);}catch(e){} }
// галерея: применить пресет
try{ await p.locator('.photoshoot a, .photoshoot button').first().click({timeout:1500,force:true}); await p.waitForTimeout(2500);}catch(e){}
// FAQ
for (const q of (await p.locator('.luminar-ai-faq [class*=question], .luminar-ai-faq [class*=item]').all()).slice(0,12)) { try{ await q.click({timeout:800,force:true}); await p.waitForTimeout(200);}catch(e){} }
// requirements
try{ await p.locator('.luminar-neo-requirements button').first().click({timeout:1500,force:true}); await p.waitForTimeout(1200);}catch(e){}
// мега-меню
for (const m of (await p.locator('header.header-aperty a, header.header-aperty [class*=menu]').all()).slice(0,20)) { try{ await m.hover({timeout:700}); await p.waitForTimeout(280);}catch(e){} }
await p.waitForTimeout(2000);

// мобильная версия
const p2 = await (await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:'en-US'})).newPage();
p2.on('response', r=>{const u=r.url(); if(/media\.macphun\.com/.test(u) && /\.(png|jpe?g|webp|avif|svg|mp4|webm|gif|woff2?)(\?|$)/i.test(u)) media.add(u.split('?')[0]+(u.includes('?')?'?'+u.split('?')[1]:''));});
await p2.goto('https://skylum.com/luminar',{waitUntil:'domcontentloaded',timeout:90000});
await p2.waitForTimeout(2500);
await p2.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}});
await p2.waitForTimeout(2500);
try{ await p2.locator('header [class*=burger], header button').first().click({timeout:1500,force:true}); await p2.waitForTimeout(1500);}catch(e){}

const prev = JSON.parse(fs.readFileSync('./data/media.json','utf8'));
const extra = [...media].filter(u=>!prev.includes(u)).sort();
fs.writeFileSync('./data/extra-media.json', JSON.stringify(extra,null,2));
console.log('extra assets:', extra.length, '/ total seen:', media.size);
await b.close();
