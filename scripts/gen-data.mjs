/** Генерирует src/data/faq.ts и src/data/requirements.ts из данных research/. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'research/data', f), 'utf8'));

// ---------------------------------------------------------------- FAQ
const structured = read('structured.json');
const faq = structured.faq || [];

const faqTs = `// Сгенерировано scripts/gen-data.mjs из JSON-LD FAQPage оригинала.
// Ответы содержат HTML-разметку оригинала (абзацы, списки, ссылки).

export type FaqEntry = {
  q: string;
  /** HTML ответа — рендерится через dangerouslySetInnerHTML */
  a: string;
};

export const faqTitle = 'Frequently Asked Questions';
export const faqCta = { label: 'READ FULL GUIDE', href: 'https://skylum.com/luminar/how-to' };

export const faqEntries: FaqEntry[] = ${JSON.stringify(faq, null, 2)};
`;
fs.writeFileSync(path.join(ROOT, 'src/data/faq.ts'), faqTs);

// ---------------------------------------------------------------- Requirements
const rows = structured.requirements?.rows || [];
const parse = (platform, list) =>
  list.map((r) => {
    // строки вида «Mac Model MacBook, MacBook Air …» — ключ это первые 1-2 слова
    const known = ['Mac Model', 'Processor CPU', 'OS version', 'RAM Memory', 'Disk space Hard disk', 'Display', 'Graphics', 'Hardware'];
    const key = known.find((k) => r.startsWith(k));
    if (!key) return null;
    return { platform, label: key, value: r.slice(key.length).trim() };
  }).filter(Boolean);

const macStart = rows.indexOf('macOS');
const winStart = rows.indexOf('Windows');
const mac = parse('macOS', rows.slice(macStart + 1, winStart));
const win = parse('Windows', rows.slice(winStart + 1));

const reqTs = `// Сгенерировано scripts/gen-data.mjs из секции App Requirements оригинала.

export type RequirementRow = { label: string; value: string };
export type RequirementGroup = { platform: string; rows: RequirementRow[] };

export const requirementsTitle = 'App Requirements';

export const requirementGroups: RequirementGroup[] = [
  { platform: 'macOS', rows: ${JSON.stringify(mac.map(({ label, value }) => ({ label, value })), null, 2).replace(/\n/g, '\n  ')} },
  { platform: 'Windows', rows: ${JSON.stringify(win.map(({ label, value }) => ({ label, value })), null, 2).replace(/\n/g, '\n  ')} },
];
`;
fs.writeFileSync(path.join(ROOT, 'src/data/requirements.ts'), reqTs);

console.log(`faq.ts: ${faq.length} вопросов`);
console.log(`requirements.ts: macOS ${mac.length} строк, Windows ${win.length} строк`);
