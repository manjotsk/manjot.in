// Builds the projects section of manjot.in from projects.json:
//   1. ranks the projects by influence (see score() below),
//   2. renders each project's design-system mock-up to src/img/projects/*.webp,
//   3. writes src/projects.html and the top-six block in src/index.html.
//
//   node build.mjs              everything
//   node build.mjs --only=a,b   re-render only these graphics (pages still rebuilt)
//   node build.mjs --no-images  rebuild the pages only
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, altText, SYSTEMS, W, H } from './designs.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '../../src');
const imgDir = path.join(src, 'img/projects');
const args = new Set(process.argv.slice(2));
const only = [...args].find((a) => a.startsWith('--only='))?.slice(7).split(',');

const data = JSON.parse(await fs.readFile(path.join(here, 'projects.json'), 'utf8'));
const surveyed = new Date(data.surveyed);

// ---------------------------------------------------------------- ranking
const monthsBetween = (a, b) => (new Date(b + '-01') - new Date(a + '-01')) / 2.63e9;
const isActive = (p) => p.stats && monthsBetween(p.stats.to, data.surveyed.slice(0, 7)) <= 6;
const maxCommits = Math.max(...data.projects.map((p) => p.stats?.commits || 1));
const maxPeople = Math.max(...data.projects.map((p) => p.stats?.contributors || 1));

/**
 * Influence, out of 100. Commit volume is effort, not reach, so it is one
 * signal among five:
 *   40  commits, on a log scale from 10 up to the largest product
 *   15  people who committed, on a log scale
 *   15  years in development, capped at six; a year only counts when about
 *       250 commits back it, so one stray push cannot stretch a small repo
 *   10  platforms it ships on, capped at four
 *   20  live: checked live at a public address (full marks), or still being
 *       worked on in the last six months (half)
 * The products on the GitHub profile's "Now" list are pinned first.
 */
export function score(p) {
  const s = p.stats;
  const lg = (n) => Math.log10(Math.max(n, 10));
  const commits = s ? (lg(s.commits) - 1) / (lg(maxCommits) - 1) : 0;
  const people = s ? Math.log2(s.contributors + 1) / Math.log2(maxPeople + 1) : 0;
  const span = s ? Math.min(monthsBetween(s.from, s.to) / 12, s.commits / 250, 6) : 0;
  const platforms = Math.min(p.platforms.length, 4) / 4;
  const live = p.live || (p.url && !/github\.com/.test(p.url)) ? 1 : isActive(p) ? 0.5 : 0;
  return 40 * commits + 15 * people + 15 * (span / 6) + 10 * platforms + 20 * live;
}
const ranked = data.projects
  .map((p) => ({ ...p, score: score(p) }))
  .sort((a, b) => (a.pin || 99) - (b.pin || 99) || b.score - a.score)
  .map((p, i) => ({ ...p, rank: i + 1 }));

// ---------------------------------------------------------------- graphics
async function renderImages(list) {
  const { chromium } = await import('playwright');
  const sharp = (await import('sharp')).default;
  await fs.mkdir(imgDir, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'chrome' });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  for (const p of list) {
    await page.setContent(render(p), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: 'png' });
    await sharp(png).webp({ quality: 80, effort: 6 }).toFile(path.join(imgDir, `${p.id}.webp`));
    await sharp(png).resize(600).webp({ quality: 78, effort: 6 }).toFile(path.join(imgDir, `${p.id}-600.webp`));
    process.stdout.write(`  ${p.rank}. ${p.id} (${p.ds})\n`);
  }
  await browser.close();
}

// ---------------------------------------------------------------- html
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmt = (n) => n.toLocaleString('en-US');
function years(p) {
  if (!p.stats) return '';
  const a = p.stats.from.slice(0, 4);
  const b = isActive(p) ? 'now' : p.stats.to.slice(0, 4);
  return a === b ? a : `${a} – ${b}`;
}
function role(p) {
  if (!p.stats || !p.stats.commits) return '';
  const share = p.stats.myCommits / p.stats.commits;
  return share >= 0.3 ? 'hands-on build' : share >= 0.05 ? 'architecture & code' : 'team project';
}
const sysName = (p) => SYSTEMS[p.ds].name.toLowerCase();

