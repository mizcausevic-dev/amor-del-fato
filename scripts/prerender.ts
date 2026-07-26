/*
 * Post-build prerender for the content routes.
 *
 * The app is a client-rendered SPA, so a crawler that does not execute JS sees
 * an empty #root. That is fine for Google (it renders JS) but poor for the many
 * AI/lightweight crawlers that do not — and the source Readings, the Glossary,
 * and the Paths are exactly the content worth being cited for.
 *
 * This script writes a real static HTML file per content route: the built shell
 * with route-specific <title>/description/canonical/OG, accurate JSON-LD where
 * it applies, and a semantic snapshot of the actual content inside #root. The
 * app boots from the same shell, and because main.tsx uses createRoot().render()
 * (not hydrateRoot), React simply replaces the snapshot on load — no hydration
 * mismatch. Non-JS crawlers keep the static content; users get the SPA.
 *
 * Data modules imported here are pure (no React/DOM), so Node's native TS
 * type-stripping runs this with no extra dependency.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readings, readingsBySource } from '../src/data/readings.ts'
import { glossary, faq } from '../src/data/glossary.ts'
import { paths } from '../src/data/library.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
const DIST = join(HERE, '..', 'dist')
const ORIGIN = 'https://amordelfato.app'

/** Escape for both text nodes and double-quoted attributes. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Serialize JSON-LD safely for inlining in a <script> element. */
function jsonLd(obj: unknown): string {
  const json = JSON.stringify(obj).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

const WRAP =
  'max-width:720px;margin:0 auto;padding:2.5rem 1.25rem;' +
  'font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.65;color:#1a1815'
const H1 = 'font-size:1.75rem;font-weight:700;margin:0 0 .5rem'
const LEAD = 'color:#6b6459;margin:0 0 1.5rem'
const MUTE = 'font-style:normal;font-size:.85rem;color:#6b6459'

/** Real anchor links so crawlers can traverse between the content pages (the
    SPA's own nav is client-side and invisible to non-JS crawlers). */
function siteLinks(current: string): string {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/readings', label: 'Readings' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/paths', label: 'Paths' },
  ]
  const items = links
    .filter((l) => l.href !== current)
    .map(
      (l) =>
        `<a href="${l.href}" style="color:#9a5b3d;text-decoration:none">${esc(l.label)}</a>`,
    )
    .join(' &nbsp;·&nbsp; ')
  return `<nav style="margin-top:2.5rem;padding-top:1.25rem;border-top:1px solid #e5ddd0;font-size:.9rem">${items}</nav>`
}

function readingsBody(): string {
  const groups = readingsBySource()
  const sections = groups
    .map(
      (g) => `
      <section>
        <h2 style="font-size:.8rem;text-transform:uppercase;letter-spacing:.1em;color:#6b6459;margin:2rem 0 .75rem">${esc(
          g.label,
        )} (${g.items.length})</h2>
        ${g.items
          .map(
            (r) => `
        <blockquote style="margin:0 0 1rem;padding:0 0 0 1rem;border-left:3px solid #d8cfc0">
          <p style="margin:0 0 .35rem">${esc(r.text)}</p>
          <cite style="${MUTE}">${esc(r.author)} &middot; ${esc(r.sourceLabel)}, ${esc(
            r.ref,
          )} &middot; tr. ${esc(r.translator)}</cite>
        </blockquote>`,
          )
          .join('')}
      </section>`,
    )
    .join('')
  return `<main style="${WRAP}">
    <h1 style="${H1}">Readings</h1>
    <p style="${LEAD}">${readings.length} short, verbatim passages from the Stoics themselves &mdash; Marcus Aurelius, Epictetus, and Seneca &mdash; in trusted public-domain translations, each with a precise citation.</p>
    ${sections}
    <p style="font-size:.8rem;color:#8a8378;margin-top:2rem">All passages are in the public domain, reproduced verbatim from the cited translation.</p>
    ${siteLinks('/readings')}
  </main>`
}

