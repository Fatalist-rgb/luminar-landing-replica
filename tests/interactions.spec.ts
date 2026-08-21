import { test, expect, type Page } from '@playwright/test';

const isMobile = (page: Page) => page.viewportSize()!.width < 1024;

/**
 * Ждём завершения гидратации: до неё таймер отрисован заглушкой «00d»,
 * а обработчики кликов ещё не навешены.
 */
async function waitForHydration(page: Page) {
  await expect
    .poll(async () => (await page.locator('[role="timer"]').first().innerText()).replace(/\s/g, ''), {
      timeout: 15_000,
    })
    .not.toBe('00d:00h:00m:00s');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await waitForHydration(page);
});

test.describe('Содержимое страницы', () => {
  test('заголовок, метаданные и один h1', async ({ page }) => {
    await expect(page).toHaveTitle('Photo Editing Software: Best Photo Editor Luminar Neo');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Get gorgeous photos in Luminar');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('присутствуют все 12 секций и футер', async ({ page }) => {
    await expect(page.locator('main > section')).toHaveCount(12);
    await expect(page.locator('footer')).toBeVisible();
  });

  test('JSON-LD FAQPage содержит 10 вопросов', async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw!);
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity).toHaveLength(10);
  });

  test('нет обращений к сторонним доменам', async ({ page, baseURL }) => {
    const own = new URL(baseURL!).hostname;
    const external: string[] = [];
    page.on('request', (r) => {
      const url = new URL(r.url());
      if (url.hostname !== own && !['localhost', '127.0.0.1'].includes(url.hostname)) {
        external.push(r.url());
      }
    });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);
    expect(external, `внешние запросы: ${external.join(', ')}`).toHaveLength(0);
  });
});

test.describe('Таймер акции', () => {
  test('все таймеры показывают одинаковое время и тикают', async ({ page }) => {
    const timers = page.locator('[role="timer"]');
    await expect(timers.first()).toBeVisible();

    const values = await timers.allInnerTexts();
    const normalized = values.map((v) => v.replace(/\s/g, ''));
    expect(new Set(normalized).size, `значения таймеров: ${normalized.join(' | ')}`).toBe(1);

    const before = normalized[0];
    await page.waitForTimeout(2100);
    const after = (await timers.first().innerText()).replace(/\s/g, '');
    expect(after).not.toBe(before);
  });

  test('формат отсчёта NNd : NNh : NNm : NNs', async ({ page }) => {
    const text = (await page.locator('[role="timer"]').first().innerText()).replace(/\s/g, '');
    expect(text).toMatch(/^\d{2}d:\d{2}h:\d{2}m:\d{2}s$/);
  });
});

