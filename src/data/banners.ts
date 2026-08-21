/** Секция «Choose once, edit forever» */
export const devicesBanner = {
  titleLine1: 'Choose once, ',
  titleAccent: 'edit forever.',
  titleLine2: 'Unlock easy editing across all your devices',
  image: 'sum-26-devices.webp',
  imageAlt: 'Luminar на ноутбуке, планшете и смартфоне',
  caption: {
    desktopLabel: 'Luminar on Desktop',
    mobileLabel: ', tablet and mobile',
  },
  bullets: [
    { text: '24+ AI-based tools', icon: 'tools' },
    { text: '100+ precise features', icon: 'features' },
    { text: 'Works on desktop, mobile. Soon on web', icon: 'devices' },
    { text: 'Award-winning, intuitive interface', icon: 'award' },
    { text: '30 days money back guarantee', icon: 'shield' },
  ],
} as const;

/** Нижний CTA-баннер */
export const bottomBanner = {
  badge: '🔥 SALE UP TO 50% OFF',
  title: 'Stunning results, now with up to 50% OFF',
  description: 'Pick the plan that works for you and start editing on any device.',
  cta: 'VIEW PLANS',
  background: 'bglastcta.webp',
  image: 'devices-banner-bottom-main.webp',
  imageAlt: 'Luminar на планшете, ноутбуках и смартфонах',
  guarantees: [
    'No risks & no hidden fees',
    '24/7 chat support',
    '30-day money back guarantee',
    'One-time purchase',
  ],
} as const;

/** Прилипающий промо-бар */
export const stickyBar = {
  text: 'Get Luminar now with a discount, enjoy new features this fall',
  cta: 'VIEW PLANS',
  background: 'sticky-main-bg.png',
} as const;
