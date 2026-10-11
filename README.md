# Emergency Helplines BD — জরুরি হেল্পলাইন

An **offline, bilingual (English/বাংলা) quick-dial directory** of verified
emergency and helpline numbers for Bangladesh. Static web app — no build step,
no backend, no sign-up, no internet required. Open `index.html` and it works.

## Problem

In an emergency, people in Bangladesh often can't remember which helpline does
what — 999 vs 333 vs 109 vs 16263 — and phone-book/contact apps need internet
or updates. A single saved page with one-tap calling, searchable in both
English and Bangla, solves that.

## Features

1. **Red 999 quick-dial banner** pinned to the top of the screen (sticky, always visible), linking to `tel:999`.
2. **Search** across number, English name, and Bangla name — also matches Bangla digits typed into the box.
3. **Category filter chips**: All, Emergency, Police, Women & Children, Health, Govt Services — plus ★ Favorites. Bilingual labels.
4. **Helpline cards**: bilingual name, big tap-friendly number (Bengali digits in বাংলা mode), short description, Toll-free / 24/7 badges, one-tap **Call** (`tel:`) button, and a **favorite star**.
5. **Favorites** saved in `localStorage` — survive reloads; a Favorites filter with an empty-state message when none are saved.
6. **EN/বাংলা toggle** persisted in `localStorage`; offline-notice footer; honest source list; caution note on Shastho Batayon (16263).

## The 12 helplines

| # | Number | Name | Category | Notes |
|---|--------|------|----------|-------|
| 1 | 999 | National Emergency Service | Emergency | 24/7 toll-free; works at zero balance; press 2 for English |
| 2 | 109 | Violence Against Women & Children Helpline | Women & Children | 24/7 toll-free |
| 3 | 333 | National Helpline | Govt Services | Toll-free govt info & social services |
| 4 | 13219 | Missing Children (MUN Alert) Helpline | Women & Children | Toll-free; launched 2026 |
| 5 | 01320017060 | Missing Children Cell, CID | Women & Children | Regular call rates |
| 6 | 16263 | Shastho Batayon (DGHS Telehealth) | Health | Free doctor advice 24/7 — **caution: 2026 news flagged funding-related disruptions; service may be intermittent** |
| 7 | 106 | Anti-Corruption Commission Hotline | Govt Services | Free from any mobile |
| 8 | 105 | Election Commission NID Hotline | Govt Services | Toll-free, official working hours |
| 9 | 01320001300 | Police HQ Control Room | Police | — |
| 10 | 01320182598 | Highway Police Headquarters | Police | — |
| 11 | 01777720029 | Rapid Action Battalion (RAB) | Police | — |
| 12 | 01320177598 | Railway Police Headquarters | Police | — |

## Stack

- Vanilla **HTML + CSS + JavaScript** (no framework, no build step).
- Test harness: **Node.js + puppeteer-core** driving system Chromium headless.
- Mobile-first responsive CSS with dark-mode (`prefers-color-scheme`) support.

## Prerequisites

- Any modern browser to run the app (double-click `index.html`).
- For tests: Node.js 18+ and Chromium (`/opt/meta-chromium/chrome` on this machine).

## Install / dev commands

```bash
npm install        # installs puppeteer-core (test harness only; gitignored)
npm test           # runs the headless-Chrome suite (tests/test.js)
```

There is nothing to build — `index.html` is the app.

## Testing

`npm test` runs 10 headless-Chrome assertions against the real rendered page:

- 999 banner present, sticky, `href="tel:999"`
- 12 cards rendered
- search `999` → exactly 1 card
- Health chip → exactly 1 card (16263)
- favorites add/remove persists across page reload
- BN toggle renders `৯৯৯` (Bengali digits) and Bengali chip labels
- 390px viewport: no horizontal overflow
- all 12 `tel:` hrefs match the dataset
- "no results" empty state
- 0 console errors, 0 page errors

Last run (2026-10-11): **10/10 passed**, Chromium 152 headless.

## Deployment (GitHub Pages)

This is a fully static site:

1. Create a repo named `emergency-helplines-bd` (no README/.gitignore/license needed — they're already here).
2. Push: `index.html`, `css/`, `js/`, `README.md`, `.gitignore`, `package.json`, `tests/`.
3. Repo Settings → Pages → Deploy from branch → `main` / root.
4. Live at `https://<user>.github.io/emergency-helplines-bd/`.

No environment variables, no secrets, no server.

## Data sources

Numbers compiled from Bangladeshi press reports (web-verified October 2026):

- The Daily Star (999, 109, 333, 16263, 106, 105)
- Dhaka Tribune (999, 13219, 01320001300, 01320182598, 01777720029, 01320177598)
- BSS — Bangladesh Sangbad Sangstha (13219, 01320017060)
- The Daily Sun (16263)
- TBS News (105)

## Limitations

- Numbers were verified from press reports in **October 2026**. Helplines change — **re-verify before relying on any number in an emergency**.
- 16263 (Shastho Batayon): 2026 news reports flagged funding-related disruptions; the app shows a caution that the service may be intermittent.
- This is a community directory, **not** an official government app. It makes no live-data claims.
- Favorites and language preference live in the browser's `localStorage`; clearing site data removes them.

## Status

Built and tested 2026-10-11 (MUSE Project Factory run #27). 10/10 headless-Chrome tests green.
