/** Базовый адрес оригинала — внешние ссылки ведут на реальные страницы Skylum. */
export const SKYLUM = 'https://skylum.com';

/** Куда ведут все CTA «VIEW PLANS». */
export const PLANS_URL = `${SKYLUM}/luminar/pricing`;

/**
 * Дедлайн акции. В оригинале отсчёт задаётся сервером; здесь он вычисляется
 * от фиксированной точки, чтобы SSR и клиент не расходились в первом кадре.
 *
 * Значение = момент сборки + PROMO_WINDOW_DAYS, округлённое до целой секунды.
 */
export const PROMO_WINDOW_DAYS = 10;

/** Отсчёт стартует от даты сборки, поэтому демо всегда показывает живой таймер. */
export const PROMO_DEADLINE = new Date(
  Math.floor(Date.now() / 1000) * 1000 + PROMO_WINDOW_DAYS * 24 * 60 * 60 * 1000,
).toISOString();

export const ASSETS = {
  img: '/assets/img',
  video: '/assets/video',
  icons: '/assets/icons',
  posters: '/assets/img/posters',
} as const;

/** Брейкпоинты — держим синхронно с @theme в globals.css. */
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;
