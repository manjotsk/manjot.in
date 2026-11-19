// Product mock-ups for the projects page, one renderer per design system.
// Every renderer uses that system's published tokens (colour, type, radius,
// elevation) and its own components, and fills them with the project's real
// module names from projects.json. Output is a 1200×750 HTML scene that
// build.mjs screenshots to WebP. No logos or wordmarks are drawn.

export const W = 1200;
export const H = 750;

export const SYSTEMS = {
  carbon: { name: 'IBM Carbon', url: 'https://carbondesignsystem.com' },
  ant: { name: 'Ant Design', url: 'https://ant.design' },
  material3: { name: 'Material 3', url: 'https://m3.material.io' },
  hig: { name: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines' },
  fluent2: { name: 'Microsoft Fluent 2', url: 'https://fluent2.microsoft.design' },
  polaris: { name: 'Shopify Polaris', url: 'https://polaris.shopify.com' },
  slds: { name: 'Salesforce Lightning', url: 'https://www.lightningdesignsystem.com' },
  govuk: { name: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk' },
  nhs: { name: 'NHS digital service manual', url: 'https://service-manual.nhs.uk' },
  uswds: { name: 'U.S. Web Design System', url: 'https://designsystem.digital.gov' },
  eui: { name: 'Elastic UI', url: 'https://eui.elastic.co' },
  spectrum: { name: 'Adobe Spectrum', url: 'https://spectrum.adobe.com' },
  geist: { name: 'Vercel Geist', url: 'https://vercel.com/geist' },
  primer: { name: 'GitHub Primer', url: 'https://primer.style' },
  atlassian: { name: 'Atlassian Design System', url: 'https://atlassian.design' },
  baseweb: { name: 'Base Web', url: 'https://baseweb.design' },
};

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Map a status word to a semantic tone every system has a colour for.
export function tone(s) {
  const t = String(s).toLowerCase();
  if (/overdue|alarm|reject|refund|out of stock|critical|failed|blocked/.test(t)) return 'critical';
  if (/pending|due|at risk|delay|flag|cleaning|break|inspection|qc hold|drying|awaiting|waiting|low stock|check|review|request/.test(t)) return 'warning';
  if (/progress|transit|assign|schedul|quoted|enrolling|new|beta|running|loading|on road|match|live|event|top|for you|watering|guide|popular|today|offered/.test(t)) return 'info';
  if (/done|complet|paid|active|won|confirm|ready|deliver|resolv|approv|sign|on track|stable|shared|clear|ship|normal|free|connect|download|open|best|earned|public|occupied|reunit/.test(t)) return 'success';
  return 'neutral';
}

// One small stroke icon set, drawn on a 24px grid.
const PATHS = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM16.5 16.5L21 21',
  check: 'M4 12.5l5 5L20 6.5',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  map: 'M9 4l6 2 5-2v16l-5 2-6-2-5 2V6zM9 4v16M15 6v16',
  chat: 'M4 5h16v11H9l-5 4z',
  settings: 'M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
  bookmark: 'M6 3h12v18l-6-4-6 4z',
  play: 'M7 4l13 8-13 8z',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',
  money: 'M3 6h18v12H3zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
  car: 'M5 16l1.5-6h11L19 16M4 16h16v3H4zM7 19v2M17 19v2',
  plus: 'M12 5v14M5 12h14',
  mic: 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  chevron: 'M9 6l6 6-6 6',
  back: 'M15 6l-6 6 6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  scan: 'M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M7 12h10',
  cross: 'M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6z',
  leaf: 'M5 19C5 10 11 5 20 4c-1 9-6 15-15 15zM5 19l8-8',
};
export function iconFor(label) {
  const t = String(label).toLowerCase();
  const rules = [
    [/→|route /, 'map'],
    [/ambulance|blood|hospital er|pharmacy|emergency/, 'cross'],
    [/greenhouse|field \d|zone [a-d]|crop/, 'leaf'],
    [/expo|startup night|vendor meet|lunch|procession|tank opens|cup final|donation camp|kabaddi/, 'calendar'],
    [/assembly|monsoon|prices this|cricket|road repair|sports day|langar|new member/, 'doc'],
    [/rto-|hire-|sale-|toyota|kia |hyundai|mg zs|sedan|suv|mover|^city/, 'car'],
    [/tale|poem|stor(y|ies)|memoir|episode|japji|anand|sukhmani|rehras|sahib/, 'bookmark'],
    [/recorded|bed \d|discharge|waiting|round|queue/, 'mic'],
    [/pickleball|badminton|padel|tennis|squash/, 'calendar'],
    [/^notes?$|^project|^talent|deck|competition/, 'doc'],
    [/dashboard|overview|masters|^home|today|^top|^field|^live$/, 'home'],
    [/search|discover|find|compare|explore|matches/, 'search'],
    [/task|to do|todo|^work|approv|compliance|quality/, 'check'],
    [/time|schedul|calendar|planning|event|batch|booking|slot|diary|session|exam|quiz|program|course/, 'calendar'],
    [/lead|customer|client|people|member|family|guest|staff|user|profile|tutor|student|driver|collector|expert|institute|hospital|investor|compan|vendor|agent|account|branch/, 'user'],
    [/invoice|billing|payout|finance|accounting|debit|loan|saving|collection|earning|payroll|payment|order|price/, 'money'],
    [/quote|contract|form|polic|document|report|evidence|expected|source|catalog|history|journal|blog|guide|hukamnama|news|kosh/, 'doc'],
    [/analytic|insight|kpi|forecast|soil|water|rate|alarm|device|valve|health/, 'chart'],
    [/map|route|trip|load|fleet|vehicle|ride|allocation|yard|truck|chassis|port|shipping|dispatch|crop|labour/, 'map'],
    [/message|chat|feedback|voice|discussion/, 'chat'],
    [/setting|admin|^menu/, 'settings'],
    [/library|bookmark|collection|galler|saved|competition|bount|resource|swatch/, 'bookmark'],
    [/play|stream|go live|channel/, 'play'],
    [/notif|complaint|dispute|alert/, 'bell'],
    [/scan|post|report a|create|new/, 'plus'],
  ];
  for (const [re, k] of rules) if (re.test(t)) return k;
  return 'grid';
}
export const svgIcon = (name, { size = 16, stroke = 'currentColor', width = 1.75, fill = 'none' } = {}) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${PATHS[name] || PATHS.grid}"/></svg>`;
const ic = (label, o) => svgIcon(iconFor(label), o);

const initials = (s) => String(s).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// A deterministic pseudo-random sequence so every rebuild draws the same charts.
function rng(seed) {
  let h = 2166136261;
  for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507), h = Math.imul(h ^ (h >>> 13), 3266489909), (h ^= h >>> 16) >>> 0) / 4294967296);
}
function series(seed, n, lo = 0.25, hi = 0.95) {
  const r = rng(seed);
  let v = lo + (hi - lo) * r();
  return Array.from({ length: n }, () => (v = Math.min(hi, Math.max(lo, v + (r() - 0.45) * 0.22))));
}
function bars(seed, { w, h, n = 12, gap = 4, colors = ['#0f62fe'], radius = 0 }) {
  const s = series(seed, n);
  const bw = (w - gap * (n - 1)) / n;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s.map((v, i) => `<rect x="${(i * (bw + gap)).toFixed(1)}" y="${(h - v * h).toFixed(1)}" width="${bw.toFixed(1)}" height="${(v * h).toFixed(1)}" rx="${radius}" fill="${colors[i % colors.length]}"/>`).join('')}</svg>`;
}
function line(seed, { w, h, n = 24, color = '#0f62fe', width = 2, area = null, dash = '' }) {
  const s = series(seed, n);
  const pts = s.map((v, i) => [(i / (n - 1)) * w, h - v * h]);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('');
  const a = area ? `<path d="${d}L${w},${h}L0,${h}Z" fill="${area}"/>` : '';
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${a}<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}
// An abstract street map with an optional route, for logistics and ride screens.
function streetMap(seed, { w, h, bg = '#eef1f4', road = '#ffffff', minor = '#e1e6eb', water = '#cfe3f3', park = '#dcefd9', route = '#0f6cbd', pins = true }) {
  const r = rng(seed);
  let s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${bg}"/>`;
  s += `<path d="M0,${h * 0.78} C${w * 0.3},${h * 0.7} ${w * 0.5},${h * 0.95} ${w},${h * 0.82} L${w},${h} L0,${h}Z" fill="${water}"/>`;
  s += `<rect x="${w * 0.62}" y="${h * 0.12}" width="${w * 0.22}" height="${h * 0.2}" rx="6" fill="${park}"/>`;
  for (let i = 1; i < 9; i++) s += `<line x1="0" y1="${(i * h) / 9 + r() * 10}" x2="${w}" y2="${(i * h) / 9 + r() * 10}" stroke="${minor}" stroke-width="3"/>`;
  for (let i = 1; i < 12; i++) s += `<line x1="${(i * w) / 12 + r() * 10}" y1="0" x2="${(i * w) / 12 + r() * 10}" y2="${h}" stroke="${minor}" stroke-width="3"/>`;
  s += `<path d="M0,${h * 0.35} L${w},${h * 0.5}" stroke="${road}" stroke-width="10"/><path d="M${w * 0.3},0 L${w * 0.42},${h}" stroke="${road}" stroke-width="10"/>`;
  if (route) {
    const a = [w * 0.16, h * 0.68], b = [w * 0.38, h * 0.42], c = [w * 0.6, h * 0.47], d = [w * 0.82, h * 0.22];
    s += `<path d="M${a} L${b} L${c} L${d}" fill="none" stroke="${route}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (pins) s += `<circle cx="${a[0]}" cy="${a[1]}" r="9" fill="#fff" stroke="${route}" stroke-width="4"/><circle cx="${d[0]}" cy="${d[1]}" r="10" fill="${route}"/><circle cx="${d[0]}" cy="${d[1]}" r="4" fill="#fff"/>`;
  }
  return s + '</svg>';
}

// Generic desktop window around a web app.
function win(inner, { left = 64, top = 56, width = 1136, height = 760, chrome = '#e8e8ea', dot = '#c9c9cd', radius = 12, shadow = '0 30px 80px rgba(0,0,0,.28)' } = {}) {
  return `<div style="position:absolute;left:${left}px;top:${top}px;width:${width}px;height:${height}px;border-radius:${radius}px ${radius}px 0 0;overflow:hidden;box-shadow:${shadow};background:#fff">
  <div style="height:34px;background:${chrome};display:flex;align-items:center;gap:8px;padding:0 14px">${[0, 1, 2].map(() => `<i style="width:11px;height:11px;border-radius:50%;background:${dot};display:block"></i>`).join('')}<span style="margin-left:18px;width:320px;height:18px;border-radius:9px;background:rgba(0,0,0,.06)"></span></div>
  <div style="position:absolute;top:34px;left:0;right:0;bottom:0">${inner}</div></div>`;
}

function page({ fonts = [], css = '', body = '', bg = '#fff' }) {
  const links = fonts.length ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts.map((f) => 'family=' + f).join('&')}&display=block">` : '';
  return `<!doctype html><html><head><meta charset="utf-8">${links}<style>
  *{box-sizing:border-box;margin:0;padding:0}html,body{width:${W}px;height:${H}px;overflow:hidden}body{background:${bg};position:relative;-webkit-font-smoothing:antialiased}
  ${css}</style></head><body>${body}</body></html>`;
}

