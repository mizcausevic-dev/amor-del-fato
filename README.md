# Hey There Warrior

**A daily Stoic practice that fuses classical Stoicism with modern self-help.**

Guided sessions, a silent meditation timer, streak tracking, and a reflection journal. Local-first, installable, and calm by design. Train your mind the way the Stoics trained theirs: a little, every day.

Structurally inspired by the open-source [Hey Linda](https://github.com/heylinda/heylinda-app) meditation app, rebuilt from scratch as a Stoicism-first web app.

## What it does

- **Today** — one dominant next practice, a daily reflection drawn from a real Stoic passage, and a 7-day streak strip.
- **Session player** — a four-phase flow: an anchor quote, a guided script you advance at your own pace, a silent timer with a breathing ring and a synthesized bell, and a closing reflection that feeds your journal.
- **Paths** — 8 guided courses (the Dichotomy of Control, Memento Mori, Mastering Anger, Fear & Anxiety, Discipline & Will, and more) across 32 sessions, plus 6 classic Stoic exercises.
- **Journal** — every reflection kept as a readable entry, linked back to the quote and session that prompted it.
- **Progress** — streak, longest streak, sessions, minutes, and a 13-week day-dot calendar.

## Design principles

- **Local-first.** Streak, sessions, and journal live only in the browser (`localStorage`). No account, no server, no tracking. Export a JSON backup any time from Settings.
- **Installable PWA.** Add to a phone home screen; works offline via a service worker. The same React + TypeScript content and state layer ports to native later if needed.
- **Calm motion.** Framer Motion is reserved for phase transitions and the breathing ring, not sprinkled on every element. Honors `prefers-reduced-motion`.
- **Warm, grounded aesthetic.** Stone and clay, not steel and cyan. Space Grotesk headings, Inter body, Libre Baskerville reserved for quotes.

## On the source of the words

Quotes attributed to Marcus Aurelius, Epictetus, and Seneca are drawn from **public-domain translations** (George Long, Elizabeth Carter, Richard Gummere). The guided practices, reflections, and exercise steps are **original writing**, not attributed to the ancient Stoics. Where a well-known modern phrasing (for example the "obstacle is the way" wording) is under copyright, it is not put in a Stoic's mouth. Nothing is fabricated or misattributed.

## Tech

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · React Router · lucide-react. No backend.

## Develop

```bash
npm install
npm run dev      # http://localhost:5199 (or the Vite default)
npm run build    # type-check + production build to /dist
npm run preview  # serve the production build
```

## Deploy

Static SPA. `npm run build` emits `/dist`, which serves from any static host. A `public/.htaccess` provides SPA deep-link routing and cache headers for Apache hosts.

---

**About:** A daily Stoic practice app fusing classical Stoicism with modern self-help: guided sessions, a silent timer, streaks, and a reflection journal. Local-first, installable PWA.

**Topics:** `stoicism` `meditation` `self-help` `mindfulness` `pwa` `react` `typescript` `vite` `tailwindcss` `local-first`
