# Tasks: Luminar Landing Replica

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Формат: `[ ]` не начата · `[~]` в работе · `[x]` готова. `[P]` — можно выполнять параллельно.

## Phase 0 — Подготовка

- [x] **T001** Скаффолд Next.js 15 (App Router, TS strict, Tailwind 4, ESLint), очистка стартового шаблона
- [x] **T002** `scripts/download-assets.mjs` — выкачать 161 ассет из `research/data/media.json` в `public/assets/{img,video,icons,fonts}`
- [x] **T003** Подключить Roobert (Regular/SemiBold/Bold) через `next/font/local`
- [x] **T004** Дизайн-токены и базовые стили в `globals.css` (палитра, типографика, контейнер, радиусы)
- [x] **T005** `layout.tsx`: `lang="en"`, метаданные, Open Graph, `theme-color`, favicon
- [x] **T006** `lib/constants.ts` — дедлайн акции, внешние ссылки, брейкпоинты

## Phase 1 — Контент и каркас (US1)

- [x] **T007** [P] `data/navigation.ts` — два ряда шапки, мега-меню, мобильное меню
- [x] **T008** [P] `data/hero.ts`, `data/banners.ts` — hero, промо-бар, оба CTA-баннера
- [x] **T009** [P] `data/features.ts` — группы TOP FEATURES / ESSENTIALS / LANDSCAPE и 41 возможность с медиа
- [x] **T010** [P] `data/protools.ts` — 6 слайдов Pro Tools (заголовок, описание, before/after, подпись кнопки)
- [x] **T011** [P] `data/steps.ts` — шаги Spectacular и Retouch с изображениями
- [x] **T012** [P] `data/reasons.ts`, `data/capabilities.ts` — 5 карточек и 10 иконок возможностей
- [x] **T013** [P] `data/gallery.ts` — 9 фото галереи в двух состояниях
- [x] **T014** [P] `data/faq.ts` — 10 вопросов и ответов (источник и для JSON-LD)
- [x] **T015** [P] `data/requirements.ts` — таблицы macOS и Windows
- [x] **T016** [P] `data/footer.ts` — 6 колонок, соцсети, языки, копирайт
- [x] **T017** `ui/Countdown.tsx` + `hooks/useCountdown.ts` — единый источник отсчёта (FR-010)
- [x] **T018** `ui/CtaButton.tsx` — кнопка «VIEW PLANS» с таймером под ней
- [x] **T019** `layout/Header.tsx` — два ряда, активный раздел, мега-меню по hover/focus (FR-006…009)
- [x] **T020** `layout/StickyPromoBar.tsx` — появление после первого экрана (FR-011)
- [x] **T021** `layout/Footer.tsx` — колонки, форма подписки, соцсети, переключатель языка (FR-021…023)
- [x] **T022** `sections/Hero.tsx` — бейдж, H1, преимущества, CTA, медиа, строка платформ
- [x] **T023** [P] `sections/DevicesBanner.tsx` — «Choose once, edit forever» + 5 буллетов
- [x] **T024** [P] `sections/Reasons.tsx` — bento-сетка 2+3 с видео и фото
- [x] **T025** [P] `sections/Capabilities.tsx` — сетка 5×2 иконок
- [x] **T026** [P] `sections/BottomBanner.tsx` — финальный CTA с гарантиями
- [x] **T027** `app/page.tsx` — сборка всех секций в порядке оригинала

## Phase 2 — Интерактив (US3, US4, US5)

