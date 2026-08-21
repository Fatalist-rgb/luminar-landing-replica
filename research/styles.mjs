import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900},locale:'en-US'})).newPage();
await p.goto('https://skylum.com/luminar',{waitUntil:'domcontentloaded',timeout:90000});
await p.waitForTimeout(3500);
await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,110));}window.scrollTo(0,0);});
await p.waitForTimeout(2500);
const d = await p.evaluate(()=>{
  const g=(sel,props)=>{const e=document.querySelector(sel); if(!e) return {MISSING:sel};
    const c=getComputedStyle(e); const r=e.getBoundingClientRect();
    const o={}; props.forEach(pr=>o[pr]=c[pr]); o._box={w:Math.round(r.width),h:Math.round(r.height)}; return o;};
  const T=['fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','backgroundImage','borderRadius','padding','margin','textTransform','boxShadow','border','maxWidth','gap'];
  return {
    hero: g('section.hero', T),
    heroInner: g('section.hero .container, section.hero > div', T),
    heroBadge: g('section.hero [class*=badge], section.hero [class*=sale]', T),
    heroH1: g('section.hero h1', T),
    heroSubList: g('section.hero ul, section.hero [class*=benefit]', T),
    ctaBtn: g('section.hero a[class*=btn], section.hero .sk-btn, section.hero [class*=button]', T),
    ctaWrap: g('section.hero [class*=timer], section.hero [class*=countdown]', T),
    container: g('.wrap-content .container', ['maxWidth','paddingLeft','paddingRight','width']),
    dfSection: g('.df-section', T),
    dfH2: g('.df-section h2, .df-section [class*=title]', T),
    dfSub: g('.df-section [class*=subtitle], .df-section p', T),
    dfPanel: g('.df-section [class*=list], .df-section aside', T),
    banner: g('section.banner', T),
    bannerInner: g('section.banner [class*=wrap], section.banner [class*=inner]', T),
    reasonsCard: g('.discover-second [class*=card], .discover-second [class*=item]', T),
    stickyBar: g('.luminar-neo-fix', T),
    stickyBtn: g('.luminar-neo-fix a', T),
    faqItem: g('.luminar-ai-faq [class*=item]', T),
    footer: g('footer.footer-new', T),
    footerCol: g('footer .footer-new__col, footer [class*=col]', T),
    body: g('body', T),
    h2any: g('h2', T),
  };
});
fs.writeFileSync('./data/styles.json', JSON.stringify(d,null,1));
console.log(JSON.stringify({hero:d.hero, ctaBtn:d.ctaBtn, heroBadge:d.heroBadge, container:d.container, stickyBar:d.stickyBar},null,1).slice(0,2600));
await b.close();
