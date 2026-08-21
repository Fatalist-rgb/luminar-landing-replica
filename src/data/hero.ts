export const hero = {
  badge: '🔥 Sale up to 50% off',
  title: 'Get gorgeous photos in Luminar. Save up to 50% now, enjoy new features this fall',
  benefits: ['One-time purchase', '30 days money back guarantee'],
  cta: 'VIEW PLANS',
  background: 'bgmainscreen-upd.webp',
  video: 'sum-26-main-video-en.mp4',
  poster: 'sum-26-main-video-poster-en.jpg',
  /** Декоративные «плитки» с процентами по краям первого экрана */
  decor: {
    left: 'best-sales-glow.svg',
    right: 'best-sales-glow.svg',
  },
} as const;

/**
 * Строка платформ под медиа. Иконки платформ — инлайновые SVG
 * (src/components/ui/PlatformIcons.tsx), как в оригинале.
 */
export const platformsLine = {
  desktopLabel: 'Luminar on Desktop',
  mobileLabel: ', tablet and mobile',
  tail: '. Soon on Web.',
} as const;
