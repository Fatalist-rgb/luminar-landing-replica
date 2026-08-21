import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const src = JSON.parse(fs.readFileSync(path.join(ROOT,'research/data/features-map.json'),'utf8'));
const imgDir = path.join(ROOT,'public/assets/img');
const iconDir = path.join(ROOT,'public/assets/icons');
const vidDir = path.join(ROOT,'public/assets/video');
const has = (dir,f)=> f && fs.existsSync(path.join(dir,f));
/** постер мог сохраниться как .webp (CDN отдавал f=webp) */
const poster = f => {
  if (!f) return null;
  const webp = f.replace(/\.(jpe?g|png)$/i, '.webp');
  if (has(imgDir, webp)) return webp;
  if (has(imgDir, f)) return f;
  return null;
};
const missing = [];
const groups = src.groups.map(g => ({
  group: g.group,
  open: g.open,
  items: g.items.map(it => {
    const p = poster(it.poster);
    const v = has(vidDir, it.video) ? it.video : null;
    const ic = has(iconDir, it.icon) ? it.icon : null;
    if (!p) missing.push(`poster:${it.poster}`);
    if (it.video && !v) missing.push(`video:${it.video}`);
    if (it.icon && !ic) missing.push(`icon:${it.icon}`);
    return { title: it.title, icon: ic, poster: p, video: v };
  }),
}));
const ts = `// Сгенерировано scripts/gen-features.mjs из research/data/features-map.json
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

export const featureGroups: FeatureGroup[] = ${JSON.stringify(groups, null, 2)};

export const featuresSection = {
  title: 'Discover Luminar on Desktop possibilities',
  subtitle: "Level up your photography with Luminar's AI-powered photo editing tools.",
} as const;
`;
fs.writeFileSync(path.join(ROOT,'src/data/features.ts'), ts);
console.log('groups:', groups.length, 'items:', groups.reduce((s,g)=>s+g.items.length,0));
if (missing.length) console.log('MISSING:', [...new Set(missing)].join(', '));
