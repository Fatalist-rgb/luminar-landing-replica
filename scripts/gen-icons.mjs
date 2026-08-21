/** Превращает инлайновые SVG оригинала в React-компоненты. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const svgs = JSON.parse(fs.readFileSync(path.join(ROOT, 'research/data/hero-svgs.json'), 'utf8'));

const NAMES = ['AppleIcon', 'WindowsIcon', 'IosIcon', 'AndroidIcon', 'WebIcon'];

const parse = (svg) => {
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 20 20';
  const paths = [...svg.matchAll(/<path[^>]*?d="([^"]+)"[^>]*?(?:fill="([^"]*)")?[^>]*?\/?>/g)].map((m) => ({
    d: m[1],
    fill: m[2] || 'currentColor',
  }));
  const opacity = /opacity="([\d.]+)"/.exec(svg)?.[1] || null;
  return { viewBox, paths, opacity };
};

let out = `// Сгенерировано scripts/gen-icons.mjs из инлайновых SVG оригинала.
// Иконки платформ в строке под hero-видео и в подписи баннера устройств.

type IconProps = { className?: string; size?: number };

`;

svgs.forEach((svg, i) => {
  const name = NAMES[i] || `Icon${i}`;
  const { viewBox, paths, opacity } = parse(svg);
  const body = paths
    .map((p) => `      <path d="${p.d}" fill="${p.fill === 'none' ? 'currentColor' : p.fill}" />`)
    .join('\n');
  out += `export function ${name}({ className, size = 20 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="none"
      aria-hidden="true"
      className={className}
${opacity ? `      opacity={${opacity}}\n` : ''}    >
${body}
    </svg>
  );
}

`;
});

fs.mkdirSync(path.join(ROOT, 'src/components/ui'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'src/components/ui/PlatformIcons.tsx'), out);
console.log('PlatformIcons.tsx:', NAMES.slice(0, svgs.length).join(', '));