- [x] **T028** `sections/DiscoverFeatures.tsx` — сворачиваемые группы, выбор пункта, смена превью (FR-013)
- [x] **T029** Ленивая загрузка превью-медиа секции возможностей (только активное + постеры)
- [x] **T030** `sections/ProToolsCarousel.tsx` — scroll-snap, стрелки, свайп, клавиши, зацикливание (FR-014)
- [x] **T031** Переключатель «Original / Apply …» на слайдах карусели (FR-015)
- [x] **T032** `ui/BeforeAfter.tsx` — перетаскивание мышью, касанием, стрелками (FR-016)
- [x] **T033** `ui/StepSlider.tsx` — 5 шагов, подсветка пройденных (FR-017)
- [x] **T034** [P] `sections/StepsSpectacular.tsx` — изображение слева, управление справа
- [x] **T035** [P] `sections/StepsRetouch.tsx` — зеркальная раскладка
- [x] **T036** `sections/PhotoshootGallery.tsx` — одновременное применение пресета ко всем фото (FR-018)
- [x] **T037** `ui/Accordion.tsx` + `sections/Faq.tsx` — первый вопрос раскрыт, плавная анимация (FR-019)
- [x] **T038** JSON-LD `FAQPage` в `layout.tsx` из `data/faq.ts` (FR-005)
- [x] **T039** `sections/Requirements.tsx` — SHOW MORE / SHOW LESS, таблицы двух платформ (FR-020)

## Phase 3 — Адаптивность (US2)

- [x] **T040** `layout/MobileMenu.tsx` — оверлей, блокировка скролла, закрытие по Esc (FR-008)
- [x] **T041** Мобильные раскладки Hero, DevicesBanner, Reasons, Capabilities
- [x] **T042** Мобильные раскладки DiscoverFeatures, ProToolsCarousel, Steps*, PhotoshootGallery
- [x] **T043** Мобильные раскладки FAQ, Requirements, Footer, промо-баннеров
- [x] **T044** Прогон 320/390/768/1024/1440/1920 — устранение горизонтального скролла (FR-024, SC-003)

## Phase 4 — Качество

- [x] **T045** Доступность: иерархия заголовков, `alt`, `aria-expanded`/`aria-controls`, focus-ring (FR-025, FR-026)
- [x] **T046** `prefers-reduced-motion`: отключение анимаций и автопрокрутки (FR-027)
- [x] **T047** Производительность: размеры медиа, `priority` для hero, ленивая загрузка ниже сгиба (FR-030, CLS ≤ 0.05)
- [x] **T048** `tests/visual.spec.ts` — посекционные снимки копии на 1440 и 390
- [x] **T049** Визуальное сравнение с `research/screens/`, устранение расхождений
- [x] **T050** `tests/interactions.spec.ts` — smoke-прогон всех интерактивов FR-006…FR-020
- [x] **T051** `npm run build`, `tsc --noEmit`, `npm run lint` — без ошибок
- [x] **T052** Lighthouse mobile: Perf ≥ 85, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 (SC-005)
- [x] **T053** Проверка отсутствия запросов к сторонним доменам в проде (SC-007)

## Phase 5 — Публикация

- [x] **T054** Деплой на Vercel: https://luminar-landing-replica.vercel.app — прод-сборка проверена, консоль без ошибок
- [x] **T055** `README.md` — стек, запуск, структура, оговорка о правах на ассеты
- [x] **T056** `DEVIATIONS.md` — осознанные отличия от оригинала с причинами
- [x] **T057** Финальная приёмка по чек-листу Quality Gates конституции

## Порядок и зависимости

```
T001 → T002 → T003,T004,T005,T006
T007…T016 (параллельно, после T001)
T017 → T018 → T019,T020,T022…T026 → T027
T027 → T028…T039 (интерактив)
Phase 2 → Phase 3 → Phase 4 → Phase 5
```

**MVP** (минимально демонстрируемый результат): T001–T027 — полная десктопная копия со статикой,
рабочими таймерами и шапкой.


## Статус выполнения

Все 57 задач закрыты. Сводка проверок (T051–T053, T057):

| Гейт конституции | Результат |
| --- | --- |
| `npm run build` | без ошибок |
| `tsc --noEmit`, `npm run lint` | чисто |
| Посекционная сверка с `research/screens/` | расхождение по документу ~2 % |
| Ручной прогон интерактивов (desktop + mobile) | 47 автотестов Playwright пройдено |
| Ширины 320–1920 px | без горизонтального скролла |
| Lighthouse mobile (прод) | Performance 92, Accessibility 100, Best Practices 100, SEO 100 |
| Прод-деплой | https://luminar-landing-replica.vercel.app — 47 тестов пройдено против прода |
