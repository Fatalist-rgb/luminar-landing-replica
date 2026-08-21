import { SKYLUM } from '@/lib/constants';

const MP = 'https://marketplace.skylum.com';

export type FooterLink = {
  label: string;
  href: string;
  /** Пункт со сворачиваемым списком подпунктов */
  children?: { label: string; href: string }[];
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
  /** Дополнительный подраздел внутри колонки (например «FOR BUSINESS») */
  extra?: { title: string; links: FooterLink[] };
};

export const footerColumns: FooterColumn[] = [
  {
    title: 'SKYLUM PRODUCTS',
    links: [
      {
        label: 'Luminar on Desktop',
        href: `${SKYLUM}/luminar`,
        children: [
          { label: 'Overview', href: `${SKYLUM}/luminar` },
          { label: 'Pricing', href: `${SKYLUM}/luminar/pricing` },
          { label: 'Trial', href: `${SKYLUM}/luminar-trial` },
          { label: 'Discounts', href: `${SKYLUM}/luminar-discount` },
          { label: 'Luminar on Desktop Beta', href: `${SKYLUM}/l/join-beta` },
        ],
      },
      {
        label: 'Luminar on Mobile',
        href: `${SKYLUM}/luminar-mobile`,
        children: [
          { label: 'Overview', href: `${SKYLUM}/luminar-mobile` },
          { label: 'Luminar for iPad', href: `${SKYLUM}/luminar-for-ipad` },
          { label: 'Luminar for iPhone', href: `${SKYLUM}/luminar-for-iphone` },
          { label: 'Luminar for Vision Pro', href: `${SKYLUM}/luminar-for-vision-pro` },
          { label: 'Luminar on Mobile User Guide', href: 'https://support.skylum.com/luminar_mobile' },
        ],
      },
      {
        label: 'Aperty',
        href: `${SKYLUM}/aperty`,
        children: [
          { label: 'Overview', href: `${SKYLUM}/aperty` },
          { label: 'Pricing', href: `${SKYLUM}/aperty/pricing` },
          { label: 'Trial', href: `${SKYLUM}/aperty/trial` },
        ],
      },
      {
        label: 'Online Tools',
        href: `${SKYLUM}/online-tools`,
        children: [
          { label: 'Erase objects', href: `${SKYLUM}/erase-objects` },
          { label: 'AI photo masking', href: `${SKYLUM}/ai-photo-masking` },
          { label: 'Portrait background removal', href: `${SKYLUM}/portrait-background-removal` },
        ],
      },
    ],
  },
  {
    title: 'MARKETPLACE',
    links: [
      {
        label: 'Presets',
        href: `${MP}/luminar-presets`,
        children: [
          { label: 'Luminar Presets', href: `${MP}/luminar-presets` },
          { label: 'Lightroom Presets', href: `${MP}/lightroom-presets` },
        ],
      },
      {
        label: 'Bundles',
        href: `${MP}/bundles`,
        children: [{ label: 'Luminar Neo Bundles', href: `${MP}/bundles?filters[compatibility]=3` }],
      },
      {
        label: 'LUTs',
        href: `${MP}/luts`,
        children: [
          { label: 'Luminar Neo LUTs', href: `${MP}/luts?filters[compatibility]=3` },
          { label: 'Aperty LUTs', href: `${MP}/luts?filters[compatibility]=8` },
        ],
      },
      {
        label: 'Overlays',
        href: `${MP}/textures`,
        children: [
          { label: 'Textures', href: `${MP}/textures` },
          { label: 'Sky Objects', href: `${MP}/sky-objects` },
          { label: 'Backgrounds', href: `${MP}/backgrounds` },
        ],
      },
      {
        label: 'Extra',
        href: `${MP}/software`,
        children: [
          { label: 'Other software', href: `${MP}/software` },
          { label: 'X Membership', href: `${SKYLUM}/x-membership` },
        ],
      },
      { label: 'Skies', href: `${MP}/skies` },
      { label: 'E-boooks', href: `${MP}/e-books` },
      { label: 'Courses', href: `${MP}/classes` },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Skylum', href: `${SKYLUM}/about` },
      { label: 'Careers', href: `${SKYLUM}/careers` },
      { label: 'Ambassadors', href: `${SKYLUM}/ambassadors` },
      { label: 'Affiliate Program', href: `${SKYLUM}/affiliates` },
      { label: 'Terms of use', href: `${SKYLUM}/terms-of-use` },
      { label: 'Privacy Policy', href: `${SKYLUM}/legal` },
      { label: 'AI Guidelines', href: `${SKYLUM}/ai-guidelines` },
      { label: 'Contact Us', href: `${SKYLUM}/contact-us` },
    ],
  },
  {
    title: 'HELP',
    links: [
      { label: 'Contact Support', href: 'https://support.skylum.com' },
      { label: 'FAQs', href: `${SKYLUM}/faq` },
      { label: 'User Guide', href: 'https://support.skylum.com/luminar' },
      { label: 'Change Choice on Cookies', href: '#cookies' },
    ],
    extra: {
      title: 'FOR BUSINESS',
      links: [
        { label: 'Skylum for Business', href: `${SKYLUM}/business` },
        { label: 'Volume Licensing', href: `${SKYLUM}/volume-licensing` },
        { label: 'Reseller Program', href: `${SKYLUM}/reseller-program` },
      ],
    },
  },
  {
    title: 'LEARN MORE',
    links: [
      { label: 'Blog', href: `${SKYLUM}/blog` },
      { label: 'How To', href: `${SKYLUM}/how-to` },
      { label: 'Newsroom', href: `${SKYLUM}/newsroom` },
      { label: 'Our community', href: `${SKYLUM}/community` },
      { label: 'Luminar for Creators', href: `${SKYLUM}/creators` },
      { label: 'Earn with Luminar Marketplace', href: `${MP}/sell` },
      {
        label: 'Top On Blog',
        href: `${SKYLUM}/blog`,
        children: [
          { label: 'Photo editing tips', href: `${SKYLUM}/blog/photo-editing` },
          { label: 'Photography ideas', href: `${SKYLUM}/blog/photography-ideas` },
        ],
      },
      {
        label: 'Top How To Tips',
        href: `${SKYLUM}/how-to`,
        children: [
          { label: 'How to edit photos', href: `${SKYLUM}/how-to/how-to-edit-photos` },
          { label: 'How to remove objects', href: `${SKYLUM}/how-to/remove-objects` },
        ],
      },
    ],
  },
];