function img(p, { eager = false, sizes }) {
  return `<img src="/img/projects/${p.id}.webp" srcset="/img/projects/${p.id}-600.webp 600w, /img/projects/${p.id}.webp 1200w" sizes="${sizes}" width="${W}" height="${H}" alt="${esc(altText(p))}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" class="block w-full h-auto">`;
}
function meta(p) {
  const bits = [];
  if (p.stats) bits.push(`${fmt(p.stats.commits)} commits`, `${p.stats.contributors} ${p.stats.contributors === 1 ? 'person' : 'people'}`);
  if (role(p)) bits.push(role(p));
  return bits.join(' · ');
}
function card(p, size) {
  const big = size === 'lead';
  const head = `<div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-wide mb-2"><span class="bg-yellow-300 border-2 border-black px-2 py-0.5">#${p.rank}</span><span>${esc(p.sector)}</span>${years(p) ? `<span class="text-gray-600">· ${esc(years(p))}</span>` : ''}</div>`;
  const body = `${head}
      <h3 class="${big ? 'text-3xl' : size === 'mid' ? 'text-2xl' : 'text-xl'} font-extrabold leading-tight">${esc(p.name)}</h3>
      <p class="${big ? 'text-base' : 'text-sm'} mt-2">${esc(p.summary)}</p>
      <p class="text-xs mt-3"><span class="font-bold">ships as</span> ${esc(p.platforms.join(' · '))}</p>
      ${meta(p) ? `<p class="text-xs mt-1 text-gray-700">${esc(meta(p))}</p>` : ''}
      ${p.stack.length ? `<ul class="flex flex-wrap gap-1.5 mt-3">${p.stack.map((s) => `<li class="text-xs border-2 border-black px-1.5">${esc(s)}</li>`).join('')}</ul>` : ''}
      <div class="flex flex-wrap items-center gap-3 mt-4">${p.url ? `<a href="${esc(p.url)}" class="inline-block bg-yellow-300 border-2 border-black px-3 py-1 text-sm font-bold shadow-[3px_3px_0_0_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition" rel="noopener">${/github\.com/.test(p.url) ? 'code on github' : 'visit'} ↗</a>` : ''}<span class="text-xs text-gray-600">drawn in <a class="underline" href="${SYSTEMS[p.ds].url}" rel="noopener">${esc(sysName(p))}</a></span></div>`;
  if (big) {
    return `<article id="${p.id}" class="grid md:grid-cols-[1.35fr_1fr] border-4 border-black bg-white shadow-[8px_8px_0_0_black]">
    <div class="border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden">${img(p, { eager: p.rank === 1, sizes: '(min-width: 768px) 60vw, 100vw' })}</div>
    <div class="p-5 md:p-6 flex flex-col justify-center">${body}</div></article>`;
  }
  return `<article id="${p.id}" class="flex flex-col border-4 border-black bg-white shadow-[8px_8px_0_0_black]">
    <div class="border-b-4 border-black overflow-hidden">${img(p, { sizes: size === 'mid' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw' })}</div>
    <div class="p-4 flex flex-col flex-1">${body}</div></article>`;
}

const total = ranked.length;
const systemsUsed = [...new Set(ranked.map((p) => p.ds))];
const lead = ranked.filter((p) => p.pin);
const mid = ranked.filter((p) => !p.pin).slice(0, 18);
const rest = ranked.filter((p) => !p.pin).slice(18);

