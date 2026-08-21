export type EditStep = {
  label: string;
  /** Верхний индекс в подписи: Sky^AI, Skin^AI, Face^AI */
  superscript?: string;
  /** Изображение результата; null для шага «Original» */
  after: string | null;
};

export type StepsSection = {
  title: string;
  description: string;
  before: string;
  steps: EditStep[];
  /** Сторона, на которой стоит медиа на десктопе */
  mediaSide: 'left' | 'right';
};

export const spectacular: StepsSection = {
  title: 'Just 4 steps to spectacular results',
  description:
    'Transform any photo from ordinary to breathtaking in just a few clicks. With intelligent AI tools guiding every step, you’ll enhance, refine, and perfect your image effortlessly.',
  before: 'spectacular-before-img-min.webp',
  mediaSide: 'left',
  steps: [
    { label: 'Original', after: null },
    { label: 'GenErase', after: 'spectacular-after-img-generase-min.webp' },
    { label: 'Sky', superscript: 'AI', after: 'spectacular-after-img-sky-min.webp' },
    { label: 'Color', after: 'spectacular-after-img-color-min.webp' },
    { label: 'Sunrays', after: 'spectacular-after-img-sunrays-min.webp' },
  ],
};

export const retouch: StepsSection = {
  title: 'Retouch portrait like a pro in four steps',
  description:
    'Bring out the best in every face. Enhance skin, refine light, and add depth with intuitive tools that do the hard work for you.',
  before: 'portrait0.webp',
  mediaSide: 'right',
  steps: [
    { label: 'Original', after: null },
    { label: 'Skin', superscript: 'AI', after: 'portrait1-skinai.webp' },
    { label: 'Face', superscript: 'AI', after: 'portrait2-faceai.webp' },
    { label: 'Mood', after: 'portrait3-mood.webp' },
    { label: 'Develop', after: 'portrait4-develop.webp' },
  ],
};

export const beforeAfterLabels = { before: 'BEFORE', after: 'AFTER' } as const;
