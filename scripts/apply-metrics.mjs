/**
 * Точечно приводит секции к метрикам оригинала (замеры research/data/metrics-inner.json).
 * Одноразовый скрипт: правки идемпотентны, повторный запуск ничего не ломает.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const edit = (file, pairs) => {
  const p = path.join(ROOT, file);
  let s = fs.readFileSync(p, 'utf8');
  let applied = 0;
  for (const [from, to] of pairs) {
    if (s.includes(from)) { s = s.replaceAll(from, to); applied++; }
    else if (!s.includes(to)) console.log(`  ! не найдено в ${file}: ${from.slice(0, 70)}`);
  }
  fs.writeFileSync(p, s);
  console.log(`${file}: применено ${applied}/${pairs.length}`);
};

// ── df: py 100, панель 288px, внутренний блок 530px ─────────────────────────
edit('src/components/sections/DiscoverFeatures.tsx', [
  ['<section className="bg-black py-[56px] md:py-[80px]" id="features">', '<section className="section-y bg-black" id="features">'],
  ['className="mt-[34px] overflow-hidden rounded-[16px] bg-[#111] md:mt-[42px] lg:grid lg:grid-cols-[310px_1fr] lg:gap-0"',
   'className="mt-[30px] overflow-hidden rounded-[16px] bg-[#111] lg:mt-[36px] lg:grid lg:h-[530px] lg:grid-cols-[288px_1fr] lg:gap-0"'],
  ['className="max-h-[520px] overflow-y-auto border-white/10 p-[10px] lg:max-h-[500px] lg:rounded-[14px] lg:border lg:border-[var(--color-accent)]/60 lg:m-[14px] lg:mr-0 lg:p-[6px]"',
   'className="max-h-[520px] overflow-y-auto border-white/10 p-[10px] lg:m-[14px] lg:mr-0 lg:max-h-[502px] lg:rounded-[14px] lg:border lg:border-[var(--color-accent)]/60 lg:p-[6px]"'],
  ['<div className="hidden p-[14px] lg:block">', '<div className="hidden p-[14px] lg:block">'],
  ['<div className="mt-[34px] flex justify-center md:mt-[42px]">', '<div className="mt-[40px] flex justify-center">'],
]);

// ── banner: py 100, h2 48px/mb 20, внутренний блок шире контейнера ──────────
edit('src/components/sections/DevicesBanner.tsx', [
  ['<section className="bg-black py-[56px] md:py-[80px]">', '<section className="section-y bg-black">'],
  ['<h2 className="h-section text-center">', '<h2 className="h-section-lg text-center">'],
  ['className="mt-[32px] overflow-hidden rounded-[16px] border border-[var(--color-accent)]/25 bg-[linear-gradient(120deg,#1a1206_0%,#3a2408_45%,#120b03_100%)] md:mt-[42px]"',
   'className="mx-auto mt-[20px] w-full max-w-[1340px] overflow-hidden rounded-[16px] border border-[var(--color-accent)]/25 bg-[linear-gradient(120deg,#1a1206_0%,#3a2408_45%,#120b03_100%)]"'],
  ['<div className="grid items-center gap-[24px] p-[22px] md:p-[34px] lg:grid-cols-[1.1fr_1fr] lg:gap-[40px]">',
   '<div className="grid items-center gap-[24px] p-[22px] md:p-[40px] lg:grid-cols-[1fr_1fr] lg:gap-[80px]">'],
  ['<div className="mt-[32px] flex justify-center md:mt-[40px]">', '<div className="mt-[40px] flex justify-center">'],
]);

// ── reasons: py 100, h2 48px/mb 40, gap сетки 32px ──────────────────────────
edit('src/components/sections/Reasons.tsx', [
  ['<section className="bg-black py-[56px] md:py-[80px]">', '<section className="section-y bg-black">'],
  ['<h2 className="h-section text-center">', '<h2 className="h-section-lg text-center">'],
  ['<div className="mt-[34px] grid gap-[20px] md:mt-[46px] md:grid-cols-2">', '<div className="mt-[40px] grid gap-[32px] md:grid-cols-2">'],
  ['<div className="mt-[20px] grid gap-[20px] md:grid-cols-2 lg:grid-cols-3">', '<div className="mt-[32px] grid gap-[32px] md:grid-cols-2 lg:grid-cols-3">'],
  ['<div className="mt-[34px] flex justify-center md:mt-[44px]">', '<div className="mt-[40px] flex justify-center">'],
]);

// ── capabilities: py 65, h2 48px/mb 25, иконка 64px ─────────────────────────
edit('src/components/sections/Capabilities.tsx', [
  ['<section className="bg-black py-[56px] md:py-[80px]">', '<section className="section-y-sm bg-black">'],
  ['<SectionHeading title={capabilitiesSection.title} subtitle={capabilitiesSection.subtitle} />',
   '<SectionHeading title={capabilitiesSection.title} subtitle={capabilitiesSection.subtitle} size="lg" />'],
  ['className="mt-[38px] grid grid-cols-2 gap-x-[16px] gap-y-[34px] sm:grid-cols-3 md:mt-[52px] lg:grid-cols-5 lg:gap-y-[46px]"',
   'className="mt-[25px] grid grid-cols-2 gap-x-[16px] gap-y-[30px] sm:grid-cols-3 lg:grid-cols-5"'],
  ['width={56}\n                height={56}\n                className="h-[56px] w-[56px]"', 'width={64}\n                height={64}\n                className="h-[64px] w-[64px]"'],
  ['<li key={c.title} className="flex flex-col items-center text-center">', '<li key={c.title} className="flex min-h-[140px] flex-col items-center justify-start pt-[18px] text-center">'],
]);

// ── protools: pt 200 / pb 100, h2 40px/mb 20, слайд 1200×550 ────────────────
edit('src/components/sections/ProToolsCarousel.tsx', [
  ['<section className="bg-black py-[56px] md:py-[80px]" id="pro-tools">', '<section className="bg-black pt-[clamp(64px,3rem+6vw,200px)] pb-[clamp(48px,2rem+4vw,100px)]" id="pro-tools">'],
  ['<SectionHeading title={proToolsSection.title} subtitle={proToolsSection.subtitle} />',
   '<SectionHeading title={proToolsSection.title} subtitle={proToolsSection.subtitle} size="sm" />'],
  ['<div className="relative mt-[34px] md:mt-[46px]">', '<div className="relative mt-[20px]">'],
  ['className="w-[calc(100%-30px)] shrink-0 snap-center sm:w-[85%] lg:w-[1150px]"', 'className="w-[calc(100%-30px)] shrink-0 snap-center sm:w-[85%] lg:w-[1148px]"'],
  ['className="no-scrollbar flex snap-x snap-mandatory gap-[16px] overflow-x-auto scroll-smooth px-[15px] md:gap-[24px] lg:px-[calc((100vw-1150px)/2)]"',
   'className="no-scrollbar flex snap-x snap-mandatory gap-[16px] overflow-x-auto scroll-smooth px-[15px] md:gap-[24px] lg:px-[calc((100vw-1148px)/2)]"'],
  ['md:aspect-[1150/570]', 'md:aspect-[1148/550]'],
  ['<div className="container-lum mt-[30px] flex justify-center md:mt-[38px]">', '<div className="container-lum mt-[40px] flex justify-center">'],
]);

// ── steps: py 100, сетка 760/380 gap 30, слайдер 760×502 ────────────────────
edit('src/components/sections/StepsSection.tsx', [
  ['<section className="bg-black py-[46px] md:py-[64px]">', '<section className="section-y bg-black">'],
  ['<div className="grid items-center gap-[28px] lg:grid-cols-2 lg:gap-[56px]">',
   `<div\n          className="grid items-center gap-[28px] lg:gap-[30px]"\n          style={{ gridTemplateColumns: undefined }}\n        >`],
  ['aspect="3 / 2"', 'aspect="760 / 502"'],
  ['<h2 className="h-section">{data.title}</h2>', '<h2 className="h-section-sm">{data.title}</h2>'],
  ['<p className="text-section mt-[16px] max-w-[430px]">{data.description}</p>', '<p className="text-section mt-[20px] max-w-[380px]">{data.description}</p>'],
  ['className="mt-[28px] max-w-[400px]"', 'className="mt-[30px] max-w-[380px]"'],
]);

// ── photoshoot: py 100, h2 40px, коллаж 1170×310 ────────────────────────────
edit('src/components/sections/PhotoshootGallery.tsx', [
  ['<section className="bg-black py-[56px] md:py-[80px]">', '<section className="section-y bg-black">'],
  ['<SectionHeading title={gallerySection.title} subtitle={gallerySection.description} />',
   '<SectionHeading title={gallerySection.title} subtitle={gallerySection.description} size="sm" />'],
  ['<div className="relative mt-[34px] md:mt-[44px]">', '<div className="relative mt-[40px]">'],
]);

// ── bottom: py 100, h2 40px/mb 12, картинка 1010×345 ────────────────────────
edit('src/components/sections/BottomBanner.tsx', [
  ['<section className="bg-black pt-[20px] pb-[56px] md:pb-[80px]">', '<section className="section-y bg-black">'],
  ['<h2 className="h-section mx-auto mt-[20px] max-w-[820px]">', '<h2 className="h-section-sm mx-auto mt-[20px] max-w-[1128px]">'],
  ['<p className="text-section mx-auto mt-[12px] max-w-[620px]">', '<p className="text-section mx-auto mt-[12px] max-w-[620px]">'],
]);

// ── faq: py 50 ──────────────────────────────────────────────────────────────
edit('src/components/sections/Faq.tsx', [
  ['<section className="bg-black py-[56px] md:py-[80px]" id="faq">', '<section className="bg-black py-[clamp(36px,1.6rem+2vw,50px)]" id="faq">'],
]);

console.log('\nГотово.');
