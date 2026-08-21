// Сгенерировано scripts/gen-data.mjs из секции App Requirements оригинала.

export type RequirementRow = { label: string; value: string };
export type RequirementGroup = { platform: string; rows: RequirementRow[] };

export const requirementsTitle = 'App Requirements';

export const requirementGroups: RequirementGroup[] = [
  { platform: 'macOS', rows: [
    {
      "label": "Mac Model",
      "value": "MacBook, MacBook Air, MacBook Pro, iMac, iMac Pro, Mac Pro, Mac mini, early 2010 or newer"
    },
    {
      "label": "Processor CPU",
      "value": "Intel® Core™ i5 8 Gen or better"
    },
    {
      "label": "OS version",
      "value": "macOS 12.0 or higher."
    },
    {
      "label": "RAM Memory",
      "value": "8 GB RAM or more (16+ GB RAM is recommended)"
    },
    {
      "label": "Disk space Hard disk",
      "value": "10 GB free space; SSD for best performance"
    },
    {
      "label": "Display",
      "value": "1280x768 size or better"
    }
  ] },
  { platform: 'Windows', rows: [
    {
      "label": "Hardware",
      "value": "Windows-based hardware PC with mouse or similar input device"
    },
    {
      "label": "Processor CPU",
      "value": "Intel® Core™ i5 8 Gen or better, AMD Ryzen™ 5 or better"
    },
    {
      "label": "OS version",
      "value": "10 version 1909 or higher (only 64-bit OS)"
    },
    {
      "label": "RAM Memory",
      "value": "8 GB RAM or more (16+ GB RAM is recommended)"
    },
    {
      "label": "Disk space Hard disk",
      "value": "10 GB free space; SSD for best performance"
    },
    {
      "label": "Display",
      "value": "1280x768 size or better"
    },
    {
      "label": "Graphics",
      "value": "Open GL 3.3 or later compatible graphics card"
    }
  ] },
];
