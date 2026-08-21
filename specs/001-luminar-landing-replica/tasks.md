# Tasks: Luminar Landing Replica

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Формат: `[ ]` не начата · `[~]` в работе · `[x]` готова. `[P]` — можно выполнять параллельно.

## Phase 0 — Подготовка

- [ ] **T001** Скаффолд Next.js 15 (App Router, TS strict, Tailwind 4, ESLint), очистка стартового шаблона
- [ ] **T002** `scripts/download-assets.mjs` — выкачать 161 ассет из `research/data/media.json` в `public/assets/{img,video,icons,fonts}`
- [ ] **T003** Подключить Roobert (Regular/SemiBold/Bold) через `next/font/local`
- [ ] **T004** Дизайн-токены и базовые стили в `globals.css` (палитра, типографика, контейнер, радиусы)
- [ ] **T005** `layout.tsx`: `lang="en"`, метаданные, Open Graph, `theme-color`, favicon
- [ ] **T006** `lib/constants.ts` — дедлайн акции, внешние ссылки, брейкпоинты

## Phase 1 — Контент и каркас (US1)

- [ ] **T007** [P] `data/navigation.ts` — два ряда шапки, мега-меню, мобильное меню
- [ ] **T008** [P] `data/hero.ts`, `data/banners.ts` — hero, промо-бар, оба CTA-баннера
- [ ] **T009** [P] `data/features.ts` — группы TOP FEATURES / ESSENTIALS / LANDSCAPE и 41 возможность с медиа
- [ ] **T010** [P] `data/protools.ts` — 6 слайдов Pro Tools (заголовок, описание, before/after, подпись кнопки)
- [ ] **T011** [P] `data/steps.ts` — шаги Spectacular и Retouch с изображениями
- [ ] **T012** [P] `data/reasons.ts`, `data/capabilities.ts` — 5 карточек и 10 иконок возможностей
- [ ] **T013** [P] `data/gallery.ts` — 9 фото галереи в двух состояниях
- [ ] **T014** [P] `data/faq.ts` — 10 вопросов и ответов (источник и для JSON-LD)
- [ ] **T015** [P] `data/requirements.ts` — таблицы macOS и Windows
- [ ] **T016** [P] `data/footer.ts` — 6 колонок, соцсети, языки, копирайт
- [ ] **T017** `ui/Countdown.tsx` + `hooks/useCountdown.ts` — единый источник отсчёта (FR-010)
- [ ] **T018** `ui/CtaButton.tsx` — кнопка «VIEW PLANS» с таймером под ней
- [ ] **T019** `layout/Header.tsx` — два ряда, активный раздел, мега-меню по hover/focus (FR-006…009)
- [ ] **T020** `layout/StickyPromoBar.tsx` — появление после первого экрана (FR-011)
- [ ] **T021** `layout/Footer.tsx` — колонки, форма подписки, соцсети, переключатель языка (FR-021…023)
- [ ] **T022** `sections/Hero.tsx` — бейдж, H1, преимущества, CTA, медиа, строка платформ
- [ ] **T023** [P] `sections/DevicesBanner.tsx` — «Choose once, edit forever» + 5 буллетов
- [ ] **T024** [P] `sections/Reasons.tsx` — bento-сетка 2+3 с видео и фото
- [ ] **T025** [P] `sections/Capabilities.tsx` — сетка 5×2 иконок
- [ ] **T026** [P] `sections/BottomBanner.tsx` — финальный CTA с гарантиями
- [ ] **T027** `app/page.tsx` — сборка всех секций в порядке оригинала

## Phase 2 — Интерактив (US3, US4, US5)

- [ ] **T028** `sections/DiscoverFeatures.tsx` — сворачиваемые группы, выбор пункта, смена превью (FR-013)
- [ ] **T029** Ленивая загрузка превью-медиа секции возможностей (только активное + постеры)
- [ ] **T030** `sections/ProToolsCarousel.tsx` — scroll-snap, стрелки, свайп, клавиши, зацикливание (FR-014)
- [ ] **T031** Переключатель «Original / Apply …» на слайдах карусели (FR-015)
- [ ] **T032** `ui/BeforeAfter.tsx` — перетаскивание мышью, касанием, стрелками (FR-016)
- [ ] **T033** `ui/StepSlider.tsx` — 5 шагов, подсветка пройденных (FR-017)
- [ ] **T034** [P] `sections/StepsSpectacular.tsx` — изображение слева, управление справа
- [ ] **T035** [P] `sections/StepsRetouch.tsx` — зеркальная раскладка
- [ ] **T036** `sections/PhotoshootGallery.tsx` — одновременное применение пресета ко всем фото (FR-018)
- [ ] **T037** `ui/Accordion.tsx` + `sections/Faq.tsx` — первый вопрос раскрыт, плавная анимация (FR-019)
- [ ] **T038** JSON-LD `FAQPage` в `layout.tsx` из `data/faq.ts` (FR-005)
- [ ] **T039** `sections/Requirements.tsx` — SHOW MORE / SHOW LESS, таблицы двух платформ (FR-020)

## Phase 3 — Адаптивность (US2)

- [ ] **T040** `layout/MobileMenu.tsx` — оверлей, блокировка скролла, закрытие по Esc (FR-008)
- [ ] **T041** Мобильные раскладки Hero, DevicesBanner, Reasons, Capabilities
- [ ] **T042** Мобильные раскладки DiscoverFeatures, ProToolsCarousel, Steps*, PhotoshootGallery
- [ ] **T043** Мобильные раскладки FAQ, Requirements, Footer, промо-баннеров
- [ ] **T044** Прогон 320/390/768/1024/1440/1920 — устранение горизонтального скролла (FR-024, SC-003)

## Phase 4 — Качество

- [ ] **T045** Доступность: иерархия заголовков, `alt`, `aria-expanded`/`aria-controls`, focus-ring (FR-025, FR-026)
- [ ] **T046** `prefers-reduced-motion`: отключение анимаций и автопрокрутки (FR-027)
- [ ] **T047** Производительность: размеры медиа, `priority` для hero, ленивая загрузка ниже сгиба (FR-030, CLS ≤ 0.05)
- [ ] **T048** `tests/visual.spec.ts` — посекционные снимки копии на 1440 и 390
- [ ] **T049** Визуальное сравнение с `research/screens/`, устранение расхождений
- [ ] **T050** `tests/interactions.spec.ts` — smoke-прогон всех интерактивов FR-006…FR-020
- [ ] **T051** `npm run build`, `tsc --noEmit`, `npm run lint` — без ошибок
- [ ] **T052** Lighthouse mobile: Perf ≥ 85, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 (SC-005)
- [ ] **T053** Проверка отсутствия запросов к сторонним доменам в проде (SC-007)

## Phase 5 — Публикация

- [ ] **T054** Деплой на Vercel, проверка прод-сборки, консоль без ошибок
- [ ] **T055** `README.md` — стек, запуск, структура, оговорка о правах на ассеты
- [ ] **T056** `DEVIATIONS.md` — осознанные отличия от оригинала с причинами
- [ ] **T057** Финальная приёмка по чек-листу Quality Gates конституции

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