const projectsPage = `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>projects · manjot singh</title>
  <meta name="description" content="${total} products from manjot singh's own companies and teams since 2018, across healthcare, logistics, education and b2b operations, ranked by influence.">
  <link rel="canonical" href="https://manjot.in/projects.html">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://manjot.in/projects.html">
  <meta property="og:title" content="projects · manjot singh">
  <meta property="og:description" content="${total} products from ${data.organisations} github accounts and organisations, ranked by influence.">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 text-black font-sans">
  <!-- generated by tools/portfolio/build.mjs from projects.json; edit those, not this file -->
  <section class="bg-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0_0_black] mx-4 mt-6">
    <a href="/" class="text-sm font-bold underline">← manjot singh</a>
    <h1 class="text-5xl font-extrabold mt-4">projects</h1>
    <p class="text-xl mt-2 max-w-3xl">${total} products from my own companies and the teams i have worked in since 2018, from my own saas to client platforms that run hospitals, fleets and classrooms. ranked by influence, most first.</p>
    <dl class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      ${[[fmt(data.repositories), 'repositories'], [String(data.organisations), 'github accounts & orgs'], [String(data.contributors), 'people who committed'], ['2018 → now', 'years shipping']].map(([v, k]) => `<div class="border-4 border-black p-4 bg-yellow-300"><dt class="text-xs font-bold uppercase">${k}</dt><dd class="text-3xl font-extrabold">${v}</dd></div>`).join('\n      ')}
    </dl>
  </section>

  <section class="mx-4 mt-10 grid md:grid-cols-2 gap-6">
    <div class="p-6 border-4 border-black bg-white shadow-[8px_8px_0_0_black]">
      <h2 class="text-2xl font-bold mb-3">how they are ranked</h2>
      <p class="text-sm">each product scores out of 100: commits (40), people who worked on it (15), years in development (15, counted only where the commits back them up), platforms it ships on (10), and whether it is live today (20, or half if it was worked on in the last six months). commits are counted once per product, even where the code lives in several repositories. the three products i run now come first.</p>
    </div>
    <div class="p-6 border-4 border-black bg-white shadow-[8px_8px_0_0_black]">
      <h2 class="text-2xl font-bold mb-3">about the pictures</h2>
      <p class="text-sm">every mock-up follows a published design system matched to the product, ${systemsUsed.length} in all: ${systemsUsed.map((k) => `<a class="underline" href="${SYSTEMS[k].url}" rel="noopener">${esc(SYSTEMS[k].name.toLowerCase())}</a>`).join(', ')}. the screens use each product's real module names. client names appear only where the client is already public.</p>
    </div>
  </section>

  <section class="mx-4 mt-12" aria-labelledby="now">
    <h2 id="now" class="text-2xl font-bold mb-6">what i run now</h2>
    <div class="space-y-8">
      ${lead.map((p) => card(p, 'lead')).join('\n      ')}
    </div>
  </section>

  <section class="mx-4 mt-14" aria-labelledby="major">
    <h2 id="major" class="text-2xl font-bold mb-6">major platforms</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      ${mid.map((p) => card(p, 'mid')).join('\n      ')}
    </div>
  </section>

  <section class="mx-4 mt-14" aria-labelledby="more">
    <h2 id="more" class="text-2xl font-bold mb-6">more products, sites and early work</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${rest.map((p) => card(p, 'small')).join('\n      ')}
    </div>
  </section>

  <footer class="text-center mt-14 mb-6 text-sm px-4">
    <p>counted from github on ${surveyed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toLowerCase()} · <a href="/#contact" class="underline">get in touch</a></p>
    <p class="mt-1">built with ♥ using tailwind css | &copy; ${surveyed.getFullYear()} manjot singh</p>
  </footer>
</body>

</html>
`;

const top = ranked.slice(0, 6);
const indexBlock = `<!-- projects:start (generated by tools/portfolio/build.mjs) -->
  <section id="projects" class="mt-10 mx-4">
    <h2 class="text-2xl font-bold mb-2 text-center">projects</h2>
    <p class="text-center mb-6">${total} products from ${data.organisations} github accounts and organisations, ranked by influence.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${top.map((p) => `<a href="/projects.html#${p.id}" class="flex flex-col border-4 border-black bg-white shadow-[8px_8px_0_0_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_black] transition">
        <div class="border-b-4 border-black overflow-hidden">${img(p, { sizes: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw' })}</div>
        <div class="p-4"><span class="text-xs font-bold uppercase">#${p.rank} · ${esc(p.sector)}</span>
        <h3 class="text-xl font-bold mt-1">${esc(p.name)}</h3>
        <p class="text-sm mt-2">${esc(p.summary)}</p></div></a>`).join('\n      ')}
    </div>
    <div class="text-center mt-8"><a href="/projects.html" class="inline-block bg-yellow-300 text-black px-6 py-2 border-2 border-black shadow-[4px_4px_0_0_black] hover:translate-x-1 hover:translate-y-1 transition">see all ${total} projects →</a></div>
  </section>
  <!-- projects:end -->`;

async function writeIndex() {
  const file = path.join(src, 'index.html');
  let html = await fs.readFile(file, 'utf8');
  const marked = /<!-- projects:start[\s\S]*?<!-- projects:end -->/;
  const legacy = /<!-- projects section -->[\s\S]*?<\/section>/;
  if (marked.test(html)) html = html.replace(marked, indexBlock);
  else if (legacy.test(html)) html = html.replace(legacy, indexBlock);
  else throw new Error('Could not find the projects section in index.html');
  await fs.writeFile(file, html);
}

if (!args.has('--no-images')) {
  const list = only ? ranked.filter((p) => only.includes(p.id)) : ranked;
  console.log(`rendering ${list.length} graphics`);
  await renderImages(list);
}
await fs.writeFile(path.join(src, 'projects.html'), projectsPage);
await writeIndex();
console.log(`wrote projects.html (${total} projects) and the index block`);
for (const p of ranked) console.log(String(p.rank).padStart(3), p.score.toFixed(1).padStart(5), p.id.padEnd(16), p.ds);