function glossaryBody(): string {
  const terms = glossary
    .map(
      (t) => `
    <div style="margin:0 0 1.25rem">
      <h2 style="font-size:1.05rem;font-weight:600;margin:0 0 .1rem">${esc(t.term)}</h2>
      <p style="font-size:.8rem;color:#8a8378;margin:0 0 .35rem">${esc(t.origin)}</p>
      <p style="margin:0">${esc(t.definition)}</p>
    </div>`,
    )
    .join('')
  const faqs = faq
    .map(
      (f) => `
    <div style="margin:0 0 1rem">
      <h3 style="font-size:1rem;font-weight:600;margin:0 0 .25rem">${esc(f.q)}</h3>
      <p style="margin:0;color:#3a352e">${esc(f.a)}</p>
    </div>`,
    )
    .join('')
  return `<main style="${WRAP}">
    <h1 style="${H1}">Stoic Glossary</h1>
    <p style="${LEAD}">The core vocabulary of Stoic practice, in plain language.</p>
    ${terms}
    <h2 style="font-size:1.25rem;font-weight:700;margin:2.5rem 0 1rem">Frequently asked questions</h2>
    ${faqs}
    ${siteLinks('/glossary')}
  </main>`
}

function glossaryHead(): string {
  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Stoic Glossary',
    url: `${ORIGIN}/glossary`,
    description: 'Plain-language definitions of the core vocabulary of Stoic philosophy.',
    hasDefinedTerm: glossary.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
    })),
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return `${jsonLd(definedTermSet)}\n    ${jsonLd(faqPage)}`
}

function pathsBody(): string {
  const items = paths
    .map(
      (p) => `
    <div style="margin:0 0 1.25rem">
      <h2 style="font-size:1.1rem;font-weight:600;margin:0 0 .15rem">${esc(p.emoji)} ${esc(
        p.title,
      )}</h2>
      <p style="margin:0;color:#3a352e">${esc(p.description)}</p>
    </div>`,
    )
    .join('')
  return `<main style="${WRAP}">
    <h1 style="${H1}">Paths</h1>
    <p style="${LEAD}">Guided, multi-session Stoic courses. Each path is an ordered set of practices that builds one skill over time.</p>
    ${items}
    ${siteLinks('/paths')}
  </main>`
}

interface RouteSpec {
  slug: string
  title: string
  desc: string
  body: string
  head: string
}

const ROUTES: RouteSpec[] = [
  {
    slug: 'readings',
    title: 'Stoic Source Readings — Amor del Fato',
    desc: `${readings.length} short, verbatim excerpts from the Stoics (Marcus Aurelius, Epictetus, Seneca) in trusted public-domain translations, each with a precise citation.`,
    body: readingsBody(),
    head: '',
  },
  {
    slug: 'glossary',
    title: 'Stoic Glossary & Study — Amor del Fato',
    desc: 'Plain-language definitions of the core Stoic vocabulary (amor fati, the dichotomy of control, apatheia, ataraxia and more), plus answers to common questions about Stoicism.',
    body: glossaryBody(),
    head: glossaryHead(),
  },
  {
    slug: 'paths',
    title: 'Stoic Practice Paths — Amor del Fato',
    desc: 'Guided, multi-session Stoic courses that build one skill over time: the dichotomy of control, meeting adversity, discipline, gratitude, and facing mortality.',
    body: pathsBody(),
    head: '',
  },
]

function patchHead(tpl: string, title: string, desc: string, url: string, extraHead: string): string {
  let h = tpl
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  h = h.replace(/(name="description"\s+content=")[^"]*(")/, `$1${esc(desc)}$2`)
  h = h.replace(/(property="og:description"\s+content=")[^"]*(")/, `$1${esc(desc)}$2`)
  h = h.replace(/(name="twitter:description"\s+content=")[^"]*(")/, `$1${esc(desc)}$2`)
  h = h.replace(/(property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
  h = h.replace(/(name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
  h = h.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  h = h.replace(/(property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  if (extraHead) h = h.replace('</head>', `  ${extraHead}\n  </head>`)
  return h
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html')
}

for (const r of ROUTES) {
  const url = `${ORIGIN}/${r.slug}`
  let html = patchHead(template, r.title, r.desc, url, r.head)
  html = html.replace('<div id="root"></div>', `<div id="root">${r.body}</div>`)
  mkdirSync(join(DIST, r.slug), { recursive: true })
  writeFileSync(join(DIST, r.slug, 'index.html'), html)
  console.log(`prerendered /${r.slug} (${(html.length / 1024).toFixed(1)} kB)`)
}
