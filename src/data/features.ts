// Сгенерировано scripts/gen-features.mjs из research/data/features-map.json
// Источник: секция «Discover Luminar on Desktop possibilities» оригинала.

export type FeatureItem = {
  title: string;
  /** SVG-иконка в public/assets/icons */
  icon: string | null;
  /** Постер-кадр в public/assets/img */
  poster: string | null;
  /** Видео-превью в public/assets/video */
  video: string | null;
};

export type FeatureGroup = {
  group: string;
  /** Группа раскрыта по умолчанию */
  open: boolean;
  items: FeatureItem[];
};

export const featureGroups: FeatureGroup[] = [
  {
    "group": "Top features",
    "open": true,
    "items": [
      {
        "title": "Enhance in seconds",
        "icon": "sparkles.svg",
        "poster": "Enhanceinseconds-min.webp",
        "video": "enhance-new.mp4"
      },
      {
        "title": "Refine every pixel",
        "icon": "brightness.svg",
        "poster": "Refineeverypixel-min.webp",
        "video": "develop-new.mp4"
      },
      {
        "title": "Smooth skin naturally",
        "icon": "Smooth.svg",
        "poster": "skin-poster-new.webp",
        "video": "skin-new-2.mp4"
      },
      {
        "title": "Revive old photos",
        "icon": "restoration.svg",
        "poster": "Reviveoldphotos-min.webp",
        "video": "restoration-new.mp4"
      },
      {
        "title": "Fix composition",
        "icon": "crop.svg",
        "poster": "Fixcomposition-min.webp",
        "video": "composition-new.mp4"
      },
      {
        "title": "Sharpen every detail",
        "icon": "histogram.svg",
        "poster": "Sharpeneverydetail-min.webp",
        "video": "Supersharp-new.mp4"
      },
      {
        "title": "Denoise with precision",
        "icon": "pattern.svg",
        "poster": "Denoisewithprecision-min.webp",
        "video": "noiseless-new.mp4"
      },
      {
        "title": "Remove distractions",
        "icon": "erase.svg",
        "poster": "Removedistractions-min.webp",
        "video": "gen-erase-new.mp4"
      },
      {
        "title": "Add dimensional lighting",
        "icon": "light-depth.svg",
        "poster": "Adddimensionallighting-min.webp",
        "video": "light-depth-new.mp4"
      },
      {
        "title": "Instantly replace skies",
        "icon": "cloud.svg",
        "poster": "Instantlyreplaceskies-min.webp",
        "video": "sky-new.mp4"
      },
      {
        "title": "Edit across devices",
        "icon": "crossdevice.svg",
        "poster": "zaglushkaCrossDevice.webp",
        "video": "2ndblockcrossdevice.mp4"
      },
      {
        "title": "Share edits in web galleries",
        "icon": "spaces.svg",
        "poster": "zaglushkaSpaces.webp",
        "video": "2ndblockSpaces.mp4"
      }
    ]
  },
  {
    "group": "Essentials",
    "open": false,
    "items": [
      {
        "title": "Enhance in seconds",
        "icon": "sparkles.svg",
        "poster": "Enhanceinseconds-min.webp",
        "video": "enhance-new.mp4"
      },
      {
        "title": "Reveal hidden details",
        "icon": "cluster.svg",
        "poster": "Revealhiddendetails-min.webp",
        "video": "structure-new.mp4"
      },
      {
        "title": "Boost contast",
        "icon": "contrast.svg",
        "poster": "Boostcontast-min.webp",
        "video": "supercontrast-new.mp4"
      },
      {
        "title": "Fix composition",
        "icon": "crop.svg",
        "poster": "Fixcomposition-min.webp",
        "video": "composition-new.mp4"
      },
      {
        "title": "Refine every pixel",
        "icon": "brightness.svg",
        "poster": "Refineeverypixel-min.webp",
        "video": "develop-new.mp4"
      },
      {
        "title": "Improve colors",
        "icon": "color-balance.svg",
        "poster": "Improvecolors-min.webp",
        "video": "color-new.mp4"
      },
      {
        "title": "Sculpt light and shadow",
        "icon": "flame.svg",
        "poster": "Frame2018776740-min.webp",
        "video": "dodge-burn-new.mp4"
      }
    ]
  },
  {
    "group": "Landscape",
    "open": false,
    "items": [
      {
        "title": "Instantly replace skies",
        "icon": "cloud.svg",
        "poster": "Instantlyreplaceskies-min.webp",
        "video": "sky-new.mp4"
      },
      {
        "title": "Recreate the golden hour",
        "icon": "image.svg",
        "poster": "Recreatethegoldenhour-min.webp",
        "video": "golden-hour-new.mp4"
      },
      {
        "title": "Add realistic fog",
        "icon": "wave.svg",
        "poster": "Addrealisticfog-min.webp",
        "video": "atmosphere-new.mp4"
      },
      {
        "title": "Remove haze",
        "icon": "image.svg",
        "poster": "Removehaze-min.webp",
        "video": "dehaze-new.mp4"
      },
      {
        "title": "Brighten with rays of light",
        "icon": "sun.svg",
        "poster": "Brightenwithraysoflight-min.webp",
        "video": "sunrays-new.mp4"
      },
      {
        "title": "Deepen evening tones",
        "icon": "sunset.svg",
        "poster": "Deepeneveningtones-min.webp",
        "video": "twilight-enhancer-new.mp4"
      },
      {
        "title": "Perfect water textures",
        "icon": "drip.svg",
        "poster": "Perfectwatertextures-min.webp",
        "video": "water-enhancer-new.mp4"
      }
    ]
  },
  {
    "group": "Generative AI",
    "open": false,
    "items": [
      {
        "title": "Remove distractions",
        "icon": "erase.svg",
        "poster": "Removedistractions-min.webp",
        "video": "gen-erase-new.mp4"
      },
      {
        "title": "Expand your scene",
        "icon": "expand.svg",
        "poster": "Expandyourscene-min.webp",
        "video": "gen-expand-new.mp4"
      },
      {
        "title": "Replace objects seamlessly",
        "icon": "swap.svg",
        "poster": "Replaceobjectsseamlessly-min.webp",
        "video": "gen-swap-new.mp4"
      }
    ]
  },
  {
    "group": "Image Quality",
    "open": false,
    "items": [
      {
        "title": "Revive old photos",
        "icon": "restoration.svg",
        "poster": "Reviveoldphotos-min.webp",
        "video": "restoration-new.mp4"
      },
      {
        "title": "Sharpen every detail",
        "icon": "histogram.svg",
        "poster": "Sharpeneverydetail-min.webp",
        "video": "Supersharp-new.mp4"
      },
      {
        "title": "Denoise with precision",
        "icon": "pattern.svg",
        "poster": "Denoisewithprecision-min.webp",
        "video": "noiseless-new.mp4"
      },
      {
        "title": "Upscale without loss",
        "icon": "resize.svg",
        "poster": "Upscalewithoutloss-min.webp",
        "video": "upscale-new.mp4"
      }
    ]
  },
  {
    "group": "Creative",
    "open": false,
    "items": [
      {
        "title": "Add dimensional lighting",
        "icon": "light-depth.svg",
        "poster": "Adddimensionallighting-min.webp",
        "video": "light-depth-new.mp4"
      },
      {
        "title": "Add luminous depth",
        "icon": "sparkles-2.svg",
        "poster": "Addluminousdepth-min.webp",
        "video": "magic-light-new.mp4"
      },
      {
        "title": "Color grade with ease",
        "icon": "flower.svg",
        "poster": "Colorgradewithease-min.webp",
        "video": "mood-new.mp4"
      },
      {
        "title": "Illuminate with neon",
        "icon": "sunset-2.svg",
        "poster": "Illuminatewithneon-min.webp",
        "video": "neon-glow-new.mp4"
      },
      {
        "title": "Add cinematic texture",
        "icon": "filmstrip.svg",
        "poster": "Addcinematictexture-min.webp",
        "video": "film-grain-new.mp4"
      },
      {
        "title": "Layer creative effects",
        "icon": "layers.svg",
        "poster": "Layercreativeeffects-min.webp",
        "video": "overlays-new.mp4"
      }
    ]
  },
  {
    "group": "Portrait",
    "open": false,
    "items": [
      {
        "title": "Create a dreamy bokeh effect NEW",
        "icon": "bokeh-effect.svg",
        "poster": "bokeh-poster-new.webp",
        "video": "bokeh-new.mp4"
      },
      {
        "title": "Smooth skin naturally IMPROVED",
        "icon": "Smooth.svg",
        "poster": "skin-poster-new.webp",
        "video": "skin-new-2.mp4"
      },
      {
        "title": "Enhance facial features IMPROVED",
        "icon": "Enhance.svg",
        "poster": "face-poster-new.webp",
        "video": "face-new-2.mp4"
      },
      {
        "title": "Sculpt body proportions",
        "icon": "Sculpt.svg",
        "poster": "Sculptbodyproportions-min.webp",
        "video": "body-new.mp4"
      },
      {
        "title": "Blur backgrounds beautifully",
        "icon": "Blur.svg",
        "poster": "Blurbackgroundsbeautifully-min.webp",
        "video": "portrait-bokeh-new.mp4"
      },
      {
        "title": "Add studio lighting",
        "icon": "lighting.svg",
        "poster": "Addstudiolighting-min.webp",
        "video": "studio-light-new.mp4"
      },
      {
        "title": "Replace backgrounds easily",
        "icon": "Replace.svg",
        "poster": "Replacebackgroundseasily-min.webp",
        "video": "portrait-background-new.mp4"
      },
      {
        "title": "Brighten with style",
        "icon": "Brighten.svg",
        "poster": "Brightenwithstyle-min.webp",
        "video": "hight-key-new.mp4"
      }
    ]
  },
  {
    "group": "Photo merge",
    "open": false,
    "items": [
      {
        "title": "Merge multiple brackets",
        "icon": "hdr.svg",
        "poster": "ergemultiplebrackets-min.webp",
        "video": "hdr-merge-new.mp4"
      },
      {
        "title": "Stitch wide panoramas",
        "icon": "panorama.svg",
        "poster": "Stitchwidepanoramas-min.webp",
        "video": "panorama-new.mp4"
      },
      {
        "title": "Stack focused shots",
        "icon": "focus.svg",
        "poster": "Stackfocusedshots-min.webp",
        "video": "focus-new.mp4"
      }
    ]
  }
];

export const featuresSection = {
  title: 'Discover Luminar on Desktop possibilities',
  subtitle: "Level up your photography with Luminar's AI-powered photo editing tools.",
} as const;
