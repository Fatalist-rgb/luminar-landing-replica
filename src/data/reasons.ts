export type ReasonCard = {
  title: string;
  description: string;
  /** Постер / статичное изображение в public/assets/img */
  image: string;
  /** Видео-петля в public/assets/video (если есть) */
  video?: string;
  /** Верхний ряд — две карточки в половину ширины, нижний — три в треть */
  span: 'half' | 'third';
};

export const reasonsTitle = ['5 reasons why Luminar', 'is the best photo editor for you'];

export const reasonCards: ReasonCard[] = [
  {
    title: 'Lifetime access to the app',
    description:
      'Choose the plan you want, enjoy Luminar forever. Plus, get generative features and Library of Assets for 1 year.',
    image: 'lifetimeaccess.webp',
    span: 'half',
  },
  {
    title: 'AI-Powered',
    description: 'Advanced AI features automatically enhance your photos and save you time.',
    image: 'main-discover-poster-1-min.jpg',
    video: 'main-discover-video-1.mp4',
    span: 'half',
  },
  {
    title: 'Easy to use',
    description: 'An intuitive interface and smart tools make editing simple for everyone.',
    image: 'main-discover-poster-2-min.jpg',
    video: 'main-discover-video-2.mp4',
    span: 'third',
  },
  {
    title: 'Edit on multiple devices',
    description:
      'Start editing on your phone, continue on desktop – your work stays synced. Soon available on web, too.',
    image: 'multiple.webp',
    span: 'third',
  },
  {
    title: 'Use as a plugin',
    description: 'Integrate seamlessly with Lightroom classic and Photoshop for smooth, flexible editing.',
    image: 'main-discover-poster-3-min.jpg',
    video: 'main-discover-video-3.mp4',
    span: 'third',
  },
];
