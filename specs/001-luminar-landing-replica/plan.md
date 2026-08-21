# Implementation Plan: Luminar Landing Replica

**Branch**: `001-luminar-landing-replica` | **Date**: 2026-08-21 | **Spec**: [spec.md](./spec.md)

## Summary

Одностраничный лендинг-копия `skylum.com/luminar` на Next.js 15 (App Router) + TypeScript + Tailwind CSS 4.
Страница рендерится как Server Component из типизированных модулей данных; интерактив вынесен
в изолированные клиентские компоненты. Все медиа скачиваются локально в `public/assets/`.
Публикация — Vercel.

## Technical Context

| Параметр | Решение |
| --- | --- |
| Язык / рантайм | TypeScript 5 (strict), Node 20+ |
| Фреймворк | Next.js 15, App Router, React 19 |
| Стилизация | Tailwind CSS 4, дизайн-токены в `globals.css` через `@theme` |
| Изображения | `next/image`, локальные файлы, WebP/AVIF |
| Анимации | CSS transitions + `IntersectionObserver`; без GSAP/Framer Motion |
| Карусель | собственная реализация на CSS scroll-snap + управляющие кнопки (без Swiper/Slick) |
| Шрифт | Roobert (Regular / SemiBold / Bold, woff2), локально, `next/font/local` |
| Тестирование | Playwright: посекционный визуальный дифф + smoke-прогон интерактивов |
| Деплой | Vercel (production) |
| Зависимости | только `next`, `react`, `react-dom`; dev: `typescript`, `tailwindcss`, `eslint`, `playwright` |

**Обоснование отказа от библиотек оригинала**: jQuery, Swiper и Slick тянут ~150 KB JS ради
поведения, которое в React воспроизводится десятками строк на scroll-snap и state. Конституция
(принцип V) требует обоснования каждой runtime-зависимости — «есть в оригинале» им не является.

## Constitution Check

| Принцип | Как соблюдается |
| --- | --- |
| I. Fidelity First | Замеры сняты с оригинала на 1440 px; сверка по `research/screens/`; отклонения — в `DEVIATIONS.md` |
| II. Responsive by Construction | Mobile-first вёрстка, брейкпоинты 390/768/1024/1440/1920, проверка от 320 px |
| III. Interaction Parity | 8 клиентских компонентов покрывают весь интерактив оригинала |
| IV. Accessible & Performant | SSR-разметка, семантика, `aria-*`, focus-ring, `prefers-reduced-motion`, Lighthouse-гейт |
| V. Clean Architecture | Секция = компонент, контент = `src/data/*.ts`, `"use client"` точечно |
| VI. Self-Contained Assets | Скрипт скачивания ассетов, ноль сторонних CDN в проде |

Нарушений нет.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # <html lang="en">, шрифты, метаданные, JSON-LD
│   ├── page.tsx                # сборка 14 секций (Server Component)
│   └── globals.css             # токены дизайна, базовые стили, утилиты
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # двухрядная шапка, мега-меню (client)
│   │   ├── MobileMenu.tsx      # бургер-оверлей (client)
│   │   ├── StickyPromoBar.tsx  # промо-бар по скроллу (client)
│   │   └── Footer.tsx          # 6 колонок, соцсети, язык
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── DiscoverFeatures.tsx    # список фич + превью (client)
│   │   ├── DevicesBanner.tsx
│   │   ├── Reasons.tsx             # bento 2+3
│   │   ├── Capabilities.tsx        # сетка 10 иконок
│   │   ├── ProToolsCarousel.tsx    # карусель Pro Tools (client)
│   │   ├── StepsSpectacular.tsx    # before/after + шаги (client)
│   │   ├── StepsRetouch.tsx        # зеркальная раскладка (client)
│   │   ├── PhotoshootGallery.tsx   # галерея + batch-эффект (client)
│   │   ├── BottomBanner.tsx
│   │   ├── Faq.tsx                 # аккордеон (client)
│   │   └── Requirements.tsx        # SHOW MORE (client)
│   └── ui/
│       ├── Countdown.tsx       # таймер из общего дедлайна (client)
│       ├── CtaButton.tsx       # кнопка + таймер под ней
│       ├── BeforeAfter.tsx     # перетаскиваемый разделитель (client)
│       ├── StepSlider.tsx      # пошаговый ползунок (client)
│       ├── Accordion.tsx
│       └── SectionHeading.tsx
├── data/                       # весь контент: nav, hero, features, protools,
│                               # steps, gallery, faq, requirements, footer
├── hooks/                      # useCountdown, useMediaQuery, useScrollPast,
│                               # useReducedMotion, useLockBodyScroll
└── lib/                        # константы (дедлайн акции, ссылки), утилиты

