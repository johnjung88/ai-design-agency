import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outRoot = join(process.cwd(), "public", "portfolio", "logo-showcase");

const brands = [
  { slug: "moru-coffee", brand: "MORU Coffee", sector: "F&B Cafe", descriptor: "Roastery identity", accent: "#7A4E2E", accent2: "#C99B6A", paper: "#F5EFE6", ink: "#211712", deep: "#2B1A13", surface: "cafe" },
  { slug: "salty-yuzu", brand: "Salty Yuzu", sector: "F&B Dessert", descriptor: "Citrus dessert identity", accent: "#F2A900", accent2: "#1AAE89", paper: "#FFF4D4", ink: "#1F1A10", deep: "#4A3210", surface: "dessert" },
  { slug: "danchae-table", brand: "Danchae Table", sector: "Korean Dining", descriptor: "Modern table identity", accent: "#A84A2A", accent2: "#D4A64D", paper: "#F6EFE5", ink: "#1E1712", deep: "#3B241A", surface: "dining" },
  { slug: "onda-hair", brand: "Onda Hair", sector: "Hair Salon", descriptor: "Fluid salon identity", accent: "#9A6759", accent2: "#E7C5B8", paper: "#F8EEEA", ink: "#201714", deep: "#3A2621", surface: "salon" },
  { slug: "vela-skin", brand: "Vela Skin", sector: "Skincare", descriptor: "Clean science identity", accent: "#71879D", accent2: "#D9C6AD", paper: "#F3F2ED", ink: "#17212B", deep: "#1C2A36", surface: "skincare" },
  { slug: "nudekind", brand: "Nudekind", sector: "Clean Cosmetics", descriptor: "Gentle beauty identity", accent: "#C88B75", accent2: "#A7B797", paper: "#F8EFEA", ink: "#211916", deep: "#3B2923", surface: "cosmetic" },
  { slug: "breath-pilates", brand: "Breath Pilates", sector: "Pilates Studio", descriptor: "Alignment studio identity", accent: "#5F857D", accent2: "#C8D8CA", paper: "#EEF5F2", ink: "#13231F", deep: "#1C3832", surface: "studio" },
  { slug: "harufit", brand: "HaruFit", sector: "Fitness Routine", descriptor: "Daily routine identity", accent: "#F05A2A", accent2: "#20B8AB", paper: "#FFF1E8", ink: "#1A1D1F", deep: "#263238", surface: "fitness" },
  { slug: "mediroot", brand: "MediRoot", sector: "Wellness Clinic", descriptor: "Recovery clinic identity", accent: "#247B78", accent2: "#7EAD73", paper: "#EAF4F1", ink: "#102322", deep: "#173936", surface: "clinic" },
  { slug: "nova-node", brand: "Nova Node", sector: "Tech SaaS", descriptor: "Data node identity", accent: "#5F54FF", accent2: "#12C8E8", paper: "#ECECFF", ink: "#11142A", deep: "#171B46", surface: "tech" },
  { slug: "flowstack", brand: "Flowstack", sector: "Workflow SaaS", descriptor: "Automation system identity", accent: "#2563EB", accent2: "#22C55E", paper: "#EAF1FF", ink: "#101827", deep: "#17233A", surface: "workflow" },
  { slug: "promptly-ai", brand: "Promptly AI", sector: "AI Tool", descriptor: "Conversational AI identity", accent: "#7C3AED", accent2: "#F97316", paper: "#F2ECFF", ink: "#181223", deep: "#25143F", surface: "ai" },
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function defs(spec) {
  return `
  <defs>
    <filter id="ambientShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="34" stdDeviation="30" flood-color="${spec.deep}" flood-opacity=".24"/>
    </filter>
    <filter id="contactShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="14" stdDeviation="11" flood-color="#000000" flood-opacity=".22"/>
    </filter>
    <filter id="pressedInk" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.4" stdDeviation=".6" flood-color="#ffffff" flood-opacity=".45"/>
      <feDropShadow dx="0" dy="2.2" stdDeviation="1.8" flood-color="#000000" flood-opacity=".16"/>
    </filter>
    <filter id="neonGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="${spec.accent2}" flood-opacity=".45"/>
      <feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="${spec.accent}" flood-opacity=".28"/>
    </filter>
    <filter id="paperNoise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".92" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 .045"/>
      </feComponentTransfer>
    </filter>
    <linearGradient id="studioBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${spec.paper}"/>
      <stop offset=".52" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${spec.accent2}" stop-opacity=".52"/>
    </linearGradient>
    <linearGradient id="darkPanel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${spec.deep}"/>
      <stop offset=".65" stop-color="${spec.ink}"/>
      <stop offset="1" stop-color="${spec.accent}"/>
    </linearGradient>
    <linearGradient id="cardSheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".96"/>
      <stop offset=".48" stop-color="${spec.paper}" stop-opacity=".92"/>
      <stop offset=".51" stop-color="#ffffff" stop-opacity=".45"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".86"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".78"/>
      <stop offset=".35" stop-color="${spec.paper}" stop-opacity=".22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".06"/>
    </linearGradient>
  </defs>`;
}

function mark(slug, spec, mono = false) {
  const a = mono ? spec.ink : spec.accent;
  const b = mono ? spec.ink : spec.accent2;
  const s = mono ? spec.ink : spec.ink;
  const white = mono ? spec.paper : "#ffffff";
  const marks = {
    "moru-coffee": `<circle cx="50" cy="50" r="42" fill="${a}"/><path d="M28 52c6-28 39-36 48-8 7 23-16 43-36 30-9-6-14-14-12-22Z" fill="${b}"/><path d="M42 27c16 16 17 41-3 56" fill="none" stroke="${s}" stroke-width="6.5" stroke-linecap="round"/><path d="M26 58h48" stroke="${white}" stroke-width="5" stroke-linecap="round" opacity=".92"/><path d="M36 39c9-7 18-7 27 0" fill="none" stroke="${white}" stroke-width="4" stroke-linecap="round" opacity=".9"/>`,
    "salty-yuzu": `<circle cx="46" cy="51" r="36" fill="${a}"/><circle cx="46" cy="51" r="24" fill="none" stroke="${s}" stroke-width="5"/><path d="M46 27v48M22 51h48M29 34l34 34M63 34 29 68" stroke="${s}" stroke-width="4" stroke-linecap="round"/><circle cx="46" cy="51" r="8" fill="${white}"/><path d="M76 20l6 12 13 3-10 9 2 14-12-7-12 7 2-14-10-9 13-3Z" fill="${b}" stroke="${s}" stroke-width="3" stroke-linejoin="round"/>`,
    "danchae-table": `<rect x="17" y="18" width="29" height="29" rx="8" fill="${a}"/><rect x="54" y="18" width="29" height="29" rx="8" fill="${b}"/><rect x="17" y="55" width="29" height="29" rx="8" fill="${b}"/><rect x="54" y="55" width="29" height="29" rx="8" fill="${a}"/><path d="M30 72c13-18 27-18 40 0" fill="none" stroke="${s}" stroke-width="6" stroke-linecap="round"/><path d="M27 30h56M17 47h66M17 55h66M27 84h56" stroke="${white}" stroke-width="3" opacity=".55"/>`,
    "onda-hair": `<circle cx="50" cy="50" r="37" fill="none" stroke="${a}" stroke-width="11"/><path d="M17 52c11-18 24-21 39-3 11 13 21 12 32-3" fill="none" stroke="${s}" stroke-width="7" stroke-linecap="round"/><path d="M27 68c13 10 31 10 45 0" fill="none" stroke="${b}" stroke-width="7" stroke-linecap="round"/><path d="M32 34c10-8 25-9 36-1" fill="none" stroke="${b}" stroke-width="5" stroke-linecap="round" opacity=".8"/>`,
    "vela-skin": `<path d="M20 24 50 80 80 24" fill="none" stroke="${a}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><circle cx="50" cy="37" r="9" fill="${b}"/><circle cx="50" cy="37" r="3" fill="${white}"/><path d="M34 78h32" stroke="${s}" stroke-width="5" stroke-linecap="round"/><path d="M33 25c11-8 23-8 34 0" fill="none" stroke="${b}" stroke-width="5" stroke-linecap="round"/>`,
    "nudekind": `<rect x="18" y="20" width="64" height="60" rx="30" fill="${b}"/><path d="M31 73V35h17c13 0 21 8 21 22v16" fill="none" stroke="${s}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 36c13-13 30-14 44-2" fill="none" stroke="${a}" stroke-width="7" stroke-linecap="round"/><path d="M70 24c-7-3-16-2-24 5" fill="none" stroke="${white}" stroke-width="4" stroke-linecap="round" opacity=".9"/>`,
    "breath-pilates": `<path d="M50 15v70" stroke="${s}" stroke-width="5.5" stroke-linecap="round"/><path d="M50 28c-24 2-34 21-18 37 9 9 20 4 18-8" fill="none" stroke="${a}" stroke-width="7.5" stroke-linecap="round"/><path d="M50 28c24 2 34 21 18 37-9 9-20 4-18-8" fill="none" stroke="${b}" stroke-width="7.5" stroke-linecap="round"/><circle cx="50" cy="50" r="7" fill="${white}" stroke="${s}" stroke-width="3"/>`,
    "harufit": `<rect x="17" y="17" width="66" height="66" rx="21" fill="${a}"/><path d="M32 56 45 69 71 33" fill="none" stroke="${white}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 36h18m15 0h7M49 36v25" stroke="${b}" stroke-width="6" stroke-linecap="round"/><path d="M28 78h45" stroke="${s}" stroke-width="4" stroke-linecap="round" opacity=".35"/>`,
    "mediroot": `<path d="M18 78V23l32 31 32-31v55" fill="none" stroke="${a}" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 37v40M38 50h24" stroke="${s}" stroke-width="6.5" stroke-linecap="round"/><path d="M50 78c-10-10-18-13-29-11M50 78c10-10 18-13 29-11" stroke="${b}" stroke-width="5.5" stroke-linecap="round"/><circle cx="50" cy="50" r="24" fill="none" stroke="${white}" stroke-width="3" opacity=".55"/>`,
    "nova-node": `<path d="M50 14v72M14 50h72M27 27l46 46M73 27 27 73" stroke="${b}" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="50" r="16" fill="${a}"/><circle cx="50" cy="14" r="7" fill="${s}"/><circle cx="86" cy="50" r="7" fill="${s}"/><circle cx="50" cy="86" r="7" fill="${s}"/><circle cx="14" cy="50" r="7" fill="${s}"/><circle cx="50" cy="50" r="5" fill="${white}"/>`,
    "flowstack": `<rect x="17" y="22" width="48" height="17" rx="6" fill="${a}"/><rect x="27" y="43" width="48" height="17" rx="6" fill="${b}"/><rect x="37" y="64" width="48" height="17" rx="6" fill="${a}"/><path d="M66 29 84 50 66 71" fill="none" stroke="${s}" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 31h31M36 52h31M46 73h31" stroke="${white}" stroke-width="3" stroke-linecap="round" opacity=".65"/>`,
    "promptly-ai": `<path d="M17 23h59c9 0 15 6 15 15v20c0 9-6 15-15 15H52L34 87V73H17C8 73 3 67 3 58V38c0-9 5-15 14-15Z" fill="${a}"/><path d="M39 38v28l21-13-10-3 9-12" fill="${b}" stroke="${s}" stroke-width="4.5" stroke-linejoin="round"/><path d="M71 34l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="${white}"/><path d="M24 32h30" stroke="${white}" stroke-width="4" stroke-linecap="round" opacity=".42"/>`,
  };
  return `<g>${marks[slug]}</g>`;
}

function wordmark(spec, x, y, size, color = spec.ink, anchor = "start") {
  return `
  <text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="950" fill="${color}">${esc(spec.brand)}</text>
  <text x="${x}" y="${y + size * 0.48}" text-anchor="${anchor}" font-family="Inter, Arial, sans-serif" font-size="${Math.max(10, Math.round(size * 0.16))}" font-weight="850" letter-spacing="4" fill="${color}" opacity=".48">${esc(spec.descriptor.toUpperCase())}</text>`;
}

function lockup(spec, x, y, markScale, textSize, color = spec.ink, mono = false) {
  const localSpec = color === "#ffffff" ? { ...spec, ink: "#ffffff", paper: "#ffffff" } : spec;
  return `
  <g transform="translate(${x} ${y}) scale(${markScale})" filter="url(#pressedInk)">${mark(spec.slug, localSpec, mono)}</g>
  ${wordmark(spec, x + markScale * 125, y + markScale * 58, textSize, color)}`;
}

function svg(width, height, spec, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  ${defs(spec)}
  ${body}
</svg>
`;
}

function logoBoard(spec) {
  return svg(1600, 1000, spec, `
  <rect width="1600" height="1000" fill="${spec.paper}"/>
  <rect width="1600" height="1000" fill="#ffffff" filter="url(#paperNoise)" opacity=".48"/>
  <rect x="78" y="72" width="1444" height="856" rx="38" fill="#ffffff" filter="url(#ambientShadow)"/>
  <text x="132" y="150" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="950" letter-spacing="6" fill="${spec.accent}">${esc(spec.sector.toUpperCase())}</text>
  ${lockup(spec, 175, 265, 2.75, 84)}
  <path d="M132 604h1336" stroke="${spec.ink}" stroke-width="2" opacity=".1"/>
  <text x="132" y="692" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="950" fill="${spec.ink}">Identity system</text>
  <text x="132" y="742" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700" fill="${spec.ink}" opacity=".62">${esc(spec.descriptor)} with primary, mono, reverse, and small-size usage.</text>
  <rect x="972" y="670" width="136" height="136" rx="30" fill="${spec.accent}"/>
  <rect x="1140" y="670" width="136" height="136" rx="30" fill="${spec.accent2}"/>
  <rect x="1308" y="670" width="136" height="136" rx="30" fill="${spec.ink}"/>
  <g transform="translate(990 688) scale(1)">${mark(spec.slug, { ...spec, ink: "#ffffff", paper: "#ffffff" }, true)}</g>
  <g transform="translate(1158 688) scale(1)">${mark(spec.slug, { ...spec, ink: "#ffffff", paper: "#ffffff" }, true)}</g>
  <g transform="translate(1326 688) scale(1)">${mark(spec.slug, { ...spec, ink: "#ffffff", paper: "#ffffff" }, true)}</g>
  <text x="972" y="858" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="900" letter-spacing="3" fill="${spec.ink}" opacity=".46">PRIMARY</text>
  <text x="1140" y="858" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="900" letter-spacing="3" fill="${spec.ink}" opacity=".46">ACCENT</text>
  <text x="1308" y="858" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="900" letter-spacing="3" fill="${spec.ink}" opacity=".46">MONO</text>`);
}

function monoBoard(spec) {
  return svg(1600, 1000, spec, `
  <rect width="1600" height="1000" fill="#f4f2ee"/>
  <rect width="1600" height="1000" fill="#ffffff" filter="url(#paperNoise)" opacity=".38"/>
  <rect x="82" y="92" width="686" height="816" rx="36" fill="${spec.deep}" filter="url(#ambientShadow)"/>
  <rect x="832" y="92" width="686" height="816" rx="36" fill="#ffffff" filter="url(#ambientShadow)"/>
  <text x="132" y="166" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="950" letter-spacing="6" fill="#ffffff" opacity=".48">REVERSE</text>
  <g transform="translate(255 272) scale(2.45)">${mark(spec.slug, { ...spec, ink: "#ffffff", paper: "#ffffff" }, true)}</g>
  ${wordmark(spec, 425, 676, 48, "#ffffff", "middle")}
  <text x="425" y="780" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="850" letter-spacing="5" fill="#ffffff" opacity=".42">DARK BACKGROUND</text>
  <text x="882" y="166" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="950" letter-spacing="6" fill="${spec.ink}" opacity=".42">MONO</text>
  <g transform="translate(1005 272) scale(2.45)">${mark(spec.slug, spec, true)}</g>
  ${wordmark(spec, 1175, 676, 48, spec.ink, "middle")}
  <text x="1175" y="780" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="850" letter-spacing="5" fill="${spec.ink}" opacity=".42">ONE-COLOR VERSION</text>`);
}

function guideBoard(spec) {
  return svg(1600, 1000, spec, `
  <rect width="1600" height="1000" fill="${spec.paper}"/>
  <rect width="1600" height="1000" fill="#ffffff" filter="url(#paperNoise)" opacity=".42"/>
  <rect x="78" y="72" width="1444" height="856" rx="38" fill="#ffffff" filter="url(#ambientShadow)"/>
  <text x="132" y="150" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="950" letter-spacing="6" fill="${spec.accent}">BRAND GUIDE</text>
  <text x="132" y="220" font-family="Inter, Arial, sans-serif" font-size="50" font-weight="950" fill="${spec.ink}">${esc(spec.brand)}</text>
  <text x="132" y="268" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="750" fill="${spec.ink}" opacity=".58">${esc(spec.descriptor)} / clearspace, scale, and palette rules</text>
  <g transform="translate(180 390) scale(1.8)">${mark(spec.slug, spec)}</g>
  <path d="M150 360h260v260H150Z" fill="none" stroke="${spec.accent}" stroke-width="3" stroke-dasharray="10 12" opacity=".45"/>
  <path d="M180 390h200v200H180Z" fill="none" stroke="${spec.ink}" stroke-width="2" opacity=".12"/>
  <text x="150" y="682" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="3" fill="${spec.ink}" opacity=".45">CLEARSPACE</text>
  <g transform="translate(590 392) scale(1.1)">${mark(spec.slug, spec)}</g>
  <g transform="translate(815 420) scale(.72)">${mark(spec.slug, spec)}</g>
  <g transform="translate(985 448) scale(.45)">${mark(spec.slug, spec)}</g>
  <path d="M570 620h548" stroke="${spec.ink}" stroke-width="2" opacity=".12"/>
  <text x="570" y="682" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="3" fill="${spec.ink}" opacity=".45">SCALE TEST</text>
  <rect x="1190" y="380" width="120" height="120" rx="26" fill="${spec.accent}"/>
  <rect x="1340" y="380" width="120" height="120" rx="26" fill="${spec.accent2}"/>
  <rect x="1190" y="535" width="120" height="120" rx="26" fill="${spec.ink}"/>
  <rect x="1340" y="535" width="120" height="120" rx="26" fill="${spec.paper}" stroke="${spec.ink}" stroke-width="2" opacity=".9"/>
  <text x="1190" y="710" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="3" fill="${spec.ink}" opacity=".45">PALETTE</text>`);
}

function cover(spec) {
  return svg(1600, 900, spec, `
  <rect width="1600" height="900" fill="${spec.deep}"/>
  <rect x="42" y="42" width="1516" height="816" rx="40" fill="url(#studioBg)"/>
  <rect x="42" y="42" width="1516" height="816" rx="40" fill="#ffffff" filter="url(#paperNoise)" opacity=".42"/>
  <text x="110" y="128" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="950" letter-spacing="6" fill="${spec.ink}" opacity=".42">${esc(spec.sector.toUpperCase())}</text>
  ${lockup(spec, 112, 242, 1.8, 66)}
  <text x="116" y="515" font-family="Inter, Arial, sans-serif" font-size="27" font-weight="850" fill="${spec.accent}">${esc(spec.descriptor)}</text>
  <text x="116" y="570" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700" fill="${spec.ink}" opacity=".58">logo system / mono version / brand guide</text>
  <rect x="112" y="648" width="86" height="42" rx="21" fill="${spec.accent}"/>
  <rect x="214" y="648" width="86" height="42" rx="21" fill="${spec.accent2}"/>
  <rect x="316" y="648" width="86" height="42" rx="21" fill="${spec.ink}"/>
  <g transform="translate(875 142) scale(.72)">
    <rect x="120" y="70" width="650" height="300" rx="8" fill="url(#darkPanel)" filter="url(#ambientShadow)"/>
    <g transform="translate(250 142) scale(.72)" filter="url(#neonGlow)">${mark(spec.slug, { ...spec, ink: "#ffffff", paper: "#ffffff" })}</g>
    ${wordmark(spec, 360, 202, 40, "#ffffff")}
    <rect x="150" y="418" width="520" height="288" rx="22" fill="url(#cardSheen)" filter="url(#ambientShadow)" transform="rotate(-8 410 562)"/>
    <g transform="translate(210 495) rotate(-8) scale(.58)">${mark(spec.slug, spec)}</g>
    <text x="314" y="544" font-family="Inter, Arial, sans-serif" font-size="31" font-weight="950" fill="${spec.ink}" transform="rotate(-8 314 544)">${esc(spec.brand)}</text>
  </g>`);
}

const renderers = {
  "cover.svg": cover,
  "logo-board.svg": logoBoard,
  "mono-board.svg": monoBoard,
  "guide-board.svg": guideBoard,
};

for (const spec of brands) {
  const dir = join(outRoot, spec.slug);
  mkdirSync(dir, { recursive: true });

  for (const [filename, renderer] of Object.entries(renderers)) {
    writeFileSync(join(dir, filename), renderer(spec), "utf8");
  }
}

console.log(`Generated ${brands.length * Object.keys(renderers).length} logo system SVG assets.`);
