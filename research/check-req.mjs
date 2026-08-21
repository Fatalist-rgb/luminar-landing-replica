import { chromium } from 'playwright';

const URL = process.env.TARGET || 'https://luminar-landing-replica.vercel.app';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })).newPage();

await p.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
await p.waitForTimeout(2500); // ждём гидратацию

const btn = p.getByTestId('requirements-toggle');
await btn.scrollIntoViewIfNeeded();
await p.waitForTimeout(600);

// проверяем, не перекрыт ли элемент чем-то (sticky-бар и т.п.)
const covered = await btn.evaluate((el) => {
  const r = el.getBoundingClientRect();
  const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  return {
    self: top === el || el.contains(top),
    topEl: top ? `${top.tagName.toLowerCase()}.${String(top.className).slice(0, 40)}` : null,
    rect: { top: Math.round(r.top), h: Math.round(r.height) },
  };
});
console.log('элемент кликабелен:', covered.self, '| сверху:', covered.topEl, '| позиция:', JSON.stringify(covered.rect));

console.log('до клика :', await btn.getAttribute('aria-expanded'));
await btn.click();
await p.waitForTimeout(800);
console.log('после клика:', await btn.getAttribute('aria-expanded'));
console.log('текст кнопки:', (await btn.innerText()).trim());

const macVisible = await p.getByRole('heading', { name: 'macOS' }).isVisible().catch(() => false);
console.log('таблица macOS видна:', macVisible);

await b.close();