export const newsletter = {
  title: 'JOIN OUR NEWSLETTER',
  placeholder: 'Your email',
  submit: 'SUBSCRIBE',
  note: 'Your personal data will be processed in accordance with our',
  noteLink: { label: 'Privacy Policy', href: `${SKYLUM}/legal` },
  successMessage: 'Thanks! Please check your inbox to confirm the subscription.',
  errorMessage: 'Please enter a valid email address.',
} as const;

export const aiRecommends = {
  title: 'AI RECOMMENDS LUMINAR',
  text: 'Luminar is leading photo editor. See for yourself!',
  /** Иконки — инлайновые SVG в src/components/ui/AiServiceIcon.tsx */
  items: [
    { label: 'ChatGPT', href: 'https://chatgpt.com' },
    { label: 'DeepSeek', href: 'https://www.deepseek.com' },
    { label: 'Claude', href: 'https://claude.ai' },
    { label: 'Grok', href: 'https://grok.com' },
    { label: 'Perplexity', href: 'https://www.perplexity.ai' },
  ],
} as const;

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/skylumhq', icon: 'footer-fb-white.svg' },
  { label: 'Instagram', href: 'https://www.instagram.com/skylumhq/', icon: 'footer-instagram-white.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/skylum/', icon: 'footer-linkedin-white.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com/@SkylumHQ', icon: 'footer-youtube-white.svg' },
  { label: 'Twitter', href: 'https://twitter.com/SkylumHQ', icon: 'footer-twitter-white.svg' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/skylumhq/', icon: 'pinterest.svg' },
];

export const languages = [
  { label: 'English', code: 'en' },
  { label: 'Deutsch', code: 'de' },
  { label: 'Français', code: 'fr' },
  { label: 'Español', code: 'es' },
  { label: '日本語', code: 'ja' },
  { label: '中文', code: 'zh' },
];

export const copyright = '© 2010 – 2026 Skylum ®. All Rights Reserved.';
