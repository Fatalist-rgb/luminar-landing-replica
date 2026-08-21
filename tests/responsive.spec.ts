import { test, expect } from '@playwright/test';

const WIDTHS = [320, 390, 430, 768, 1024, 1280, 1440, 1920];

test.describe('Адаптивность', () => {
  for (const width of WIDTHS) {
    test(`${width}px — без горизонтального скролла`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // прокрутка до конца, чтобы отрисовались ленивые блоки
      await page.evaluate(async () => {
        const H = document.documentElement.scrollHeight;
        for (let y = 0; y < H; y += 800) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);

      const { docWidth, winWidth, offenders } = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const offenders: string[] = [];
        if (docWidth > winWidth + 1) {
          document.querySelectorAll<HTMLElement>('body *').forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.right > winWidth + 2 || r.left < -2) {
              const cls = typeof el.className === 'string' ? el.className.slice(0, 50) : '';
              offenders.push(`${el.tagName.toLowerCase()}.${cls} → ${Math.round(r.left)}..${Math.round(r.right)}`);
            }
          });
        }
        return { docWidth, winWidth, offenders: offenders.slice(0, 6) };
      });

      expect(docWidth, `переполнение: ${offenders.join(' | ')}`).toBeLessThanOrEqual(winWidth + 1);
    });
  }

  test('на мобильной ширине шапка сворачивается в бургер', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('button', { name: 'Открыть меню' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Продукты Skylum' })).not.toBeVisible();
  });

  test('на десктопе видна полная навигация', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('navigation', { name: 'Продукты Skylum' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Разделы Luminar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Открыть меню' })).not.toBeVisible();
  });
});
