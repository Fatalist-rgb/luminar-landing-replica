# Luminar Landing — копия одностраничного сайта

**Живой сайт: https://luminar-landing-replica.vercel.app**

Пиксель-ориентированная копия лендинга [skylum.com/luminar](https://skylum.com/luminar),
выполненная как тестовое задание. Воспроизведены все 14 секций оригинала, адаптивность и
интерактив: мега-меню, обратный отсчёт акции, переключаемые превью возможностей, before/after
слайдеры, карусель Pro Tools, FAQ-аккордеон и галерея с групповым применением пресета.

## Стек

| Слой | Решение |
| --- | --- |
| Фреймворк | Next.js 15 (App Router), React 19, TypeScript strict |
| Стилизация | Tailwind CSS 4, дизайн-токены в `src/app/globals.css` |
| Анимации | CSS-переходы + `IntersectionObserver`, без анимационных библиотек |
| Карусель | собственная реализация на CSS scroll-snap (без Swiper/Slick/jQuery оригинала) |
| Шрифт | Roobert, локальный `next/font/local` |
| Тесты | Playwright: интерактивы + адаптивность |
| Деплой | Vercel |

Runtime-зависимости — только `next`, `react`, `react-dom`.

## Запуск

```bash
npm install
```

```bash
npm run dev
```

Откроется на `http://localhost:3000`.

Production-сборка:

```bash
npm run build && npm start
```

## Команды

| Команда | Назначение |
| --- | --- |
| `npm run dev` | Дев-сервер |
| `npm run build` | Production-сборка |
| `npm run rebuild` | Сборка с предварительной очисткой `.next` |
| `npm start` | Запуск production-сборки |
| `npm run lint` | ESLint |
| `npm run typecheck` | Проверка типов |
| `npm test` | Playwright: интерактивы и адаптивность |
| `npm run assets` | Докачать ассеты оригинала по списку в `research/data` |

## Структура

```
src/
├── app/                     layout.tsx (метаданные, JSON-LD), page.tsx, globals.css
├── components/
│   ├── layout/              Header, MobileMenu, StickyPromoBar, Footer
│   ├── sections/            12 секций страницы, по компоненту на секцию
│   └── ui/                  Countdown, CtaButton, BeforeAfter, StepSlider,
│                            Accordion, LazyVideo, иконки
├── data/                    весь контент страницы в типизированных модулях
├── hooks/                   useCountdown, useScrollPast, useLockBodyScroll, useMediaQuery
└── lib/                     константы, шрифты

public/assets/               img · video · icons · fonts (локальные копии)
scripts/                     загрузка и оптимизация ассетов, генераторы data-модулей
tests/                       Playwright-спеки
specs/001-luminar-landing-replica/   спецификация (spec-kit)
research/                    эталонные скриншоты оригинала и извлечённые данные
```

Контент вынесен в `src/data/*.ts` — JSX не содержит «зашитых» строк. Server Components по
умолчанию, `"use client"` только там, где нужен стейт или обработчики.

## Спецификация

Работа велась по [spec-kit](https://github.com/github/spec-kit):

- [`.specify/memory/constitution.md`](.specify/memory/constitution.md) — принципы проекта и Quality Gates
- [`specs/001-luminar-landing-replica/spec.md`](specs/001-luminar-landing-replica/spec.md) — пользовательские сценарии, 30 функциональных требований, критерии приёмки
- [`specs/001-luminar-landing-replica/plan.md`](specs/001-luminar-landing-replica/plan.md) — технический план и дизайн-токены
- [`specs/001-luminar-landing-replica/tasks.md`](specs/001-luminar-landing-replica/tasks.md) — 57 задач по фазам

## Как проверялась точность

Эталон снят с живого оригинала и лежит в `research/`:

- `research/screens/{desktop,mobile}/` — посекционные снимки оригинала на 1440 и 390 px;
- `research/data/metrics-*.json` — замеры геометрии и типографики;
- `research/*.mjs` — скрипты сбора эталона и сравнения с копией.

Сверка выполнялась по числам, а не на глаз: `node research/metrics-all.mjs` печатает высоты всех
секций оригинала и копии рядом. Итоговое расхождение по высоте документа — около 2 %
(11 448 px против 11 204 px на 1440 px).

## Результаты проверок

Все цифры сняты с production-сборки на https://luminar-landing-replica.vercel.app

| Проверка | Результат |
| --- | --- |
| Playwright | 47 тестов пройдено на проде (интерактивы, таймеры, адаптивность 320–1920 px) |
| Lighthouse mobile | Performance **92**, Accessibility **100**, Best Practices **100**, SEO **100** |
| CLS | 0 |
| LCP / FCP / TBT | 3.3 s / 1.2 s / 50 ms |
| Сторонние запросы в проде | отсутствуют |
| TypeScript / ESLint | без ошибок |

Прогнать тесты против прода можно так:

```bash
BASE_URL=https://luminar-landing-replica.vercel.app npx playwright test
```

## Отличия от оригинала

Осознанные отклонения перечислены в [`DEVIATIONS.md`](DEVIATIONS.md).

## Права на материалы

Изображения, видео, иконки, тексты и шрифт Roobert принадлежат **Skylum**. Они скачаны с
`media.macphun.com` и хранятся локально **исключительно для демонстрации тестового задания**.
Проект не предназначен для публичного использования и не является коммерческим продуктом.
Трекеры и аналитика оригинала намеренно не переносились.
