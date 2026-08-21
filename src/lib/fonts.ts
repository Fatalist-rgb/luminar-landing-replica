import localFont from 'next/font/local';

/**
 * Roobert — фирменный шрифт Skylum. Файлы взяты с CDN оригинала и хранятся
 * локально исключительно для демонстрации тестового задания (см. README).
 */
export const roobert = localFont({
  src: [
    { path: '../../public/assets/fonts/Roobert-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/assets/fonts/Roobert-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/assets/fonts/Roobert-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-roobert',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  preload: true,
});
