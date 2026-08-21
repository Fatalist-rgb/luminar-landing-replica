/**
 * Приводит растровые ассеты к WebP разумного размера.
 * Часть изображений используется как background-image, поэтому next/image
 * их не обрабатывает — оптимизация нужна на уровне файлов.
 *
 * Исходники сохраняются в research/img-original/, ссылки в src/data/** обновляются.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMG = path.join(ROOT, 'public', 'assets', 'img');
const BACKUP = path.join(ROOT, 'research', 'img-original');
fs.mkdirSync(BACKUP, { recursive: true });

const MAX_WIDTH = 1600;
const QUALITY = 78;
/** Файлы меньше этого размера не трогаем — выигрыш не окупает потерю качества */
const MIN_BYTES = 120 * 1024;

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const files = walk(IMG).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const renames = new Map();
let before = 0;
let after = 0;

for (const file of files) {
  const size = fs.statSync(file).size;
  if (size < MIN_BYTES) { before += size; after += size; continue; }

  const ext = path.extname(file);
  const target = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const rel = path.relative(IMG, file);
  const backup = path.join(BACKUP, rel);
  fs.mkdirSync(path.dirname(backup), { recursive: true });
  if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);

  try {
    const buf = await sharp(backup)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();

    before += size;

    if (buf.length < size) {
      fs.writeFileSync(target, buf);
      if (target !== file) {
        fs.rmSync(file);
        renames.set(path.basename(file), path.basename(target));
      }
      after += buf.length;
      console.log(`${path.basename(file)}: ${(size / 1024).toFixed(0)} → ${(buf.length / 1024).toFixed(0)} KB`);
    } else {
      after += size;
    }
  } catch (e) {
    after += size;
    console.log(`${path.basename(file)}: ошибка ${String(e).slice(0, 60)}`);
  }
}

console.log(`\nИТОГО: ${(before / 1048576).toFixed(1)} → ${(after / 1048576).toFixed(1)} MB`);

// ── обновляем ссылки в исходниках ───────────────────────────────────────────
if (renames.size) {
  const srcFiles = walk(path.join(ROOT, 'src')).filter((f) => /\.(ts|tsx)$/.test(f));
  let touched = 0;
  for (const f of srcFiles) {
    let s = fs.readFileSync(f, 'utf8');
    let changed = false;
    for (const [from, to] of renames) {
      if (s.includes(from)) { s = s.replaceAll(from, to); changed = true; }
    }
    if (changed) { fs.writeFileSync(f, s); touched++; }
  }
  console.log(`Переименовано файлов: ${renames.size}; обновлено исходников: ${touched}`);
}