public/assets/{img,video,icons,fonts}/
scripts/download-assets.mjs     # выкачивание ассетов оригинала
tests/visual.spec.ts            # посекционный дифф + smoke интерактивов
research/                       # эталон: скриншоты и извлечённые данные
```

## Design Tokens (замеры оригинала, 1440 px)

```
--color-bg            #000000
--color-surface       #0E0E0E / #141414  (карточки)
--color-text          #FFFFFF
--color-text-muted    rgba(255,255,255,.7)
--color-accent        #FFB000 → #FFC93C  (градиент кнопки)
--color-accent-text   #000000
--font-sans           Roobert, Helvetica, Arial, sans-serif

body      16px / 24px / 400
h1        50px / 62.5px / 600      (mobile 32px / 40px)
h2        42px / 52.5px / 600      (mobile 28px / 36px)
section    внутренние отступы 80–120px по вертикали
container  max-width 1280px, боковые поля 16px (mobile) / 40px (desktop)
radius     карточки 16px, кнопки 8px, пилюли 999px
```

## Phase 0 — Подготовка

1. Скаффолд Next.js 15 + TypeScript + Tailwind 4, строгий `tsconfig`, ESLint.
2. `scripts/download-assets.mjs`: скачивание 161 ассета из `research/data/media.json`
   в `public/assets/**` с сохранением имён; отчёт по неудачным загрузкам.
3. Подключение Roobert через `next/font/local`, дизайн-токены в `globals.css`.
4. Каркас `layout.tsx` с метаданными и JSON-LD.

## Phase 1 — Каркас и контент (US1, десктоп)

5. Модули `src/data/*.ts` из `research/data/structured.json`.
6. `Header` + мега-меню, `Footer`.
7. Статические секции: `Hero`, `DevicesBanner`, `Reasons`, `Capabilities`, `BottomBanner`.
8. `Countdown` + `CtaButton`, единый дедлайн в `lib/constants.ts`.
9. `StickyPromoBar` с появлением по скроллу.

## Phase 2 — Интерактив (US3, US4, US5)

10. `DiscoverFeatures`: группы-аккордеоны, выбор пункта, смена превью, ленивое видео.
11. `ProToolsCarousel`: scroll-snap, стрелки, свайп, зацикливание, переключатель Original/Apply.
12. `BeforeAfter` + `StepSlider` → `StepsSpectacular`, `StepsRetouch`.
13. `PhotoshootGallery` с одновременным применением пресета.
14. `Faq` (первый раскрыт, JSON-LD) и `Requirements` (SHOW MORE).

## Phase 3 — Адаптив (US2)

15. Мобильные раскладки всех секций по `research/screens/mobile/`.
16. `MobileMenu`: оверлей, блокировка скролла, закрытие по Esc.
17. Прогон 320/390/768/1024/1440/1920, устранение переполнений.

## Phase 4 — Качество и публикация

18. Доступность: семантика, `aria-*`, фокус, `prefers-reduced-motion`.
19. Производительность: размеры медиа, приоритет hero-изображения, ленивая загрузка ниже сгиба.
20. Playwright: посекционные снимки копии, сравнение с эталоном, smoke-прогон интерактивов.
21. `npm run build`, `tsc --noEmit`, `lint`, Lighthouse.
22. Деплой на Vercel, проверка прод-сборки, `README.md` + `DEVIATIONS.md`.

## Риски

| Риск | Смягчение |
| --- | --- |
| Roobert — коммерческий шрифт | Локальная копия только для демонстрации + оговорка в README; запасной вариант — близкий по метрикам гротеск |
| Часть ассетов отдаётся только с реферером/подписью | Скрипт логирует неудачи; недостающее заменяется ближайшим доступным вариантом с записью в `DEVIATIONS.md` |
| Вес видео влияет на Lighthouse | Постеры, `preload="none"`, загрузка только активного превью, отключение видео на мобильных |
| Расхождение шрифтового рендеринга | Сверка по скриншотам, подгонка `letter-spacing`/`line-height` вручную |
| Точная копия мега-меню трудоёмка | Приоритет P1-секциям; мега-меню реализуется в объёме видимой структуры оригинала |
