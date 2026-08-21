/**
 * Скачивает все медиа-ассеты оригинала (media.macphun.com) в public/assets/**.
 * Источник списка: research/data/media.json + research/data/extra-media.json (если есть).
 *
 *   node scripts/download-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'assets');

const DIRS = {
  img: path.join(OUT, 'img'),
  video: path.join(OUT, 'video'),
  icons: path.join(OUT, 'icons'),
  fonts: path.join(OUT, 'fonts'),
};
Object.values(DIRS).forEach((d) => fs.mkdirSync(d, { recursive: true }));

function readList(file) {
  const p = path.join(ROOT, 'research', 'data', file);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const urls = [...new Set([...readList('media.json'), ...readList('extra-media.json')])]
  .filter((u) => typeof u === 'string' && u.includes('media.macphun.com'));

/** Куда и под каким именем класть файл */
export function target(rawUrl) {
  const u = new URL(rawUrl);
  const base = decodeURIComponent(u.pathname.split('/').pop() || '');
  const ext = (base.split('.').pop() || '').toLowerCase();
  const wantsWebp = u.searchParams.get('f') === 'webp';

  if (['woff', 'woff2', 'ttf', 'otf'].includes(ext)) return { dir: DIRS.fonts, name: base };
  if (['mp4', 'webm', 'mov'].includes(ext)) return { dir: DIRS.video, name: base };
  if (ext === 'svg') return { dir: DIRS.icons, name: base };

  // растровые: если CDN отдаёт webp — сохраняем с расширением .webp
  const name = wantsWebp ? base.replace(/\.(jpe?g|png)$/i, '.webp') : base;
  return { dir: DIRS.img, name };
}

async function download(rawUrl) {
  const { dir, name } = target(rawUrl);
  const dest = path.join(dir, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return { ok: true, skipped: true, dest };

  const res = await fetch(rawUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
      referer: 'https://skylum.com/luminar',
      accept: '*/*',
    },
  });
  if (!res.ok) return { ok: false, dest, status: res.status };

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) return { ok: false, dest, status: 'empty' };
  fs.writeFileSync(dest, buf);
  return { ok: true, dest, size: buf.length };
}

const results = { ok: 0, skipped: 0, failed: [] };
let bytes = 0;

const QUEUE = [...urls];
const WORKERS = 8;

await Promise.all(
  Array.from({ length: WORKERS }, async () => {
    while (QUEUE.length) {
      const url = QUEUE.shift();
      try {
        const r = await download(url);
        if (r.ok) {
          r.skipped ? results.skipped++ : results.ok++;
          bytes += r.size || 0;
        } else {
          results.failed.push({ url, status: r.status });
        }
      } catch (e) {
        results.failed.push({ url, status: String(e).slice(0, 80) });
      }
    }
  }),
);

console.log(`Скачано: ${results.ok}, пропущено (уже есть): ${results.skipped}, ошибок: ${results.failed.length}`);
console.log(`Объём новых файлов: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
if (results.failed.length) {
  console.log('\nНе удалось скачать:');
  results.failed.forEach((f) => console.log(`  [${f.status}] ${f.url}`));
  fs.writeFileSync(path.join(ROOT, 'research', 'data', 'failed-assets.json'), JSON.stringify(results.failed, null, 2));
}
