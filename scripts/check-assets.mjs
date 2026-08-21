/** Проверяет, что все ассеты, упомянутые в src/, существуют в public/assets. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const srcFiles = walk(path.join(ROOT, 'src')).filter((f) => /\.(ts|tsx)$/.test(f));
const missing = [];
const seen = new Set();

// Имена файлов в data-модулях: 'foo-bar.webp', 'video.mp4', 'icon.svg'
const FILE_RE = /'([A-Za-z0-9_@.\-]+\.(?:webp|jpe?g|png|svg|mp4|woff2?))'/g;
// Каталоги, в которых их ищем (порядок соответствует ASSETS)
const DIRS = ['assets/img', 'assets/img/posters', 'assets/video', 'assets/icons', 'assets/fonts', ''];

for (const file of srcFiles) {
  const s = fs.readFileSync(file, 'utf8');
  for (const m of s.matchAll(FILE_RE)) {
    const name = m[1];
    if (seen.has(name)) continue;
    seen.add(name);
    const found = DIRS.some((d) => fs.existsSync(path.join(PUBLIC, d, name)));
    if (!found) missing.push({ name, file: path.relative(ROOT, file) });
  }
}

// Шаблонные ссылки вида `${p.base}-lg-min.png`
const TEMPLATE_RE = /\$\{[^}]+\}(-[a-z]+-min\.(?:png|jpe?g|webp))/g;
const templates = new Set();
for (const file of srcFiles) {
  const s = fs.readFileSync(file, 'utf8');
  for (const m of s.matchAll(TEMPLATE_RE)) templates.add(`${path.relative(ROOT, file)} → *${m[1]}`);
}

console.log(`Проверено уникальных ассетов: ${seen.size}`);
if (templates.size) {
  console.log('\nШаблонные ссылки (проверьте расширение вручную):');
  templates.forEach((t) => console.log('  ', t));
}
if (missing.length) {
  console.log(`\nНЕ НАЙДЕНО (${missing.length}):`);
  missing.forEach((m) => console.log(`   ${m.name}  ←  ${m.file}`));
  process.exit(1);
}
console.log('Все ассеты на месте.');
