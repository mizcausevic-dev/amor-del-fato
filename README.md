# Amor del Fato

**A daily Stoic practice that fuses classical Stoicism with modern self-help.**

*Amor fati*, love of fate. Guided sessions, a silent meditation timer, a breath practice, streaks, and a reflection journal that shows you how your practice actually changes you over time. Local-first, installable, and calm by design. Train your mind the way the Stoics trained theirs: a little, every day.

Structurally inspired by the open-source [Hey Linda](https://github.com/heylinda/heylinda-app) meditation app, rebuilt from scratch as a Stoicism-first web app.

## What it does

- **Onboarding** — a short first-run flow learns what you want to work on (anger, fear, discipline, grief, purpose…), sets your recommended path, and greets you by name. Skippable.
- **Today** — a time-aware greeting, one dominant next practice, quick actions (Breathe, Reflect, Surprise me), a "carry this into your day" micro-practice, curated collections, the daily reflection with an application note, your streak, and a glimpse of your last journal entry. Two-column on desktop, single column on mobile.
- **Session player** — a guided flow: an arrive check-in, an anchor quote, a self-paced guided script, a silent timer with a breathing ring and a synthesized bell, a closing reflection, and a leave check-in.
- **The Shift** — your arrive vs leave states charted over time on Progress, with a plain-language weekly summary. See how sessions tend to move you, not just that you showed up.
- **Paths** — 8 guided courses across 32 sessions, 6 classic Stoic exercises, and short bios of the Stoics themselves.
- **Journal & Progress** — every reflection kept and linked to what prompted it; streak, minutes, and a 13-week day-dot calendar.

## Design principles

- **Local-first.** Streak, sessions, check-ins, and journal live only in the browser (`localStorage`). No account, no server, no tracking. Export a JSON backup any time from Settings.
- **Installable PWA.** Add to a phone home screen; works offline via a service worker. The React + TypeScript content and state layer ports to native later if needed.
- **Calm, not gamified.** No badges, no confetti, no "you're on fire." Streaks and the Shift chart read as reflective information, never as rewards. Framer Motion is reserved for phase transitions and the breathing ring; a subtle grain and per-theme ambient backdrops remove the "flat" feel without touching reading surfaces. Honors `prefers-reduced-motion`.
- **Warm, grounded aesthetic.** Stone and clay, not steel and cyan. Space Grotesk headings, Inter body, Libre Baskerville reserved for quotes.

## On the source of the words

Quotes attributed to Marcus Aurelius, Epictetus, and Seneca are drawn from **public-domain translations** (George Long, Elizabeth Carter, Richard Gummere). The guided practices, reflections, takeaways, and exercise steps are **original writing**, not attributed to the ancient Stoics. Philosopher bios use only well-established encyclopedic facts, with uncertain dates hedged. Where a well-known modern phrasing (for example the "obstacle is the way" wording) is under copyright, it is not put in a Stoic's mouth. Nothing is fabricated or misattributed.

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

**About:** A daily Stoic practice app fusing classical Stoicism with modern self-help: guided sessions, arrive/leave check-ins, a silent timer, streaks, and a reflection journal. Local-first, installable PWA.

**Topics:** `stoicism` `meditation` `self-help` `mindfulness` `pwa` `react` `typescript` `vite` `tailwindcss` `local-first`