// ---------------------------------------------------------------- IBM Carbon
function carbon(p) {
  const g = p.g;
  const tag = { success: ['#a7f0ba', '#0e6027'], info: ['#d0e2ff', '#0043ce'], warning: ['#fcf4d6', '#8e6a00'], critical: ['#ffd7d9', '#a2191f'], neutral: ['#e0e0e0', '#161616'] };
  const rows = g.rows.slice(0, 5);
  const app = `<div class="cds">
  <header><span class="hb">${svgIcon('menu', { size: 20, stroke: '#f4f4f4' })}</span><b>${esc(g.title)}</b><span class="hn">${g.nav.slice(0, 3).map((n) => `<span>${esc(n)}</span>`).join('')}</span><span class="hi">${['search', 'bell', 'user'].map((n) => `<i>${svgIcon(n, { size: 20, stroke: '#f4f4f4' })}</i>`).join('')}</span></header>
  <nav>${g.nav.map((n, i) => `<a class="${i === 1 ? 'on' : ''}">${ic(n, { size: 16 })}<span>${esc(n)}</span></a>`).join('')}</nav>
  <main>
    <div class="crumb"><span>${esc(g.title)}</span> / <span>${esc(g.nav[1])}</span></div>
    <div class="head"><h1>${esc(g.page)}</h1><button>Create ${svgIcon('plus', { size: 16, stroke: '#fff' })}</button></div>
    <div class="tiles">
      <div class="tile"><p>${esc(g.nav[1])} this quarter</p>${bars(p.id + 'a', { w: 250, h: 70, n: 14, gap: 4, colors: ['#0f62fe'] })}</div>
      <div class="tile"><p>By status</p><div class="stack">${['#0f62fe', '#1192e8', '#009d9a', '#e0e0e0'].map((c, i) => `<i style="background:${c};flex:${[5, 3, 2, 2][i]}"></i>`).join('')}</div><div class="legend">${[...new Set(rows.map((r) => r[r.length - 1]))].slice(0, 3).map((r, i) => `<span><i style="background:${['#0f62fe', '#1192e8', '#009d9a'][i]}"></i>${esc(r)}</span>`).join('')}</div></div>
      <div class="tile"><p>Trend</p>${line(p.id + 'b', { w: 250, h: 70, color: '#009d9a', area: 'rgba(0,157,154,.12)' })}</div>
    </div>
    <div class="table"><div class="tt"><b>${esc(g.page)}</b><span>Updated just now</span></div>
      <div class="tb"><span class="search">${svgIcon('search', { size: 16, stroke: '#525252' })} Search</span><span class="tbtn">Export</span></div>
      <table><thead><tr>${g.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => i === r.length - 1 ? `<td><span class="tag" style="background:${tag[tone(c)][0]};color:${tag[tone(c)][1]}">${esc(c)}</span></td>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  </main></div>`;
  return page({
    fonts: ['IBM+Plex+Sans:wght@300;400;600'], bg: '#161616',
    css: `body{background:#161616;background-image:linear-gradient(#262626 1px,transparent 1px),linear-gradient(90deg,#262626 1px,transparent 1px);background-size:32px 32px}
    .cds{font-family:'IBM Plex Sans',sans-serif;position:absolute;inset:0;background:#f4f4f4;color:#161616}
    .cds header{height:48px;background:#161616;color:#f4f4f4;display:flex;align-items:center;font-size:14px;border-bottom:1px solid #393939}
    .cds .hb{width:48px;height:48px;display:grid;place-items:center}.cds header b{font-weight:600;padding:0 16px 0 4px;letter-spacing:.1px}
    .cds .hn{display:flex;height:48px;border-left:1px solid #393939}.cds .hn span{padding:0 16px;display:flex;align-items:center;color:#c6c6c6}
    .cds .hi{margin-left:auto;display:flex}.cds .hi i{width:48px;height:48px;display:grid;place-items:center}
    .cds nav{position:absolute;top:48px;bottom:0;left:0;width:240px;background:#fff;border-right:1px solid #e0e0e0;padding-top:16px}
    .cds nav a{display:flex;gap:12px;align-items:center;height:36px;padding:0 16px;font-size:14px;color:#525252;border-left:3px solid transparent}
    .cds nav a.on{background:#e8e8e8;color:#161616;font-weight:600;border-left-color:#0f62fe}
    .cds main{position:absolute;top:48px;left:240px;right:0;bottom:0;padding:24px 32px}
    .cds .crumb{font-size:12px;color:#0f62fe}.cds .crumb span:last-child{color:#525252}
    .cds .head{display:flex;align-items:center;margin:8px 0 20px}.cds h1{font-weight:300;font-size:32px;line-height:40px}
    .cds button{margin-left:auto;margin-right:100px;height:48px;width:200px;border:0;background:#0f62fe;color:#fff;font:400 14px 'IBM Plex Sans';text-align:left;padding:0 16px;display:flex;justify-content:space-between;align-items:center}
    .cds .tiles{display:grid;grid-template-columns:repeat(3,282px);gap:16px;margin-bottom:16px}
    .cds .tile{background:#fff;padding:16px;height:128px}.cds .tile p{font-size:12px;color:#525252;margin-bottom:14px;letter-spacing:.32px}
    .cds .stack{display:flex;height:16px;gap:2px;margin:12px 0 18px}.cds .stack i{display:block}
    .cds .legend{display:flex;gap:14px;font-size:12px;color:#525252}.cds .legend i{display:inline-block;width:8px;height:8px;margin-right:6px}
    .cds .table{background:#fff;width:878px}.cds .tt{padding:16px 16px 20px}.cds .tt b{font-weight:400;font-size:20px;display:block}.cds .tt span{font-size:14px;color:#525252}
    .cds .tb{display:flex;height:48px;background:#fff;border-top:1px solid #e0e0e0}.cds .search{flex:1;display:flex;align-items:center;gap:12px;padding:0 16px;color:#6f6f6f;font-size:14px;background:#f4f4f4}
    .cds .tbtn{width:140px;background:#393939;color:#fff;font-size:14px;display:flex;align-items:center;padding:0 16px}
    .cds table{width:100%;border-collapse:collapse;font-size:14px}.cds th{background:#e0e0e0;text-align:left;font-weight:600;height:48px;padding:0 16px}
    .cds td{height:48px;padding:0 16px;border-bottom:1px solid #e0e0e0;color:#525252}.cds .tag{display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:12px;font-size:12px}`,
    body: win(app, { chrome: '#e0e0e0', dot: '#a8a8a8', radius: 0, left: 80, top: 64 }),
  });
}

// ---------------------------------------------------------------- Ant Design
function ant(p) {
  const g = p.g;
  const tag = { success: ['#f6ffed', '#b7eb8f', '#389e0d'], info: ['#e6f4ff', '#91caff', '#0958d9'], warning: ['#fffbe6', '#ffe58f', '#d48806'], critical: ['#fff2f0', '#ffccc7', '#cf1322'], neutral: ['#fafafa', '#d9d9d9', 'rgba(0,0,0,.88)'] };
  const rows = g.rows.slice(0, 5);
  const app = `<div class="ant">
  <aside><div class="logo"><i></i>${esc(g.title)}</div>${g.nav.map((n, i) => `<a class="${i === 2 ? 'on' : ''}">${ic(n, { size: 14 })}<span>${esc(n)}</span></a>`).join('')}</aside>
  <header><span>${svgIcon('menu', { size: 16, stroke: 'rgba(0,0,0,.65)' })}</span><span class="bc">Home <em>/</em> ${esc(g.nav[2])} <em>/</em> <b>${esc(g.page)}</b></span><span class="me"><i>${svgIcon('bell', { size: 16, stroke: 'rgba(0,0,0,.65)' })}</i><span class="av">AD</span>Admin</span></header>
  <main>
    <div class="stats">${g.nav.slice(1, 4).map((n, i) => `<div class="card st"><p>${esc(n)}</p>${i % 2 ? bars(p.id + n, { w: 220, h: 46, n: 16, gap: 3, colors: ['#1677ff'], radius: 1 }) : line(p.id + n, { w: 220, h: 46, color: '#1677ff', area: '#e6f4ff', width: 1.5 })}<div class="ft">Week <span>${'●'.repeat(1)}</span></div></div>`).join('')}</div>
    <div class="card tbl"><div class="th"><b>${esc(g.page)}</b><span class="seg"><i class="on">All</i><i>Open</i><i>Closed</i></span><button>${svgIcon('plus', { size: 14, stroke: '#fff' })} New</button></div>
    <table><thead><tr>${g.cols.map((c) => `<th>${esc(c)}</th>`).join('')}<th>Action</th></tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => i === r.length - 1 ? `<td><span class="tag" style="background:${tag[tone(c)][0]};border-color:${tag[tone(c)][1]};color:${tag[tone(c)][2]}">${esc(c)}</span></td>` : `<td>${esc(c)}</td>`).join('')}<td><a class="lk">View</a> <a class="lk">Edit</a></td></tr>`).join('')}</tbody></table></div>
  </main></div>`;
  return page({
    bg: '#e6f4ff',
    css: `body{background:linear-gradient(135deg,#e6f4ff 0%,#bae0ff 100%)}
    .ant{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;position:absolute;inset:0;background:#f5f5f5;color:rgba(0,0,0,.88);font-size:14px}
    .ant aside{position:absolute;left:0;top:0;bottom:0;width:208px;background:#001529;padding-top:0}
    .ant .logo{height:64px;display:flex;align-items:center;gap:10px;padding:0 24px;color:#fff;font-weight:600;font-size:17px}.ant .logo i{width:28px;height:28px;border-radius:6px;background:#1677ff;display:block}
    .ant aside a{display:flex;align-items:center;gap:10px;height:40px;margin:4px 8px;padding:0 16px;border-radius:8px;color:rgba(255,255,255,.65)}
    .ant aside a.on{background:#1677ff;color:#fff}
    .ant header{position:absolute;left:208px;right:0;top:0;height:56px;background:#fff;box-shadow:0 1px 4px rgba(0,21,41,.08);display:flex;align-items:center;gap:16px;padding:0 24px}
    .ant .bc{color:rgba(0,0,0,.45)}.ant .bc em{font-style:normal;margin:0 6px}.ant .bc b{color:rgba(0,0,0,.88);font-weight:400}
    .ant .me{margin-left:auto;margin-right:60px;display:flex;align-items:center;gap:10px}.ant .av{width:28px;height:28px;border-radius:50%;background:#1677ff;color:#fff;font-size:12px;display:grid;place-items:center}
    .ant main{position:absolute;left:208px;right:0;top:56px;bottom:0;padding:24px}
    .ant .card{background:#fff;border-radius:8px}.ant .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:16px;margin-right:56px}
    .ant .st{padding:18px 20px 12px}.ant .st p{color:rgba(0,0,0,.45);margin-bottom:12px}.ant .ft{border-top:1px solid #f0f0f0;margin-top:10px;padding-top:8px;color:rgba(0,0,0,.45);font-size:12px}.ant .ft span{color:#52c41a;margin-left:6px}
    .ant .tbl{margin-right:56px;padding:0 0 8px}.ant .th{display:flex;align-items:center;gap:16px;padding:16px 24px}.ant .th b{font-size:16px;font-weight:600}
    .ant .seg{margin-left:auto;background:#f5f5f5;border-radius:6px;padding:2px;display:flex}.ant .seg i{font-style:normal;padding:4px 12px;border-radius:4px;color:rgba(0,0,0,.65)}.ant .seg i.on{background:#fff;color:rgba(0,0,0,.88);box-shadow:0 1px 2px rgba(0,0,0,.06)}
    .ant button{height:32px;border:0;border-radius:6px;background:#1677ff;color:#fff;padding:0 15px;font:inherit;display:flex;align-items:center;gap:6px;box-shadow:0 2px 0 rgba(5,145,255,.1)}
    .ant table{width:100%;border-collapse:collapse}.ant th{background:#fafafa;text-align:left;font-weight:600;padding:16px;border-bottom:1px solid #f0f0f0}
    .ant td{padding:16px;border-bottom:1px solid #f0f0f0}.ant .tag{display:inline-block;padding:0 7px;line-height:20px;font-size:12px;border:1px solid;border-radius:4px}.ant .lk{color:#1677ff;margin-right:12px}`,
    body: win(app, { chrome: '#f0f0f0', dot: '#d9d9d9' }),
  });
}

// ---------------------------------------------------------------- Fluent 2
function fluent2(p) {
  const g = p.g;
  const badge = { success: ['#f1faf1', '#9fd89f', '#0e700e'], info: ['#ebf3fc', '#b4d6fa', '#115ea3'], warning: ['#fff9f5', '#fdcfb4', '#bc4b09'], critical: ['#fdf3f4', '#eeacb2', '#b10e1c'], neutral: ['#fafafa', '#e0e0e0', '#424242'] };
  const side = g.map ? `<div class="card map"><div class="ch"><b>Live map</b><span>${esc(g.rows.length)} active</span></div>${streetMap(p.id, { w: 380, h: 420, route: '#0f6cbd' })}</div>`
    : `<div class="card map"><div class="ch"><b>This month</b><span>by week</span></div><div style="padding:20px">${bars(p.id, { w: 340, h: 200, n: 8, gap: 14, colors: ['#0f6cbd', '#2886de', '#038387'], radius: 4 })}</div><div class="legend">${['#0f6cbd', '#2886de', '#038387'].map((c, i) => `<span><i style="background:${c}"></i>${esc(g.nav[i + 1] || '')}</span>`).join('')}</div></div>`;
  const app = `<div class="flu">
  <header><span>${svgIcon('grid', { size: 18, stroke: '#fff' })}</span><b>${esc(g.title)}</b><span class="sb">${svgIcon('search', { size: 16, stroke: '#616161' })} Search</span><span class="av">MS</span></header>
  <nav>${g.nav.map((n, i) => `<a class="${i === 1 ? 'on' : ''}">${ic(n, { size: 20, width: 1.5 })}<span>${esc(n)}</span></a>`).join('')}</nav>
  <main><div class="head"><h1>${esc(g.page)}</h1><button class="pri">${svgIcon('plus', { size: 16, stroke: '#fff' })} New</button><button>Filter</button><button>Export</button></div>
  <div class="grid"><div class="card list">${g.rows.slice(0, 5).map((r) => { const t = tone(r[r.length - 1]); return `<div class="row"><span class="pa">${ic(r[0], { size: 20, stroke: '#0f6cbd', width: 1.5 })}</span><span class="tx"><b>${esc(r[0])}</b><small>${esc(r[1])}</small></span><span class="bd" style="background:${badge[t][0]};border-color:${badge[t][1]};color:${badge[t][2]}">${esc(r[r.length - 1])}</span></div>`; }).join('')}</div>${side}</div></main></div>`;
  return page({
    bg: '#ebf3fc',
    css: `body{background:linear-gradient(160deg,#ebf3fc 0%,#cfe4fa 100%)}
    .flu{font-family:'Segoe UI','Segoe UI Web (West European)',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',sans-serif;position:absolute;inset:0;background:#f5f5f5;color:#242424;font-size:14px}
    .flu header{height:48px;background:#0f6cbd;color:#fff;display:flex;align-items:center;gap:14px;padding:0 16px}.flu header b{font-size:16px;font-weight:600}
    .flu .sb{margin-left:120px;width:420px;height:32px;background:#fff;border-radius:4px;color:#616161;display:flex;align-items:center;gap:8px;padding:0 10px}
    .flu .av{margin-left:auto;margin-right:60px;width:32px;height:32px;border-radius:50%;background:#cfe4fa;color:#0f548c;display:grid;place-items:center;font-size:12px;font-weight:600}
    .flu nav{position:absolute;top:48px;left:0;bottom:0;width:240px;background:#fafafa;padding:12px 8px;border-right:1px solid #e0e0e0}
    .flu nav a{display:flex;align-items:center;gap:10px;height:40px;padding:0 12px;border-radius:4px;color:#424242;position:relative}
    .flu nav a.on{background:#ebebeb;color:#242424;font-weight:600}.flu nav a.on:before{content:'';position:absolute;left:0;top:10px;width:3px;height:20px;border-radius:2px;background:#0f6cbd}
    .flu main{position:absolute;top:48px;left:240px;right:0;bottom:0;padding:24px 28px}
    .flu .head{display:flex;align-items:center;gap:8px;margin-bottom:20px}.flu h1{font-size:28px;line-height:36px;font-weight:600;margin-right:auto}
    .flu button{height:32px;padding:0 12px;border-radius:4px;border:1px solid #d1d1d1;background:#fff;font:600 14px inherit;font-family:inherit;color:#242424;display:flex;align-items:center;gap:6px}
    .flu button.pri{background:#0f6cbd;border-color:#0f6cbd;color:#fff}.flu .head button:last-child{margin-right:60px}
    .flu .grid{display:grid;grid-template-columns:400px 380px;gap:16px}
    .flu .card{background:#fff;border-radius:8px;box-shadow:0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.14);overflow:hidden}
    .flu .row{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid #f0f0f0}.flu .pa{width:40px;height:40px;border-radius:50%;background:#ebf3fc;display:grid;place-items:center;flex:none}
    .flu .tx{flex:1;min-width:0}.flu .tx b{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.flu .tx small{font-size:12px;color:#616161}
    .flu .bd{border:1px solid;border-radius:9999px;font-size:12px;font-weight:600;padding:0 8px;line-height:20px;white-space:nowrap}
    .flu .ch{display:flex;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #f0f0f0}.flu .ch b{font-weight:600}.flu .ch span{color:#616161;font-size:12px}
    .flu .legend{display:flex;gap:16px;padding:0 20px;font-size:12px;color:#616161}.flu .legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:6px}`,
    body: win(app, { chrome: '#f0f0f0', dot: '#d1d1d1', radius: 8 }),
  });
}

// ---------------------------------------------------------------- Shopify Polaris
function polaris(p) {
  const g = p.g;
  const badge = { success: ['#cdfee1', '#0c5132'], info: ['#eaf4ff', '#00527c'], warning: ['#fff1e3', '#5e4200'], critical: ['#fee9e8', '#8e0b21'], neutral: ['#e3e3e3', '#4a4a4a'] };
  const app = `<div class="pol">
  <header><span class="sq"></span><span class="sb">${svgIcon('search', { size: 16, stroke: '#b5b5b5' })} Search</span><span class="av">${esc(initials(g.title))}</span></header>
  <nav>${g.nav.map((n, i) => `<a class="${i === 2 ? 'on' : ''}">${ic(n, { size: 18, width: 1.6 })}<span>${esc(n)}</span></a>`).join('')}</nav>
  <main><div class="head"><h1>${esc(g.page)}</h1><button class="sec">Export</button><button class="pri">Add ${esc(String(g.cols?.[0] || 'item').toLowerCase())}</button></div>
  <div class="card metrics">${g.nav.slice(1, 4).map((n, i) => `<div><p>${esc(n)}</p>${line(p.id + i, { w: 210, h: 40, color: ['#29845a', '#2c6ecb', '#b98900'][i], width: 2 })}</div>`).join('')}</div>
  <div class="card tbl"><div class="tabs"><i class="on">All</i><i>Active</i><i>Draft</i><i>Archived</i><span>${svgIcon('search', { size: 16, stroke: '#616161' })}</span></div>
  <table><thead><tr><th class="cb"><i></i></th>${g.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${g.rows.slice(0, 5).map((r) => `<tr><td class="cb"><i></i></td>${r.map((c, i) => i === 0 ? `<td><span class="th"></span><b>${esc(c)}</b></td>` : i === r.length - 1 ? `<td><span class="bd" style="background:${badge[tone(c)][0]};color:${badge[tone(c)][1]}">${esc(c)}</span></td>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></main></div>`;
  return page({
    fonts: ['Inter:wght@400;500;600;700'], bg: '#d6f5e4',
    css: `body{background:linear-gradient(150deg,#d6f5e4 0%,#f1f1f1 70%)}
    .pol{font-family:Inter,-apple-system,sans-serif;position:absolute;inset:0;background:#f1f1f1;color:#303030;font-size:13px}
    .pol header{height:56px;background:#1a1a1a;display:flex;align-items:center;padding:0 16px;gap:16px}.pol .sq{width:28px;height:28px;border-radius:8px;background:#e3e3e3}
    .pol .sb{margin-left:200px;width:480px;height:34px;border-radius:10px;background:#303030;color:#b5b5b5;display:flex;align-items:center;gap:8px;padding:0 12px;border:1px solid #4a4a4a}
    .pol .av{margin-left:auto;margin-right:60px;width:30px;height:30px;border-radius:8px;background:#6be0b0;color:#0c5132;display:grid;place-items:center;font-weight:600;font-size:12px}
    .pol nav{position:absolute;top:56px;left:0;bottom:0;width:240px;background:#ebebeb;padding:12px}
    .pol nav a{display:flex;align-items:center;gap:8px;height:32px;padding:0 8px;border-radius:8px;color:#303030;font-weight:500;margin-bottom:2px}.pol nav a svg{color:#4a4a4a}
    .pol nav a.on{background:#fafafa;font-weight:650;box-shadow:0 1px 0 rgba(0,0,0,.05)}
    .pol main{position:absolute;top:56px;left:240px;right:0;bottom:0;padding:24px 32px}
    .pol .head{display:flex;align-items:center;gap:8px;margin-bottom:16px;margin-right:64px}.pol h1{font-size:20px;font-weight:700;margin-right:auto}
    .pol button{height:28px;padding:0 12px;border-radius:8px;font:600 12px Inter;border:0}
    .pol .pri{background:#303030;color:#fff;box-shadow:inset 0 -1px 0 #000,inset 0 1px 0 rgba(255,255,255,.24)}.pol .sec{background:#fff;color:#303030;box-shadow:inset 0 -1px 0 #b5b5b5,0 0 0 1px rgba(0,0,0,.08)}
    .pol .card{background:#fff;border-radius:12px;box-shadow:0 0 0 1px rgba(0,0,0,.07),0 1px 0 rgba(0,0,0,.05);margin-right:64px;margin-bottom:16px;overflow:hidden}
    .pol .metrics{display:grid;grid-template-columns:repeat(3,1fr)}.pol .metrics div{padding:14px 16px;border-right:1px solid #ebebeb}.pol .metrics p{font-size:12px;color:#616161;margin-bottom:8px;font-weight:500}
    .pol .tabs{display:flex;gap:4px;padding:8px}.pol .tabs i{font-style:normal;padding:6px 12px;border-radius:8px;color:#616161;font-weight:550}.pol .tabs i.on{background:#ebebeb;color:#303030}.pol .tabs span{margin-left:auto;padding:4px 8px}
    .pol table{width:100%;border-collapse:collapse}.pol th{background:#f7f7f7;text-align:left;font-size:12px;font-weight:550;color:#616161;padding:8px 12px;border-top:1px solid #ebebeb;border-bottom:1px solid #ebebeb}
    .pol td{padding:10px 12px;border-bottom:1px solid #f1f1f1;color:#303030}.pol td b{font-weight:600}.pol .cb{width:36px}.pol .cb i{display:block;width:16px;height:16px;border-radius:4px;border:1px solid #8a8a8a}
    .pol .th{display:inline-block;width:28px;height:28px;border-radius:6px;background:#ebebeb;vertical-align:middle;margin-right:10px;border:1px solid #e3e3e3}
    .pol .bd{display:inline-block;border-radius:8px;padding:2px 8px;font-size:12px;font-weight:550}`,
    body: win(app, { chrome: '#e3e3e3', dot: '#cccccc', radius: 12 }),
  });
}

// ---------------------------------------------------------------- Adobe Spectrum
function spectrum(p) {
  const g = p.g;
  const palettes = { 'wedding-marketplace': ['#f4c7b8', '#e8a87c', '#c38d5e', '#89b0ae', '#d8b4a0', '#bee3db'], 'creator-bounties': ['#ffc65c', '#73c7ff', '#7fdcb0', '#ff9b73', '#9fd0ff', '#ffe08a'], 'architect-learning': ['#c9d6df', '#a7bfd0', '#e2c9a8', '#8faeb9', '#d7c5b2', '#b8cfc6'] };
  const pal = palettes[p.id] || palettes['architect-learning'];
  const app = `<div class="spc">
  <header><b>${esc(g.title)}</b><span class="sf">${svgIcon('search', { size: 16, stroke: '#6e6e6e' })} Search</span><button class="cta">${esc(g.cta)}</button><span class="av"></span></header>
  <nav>${g.nav.map((n, i) => `<a class="${i === (p.id === 'wedding-marketplace' ? 4 : 2) ? 'on' : ''}">${ic(n, { size: 18, width: 1.6 })}<span>${esc(n)}</span></a>`).join('')}</nav>
  <main><div class="head"><h1>${esc(g.page)}</h1><span class="ab">Sort</span><span class="ab">Filter</span><span class="pk">Newest first <em>⌄</em></span></div>
  <div class="cards">${g.rows.slice(0, 6).map((r, i) => `<div class="cd"><div class="pv" style="background:linear-gradient(135deg,${pal[i % pal.length]},${pal[(i + 2) % pal.length]})"><svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M0,120 L60,${50 + (i * 13) % 30} L110,${90 - (i * 7) % 25} L150,${60 + (i * 11) % 30} L200,${80 - (i * 5) % 20} L200,120Z" fill="rgba(255,255,255,.28)"/><circle cx="${150 - i * 9}" cy="34" r="12" fill="rgba(255,255,255,.55)"/></svg></div><div class="bd"><b>${esc(r[0])}</b><small>${esc(r[1])}</small></div></div>`).join('')}</div></main></div>`;
  return page({
    fonts: ['Source+Sans+3:wght@400;600;700;800'], bg: '#eef3fb',
    css: `body{background:linear-gradient(135deg,#fdf1e7 0%,#e5f0fe 100%)}
    .spc{font-family:'Source Sans 3','Adobe Clean',sans-serif;position:absolute;inset:0;background:#f8f8f8;color:#2c2c2c;font-size:14px}
    .spc header{height:56px;background:#fff;border-bottom:1px solid #e1e1e1;display:flex;align-items:center;gap:16px;padding:0 20px}.spc header b{font-size:18px;font-weight:800}
    .spc .sf{margin-left:auto;width:300px;height:32px;border:1px solid #b3b3b3;border-radius:4px;display:flex;align-items:center;gap:8px;padding:0 10px;color:#6e6e6e}
    .spc .cta{height:32px;padding:0 16px;border-radius:16px;border:0;background:#1473e6;color:#fff;font:700 14px 'Source Sans 3'}
    .spc .av{width:32px;height:32px;border-radius:50%;background:#d3d3d3;margin-right:60px}
    .spc nav{position:absolute;top:56px;left:0;bottom:0;width:220px;padding:16px 12px;background:#f8f8f8;border-right:1px solid #e1e1e1}
    .spc nav a{display:flex;align-items:center;gap:10px;height:34px;padding:0 12px;border-radius:4px;color:#4b4b4b;margin-bottom:2px}.spc nav a.on{background:#e1e1e1;color:#2c2c2c;font-weight:700}
    .spc main{position:absolute;top:56px;left:220px;right:0;bottom:0;padding:28px 32px}
    .spc .head{display:flex;align-items:center;gap:8px;margin-bottom:22px;margin-right:64px}.spc h1{font-size:28px;font-weight:800;margin-right:auto}
    .spc .ab{height:32px;padding:0 14px;border-radius:4px;border:1px solid #b3b3b3;display:flex;align-items:center;color:#4b4b4b;font-weight:600}
    .spc .pk{height:32px;padding:0 12px;border-bottom:1px solid #8e8e8e;display:flex;align-items:center;gap:20px;color:#4b4b4b}.spc .pk em{font-style:normal}
    .spc .cards{display:grid;grid-template-columns:repeat(3,264px);gap:20px}.spc .cd{background:#fff;border:1px solid #e1e1e1;border-radius:4px;overflow:hidden}
    .spc .pv{height:150px}.spc .bd{padding:14px 16px}.spc .bd b{display:block;font-size:16px;font-weight:700}.spc .bd small{font-size:14px;color:#6e6e6e}`,
    body: win(app, { chrome: '#eaeaea', dot: '#cacaca', radius: 10 }),
  });
}

// ---------------------------------------------------------------- Vercel Geist
function geist(p) {
  const g = p.g;
  const dot = { success: '#45a557', info: '#0072f5', warning: '#f5a623', critical: '#e5484d', neutral: '#8f8f8f' };
  const tints = ['#d3f2ee', '#fdecc8', '#dcf2d0', '#dbe8ff', '#ffe1d1', '#e4e7eb'];
  const accents = ['#0f766e', '#b45309', '#3f7d20', '#1d4ed8', '#c2410c', '#475569'];
  const body = p.mode === 'grid'
    ? `<div class="sites">${g.sites.map((s, i) => `<div class="site"><div class="thumb" style="background:${tints[i % 6]}"><div class="tn"><i style="background:${accents[i % 6]}"></i><b></b><b></b><b></b></div><div class="hero"><span style="background:${accents[i % 6]}"></span><span></span><span class="sm"></span><em style="background:${accents[i % 6]}"></em></div></div><div class="meta"><b>${esc(s)}</b><code>next.js · ${['live', 'live', 'live', 'live', 'live', 'live'][i]}</code></div></div>`).join('')}</div>`
    : `<div class="list">${g.rows.slice(0, 5).map((r) => `<div class="row"><span class="ic">${ic(r[0], { size: 16, stroke: '#171717', width: 1.5 })}</span><span class="tx"><b>${esc(r[0])}</b><small>${esc(r[1])}</small></span><span class="st"><i style="background:${dot[tone(r[r.length - 1])]}"></i>${esc(r[r.length - 1])}</span><span class="dots">···</span></div>`).join('')}</div>`;
  const app = `<div class="gst">
  <header><i class="lg"></i><em>/</em><b>${esc(g.title)}</b><span class="pill">Production</span><span class="r"><span class="fb">Feedback</span><span class="av"></span></span></header>
  <div class="tabs">${(g.nav || ['Overview', 'Sites', 'Analytics', 'Settings']).map((n, i) => `<a class="${i === (p.mode === 'grid' ? 0 : 1) ? 'on' : ''}">${esc(n)}</a>`).join('')}</div>
  <main><div class="head"><h1>${esc(g.page)}</h1><span class="in">${svgIcon('search', { size: 15, stroke: '#8f8f8f' })} Search…</span><button>New</button></div>${body}</main></div>`;
  return page({
    fonts: ['Geist:wght@400;500;600;700', 'Geist+Mono:wght@400'], bg: '#000',
    css: `body{background:#000;background-image:radial-gradient(#222 1px,transparent 1px);background-size:22px 22px}
    .gst{font-family:Geist,sans-serif;position:absolute;inset:0;background:#fafafa;color:#171717;font-size:14px}
    .gst header{height:64px;background:#fff;display:flex;align-items:center;gap:12px;padding:0 24px}.gst .lg{width:22px;height:22px;border-radius:50%;background:#171717;display:block}.gst header em{font-style:normal;color:#d4d4d4;font-size:22px}.gst header b{font-weight:600}
    .gst .pill{font-size:12px;padding:2px 8px;border-radius:999px;background:#ededed;color:#666;font-weight:500}.gst .r{margin-left:auto;margin-right:60px;display:flex;gap:12px;align-items:center}.gst .fb{height:32px;padding:0 12px;border:1px solid #eaeaea;border-radius:6px;display:flex;align-items:center;color:#666}.gst .av{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#0f766e,#1d4ed8)}
    .gst .tabs{background:#fff;border-bottom:1px solid #eaeaea;display:flex;gap:4px;padding:0 16px}.gst .tabs a{padding:12px 10px;color:#666;border-bottom:2px solid transparent}.gst .tabs a.on{color:#171717;border-bottom-color:#171717}
    .gst main{padding:32px 40px}.gst .head{display:flex;align-items:center;gap:12px;margin-bottom:24px;margin-right:64px}.gst h1{font-size:32px;font-weight:600;letter-spacing:-1.28px;margin-right:auto}
    .gst .in{width:260px;height:40px;border:1px solid #eaeaea;border-radius:6px;background:#fff;display:flex;align-items:center;gap:8px;padding:0 12px;color:#8f8f8f}
    .gst button{height:40px;padding:0 16px;border-radius:6px;border:0;background:#171717;color:#fff;font:500 14px Geist}
    .gst .list{background:#fff;border:1px solid #eaeaea;border-radius:12px;margin-right:64px}.gst .row{display:flex;align-items:center;gap:14px;padding:16px 20px;border-bottom:1px solid #eaeaea}.gst .row:last-child{border:0}
    .gst .ic{width:32px;height:32px;border-radius:50%;border:1px solid #eaeaea;display:grid;place-items:center}.gst .tx{flex:1}.gst .tx b{display:block;font-weight:600}.gst .tx small{color:#666;font-family:'Geist Mono',monospace;font-size:12px}
    .gst .st{display:flex;align-items:center;gap:8px;color:#666;width:120px}.gst .st i{width:8px;height:8px;border-radius:50%;display:block}.gst .dots{color:#8f8f8f;letter-spacing:1px}
    .gst .sites{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-right:64px}.gst .site{background:#fff;border:1px solid #eaeaea;border-radius:12px;overflow:hidden}
    .gst .thumb{height:150px;padding:12px 14px;border-bottom:1px solid #eaeaea}.gst .tn{display:flex;gap:6px;align-items:center;margin-bottom:18px}.gst .tn i{width:14px;height:14px;border-radius:4px;display:block;margin-right:auto}.gst .tn b{width:28px;height:5px;border-radius:3px;background:rgba(0,0,0,.18)}
    .gst .hero span{display:block;height:9px;border-radius:5px;background:rgba(0,0,0,.2);width:70%;margin-bottom:7px}.gst .hero span:first-child{height:14px;width:85%;opacity:.9}.gst .hero .sm{width:45%}.gst .hero em{display:block;width:64px;height:20px;border-radius:5px;margin-top:12px}
    .gst .meta{padding:12px 14px}.gst .meta b{display:block;font-weight:600}.gst .meta code{font-family:'Geist Mono',monospace;font-size:12px;color:#666}`,
    body: win(app, { chrome: '#ededed', dot: '#d4d4d4', radius: 12, left: 72, top: 60 }),
  });
}

// ---------------------------------------------------------------- Elastic UI
function eui(p) {
  const g = p.g;
  const health = { success: '#008a5e', info: '#0b64dd', warning: '#f6b73c', critical: '#c61e25', neutral: '#a2abba' };
  const W2 = 560, H2 = 210;
  let chart;
  if (g.series === 'forecast') {
    const a = series(p.id, 30, 0.35, 0.75);
    const pts = a.map((v, i) => [(i / 29) * W2 * 0.62, H2 - v * H2]);
    const f = series(p.id + 'f', 12, 0.4, 0.8).map((v, i) => [W2 * 0.62 + ((i + 1) / 12) * W2 * 0.38, H2 - v * H2]);
    const fl = [pts[pts.length - 1], ...f];
    const d = (arr) => arr.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join('');
    const band = `${d(fl.map(([x, y], i) => [x, y - 10 - i * 3]))}L${fl.slice().reverse().map(([x, y], i) => `${x.toFixed(1)},${(y + 10 + (fl.length - 1 - i) * 3).toFixed(1)}`).join('L')}Z`;
    chart = `<svg width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}">${[0.25, 0.5, 0.75].map((k) => `<line x1="0" x2="${W2}" y1="${H2 * k}" y2="${H2 * k}" stroke="#e3e8f2"/>`).join('')}<path d="${band}" fill="rgba(11,100,221,.12)"/><path d="${d(pts)}" fill="none" stroke="#16c5c0" stroke-width="2.5"/><path d="${d(fl)}" fill="none" stroke="#0b64dd" stroke-width="2.5" stroke-dasharray="6 5"/><line x1="${W2 * 0.62}" x2="${W2 * 0.62}" y1="0" y2="${H2}" stroke="#a2abba" stroke-dasharray="3 3"/></svg>`;
  } else {
    chart = `<div style="position:relative;width:${W2}px;height:${H2}px">${['#16c5c0', '#61a2ff', '#f6726a'].map((c, i) => `<div style="position:absolute;inset:0">${line(p.id + i, { w: W2, h: H2, color: c, width: 2 })}</div>`).join('')}</div>`;
  }
  const app = `<div class="eui">
  <header><i class="lg"></i><span class="bc">${esc(g.title)} ${svgIcon('chevron', { size: 12, stroke: '#69707d' })} <b>${esc(g.page)}</b></span><span class="sr">${svgIcon('search', { size: 14, stroke: '#69707d' })} Search</span></header>
  <nav>${g.nav.map((n, i) => `<a class="${i === 0 ? 'on' : ''}">${ic(n, { size: 16, width: 1.6 })}<span>${esc(n)}</span></a>`).join('')}</nav>
  <main><div class="head"><h1>${esc(g.page)}</h1><span class="dp">${svgIcon('calendar', { size: 14, stroke: '#0b64dd' })} Last 90 days</span><button>Refresh</button></div>
  <div class="row1"><div class="pn chart"><div class="pt"><b>${g.series === 'forecast' ? 'Actual and forecast demand' : 'Flow by site'}</b><span class="lg2">${(g.series === 'forecast' ? [['#16c5c0', 'Actual'], ['#0b64dd', 'Forecast']] : [['#16c5c0', 'Block A'], ['#61a2ff', 'Block C'], ['#f6726a', 'Pump house']]).map(([c, l]) => `<i style="background:${c}"></i>${l}`).join('')}</span></div>${chart}</div>
  <div class="side">${g.nav.slice(1, 4).map((n, i) => `<div class="pn st"><small>${esc(n)}</small>${bars(p.id + n, { w: 190, h: 34, n: 18, gap: 3, colors: [['#16c5c0', '#61a2ff', '#f6b73c'][i]], radius: 1 })}</div>`).join('')}</div></div>
  <div class="pn grid"><table><thead><tr>${g.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${g.rows.slice(0, 4).map((r) => `<tr>${r.map((c, i) => i === r.length - 1 ? `<td><span class="hl"><i style="background:${health[tone(c)]}"></i>${esc(c)}</span></td>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></main></div>`;
  return page({
    fonts: ['Inter:wght@400;500;600;700'], bg: '#0b1628',
    css: `body{background:radial-gradient(circle at 80% 10%,#1d4f9e 0%,#0b1628 60%)}
    .eui{font-family:Inter,sans-serif;position:absolute;inset:0;background:#f6f9fc;color:#07101f;font-size:14px}
    .eui header{height:48px;background:#fff;border-bottom:1px solid #e3e8f2;display:flex;align-items:center;gap:14px;padding:0 16px}.eui .lg{width:24px;height:24px;border-radius:6px;background:linear-gradient(135deg,#16c5c0,#0b64dd);display:block}
    .eui .bc{display:flex;align-items:center;gap:8px;color:#516381}.eui .bc b{color:#07101f;font-weight:500}
    .eui .sr{margin-left:auto;margin-right:60px;width:300px;height:32px;border:1px solid #cad3e2;border-radius:6px;display:flex;align-items:center;gap:8px;padding:0 10px;color:#69707d;background:#fbfcfd}
    .eui nav{position:absolute;top:48px;left:0;bottom:0;width:220px;background:#fff;border-right:1px solid #e3e8f2;padding:16px 8px}
    .eui nav a{display:flex;align-items:center;gap:10px;height:34px;padding:0 10px;border-radius:4px;color:#1d2a3e;margin-bottom:2px}.eui nav a.on{background:#e8f1ff;color:#0b64dd;font-weight:600}
    .eui main{position:absolute;top:48px;left:220px;right:0;bottom:0;padding:24px}
    .eui .head{display:flex;align-items:center;gap:8px;margin-bottom:18px;margin-right:64px}.eui h1{font-size:28px;font-weight:700;margin-right:auto;letter-spacing:-.3px}
    .eui .dp{height:32px;border:1px solid #cad3e2;border-radius:6px;background:#fff;display:flex;align-items:center;gap:8px;padding:0 12px;color:#0b64dd;font-weight:500}
    .eui button{height:32px;padding:0 14px;border:0;border-radius:6px;background:#0b64dd;color:#fff;font:600 14px Inter}
    .eui .pn{background:#fff;border:1px solid #e3e8f2;border-radius:6px}.eui .row1{display:flex;gap:16px;margin-bottom:16px}
    .eui .chart{padding:16px;width:594px}.eui .pt{display:flex;justify-content:space-between;margin-bottom:12px}.eui .pt b{font-weight:600}.eui .lg2{font-size:12px;color:#516381;display:flex;align-items:center;gap:6px}.eui .lg2 i{width:10px;height:10px;border-radius:2px;display:block;margin-left:8px}
    .eui .side{display:flex;flex-direction:column;gap:16px}.eui .st{padding:14px 16px;width:224px}.eui .st small{display:block;font-size:12px;color:#516381;margin-bottom:10px}
    .eui .grid{margin-right:64px;overflow:hidden}.eui table{width:100%;border-collapse:collapse}.eui th{text-align:left;font-size:12px;font-weight:600;color:#1d2a3e;padding:10px 14px;border-bottom:1px solid #e3e8f2;background:#fbfcfd}
    .eui td{padding:10px 14px;border-bottom:1px solid #eef2f7}.eui .hl{display:inline-flex;align-items:center;gap:8px}.eui .hl i{width:8px;height:8px;border-radius:50%;display:block}`,
    body: win(app, { chrome: '#e3e8f2', dot: '#cad3e2', radius: 8 }),
  });
}

// ---------------------------------------------------------------- Atlassian
function atlassian(p) {
  const g = p.g;
  const avc = ['#94c748', '#e2b203', '#6cc3e0', '#f87168', '#4bce97'];
  const typeC = ['#4bade8', '#65ba43', '#e5493a', '#f79232'];
  const cols = g.cols.map((c) => ({ c, items: g.rows.filter((r) => r[1] === c) }));
  const app = `<div class="ads">
  <header><span class="ws">${svgIcon('grid', { size: 18, stroke: '#44546f' })}</span><i class="lg"></i><b>${esc(g.title)}</b><span class="tn">Your work</span><span class="tn">Projects</span><span class="tn">Filters</span><button>Create</button><span class="sr">${svgIcon('search', { size: 14, stroke: '#626f86' })} Search</span><span class="av" style="background:#94c748">MS</span></header>
  <nav><div class="ph"><i></i><span><b>${esc(g.page)}</b><small>Work project</small></span></div>${g.nav.map((n, i) => `<a class="${i === 1 ? 'on' : ''}">${ic(n, { size: 16, width: 1.6 })}<span>${esc(n)}</span></a>`).join('')}</nav>
  <main><div class="crumb">Projects / ${esc(g.page)}</div><div class="head"><h1>Board</h1></div>
  <div class="tools"><span class="sr2">${svgIcon('search', { size: 14, stroke: '#626f86' })}</span><span class="avs">${avc.slice(0, 4).map((c, i) => `<i style="background:${c}">${['MS', 'AK', 'RS', 'JK'][i]}</i>`).join('')}</span><span class="fl">Epic</span><span class="fl">Type</span></div>
  <div class="board">${cols.map((col) => `<div class="col"><div class="ch">${esc(col.c.toUpperCase())} <span>${col.items.length}</span></div>${col.items.map((r, i) => `<div class="card"><p>${esc(r[0])}</p><div class="cf"><i style="background:${typeC[(r[0].length + i) % 4]}"></i><span>${esc(initials(g.title))}-${100 + r[0].length * 3 + i}</span><em style="background:${avc[r[2].charCodeAt(0) % 5]}">${esc(r[2])}</em></div></div>`).join('')}</div>`).join('')}</div></main></div>`;
  return page({
    bg: '#e9f2ff',
    css: `body{background:linear-gradient(135deg,#e9f2ff 0%,#cce0ff 100%)}
    .ads{font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',Ubuntu,system-ui,'Helvetica Neue',sans-serif;position:absolute;inset:0;background:#fff;color:#172b4d;font-size:14px}
    .ads header{height:56px;border-bottom:1px solid rgba(9,30,66,.14);display:flex;align-items:center;gap:12px;padding:0 12px}.ads .ws{width:32px;height:32px;display:grid;place-items:center}.ads .lg{width:24px;height:24px;border-radius:4px;background:#0c66e4;display:block}.ads header b{font-size:16px;margin-right:12px}
    .ads .tn{color:#44546f;font-weight:500}.ads button{height:32px;padding:0 12px;border:0;border-radius:3px;background:#0c66e4;color:#fff;font:500 14px inherit;font-family:inherit}
    .ads .sr{margin-left:auto;width:220px;height:32px;border:1px solid #8590a2;border-radius:3px;display:flex;align-items:center;gap:8px;padding:0 8px;color:#626f86}
    .ads .av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:#172b4d;margin-right:60px}
    .ads nav{position:absolute;top:56px;left:0;bottom:0;width:240px;border-right:1px solid rgba(9,30,66,.14);padding:16px 8px}
    .ads .ph{display:flex;gap:10px;align-items:center;padding:4px 8px 16px}.ads .ph i{width:32px;height:32px;border-radius:4px;background:#e2b203;display:block}.ads .ph b{display:block;font-size:14px}.ads .ph small{font-size:12px;color:#626f86}
    .ads nav a{display:flex;align-items:center;gap:10px;height:40px;padding:0 10px;border-radius:3px;color:#44546f;font-weight:500}.ads nav a.on{background:#e9f2ff;color:#0c66e4}
    .ads main{position:absolute;top:56px;left:240px;right:0;bottom:0;padding:20px 32px}.ads .crumb{color:#44546f}.ads h1{font-size:24px;font-weight:600;margin:6px 0 16px}
    .ads .tools{display:flex;align-items:center;gap:12px;margin-bottom:16px}.ads .sr2{width:160px;height:32px;border:1px solid #8590a2;border-radius:3px;display:flex;align-items:center;padding:0 8px}
    .ads .avs{display:flex}.ads .avs i{width:30px;height:30px;border-radius:50%;border:2px solid #fff;margin-left:-6px;display:grid;place-items:center;font-size:11px;font-weight:700;font-style:normal}.ads .avs i:first-child{margin-left:0}
    .ads .fl{height:32px;padding:0 12px;border-radius:3px;background:rgba(9,30,66,.06);display:flex;align-items:center;color:#44546f;font-weight:500}
    .ads .board{display:grid;grid-template-columns:repeat(4,206px);gap:10px}.ads .col{background:#f7f8f9;border-radius:6px;padding:8px;min-height:420px}
    .ads .ch{font-size:12px;font-weight:600;color:#626f86;padding:6px 6px 10px}.ads .ch span{margin-left:4px}
    .ads .card{background:#fff;border-radius:4px;box-shadow:0 1px 1px rgba(9,30,66,.25),0 0 1px rgba(9,30,66,.31);padding:10px 10px 8px;margin-bottom:8px}.ads .card p{margin-bottom:12px;line-height:20px}
    .ads .cf{display:flex;align-items:center;gap:6px;font-size:12px;color:#626f86;font-weight:600}.ads .cf i{width:14px;height:14px;border-radius:3px;display:block}.ads .cf em{margin-left:auto;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-style:normal;color:#172b4d}`,
    body: win(app, { chrome: '#f1f2f4', dot: '#dcdfe4', radius: 8 }),
  });
}

// ---------------------------------------------------------------- Salesforce Lightning
function slds(p) {
  const g = p.g;
  const badge = { success: ['#2e844a', '#fff'], info: ['#0176d3', '#fff'], warning: ['#fe9339', '#181818'], critical: ['#ba0517', '#fff'], neutral: ['#fff', '#181818'] };
  const iconTile = { Quote: '#26aba4', Family: '#3ba755', Lead: '#f88962', Case: '#f2cf5b' }[g.icon] || '#06a59a';
  const app = `<div class="sld">
  <header><span class="wf">${Array.from({ length: 9 }, () => '<i></i>').join('')}</span><span class="sr">${svgIcon('search', { size: 14, stroke: '#706e6b' })} Search…</span><span class="ut">${['bell', 'settings', 'user'].map((n) => `<i>${svgIcon(n, { size: 16, stroke: '#706e6b' })}</i>`).join('')}</span></header>
  <div class="nb"><b>${esc(g.title)}</b>${g.nav.map((n, i) => `<a class="${i === 1 ? 'on' : ''}">${esc(n)}</a>`).join('')}</div>
  <main><div class="card ph"><span class="it" style="background:${iconTile}">${svgIcon('doc', { size: 20, stroke: '#fff' })}</span><span><small>${esc(g.icon || 'Record')}</small><b>${esc(g.page)}</b></span><span class="bg"><button class="nt">Follow</button><button class="nt">Edit</button><button class="br">New</button></span></div>
  <div class="card path"><div class="steps">${g.steps.map((s, i) => `<span class="${i < g.current ? 'done' : i === g.current ? 'cur' : ''}">${i < g.current ? svgIcon('check', { size: 14, stroke: '#fff', width: 2.5 }) : esc(s)}</span>`).join('')}</div><button class="br">Mark stage as complete</button></div>
  <div class="two"><div class="card det"><div class="ct">Details</div>${[['Owner', 'Manjot Singh'], ['Stage', g.steps[g.current]], ['Type', g.icon || 'Record'], ['Next step', g.rows[0][0]]].map(([k, v]) => `<div class="fd"><small>${esc(k)}</small><span>${esc(v)}</span></div>`).join('')}</div>
  <div class="card rel"><div class="ct">${svgIcon('grid', { size: 14, stroke: '#0176d3' })} Related <span>(${g.rows.length})</span></div><table><thead><tr>${g.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${g.rows.map((r) => `<tr>${r.map((c, i) => i === 0 ? `<td><a>${esc(c)}</a></td>` : i === r.length - 1 ? `<td><span class="bd" style="background:${badge[tone(c)][0]};color:${badge[tone(c)][1]}">${esc(c)}</span></td>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></main></div>`;
  return page({
    bg: '#032d60',
    css: `body{background:linear-gradient(135deg,#0176d3 0%,#032d60 100%)}
    .sld{font-family:'Salesforce Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;position:absolute;inset:0;background:#f3f3f3;color:#181818;font-size:13px}
    .sld header{height:48px;background:#fff;display:flex;align-items:center;gap:16px;padding:0 16px;border-bottom:1px solid #e5e5e5}.sld .wf{display:grid;grid-template-columns:repeat(3,4px);gap:3px}.sld .wf i{width:4px;height:4px;border-radius:50%;background:#706e6b}
    .sld .sr{margin-left:200px;width:440px;height:32px;border:1px solid #c9c9c9;border-radius:4px;display:flex;align-items:center;gap:8px;padding:0 12px;color:#706e6b}
    .sld .ut{margin-left:auto;margin-right:60px;display:flex;gap:12px}.sld .ut i{width:28px;height:28px;border-radius:50%;display:grid;place-items:center}
    .sld .nb{height:40px;background:#fff;display:flex;align-items:stretch;padding:0 16px;border-bottom:3px solid #0176d3;box-shadow:0 2px 3px rgba(0,0,0,.08)}.sld .nb b{font-size:18px;font-weight:400;padding-right:24px;display:flex;align-items:center}
    .sld .nb a{padding:0 12px;display:flex;align-items:center;color:#181818}.sld .nb a.on{border-bottom:3px solid #0176d3;margin-bottom:-3px;font-weight:700;background:#fff}
    .sld main{padding:12px;padding-right:72px}.sld .card{background:#fff;border:1px solid #e5e5e5;border-radius:4px;box-shadow:0 2px 2px rgba(0,0,0,.1);margin-bottom:12px}
    .sld .ph{display:flex;align-items:center;gap:12px;padding:16px}.sld .it{width:40px;height:40px;border-radius:4px;display:grid;place-items:center}.sld .ph small{display:block;color:#444}.sld .ph b{font-size:20px;font-weight:700}
    .sld .bg{margin-left:auto;display:flex}.sld button{height:32px;padding:0 16px;font:inherit;font-family:inherit;border-radius:4px}.sld .nt{background:#fff;border:1px solid #c9c9c9;color:#0176d3;margin-left:-1px}.sld .br{background:#0176d3;border:1px solid #0176d3;color:#fff;margin-left:8px}
    .sld .path{display:flex;align-items:center;gap:12px;padding:12px 16px}.sld .steps{flex:1;display:flex;gap:6px}.sld .steps span{flex:1;height:32px;display:grid;place-items:center;background:#ecebea;color:#181818;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,0 100%,10px 50%);font-weight:600}
    .sld .steps span:first-child{clip-path:polygon(0 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,0 100%);border-radius:16px 0 0 16px}.sld .steps .done{background:#3ba755}.sld .steps .cur{background:#014486;color:#fff}
    .sld .two{display:grid;grid-template-columns:300px 1fr;gap:12px}.sld .ct{padding:12px 16px;font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px}.sld .ct span{font-weight:400;color:#444}
    .sld .fd{padding:8px 16px;border-bottom:1px solid #e5e5e5}.sld .fd small{display:block;color:#444;font-size:12px}.sld .fd span{font-size:14px}
    .sld table{width:100%;border-collapse:collapse}.sld th{text-align:left;font-size:12px;font-weight:700;color:#444;background:#f3f3f3;padding:8px 16px;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5}
    .sld td{padding:10px 16px;border-bottom:1px solid #e5e5e5}.sld td a{color:#0176d3}.sld .bd{display:inline-block;padding:2px 10px;border-radius:15px;font-size:12px;font-weight:700;border:1px solid #e5e5e5}`,
    body: win(app, { chrome: '#e5e5e5', dot: '#c9c9c9', radius: 8 }),
  });
}

// ---------------------------------------------------------------- GOV.UK
function govuk(p) {
  const g = p.g;
  const status = (s) => {
    const t = s.toLowerCase();
    if (t.startsWith('complet')) return `<span class="plain">${esc(s)}</span>`;
    if (t.includes('progress')) return `<strong class="tag lb">${esc(s)}</strong>`;
    return `<strong class="tag gr">${esc(s)}</strong>`;
  };
  const app = `<div class="gov">
  <header><b>${esc(g.title)}</b><span>Sign out</span></header>
  <div class="wrap"><div class="pb"><strong class="tag bl">Beta</strong> This is a new service. Help us improve it by <a>giving your feedback</a>.</div>
  <a class="back">Back</a>
  <div class="cols"><div class="main"><span class="cap">Application</span><h1>${esc(g.page)}</h1>
  <p class="body">You have completed ${g.rows.filter((r) => /complet/i.test(r[1])).length} of ${g.rows.length} sections.</p>
  <ul class="tl">${g.rows.map((r) => `<li><a>${esc(r[0])}</a>${status(r[1])}</li>`).join('')}</ul>
  <button>${esc(g.cta)} ${/start/i.test(g.cta) ? '<svg width="17" height="19" viewBox="0 0 33 40"><path fill="#fff" d="M0 0h13l20 20-20 20H0l20-20z"/></svg>' : ''}</button></div>
  <aside><h2>Related content</h2><a>Check what you need</a><a>Get help with this service</a><a>Accessibility</a></aside></div></div></div>`;
  return page({
    bg: '#f4f8fb',
    css: `body{background:#f4f8fb}
    .gov{font-family:Arial,sans-serif;position:absolute;inset:0;background:#fff;color:#0b0c0c}
    .gov header{height:60px;background:#1d70b8;color:#fff;display:flex;align-items:center;padding:0 40px}.gov header b{font-size:24px}.gov header span{margin-left:auto;margin-right:60px;font-weight:700;text-decoration:underline;font-size:16px}
    .gov .wrap{padding:0 40px}.gov .pb{padding:10px 0;border-bottom:1px solid #b1b4b6;font-size:16px}.gov .pb a,.gov a{color:#1d70b8;text-decoration:underline;text-underline-offset:3px}
    .gov .tag{display:inline-block;font-weight:400;font-size:16px;padding:2px 8px 3px}.gov .bl{background:#bbd4ea;color:#0c2d4a;margin-right:8px}.gov .lb{background:#bbd4ea;color:#0c2d4a}.gov .gr{background:#e5e6e7;color:#383f43}
    .gov .back{display:inline-block;margin:14px 0 18px;color:#0b0c0c;font-size:16px;padding-left:14px;position:relative}.gov .back:before{content:'';position:absolute;left:0;top:6px;width:6px;height:6px;border-left:2px solid #505a5f;border-bottom:2px solid #505a5f;transform:rotate(45deg)}
    .gov .cols{display:flex;gap:30px}.gov .main{width:700px}.gov .cap{display:block;color:#505a5f;font-size:24px;margin-bottom:5px}.gov h1{font-size:40px;line-height:1.1;font-weight:700;margin-bottom:18px}
    .gov .body{font-size:19px;margin-bottom:16px}.gov .tl{list-style:none;border-top:1px solid #b1b4b6;margin-bottom:22px}.gov .tl li{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid #b1b4b6;font-size:19px}
    .gov .plain{font-size:19px}.gov button{background:#00703c;color:#fff;border:0;font:700 24px Arial;padding:10px 16px;box-shadow:0 2px 0 #002d18;display:flex;align-items:center;gap:12px}
    .gov aside{border-top:2px solid #1d70b8;padding-top:16px;width:300px}.gov aside h2{font-size:24px;margin-bottom:16px}.gov aside a{display:block;font-size:16px;margin-bottom:12px}`,
    body: win(app, { chrome: '#dee0e2', dot: '#b1b4b6', radius: 8 }),
  });
}

// ---------------------------------------------------------------- NHS
function nhs(p) {
  const g = p.g;
  const tag = { success: ['#cce2d8', '#005a30'], info: ['#eef7ff', '#005eb8'], warning: ['#fff9c4', '#594d00'], critical: ['#f6d7d2', '#942514'], neutral: ['#dbe0e3', '#425563'] };
  const app = `<div class="nhs">
  <header><b>${esc(g.title)}</b><span class="sr"><i>Search</i><em>${svgIcon('search', { size: 18, stroke: '#fff', width: 2.2 })}</em></span></header>
  <div class="nav">${g.nav.map((n) => `<a>${esc(n)}</a>`).join('')}</div>
  <div class="crumb"><a>Home</a> › <a>${esc(g.nav[2] || g.nav[0])}</a></div>
  <main><h1>${esc(g.page)}</h1>
  <a class="act"><i><svg width="22" height="22" viewBox="0 0 24 24"><path fill="#fff" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.3 15.3l-1.4-1.4 2.9-2.9H7v-2h6.8l-2.9-2.9 1.4-1.4L17.6 12z"/></svg></i>${esc(g.action)}</a>
  <div class="cols"><dl class="card">${g.rows.map((r) => `<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd><dd><strong class="tag" style="background:${tag[tone(r[2])][0]};color:${tag[tone(r[2])][1]};border-color:${tag[tone(r[2])][1]}">${esc(r[2])}</strong></dd></div>`).join('')}</dl>
  <div class="aside"><div class="warn"><span>Important</span><p>${esc(g.callout)}</p></div><div class="care"><h3>Need help?</h3><p>Ask the duty manager or call the help desk.</p></div><button>Continue</button></div></div></main></div>`;
  return page({
    bg: '#e8edee',
    css: `body{background:linear-gradient(160deg,#e8edee 0%,#d8dde0 100%)}
    .nhs{font-family:Frutiger,Arial,sans-serif;position:absolute;inset:0;background:#f0f4f5;color:#212b32}
    .nhs header{height:72px;background:#005eb8;display:flex;align-items:center;padding:0 32px;color:#fff}.nhs header b{font-size:22px}
    .nhs .sr{margin-left:auto;margin-right:60px;display:flex}.nhs .sr i{width:260px;height:40px;background:#fff;border-radius:4px 0 0 4px;color:#768692;font-style:normal;display:flex;align-items:center;padding:0 12px}.nhs .sr em{width:44px;height:40px;background:#003087;border-radius:0 4px 4px 0;display:grid;place-items:center}
    .nhs .nav{background:#005eb8;border-top:1px solid rgba(255,255,255,.2);display:flex;padding:0 20px}.nhs .nav a{color:#fff;font-weight:700;padding:12px;font-size:16px}
    .nhs .crumb{background:#f0f4f5;padding:14px 32px;font-size:14px;color:#4c6272}.nhs .crumb a{color:#005eb8;text-decoration:underline}
    .nhs main{padding:8px 32px}.nhs h1{font-size:44px;line-height:1.1;margin-bottom:24px}.nhs .act{display:flex;align-items:center;gap:12px;font-weight:700;font-size:22px;margin-bottom:28px}.nhs .act i{width:36px;height:36px;border-radius:50%;background:#007f3b;display:grid;place-items:center}
    .nhs .cols{display:flex;gap:24px}.nhs .card{background:#fff;border:1px solid #d8dde0;width:560px;padding:0 24px}.nhs .card div{display:flex;padding:14px 0;border-bottom:1px solid #d8dde0;font-size:16px;align-items:center}.nhs .card div:last-child{border:0}
    .nhs dt{font-weight:700;width:150px}.nhs dd{flex:1}.nhs dd:last-child{flex:none}.nhs .tag{display:inline-block;border:1px solid;font-size:14px;padding:3px 8px;border-radius:0;font-weight:700}
    .nhs .aside{width:300px}.nhs .warn{background:#fff9c4;border:1px solid #ffeb3b;padding:32px 20px 16px;position:relative;margin-bottom:20px;font-size:16px}.nhs .warn span{position:absolute;top:-14px;left:20px;background:#ffeb3b;font-weight:700;padding:4px 14px;font-size:18px}
    .nhs .care{background:#fff;border-top:6px solid #005eb8;padding:16px 20px;margin-bottom:20px;font-size:16px}.nhs .care h3{font-size:20px;margin-bottom:8px}
    .nhs button{background:#007f3b;color:#fff;border:0;border-radius:4px;font:700 19px Arial;padding:12px 18px;box-shadow:0 4px 0 #00401e}`,
    body: win(app, { chrome: '#d8dde0', dot: '#aeb7bd', radius: 8 }),
  });
}

// ---------------------------------------------------------------- USWDS
function uswds(p) {
  const g = p.g;
  const n = g.steps.length;
  const app = `<div class="usw">
  <header><b>${esc(g.title)}</b><nav><a class="on">Home</a><a>Help</a><a>Account</a></nav><span class="btn-o">Sign out</span></header>
  <main><div class="si"><div class="segs">${g.steps.map((s, i) => `<div class="${i < g.current ? 'done' : i === g.current ? 'cur' : ''}"><i></i><span>${esc(s)}</span></div>`).join('')}</div>
  <div class="hd"><span class="num">${g.current + 1}</span><span class="of">of ${n}</span><h2>${esc(g.steps[g.current])}</h2></div></div>
  <div class="cols"><form><h1>${esc(g.page)}</h1><p class="hint">Fields marked with an asterisk (*) are required.</p>
  ${g.fields.map((f, i) => `<label>${esc(f)} *</label>${i === g.fields.length - 1 ? '<div class="ta"></div>' : '<div class="in"></div>'}`).join('')}
  <div class="bt"><button class="o">Back</button><button>${esc(g.cta)}</button></div></form>
  <div class="sb"><h3>Before you start</h3><ul><li>Have your documents ready</li><li>You can save and return later</li><li>It takes about 15 minutes</li></ul></div></div></main></div>`;
  return page({
    fonts: ['Public+Sans:wght@400;600;700'], bg: '#e7f6f8',
    css: `body{background:linear-gradient(150deg,#e7f6f8 0%,#dfe1e2 100%)}
    .usw{font-family:'Public Sans',sans-serif;position:absolute;inset:0;background:#fff;color:#1b1b1b;font-size:16px}
    .usw header{height:72px;border-bottom:1px solid #dfe1e2;display:flex;align-items:center;gap:32px;padding:0 32px}.usw header b{font-size:22px;font-weight:700}
    .usw nav{display:flex;gap:4px}.usw nav a{padding:24px 12px;color:#565c65;font-weight:700;font-size:15px;border-bottom:4px solid transparent}.usw nav a.on{color:#005ea2;border-bottom-color:#005ea2}
    .usw .btn-o{margin-left:auto;margin-right:60px;border:2px solid #005ea2;color:#005ea2;border-radius:4px;padding:8px 16px;font-weight:700}
    .usw main{padding:28px 32px}.usw .segs{display:flex;gap:2px;margin-right:64px}.usw .segs div{flex:1}.usw .segs i{display:block;height:8px;background:#dfe1e2}.usw .segs .done i{background:#162e51}.usw .segs .cur i{background:#005ea2}
    .usw .segs span{display:block;font-size:15px;color:#565c65;margin-top:8px}.usw .segs .done span{color:#1b1b1b}.usw .segs .cur span{color:#005ea2;font-weight:700}
    .usw .hd{display:flex;align-items:center;gap:8px;margin:22px 0 28px}.usw .num{width:40px;height:40px;border-radius:50%;background:#005ea2;color:#fff;display:grid;place-items:center;font-weight:700;font-size:20px}.usw .of{color:#005ea2;font-weight:700;font-size:20px;margin-right:8px}.usw h2{font-size:28px}
    .usw .cols{display:flex;gap:48px}.usw form{width:520px}.usw h1{font-size:34px;line-height:1.2;margin-bottom:8px}.usw .hint{color:#71767a;margin-bottom:20px}
    .usw label{display:block;font-weight:400;margin:16px 0 8px}.usw .in{height:40px;border:1px solid #565c65}.usw .ta{height:120px;border:1px solid #565c65}
    .usw .bt{display:flex;gap:12px;margin-top:28px}.usw button{background:#005ea2;color:#fff;border:0;border-radius:4px;font:700 16px 'Public Sans';padding:12px 20px}.usw button.o{background:#fff;color:#005ea2;box-shadow:inset 0 0 0 2px #005ea2}
    .usw .sb{width:320px;align-self:flex-start;background:#e7f6f8;border:1px solid #99deea;border-radius:4px;padding:24px;margin-top:56px}.usw .sb h3{font-size:20px;margin-bottom:12px}.usw .sb li{margin:0 0 8px 20px;line-height:1.5}`,
    body: win(app, { chrome: '#dfe1e2', dot: '#a9aeb1', radius: 8 }),
  });
}

// ---------------------------------------------------------------- GitHub Primer
function primer(p) {
  const g = p.g;
  const label = (s) => ({ stable: ['#1a7f37', '#1a7f37'], live: ['#1a7f37', '#1a7f37'], beta: ['#9a6700', '#9a6700'], archived: ['#9a6700', '#9a6700'] }[s] || ['#d0d7de', '#59636e']);
  const langs = { node: ['JavaScript', '#f1e05a'], react: ['TypeScript', '#3178c6'], 'next.js': ['TypeScript', '#3178c6'], html: ['HTML', '#e34c26'], python: ['Python', '#3572A5'], javascript: ['JavaScript', '#f1e05a'], webflow: ['HTML', '#e34c26'], websockets: ['TypeScript', '#3178c6'] };
  const lang = (i) => { const st = p.stack.length ? p.stack : ['javascript']; return langs[st[i % st.length]] || ['JavaScript', '#f1e05a']; };
  const heat = (() => { const r = rng(p.id); return Array.from({ length: 7 * 30 }, () => ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'][Math.floor(r() * r() * 5)]); })();
  const app = `<div class="pri">
  <header><i class="lg"></i><span class="bc">${esc(g.owner || 'manjotsk')} <em>/</em> <b>${esc(g.title)}</b></span><span class="sr">${svgIcon('search', { size: 14, stroke: '#59636e' })} Type <kbd>/</kbd> to search</span><span class="av"></span></header>
  <div class="un">${g.nav.map((n, i) => `<a class="${i === 1 ? 'on' : ''}">${ic(n, { size: 16, stroke: '#59636e', width: 1.6 })} ${esc(n)}${i === 1 ? ` <span class="ct">${g.rows.length}</span>` : ''}</a>`).join('')}</div>
  <main><div class="left"><div class="box"><div class="bh"><b>${esc(g.page)}</b><button>${svgIcon('plus', { size: 14, stroke: '#fff', width: 2 })} New</button></div>
  ${g.rows.map((r, i) => `<div class="it"><div><a>${esc(r[0])}</a><span class="lb" style="border-color:${label(r[2])[0]};color:${label(r[2])[1]}">${esc(r[2])}</span></div><p>${esc(r[1])}</p><small><i style="background:${lang(i)[1]}"></i>${lang(i)[0]}</small></div>`).join('')}</div></div>
  <div class="right"><h3>Activity</h3><div class="heat">${heat.map((c) => `<i style="background:${c}"></i>`).join('')}</div><h3>Stack</h3><div class="bar">${(p.stack.length ? p.stack : ['javascript']).slice(0, 4).map((s, i) => `<i style="flex:${4 - i};background:${['#3178c6', '#f1e05a', '#e34c26', '#3572A5'][i]}"></i>`).join('')}</div><div class="lgd">${(p.stack.length ? p.stack : ['javascript']).slice(0, 4).map((s, i) => `<span><i style="background:${['#3178c6', '#f1e05a', '#e34c26', '#3572A5'][i]}"></i>${esc(s)}</span>`).join('')}</div></div></main></div>`;
  return page({
    bg: '#0d1117',
    css: `body{background:radial-gradient(circle at 20% 0%,#1f2937 0%,#0d1117 60%)}
    .pri{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif;position:absolute;inset:0;background:#fff;color:#1f2328;font-size:14px}
    .pri header{height:60px;background:#f6f8fa;display:flex;align-items:center;gap:14px;padding:0 20px}.pri .lg{width:32px;height:32px;border-radius:50%;background:#1f2328;display:block}.pri .bc{font-size:14px}.pri .bc em{color:#59636e;font-style:normal;margin:0 4px}.pri .bc b{font-weight:600}
    .pri .sr{margin-left:auto;width:300px;height:32px;border:1px solid #d1d9e0;border-radius:6px;display:flex;align-items:center;gap:8px;padding:0 10px;color:#59636e;background:#fff}.pri kbd{border:1px solid #d1d9e0;border-radius:4px;padding:0 5px;font-size:11px}
    .pri .av{width:32px;height:32px;border-radius:50%;background:#d1d9e0;margin-right:60px}
    .pri .un{background:#f6f8fa;border-bottom:1px solid #d1d9e0;display:flex;padding:0 16px}.pri .un a{display:flex;align-items:center;gap:8px;padding:10px 10px 12px;color:#1f2328;border-bottom:2px solid transparent}.pri .un a.on{border-bottom-color:#fd8c73;font-weight:600}
    .pri .ct{background:rgba(129,139,152,.12);border-radius:2em;padding:0 6px;font-size:12px;font-weight:500}
    .pri main{display:flex;gap:24px;padding:24px 32px}.pri .left{width:620px}.pri .box{border:1px solid #d1d9e0;border-radius:6px;overflow:hidden}
    .pri .bh{background:#f6f8fa;padding:12px 16px;display:flex;align-items:center;border-bottom:1px solid #d1d9e0}.pri .bh b{font-weight:600}.pri button{margin-left:auto;height:28px;padding:0 12px;background:#1f883d;color:#fff;border:1px solid rgba(31,35,40,.15);border-radius:6px;font:600 12px inherit;font-family:inherit;display:flex;align-items:center;gap:4px}
    .pri .it{padding:14px 16px;border-top:1px solid #d1d9e0}.pri .it:nth-child(2){border-top:0}.pri .it a{color:#0969da;font-size:16px;font-weight:600;margin-right:8px}.pri .lb{border:1px solid;border-radius:2em;padding:0 7px;font-size:12px;font-weight:500;line-height:18px;display:inline-block}
    .pri .it p{color:#59636e;margin:6px 0 8px}.pri .it small{font-size:12px;color:#59636e;display:flex;align-items:center;gap:6px}.pri .it small i{width:12px;height:12px;border-radius:50%;display:block}
    .pri .right{width:300px}.pri h3{font-size:16px;font-weight:600;margin:0 0 12px}.pri .heat{display:grid;grid-template-rows:repeat(7,8px);grid-auto-flow:column;gap:3px;margin-bottom:28px}.pri .heat i{width:8px;height:8px;border-radius:2px;display:block}
    .pri .bar{display:flex;height:8px;border-radius:4px;overflow:hidden;gap:2px;margin-bottom:12px}.pri .bar i{display:block}.pri .lgd{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px;color:#59636e}.pri .lgd i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px}`,
    body: win(app, { chrome: '#e6eaef', dot: '#c8d1da', radius: 10 }),
  });
}

// ---------------------------------------------------------------- Material 3
const M3 = {
  teal: { p: '#006a6a', op: '#ffffff', pc: '#9cf1f0', opc: '#002020', sc: '#cce8e7', osc: '#051f1f', s: '#f4fbfa', sc1: '#eff5f4', sc2: '#e9efee', sc3: '#e3e9e9', on: '#161d1d', onv: '#3f4948', ov: '#bec9c8', o: '#6f7979' },
  green: { p: '#386a20', op: '#ffffff', pc: '#b8f397', opc: '#042100', sc: '#d7e8cd', osc: '#121f0e', s: '#f8faf0', sc1: '#f2f4ea', sc2: '#eceee5', sc3: '#e7e9df', on: '#1a1c18', onv: '#43483f', ov: '#c3c8bb', o: '#74796d' },
  amber: { p: '#7b5800', op: '#ffffff', pc: '#ffdea6', opc: '#261900', sc: '#f4e0c0', osc: '#251a04', s: '#fff8f3', sc1: '#fbf2ea', sc2: '#f5ece4', sc3: '#efe6de', on: '#1f1b16', onv: '#4e4639', ov: '#d1c5b4', o: '#807667' },
  blue: { p: '#0061a4', op: '#ffffff', pc: '#d1e4ff', opc: '#001d36', sc: '#d7e3f7', osc: '#101c2b', s: '#f8f9ff', sc1: '#f2f3fa', sc2: '#eceef4', sc3: '#e6e8ee', on: '#191c20', onv: '#43474e', ov: '#c3c7cf', o: '#73777f' },
  red: { p: '#904a43', op: '#ffffff', pc: '#ffdad5', opc: '#3b0907', sc: '#ffdad5', osc: '#2c1512', s: '#fff8f7', sc1: '#fff0ee', sc2: '#fceae7', sc3: '#f6e4e1', on: '#231918', onv: '#534341', ov: '#d8c2bf', o: '#857371' },
};
const SYM = { home: 'home', search: 'search', check: 'task_alt', calendar: 'calendar_month', user: 'person', doc: 'description', chart: 'monitoring', map: 'map', chat: 'forum', settings: 'settings', bookmark: 'bookmark', play: 'play_circle', bell: 'notifications', money: 'payments', grid: 'apps', plus: 'add', mic: 'mic', car: 'directions_car', scan: 'qr_code_scanner', cross: 'emergency', leaf: 'eco' };
const sym = (label, c = 'inherit', size = 24, fill = 0) => `<span class="ms" style="color:${c};font-size:${size}px;font-variation-settings:'FILL' ${fill}">${SYM[iconFor(label)] || 'apps'}</span>`;
function material3(p) {
  const g = p.g, c = M3[p.seed || 'teal'];
  const nav = g.nav.slice(0, 4);
  const d = g.detail || {};
  const phone = (inner, x, y) => `<div class="ph" style="left:${x}px;top:${y}px"><div class="sc"><div class="sbar"><span>9:41</span><span class="ms" style="font-size:16px">signal_cellular_alt</span></div>${inner}</div></div>`;
  const list = `<div class="srch">${'<span class="ms">menu</span>'}<span>Search ${esc(g.title.toLowerCase())}</span><i>${esc(initials(g.title))}</i></div>
  <h2>${esc(g.page)}</h2><div class="chips">${(d.chips || nav).slice(0, 3).map((t, i) => `<span class="${i === 0 ? 'on' : ''}">${i === 0 ? '<span class="ms" style="font-size:18px">check</span>' : ''}${esc(t)}</span>`).join('')}</div>
  <div class="li">${g.rows.slice(0, 4).map((r, i) => `<div class="it"><i style="background:${i % 2 ? c.sc : c.pc};color:${i % 2 ? c.osc : c.opc}">${sym(r[0], 'inherit', 22)}</i><span><b>${esc(r[0])}</b><small>${esc(r[1])}</small></span><em>${esc(r[2])}</em></div>`).join('')}</div>
  <div class="fab"><span class="ms" style="font-size:24px">${g.cta === 'Record' ? 'mic' : 'add'}</span>${esc(g.cta)}</div>
  <div class="nb">${nav.map((n, i) => `<div class="${i === 0 ? 'on' : ''}"><i>${sym(n, i === 0 ? c.osc : c.onv, 24, i === 0 ? 1 : 0)}</i><span>${esc(n)}</span></div>`).join('')}</div>`;
  const voice = g.cta === 'Record';
  const detail = `<div class="tab"><span class="ms">arrow_back</span><b>${esc(d.title || g.rows[0][0])}</b><span class="ms">more_vert</span></div>
  <div class="hero">${voice ? `<div class="mic"><span class="ms" style="font-size:44px;color:${c.op};font-variation-settings:'FILL' 1">mic</span></div><div class="wave">${series(p.id, 28, 0.15, 1).map((v) => `<i style="height:${(v * 46).toFixed(0)}px"></i>`).join('')}</div>` : `<div class="art">${g.symbol ? `<span class="ms" style="color:${c.opc};font-size:56px;font-variation-settings:'FILL' 1">${g.symbol}</span>` : sym(d.title || g.page, c.opc, 56, 1)}</div>`}</div>
  <div class="chips">${(d.chips || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
  ${d.slots ? `<h3>Pick a time</h3><div class="slots">${d.slots.map((s, i) => `<span class="${i === 1 ? 'on' : ''}">${esc(s)}</span>`).join('')}</div>` : `<div class="card">${Array.from({ length: d.lines || 3 }, (_, i) => `<i style="width:${[92, 80, 86, 60][i % 4]}%"></i>`).join('')}</div>`}
  <div class="btn">${esc(voice ? 'Send to ward team' : g.cta)}</div>`;
  return page({
    fonts: ['Roboto:wght@400;500;700', 'Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0..1,0'], bg: c.pc,
    css: `body{background:radial-gradient(circle at 15% 20%,${c.pc} 0%,transparent 45%),radial-gradient(circle at 85% 80%,${c.sc} 0%,transparent 50%),${c.sc1}}
    .ms{font-family:'Material Symbols Rounded';font-weight:normal;font-style:normal;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;-webkit-font-feature-settings:'liga';font-feature-settings:'liga'}
    .ph{position:absolute;width:330px;height:690px;border-radius:44px;background:#1b1b1f;padding:10px;box-shadow:0 30px 70px rgba(0,0,0,.25)}
    .sc{width:100%;height:100%;border-radius:36px;background:${c.s};overflow:hidden;position:relative;font-family:Roboto,sans-serif;color:${c.on}}
    .sbar{height:34px;display:flex;justify-content:space-between;align-items:center;padding:0 22px;font-size:14px;font-weight:500;color:${c.on}}
    .srch{margin:6px 14px 0;height:52px;border-radius:26px;background:${c.sc3};display:flex;align-items:center;gap:14px;padding:0 8px 0 16px;color:${c.onv};font-size:16px}.srch i{margin-left:auto;width:32px;height:32px;border-radius:50%;background:${c.p};color:${c.op};display:grid;place-items:center;font-size:12px;font-weight:500;font-style:normal}
    h2{font-size:22px;font-weight:400;margin:20px 18px 12px}h3{font-size:14px;font-weight:500;margin:6px 18px 10px;color:${c.onv}}
    .chips{display:flex;gap:8px;padding:0 16px;margin-bottom:10px;flex-wrap:wrap}.chips span{height:32px;border-radius:8px;border:1px solid ${c.ov};padding:0 12px;display:flex;align-items:center;gap:6px;font-size:14px;font-weight:500;color:${c.onv}}.chips span.on{background:${c.sc};border-color:${c.sc};color:${c.osc}}
    .li{padding:0 8px}.it{display:flex;align-items:center;gap:14px;padding:10px 10px;border-radius:16px}.it i{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;flex:none}
    .it span{flex:1;min-width:0}.it b{display:block;font-weight:400;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.it small{font-size:13px;color:${c.onv}}.it em{font-style:normal;font-size:11px;font-weight:500;color:${c.onv}}
    .fab{position:absolute;right:16px;bottom:96px;height:56px;border-radius:16px;background:${c.pc};color:${c.opc};display:flex;align-items:center;gap:10px;padding:0 20px 0 16px;font-size:14px;font-weight:500;box-shadow:0 3px 6px rgba(0,0,0,.18)}
    .nb{position:absolute;left:0;right:0;bottom:0;height:80px;background:${c.sc2};display:flex;padding-top:12px}.nb div{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:12px;font-weight:500;color:${c.onv}}
    .nb i{width:64px;height:32px;border-radius:16px;display:grid;place-items:center}.nb .on i{background:${c.sc}}.nb .on{color:${c.on}}
    .tab{height:56px;display:flex;align-items:center;gap:16px;padding:0 16px;font-size:18px}.tab b{font-weight:400;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .hero{margin:6px 16px 16px;height:190px;border-radius:28px;background:${c.pc};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px}
    .mic{width:84px;height:84px;border-radius:28px;background:${c.p};display:grid;place-items:center}.wave{display:flex;align-items:center;gap:3px;height:46px}.wave i{width:4px;border-radius:2px;background:${c.p};opacity:.75;display:block}
    .art{width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.45);display:grid;place-items:center}
    .card{margin:4px 16px;padding:16px;border-radius:12px;background:${c.sc2}}.card i{display:block;height:10px;border-radius:5px;background:${c.ov};margin:8px 0}
    .slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 16px}.slots span{height:40px;border-radius:8px;border:1px solid ${c.ov};display:grid;place-items:center;font-size:14px;font-weight:500;color:${c.onv}}.slots .on{background:${c.p};border-color:${c.p};color:${c.op}}
    .btn{position:absolute;left:16px;right:16px;bottom:28px;height:52px;border-radius:26px;background:${c.p};color:${c.op};display:grid;place-items:center;font-size:15px;font-weight:500}`,
    body: phone(list, 300, 44) + phone(detail, 660, 76),
  });
}

// ---------------------------------------------------------------- Apple HIG
const TINT = { blue: '#007AFF', orange: '#FF9500', green: '#34C759', teal: '#30B0C7', red: '#FF3B30' };
function hig(p) {
  const g = p.g, t = TINT[p.tint || 'blue'];
  const d = g.detail || {};
  const phone = (inner, x, y) => `<div class="ip" style="left:${x}px;top:${y}px"><div class="scr"><div class="isl"></div><div class="sbar"><b>9:41</b><span>${svgIcon('chart', { size: 14, stroke: '#000', width: 2.4 })}</span></div>${inner}</div></div>`;
  const list = `<div class="lt">${esc(g.page)}</div><div class="sf">${svgIcon('search', { size: 15, stroke: '#8e8e93', width: 2.2 })} Search</div>
  <div class="seg">${['All', g.nav[1], g.nav[2]].map((s, i) => `<span class="${i === 0 ? 'on' : ''}">${esc(s)}</span>`).join('')}</div>
  <div class="grp">${g.rows.slice(0, 4).map((r) => `<div class="row"><i style="background:${t}">${ic(r[0], { size: 17, stroke: '#fff', width: 2 })}</i><span><b>${esc(r[0])}</b><small>${esc(r[1])}</small></span><em>${esc(r[2])}</em>${svgIcon('chevron', { size: 14, stroke: '#c4c4c6', width: 2.4 })}</div>`).join('')}</div>
  <div class="tb">${g.nav.slice(0, 4).map((n, i) => `<div style="color:${i === 0 ? t : '#999'}">${ic(n, { size: 24, stroke: i === 0 ? t : '#999', width: 2, fill: i === 0 ? t + '33' : 'none' })}<span>${esc(n)}</span></div>`).join('')}</div>`;
  const detail = `<div class="nv"><span style="color:${t}">${svgIcon('back', { size: 18, stroke: t, width: 2.6 })} Back</span><b>${esc(g.title)}</b><span></span></div>
  <div class="hc" style="background:linear-gradient(160deg,${t},${t}cc)">${d.scan ? `<div class="vf">${svgIcon('scan', { size: 120, stroke: '#fff', width: 1.2 })}</div>` : `<div class="cv">${ic(d.title || g.page, { size: 64, stroke: '#fff', width: 1.4 })}</div>`}</div>
  <h3>${esc(d.title || g.rows[0][0])}</h3><p>${esc(d.sub || g.rows[0][1])}</p>
  <div class="fb" style="background:${t}">${esc(d.cta || 'Continue')}</div><div class="gb" style="color:${t}">Not now</div>`;
  return page({
    bg: '#f2f2f7',
    css: `body{background:radial-gradient(circle at 25% 25%,${t}33 0%,transparent 50%),radial-gradient(circle at 80% 85%,${t}22 0%,transparent 45%),#f2f2f7}
    .ip{position:absolute;width:330px;height:690px;border-radius:54px;background:#1c1c1e;padding:11px;box-shadow:0 30px 70px rgba(0,0,0,.28),inset 0 0 0 2px #3a3a3c}
    .scr{width:100%;height:100%;border-radius:44px;background:#f2f2f7;overflow:hidden;position:relative;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif;color:#000}
    .isl{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:96px;height:28px;border-radius:14px;background:#000}
    .sbar{height:50px;display:flex;justify-content:space-between;align-items:center;padding:0 30px;font-size:15px}
    .lt{font-size:32px;font-weight:700;letter-spacing:.3px;padding:6px 18px 8px}.sf{margin:0 16px 12px;height:36px;border-radius:10px;background:rgba(118,118,128,.12);display:flex;align-items:center;gap:6px;padding:0 8px;color:#8e8e93;font-size:16px}
    .seg{margin:0 16px 16px;height:32px;border-radius:9px;background:rgba(118,118,128,.12);display:flex;padding:2px}.seg span{flex:1;display:grid;place-items:center;font-size:13px;font-weight:500;border-radius:7px}.seg .on{background:#fff;box-shadow:0 3px 8px rgba(0,0,0,.12)}
    .grp{margin:0 16px;background:#fff;border-radius:10px;overflow:hidden}.row{display:flex;align-items:center;gap:12px;padding:10px 12px 10px 14px;position:relative}.row+.row:before{content:'';position:absolute;top:0;left:56px;right:0;height:.5px;background:#c6c6c8}
    .row i{width:30px;height:30px;border-radius:7px;display:grid;place-items:center;flex:none}.row span{flex:1;min-width:0}.row b{display:block;font-weight:400;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.row small{font-size:13px;color:#8e8e93}.row em{font-style:normal;color:#8e8e93;font-size:13px;white-space:nowrap;max-width:84px;overflow:hidden;text-overflow:ellipsis}
    .tb{position:absolute;left:0;right:0;bottom:0;height:84px;background:rgba(249,249,249,.94);border-top:.5px solid #c6c6c8;display:flex;padding-top:7px}.tb div{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10px;font-weight:500}
    .nv{height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;font-size:17px}.nv span{display:flex;align-items:center;width:70px}.nv b{font-weight:600}
    .hc{margin:12px 16px 18px;height:250px;border-radius:16px;display:grid;place-items:center}.vf{opacity:.95}.cv{width:120px;height:120px;border-radius:30px;background:rgba(255,255,255,.22);display:grid;place-items:center}
    h3{font-size:22px;font-weight:700;padding:0 20px;margin-bottom:6px}p{font-size:15px;color:#8e8e93;padding:0 20px}
    .fb{position:absolute;left:16px;right:16px;bottom:78px;height:50px;border-radius:12px;color:#fff;display:grid;place-items:center;font-size:17px;font-weight:600}.gb{position:absolute;left:16px;right:16px;bottom:30px;height:40px;display:grid;place-items:center;font-size:17px}`,
    body: phone(list, 300, 44) + phone(detail, 660, 72),
  });
}

// ---------------------------------------------------------------- Base Web
function baseweb(p) {
  const g = p.g;
  if (g.mode === 'ride') {
    const phone = (inner, x, y) => `<div class="ph" style="left:${x}px;top:${y}px"><div class="sc">${inner}</div></div>`;
    const a = `<div class="map">${streetMap(p.id, { w: 310, h: 420, bg: '#f6f6f6', road: '#ffffff', minor: '#e2e2e2', water: '#d6e4f5', park: '#e0eedd', route: '#000000' })}</div>
    <div class="sheet"><div class="grab"></div><h2>${esc(g.page)}</h2>${g.rows.map((r, i) => `<div class="opt ${i === 0 ? 'on' : ''}"><i>${svgIcon('car', { size: 26, stroke: '#000', width: 1.6 })}</i><span><b>${esc(r[0])}</b><small>${esc(r[1])}</small></span><em>${esc(r[2])}</em></div>`).join('')}<div class="cta">${esc(g.cta)}</div></div>`;
    const b = `<div class="map full">${streetMap(p.id + 'b', { w: 310, h: 670, bg: '#f6f6f6', road: '#ffffff', minor: '#e2e2e2', water: '#d6e4f5', park: '#e0eedd', route: '#276ef1' })}</div>
    <div class="card"><small>Arriving in 4 min</small><b>${esc(g.rows[0][0])}</b><div class="drv"><i></i><span><b>Your driver</b><small>4.9 ★ · Plate on arrival</small></span></div><div class="row2"><span>Message</span><span>Share trip</span></div></div>`;
    return page({ bg: '#000', css: `body{background:#000}${BW_CSS}`, body: phone(a, 300, 44) + phone(b, 660, 72) });
  }
  // Desktop web layout for flights and quotes.
  const rows = g.rows.map((r) => `<div class="res"><span class="rt"><b>${esc(r[0])}</b><small>${esc(r[1])}</small></span><span class="pr">${esc(r[2])}</span><span class="sel">Select</span></div>`).join('');
  const app = `<div class="bwd"><header><b>${esc(g.title)}</b><a class="on">${g.mode === 'flights' ? 'Flights' : 'Quotes'}</a><a>Bookings</a><a>Help</a><span class="av"></span></header>
  <main><div class="srch">${(g.mode === 'flights' ? ['From · Delhi', 'To · Toronto', 'Depart · 14 Mar', '1 adult · Economy'] : ['Pick-up · Auckland', 'Drop-off · Queenstown', '12 nights', 'Campervan']).map((f) => `<span>${esc(f)}</span>`).join('')}<button>Search</button></div>
  <h1>${esc(g.page)}</h1><div class="chips">${['Cheapest', 'Fastest', 'Best'].map((c, i) => `<span class="${i === 0 ? 'on' : ''}">${c}</span>`).join('')}</div>${rows}
  <div class="bar"><span>${g.mode === 'quote' ? 'Total · NZ$ 1,740' : '3 results'}</span><button>${esc(g.cta)}</button></div></main></div>`;
  return page({ bg: '#000', css: `body{background:#000}${BW_CSS}`, body: win(app, { chrome: '#e2e2e2', dot: '#afafaf', radius: 10 }) });
}
const BW_CSS = `.ph{position:absolute;width:330px;height:690px;border-radius:44px;background:#1f1f1f;padding:10px;box-shadow:0 30px 80px rgba(255,255,255,.08),inset 0 0 0 2px #333}
  .sc{width:100%;height:100%;border-radius:36px;background:#fff;overflow:hidden;position:relative;font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;color:#000}
  .map{position:absolute;inset:0 0 auto 0;height:420px}.map.full{height:100%}
  .sheet{position:absolute;left:0;right:0;bottom:0;height:330px;background:#fff;border-radius:16px 16px 0 0;box-shadow:0 -8px 24px rgba(0,0,0,.12);padding:8px 16px}
  .grab{width:36px;height:4px;border-radius:2px;background:#e2e2e2;margin:0 auto 10px}.sheet h2{font-size:22px;font-weight:700;margin-bottom:8px}
  .opt{display:flex;align-items:center;gap:12px;padding:10px 8px;border-radius:8px;border:2px solid transparent}.opt.on{border-color:#000}.opt i{width:44px;height:44px;border-radius:8px;background:#eeeeee;display:grid;place-items:center}
  .opt span{flex:1}.opt b{display:block;font-size:16px}.opt small{font-size:13px;color:#545454}.opt em{font-style:normal;font-size:14px;font-weight:500}
  .cta{position:absolute;left:16px;right:16px;bottom:22px;height:52px;border-radius:8px;background:#000;color:#fff;display:grid;place-items:center;font-size:17px;font-weight:600}
  .card{position:absolute;left:12px;right:12px;bottom:18px;background:#fff;border-radius:16px;padding:16px;box-shadow:0 8px 24px rgba(0,0,0,.18)}.card>small{font-size:13px;color:#276ef1;font-weight:600}.card>b{display:block;font-size:22px;margin:4px 0 12px}
  .drv{display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #eeeeee}.drv i{width:44px;height:44px;border-radius:50%;background:#e2e2e2;display:block}.drv b{display:block;font-size:15px}.drv small{font-size:13px;color:#545454}
  .row2{display:flex;gap:8px}.row2 span{flex:1;height:40px;border-radius:8px;background:#eeeeee;display:grid;place-items:center;font-size:14px;font-weight:600}
  .bwd{font-family:system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;position:absolute;inset:0;background:#fff;color:#000;font-size:14px}
  .bwd header{height:64px;display:flex;align-items:center;gap:24px;padding:0 32px;border-bottom:1px solid #eeeeee}.bwd header b{font-size:22px;font-weight:800;margin-right:16px}.bwd header a{color:#545454;font-weight:500;font-size:16px;padding:21px 0;border-bottom:2px solid transparent}.bwd header a.on{color:#000;border-bottom-color:#000}
  .bwd .av{margin-left:auto;margin-right:60px;width:36px;height:36px;border-radius:50%;background:#e2e2e2}
  .bwd main{padding:28px 32px}.bwd .srch{display:flex;gap:8px;margin-bottom:28px;margin-right:64px}.bwd .srch span{flex:1;height:48px;border-radius:8px;background:#eeeeee;display:flex;align-items:center;padding:0 14px;font-size:15px}
  .bwd button{height:48px;padding:0 24px;border-radius:8px;border:0;background:#000;color:#fff;font:600 16px system-ui}.bwd h1{font-size:32px;font-weight:700;margin-bottom:14px}
  .bwd .chips{display:flex;gap:8px;margin-bottom:16px}.bwd .chips span{height:36px;padding:0 16px;border-radius:18px;background:#eeeeee;display:grid;place-items:center;font-weight:500}.bwd .chips .on{background:#000;color:#fff}
  .bwd .res{display:flex;align-items:center;gap:16px;padding:16px;border:1px solid #e2e2e2;border-radius:12px;margin:0 64px 10px 0}.bwd .rt{flex:1}.bwd .rt b{display:block;font-size:18px}.bwd .rt small{color:#545454;font-size:14px}.bwd .pr{font-size:18px;font-weight:700}.bwd .sel{height:36px;padding:0 14px;border-radius:8px;border:2px solid #000;display:grid;place-items:center;font-weight:600}
  .bwd .bar{display:flex;align-items:center;justify-content:space-between;margin:18px 64px 0 0;padding-top:16px;border-top:1px solid #eeeeee;font-size:18px;font-weight:600}`;

const RENDER = { carbon, ant, fluent2, polaris, spectrum, geist, eui, atlassian, slds, govuk, nhs, uswds, primer, material3, hig, baseweb };

export function render(project) {
  const fn = RENDER[project.ds];
  if (!fn) throw new Error(`No renderer for design system "${project.ds}" (${project.id})`);
  return fn(project);
}

// Alt text that says what the picture shows, not that it is a picture.
export function altText(p) {
  const sys = SYSTEMS[p.ds].name;
  const what = p.g.page ? `the “${p.g.page}” screen` : 'a screen';
  const mods = (p.g.nav || []).slice(0, 4).join(', ');
  return `Mock-up of ${p.name} in ${sys}: ${what}${mods ? `, with ${mods}` : ''}.`;
}
