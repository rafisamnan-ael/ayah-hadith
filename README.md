# Ayah & Hadith

A minimalistic Islamic content browser **and** photocard generator. Browse the
Qur'an and Hadith, then turn any verse or narration into a beautiful, social
media ready card — no design skills required.

> SELECT CONTENT → SELECT TEMPLATE → CUSTOMIZE → EXPORT

## Features

- **Qur'an section** — browse by Surah, Juz, or search by keyword (English / Bangla).
  Every verse shows Arabic (Uthmani), English (Saheeh International) and Bangla
  (Muhiuddin Khan) side by side, with surah/verse metadata.
- **Hadith section** — browse by collection, chapter/book, topic, or search.
  Arabic + English + Bangla where the source provides them.
- **Photocard generator** — 28 premium, typography-led templates grouped into
  Minimal / Editorial / Themed / Photo (themed ones named by purpose — Fajr,
  Layl, Nur, Jannah, Mihrab, Du'a, Kawthar, Hikmah, Sabr…), 12 colour palettes +
  custom background, solid / gradient / pattern / grain backgrounds, optional
  image (upload **or AI-generated**) with correct zoom / pan / transparency /
  scrim controls, a "use as background" mode, corner finish and an editable
  signature. Long text auto-fits. Export portrait (1080×1350), square
  (1080×1080) or story (1080×1920) as PNG/JPG, **copy to clipboard**, or
  **share** straight to another app.
- **AI background safety** — thematic backgrounds only: prompts asking for
  people, faces, portraits, sacred figures or explicit/violent content are
  refused, and a strong negative prompt is always applied.
- **Bilingual UI** — বাংলা / English, switchable in the header. Arabic always
  renders RTL with proper ligatures and diacritics.
- **Search, Favorites, Recently viewed** — all persisted locally. No account
  required.
- **Modular architecture** — API providers, content objects and templates are
  decoupled so providers/templates can be swapped or added later.

## Data sources (real, keyless)

| Domain | Provider | Notes |
| --- | --- | --- |
| Qur'an | [alquran.cloud](https://alquran.cloud/api) | Arabic `quran-uthmani`, English `en.sahih`, Bangla `bn.bengali` |
| Hadith | [fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api) | Arabic / English / Bangla editions for Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah, Malik, Nawawi, Qudsi |
| AI backgrounds | [Pollinations](https://pollinations.ai) (keyless) via `/api/ai-background` | Swap with `AI_IMAGE_API_URL` / `AI_IMAGE_API_KEY` |

No religious content is hard-coded or generated. Translations and references
always come from the source API. If a translation is unavailable it is shown as
_"Translation unavailable"_.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — defaults work out of the box
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run typecheck` — TypeScript check
- `npm run lint` — ESLint

## Architecture

```
src/
  app/                 Next.js App Router pages (home, quran, hadith, create, search, favorites)
  components/
    layout/            Header, mobile nav, footer
    ui/                Buttons, cards, skeletons, toggles, states
    quran/ hadith/     Domain components
    templates/         Reusable template engine + 12 templates
    photocard/         Editor, preview stage, image controls, export
  services/
    api/               Shared config + fetch (timeout, retry)
    quran/             Qur'an provider → normalized content
    hadith/            Hadith provider → normalized content
  lib/                 Normalization, i18n, storage, caching, text fitting
  hooks/  store/  types/  data/
```

All API responses are transformed into a single normalized `ReligiousContent`
object before reaching the UI, so swapping an API provider never touches the UI
or the template system.

## License / attribution

Qur'an text & translations © their respective providers via alquran.cloud.
Hadith collections via fawazahmed0/hadith-api. Please verify religious content
against an authoritative source before sharing.
