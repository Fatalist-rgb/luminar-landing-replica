import type { Metadata, Viewport } from 'next';
import { roobert } from '@/lib/fonts';
import { faqEntries } from '@/data/faq';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://skylum.com'),
  title: 'Photo Editing Software: Best Photo Editor Luminar Neo',
  description:
    'Download Luminar Neo - photo editing software for PC and Mac! Simple photo editor with AI that helps edit your photos as you imagine it in your eyes',
  alternates: { canonical: '/luminar' },
  openGraph: {
    title: 'Luminar - Easy Photo Editor | Software for Mac & PC',
    description:
      'Download Luminar Neo - photo editing software for PC and Mac! Simple photo editor with AI that helps edit your photos as you imagine it in your eyes',
    url: 'https://skylum.com/luminar',
    type: 'website',
    images: [{ url: '/assets/img/sum-26-main-video-poster-en.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luminar - Easy Photo Editor | Software for Mac & PC',
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

/** JSON-LD FAQPage — те же вопросы, что и в секции FAQ. */
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqEntries.map((entry) => ({
    '@type': 'Question',
    name: entry.q,
    acceptedAnswer: { '@type': 'Answer', text: entry.a },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roobert.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
    </html>
  );
}
