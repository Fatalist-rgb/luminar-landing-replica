/**
 * Галерея «Edit a whole photoshoot in one click».
 * В оригинале это единый коллаж-изображение в трёх размерах; кнопка последовательно
 * применяет пресеты ко всей подборке разом.
 */
export type GalleryPreset = {
  id: string;
  label: string;
  /** Базовое имя файла: photoshoot__{id}-{lg|sm|xs}-min.png */
  base: string;
  /** Иконка-превью пресета в панели */
  thumb: string;
  /** Подпись-плашка с названием пресета */
  labelImage: string;
};

export const gallerySection = {
  title: 'Edit a whole photoshoot in one click',
  description:
    'Save time with batch editing and a rich selection of presets that keep every photo looking stunning.',
  cta: 'EDIT ALL PHOTOS AT ONCE',
  tryHint: 'Try it!',
  tryIcon: 'try-icon.png',
} as const;

/** Первый элемент — исходное состояние, дальше идут пресеты по кругу. */
export const galleryPresets: GalleryPreset[] = [
  { id: 'start', label: 'Original', base: 'photoshoot__start', thumb: 'photoshoot-control-1.jpg', labelImage: 'photoshoot-control-text-1.png' },
  { id: 'cinematic', label: 'Cinematic', base: 'photoshoot__cinematic', thumb: 'photoshoot-control-2.jpg', labelImage: 'photoshoot-control-text-2.png' },
  { id: 'natural', label: 'Natural', base: 'photoshoot__natural', thumb: 'photoshoot-control-3.jpg', labelImage: 'photoshoot-control-text-3.png' },
  { id: 'monochrome', label: 'Monochrome', base: 'photoshoot__monochrome', thumb: 'photoshoot-control-4.jpg', labelImage: 'photoshoot-control-text-4.png' },
  { id: 'faded', label: 'Faded', base: 'photoshoot__faded', thumb: 'photoshoot-control-5.jpg', labelImage: 'photoshoot-control-text-5.png' },
];