test.describe('Шапка и меню', () => {
  test('десктоп: мега-меню Features раскрывается и закрывается по Esc', async ({ page }) => {
    test.skip(isMobile(page), 'только десктоп');

    const trigger = page.getByRole('navigation', { name: 'Разделы Luminar' }).getByRole('button', { name: 'Features', exact: true });
    await trigger.hover();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Bokeh AI' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('мобильный: бургер открывает меню, Esc закрывает', async ({ page }) => {
    test.skip(!isMobile(page), 'только мобильный');

    const burger = page.getByRole('button', { name: 'Открыть меню' });
    await expect(burger).toBeVisible();
    await burger.click();

    const dialog = page.getByRole('dialog', { name: 'Меню навигации' });
    await expect(dialog).toBeVisible();
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});

test('прилипающий промо-бар появляется после первого экрана', async ({ page }) => {
  const bar = page.getByTestId('sticky-promo');
  const hiddenBox = await bar.boundingBox();
  expect(hiddenBox!.y).toBeLessThan(0);

  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
  await page.waitForTimeout(600);

  const shownBox = await bar.boundingBox();
  expect(shownBox!.y).toBeGreaterThanOrEqual(0);
});

test.describe('Секция возможностей', () => {
  test('выбор пункта меняет активное состояние', async ({ page }) => {
    const items = page.getByTestId('feature-item');
    await items.first().scrollIntoViewIfNeeded();

    await expect(items.first()).toHaveAttribute('aria-current', 'true');

    await items.nth(2).click();
    await expect(items.nth(2)).toHaveAttribute('aria-current', 'true');
    await expect(items.first()).not.toHaveAttribute('aria-current', 'true');
  });

  test('группы сворачиваются и разворачиваются', async ({ page }) => {
    const group = page.getByRole('button', { name: 'Top features', exact: true });
    await group.scrollIntoViewIfNeeded();
    await expect(group).toHaveAttribute('aria-expanded', 'true');

    await group.click();
    await expect(group).toHaveAttribute('aria-expanded', 'false');

    await group.click();
    await expect(group).toHaveAttribute('aria-expanded', 'true');
  });
});

test.describe('Карусель Pro Tools', () => {
  test('стрелки листают слайды', async ({ page }) => {
    test.skip(isMobile(page), 'стрелки видны только на десктопе');

    const track = page.getByTestId('protools-track');
    await track.scrollIntoViewIfNeeded();
    const start = await track.evaluate((el) => el.scrollLeft);

    await page.getByRole('button', { name: 'Следующий инструмент' }).click();
    await page.waitForTimeout(800);

    const next = await track.evaluate((el) => el.scrollLeft);
    expect(next).toBeGreaterThan(start);
  });

  test('переключатель Original / Apply меняет состояние', async ({ page }) => {
    const original = page.getByRole('button', { name: 'Original', exact: true }).first();
    const apply = page.getByRole('button', { name: 'Apply Upscale' }).first();
    await apply.scrollIntoViewIfNeeded();

    await expect(apply).toHaveAttribute('aria-pressed', 'true');
    await original.click();
    await expect(original).toHaveAttribute('aria-pressed', 'true');
    await expect(apply).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('Before/After и шаги', () => {
  test('разделитель двигается стрелками клавиатуры', async ({ page }) => {
    const slider = page.getByRole('slider', { name: /разделителя/i }).first();
    await slider.scrollIntoViewIfNeeded();

    const before = await slider.getAttribute('aria-valuenow');
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    const after = await slider.getAttribute('aria-valuenow');

    expect(Number(after)).toBeGreaterThan(Number(before));
  });

  test('разделитель перетаскивается мышью', async ({ page }) => {
    const ba = page.getByTestId('before-after').first();
    await ba.scrollIntoViewIfNeeded();
    const box = (await ba.boundingBox())!;

    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();

    const slider = ba.getByRole('slider');
    expect(Number(await slider.getAttribute('aria-valuenow'))).toBeGreaterThan(60);
  });

  test('пошаговый ползунок переключает шаги', async ({ page }) => {
    const group = page.getByTestId('step-slider').first();
    await group.scrollIntoViewIfNeeded();

    const genErase = group.getByRole('button', { name: /GenErase/ });
    await genErase.click();
    await expect(genErase).toHaveAttribute('aria-pressed', 'true');

    const range = group.locator('input[type="range"]');
    await expect(range).toHaveValue('1');
  });
});

test('галерея применяет пресет ко всем фото', async ({ page }) => {
  const button = page.getByTestId('apply-preset');
  await button.scrollIntoViewIfNeeded();

  const status = page.locator('text=/Применён пресет/');
  await expect(status).toContainText('Original');

  await button.click();
  await expect(status).toContainText('Cinematic');
});

test.describe('FAQ и требования', () => {
  test('первый вопрос раскрыт, остальные свёрнуты', async ({ page }) => {
    const questions = page.getByTestId('faq-question');
    await questions.first().scrollIntoViewIfNeeded();

    await expect(questions).toHaveCount(10);
    await expect(questions.first()).toHaveAttribute('aria-expanded', 'true');
    await expect(questions.nth(1)).toHaveAttribute('aria-expanded', 'false');

    await questions.nth(1).click();
    await expect(questions.nth(1)).toHaveAttribute('aria-expanded', 'true');
  });

  test('SHOW MORE раскрывает системные требования', async ({ page }) => {
    const toggle = page.getByTestId('requirements-toggle');
    await toggle.scrollIntoViewIfNeeded();

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toContainText(/Show less/i);
    await expect(page.getByRole('heading', { name: 'macOS' })).toBeVisible();
  });
});

test('форма подписки валидирует email', async ({ page }) => {
  const input = page.getByTestId('newsletter-email');
  await input.scrollIntoViewIfNeeded();

  await input.fill('не-почта');
  await page.getByRole('button', { name: 'SUBSCRIBE' }).click();
  await expect(page.getByTestId('newsletter-status')).toContainText('valid email');

  await input.fill('user@example.com');
  await page.getByRole('button', { name: 'SUBSCRIBE' }).click();
  await expect(page.getByTestId('newsletter-status')).toContainText('Thanks');
});
