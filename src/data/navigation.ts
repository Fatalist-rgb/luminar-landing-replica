import { SKYLUM } from '@/lib/constants';

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem = NavLink & {
  active?: boolean;
  /** Пункты выпадающего меню; наличие делает пункт раскрывающимся. */
  children?: NavLink[];
  /** Мега-меню в несколько колонок. */
  columns?: { title?: string; links: NavLink[] }[];
};

/** Верхний ряд шапки — уровень продуктов Skylum. */
export const primaryNav: NavItem[] = [
  { label: 'Luminar on Desktop', href: `${SKYLUM}/luminar`, active: true },
  { label: 'Luminar on Mobile', href: `${SKYLUM}/luminar-mobile` },
  { label: 'Aperty', href: `${SKYLUM}/aperty` },
  { label: 'Marketplace', href: 'https://marketplace.skylum.com', external: true },
  { label: 'Blog', href: `${SKYLUM}/blog` },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Online Tools', href: `${SKYLUM}/online-tools` },
      { label: 'Skylum for Business', href: `${SKYLUM}/business` },
      { label: 'X Membership', href: `${SKYLUM}/x-membership` },
      { label: 'Affiliate Program', href: `${SKYLUM}/affiliates` },
      { label: 'Support', href: 'https://support.skylum.com', external: true },
      { label: 'About Skylum', href: `${SKYLUM}/about` },
    ],
  },
];

/** Нижний ряд шапки — разделы страницы Luminar. */
export const secondaryNav: NavItem[] = [
  { label: 'Overview', href: `${SKYLUM}/luminar` },
  {
    label: 'Features',
    href: '#',
    columns: [
      {
        links: [
          { label: 'Bokeh AI', href: `${SKYLUM}/luminar/bokeh-effect` },
          { label: 'Face AI', href: `${SKYLUM}/luminar/face-ai-editor` },
          { label: 'SkinAI', href: `${SKYLUM}/luminar/skin-ai` },
          { label: 'AI Assistant', href: `${SKYLUM}/luminar/ai-assistant` },
          { label: 'Crossdevice', href: `${SKYLUM}/luminar/crossdevice` },
          { label: 'Photo Restoration', href: `${SKYLUM}/luminar/photo-restoration` },
        ],
      },
      {
        links: [
          { label: 'Light Depth', href: `${SKYLUM}/luminar/light-depth` },
          { label: 'Color Transfer', href: `${SKYLUM}/luminar/color-transfer` },
          { label: 'EnhanceAI', href: `${SKYLUM}/luminar/enhance-ai` },
          { label: 'Erase', href: `${SKYLUM}/erase-objects` },
          { label: 'AI Masking', href: `${SKYLUM}/ai-photo-masking` },
          { label: 'Layers', href: `${SKYLUM}/luminar/ai-layer-mask` },
        ],
      },
      {
        links: [
          { label: 'Portrait Background', href: `${SKYLUM}/portrait-background-removal` },
          { label: 'SkyAI', href: `${SKYLUM}/luminar/sky-ai` },
          { label: 'StructureAI', href: `${SKYLUM}/luminar/structure-ai` },
          { label: 'Supercontrast', href: `${SKYLUM}/luminar/supercontrast` },
        ],
      },
    ],
  },
  { label: 'Pricing', href: `${SKYLUM}/luminar/pricing` },
  { label: "What's new", href: `${SKYLUM}/luminar/whats-new` },
];

export const loginLink: NavLink = { label: 'Log In', href: `${SKYLUM}/account/login` };
