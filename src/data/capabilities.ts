export type Capability = { title: string; icon: string };

export const capabilitiesSection = {
  title: 'Discover all capabilities of Luminar on Desktop',
  subtitle:
    'With support for raw files, exporting in all major file formats, layers, masking, and much more, photography editing software Luminar meets all your editing needs.',
} as const;

/** Порядок соответствует оригиналу: сначала верхний ряд из 5, затем нижний из 5. */
export const capabilities: Capability[] = [
  { title: 'AI image enhancement', icon: 'discover-luminar-icon-1-new.svg' },
  { title: 'Raw editing', icon: 'discover-luminar-icon-2-new.svg' },
  { title: 'Layers support', icon: 'discover-luminar-icon-3-new.svg' },
  { title: 'Non-destructive editing', icon: 'discover-luminar-icon-4-new.svg' },
  { title: 'Lens correction', icon: 'discover-luminar-icon-5-new.svg' },
  { title: 'Clone tool', icon: 'discover-luminar-icon-6-new.svg' },
  { title: 'Dodge & burn', icon: 'discover-luminar-icon-7-new.svg' },
  { title: 'Color enhancement', icon: 'discover-luminar-icon-8-new.svg' },
  { title: 'Crop and resize', icon: 'discover-luminar-icon-9-new.svg' },
  { title: 'Batch processing', icon: 'discover-luminar-icon-10-new.svg' },
];
