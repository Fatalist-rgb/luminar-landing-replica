/**
 * Сжимает видео в public/assets/video: H.264, макс. ширина 1280, CRF 30, без звука.
 * Оригиналы сохраняются в research/video-original/ (вне сборки).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'public', 'assets', 'video');
const BACKUP = path.join(ROOT, 'research', 'video-original');
fs.mkdirSync(BACKUP, { recursive: true });

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.mp4'));
let before = 0, after = 0;

for (const f of files) {
  const src = path.join(DIR, f);
  const bak = path.join(BACKUP, f);
  const tmp = path.join(DIR, `__${f}`);
  const size = fs.statSync(src).size;
  before += size;

  if (!fs.existsSync(bak)) fs.copyFileSync(src, bak);

  try {
    execFileSync(ffmpeg, [
      '-y', '-i', bak,
      '-an',
      '-vf', "scale='min(1280,iw)':-2",
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
      '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      tmp,
    ], { stdio: 'pipe' });
    const ns = fs.statSync(tmp).size;
    if (ns > 0 && ns < size) { fs.renameSync(tmp, src); after += ns; }
    else { fs.rmSync(tmp, { force: true }); after += size; }
    console.log(`${f}: ${(size/1048576).toFixed(1)} -> ${(fs.statSync(src).size/1048576).toFixed(1)} MB`);
  } catch (e) {
    fs.rmSync(tmp, { force: true });
    after += size;
    console.log(`${f}: ОШИБКА ${String(e).slice(0,100)}`);
  }
}
console.log(`\nИТОГО: ${(before/1048576).toFixed(1)} MB -> ${(after/1048576).toFixed(1)} MB`);

// постеры первого кадра для каждого видео
const POSTERS = path.join(ROOT, 'public', 'assets', 'img', 'posters');
fs.mkdirSync(POSTERS, { recursive: true });
for (const f of files) {
  const out = path.join(POSTERS, f.replace(/\.mp4$/, '.jpg'));
  if (fs.existsSync(out)) continue;
  try {
    execFileSync(ffmpeg, ['-y', '-i', path.join(DIR, f), '-vf', 'scale=640:-2', '-frames:v', '1', '-q:v', '5', out], { stdio: 'pipe' });
  } catch {}
}
console.log(`Постеры: ${fs.readdirSync(POSTERS).length}`);
