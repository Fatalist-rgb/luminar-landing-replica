export type ProTool = {
  title: string;
  description: string;
  /** Подпись кнопки применения: «Apply Upscale» и т. д. */
  applyLabel: string;
  before: string;
  after: string;
};

export const proToolsSection = {
  title: 'The ultimate photo quality toolkit',
  subtitle:
    'With Pro Tools, you can sharpen, denoise, upscale, and merge exposures or panoramas to reveal every detail exactly as you imagined it.',
  originalLabel: 'Original',
} as const;

export const proTools: ProTool[] = [
  {
    title: 'Upscale',
    description: 'Enlarge your photos while preserving every detail and texture.',
    applyLabel: 'Apply Upscale',
    before: 'main-possibilities-before-1-min.webp',
    after: 'main-possibilities-after-1-min.webp',
  },
  {
    title: 'Supersharp AI',
    description: 'Restore perfect sharpness and bring out crisp, defined edges.',
    applyLabel: 'Apply Supersharp AI',
    before: 'main-possibilities-before-2-min.webp',
    after: 'main-possibilities-after-2-min.webp',
  },
  {
    title: 'Noiseless AI',
    description: 'Effortlessly remove digital noise for clean, high-quality images.',
    applyLabel: 'Apply Noiseless AI',
    before: 'main-possibilities-before-3-min.webp',
    after: 'main-possibilities-after-3-min.webp',
  },
  {
    title: 'Focus Stacking',
    description: 'Combine multiple shots to achieve flawless focus throughout the frame.',
    applyLabel: 'Apply Focus Stacking',
    before: 'main-possibilities-before-4-min.webp',
    after: 'main-possibilities-after-4-min.webp',
  },
  {
    title: 'HDR Merge',
    description: 'Blend different exposures to reveal balanced light and vivid tones.',
    applyLabel: 'Apply HDR Merge',
    before: 'main-possibilities-before-5-min.webp',
    after: 'main-possibilities-after-5-min.webp',
  },
  {
    title: 'Panorama Stitching',
    description: 'Seamlessly merge photos into stunning wide-angle scenes.',
    applyLabel: 'Apply Panorama Stitching',
    before: 'main-possibilities-before-6-min.webp',
    after: 'main-possibilities-after-6-min.webp',
  },
];
