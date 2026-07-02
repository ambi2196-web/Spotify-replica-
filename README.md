# Resonance — A Spotify Product Strategy Thesis, Made Interactive

Resonance is an interactive MVP built to prove a product thesis: Spotify should invest in platform-owned, royalty-clean audio content to structurally reduce its dependency on label royalties. Rather than write a case study, this project builds the product itself — four distinct listening surfaces that demonstrate what a royalty-independent Spotify could look like as a user experience, not just a slide deck.

Built as part of a Product Management case study exploring Spotify's long-term strategic options.

**[Live Demo →](https://spotify-replica-black.vercel.app/)** · Case Study Deck: [link]

---

## The Four Segments

| Segment | What it demonstrates |
|---|---|
| **Music** | System 1 listening baseline — familiar grid playback, the current Spotify model, the cost structure this thesis is designed to escape |
| **Podcast** | Long-form audio, System 1 — Spotify already owns Anchor and distributes creator audio; this surface shows the existing wedge |
| **Canvas** | Original royalty-clean audio + an AI composition engine — the thesis in action. Users select a cognitive state (Focus / Energy / Calm / Wind Down) and play catalog audio, or use the Composition Engine to generate a track from a prompt. No label. No royalty clock ticking. |
| **Discover** | Hook-to-depth discovery engine for creator-owned audio — the thesis at the top of the funnel. Every card plays a 30-second preview; the platform then asks "Worth going deeper?" Designed to surface independent and platform-owned content without relying on algorithmic promotion of label-owned tracks. |

---

## Tech Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript**
- **Tailwind CSS 4** (CSS custom properties, `@theme inline`)
- **Zustand** — global player state, discovery mode
- **HTML5 Audio API** — single `<audio>` element persisted in the layout

---

## Running Locally

```bash
git clone <repo-url>
cd resonance-spotify
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note on assets:** Audio files (`/public/audio/`) and cover images (`/public/images/`) are royalty-free binaries tracked in the repo but not suitable for redistribution. Sources used: [Pixabay Music](https://pixabay.com/music/), [Unsplash](https://unsplash.com/) (images), and the [Seen and Unseen](https://seenunseen.in/) podcast (Amit Varma).

---

## Live Demo

[https://spotify-replica-black.vercel.app/](https://spotify-replica-black.vercel.app/)

---

## Author

**Ashutosh Dhote** — Senior Technical Recruiter transitioning to Product Management.
This project is part of a broader PM case study portfolio exploring product strategy, user experience, and the economics of audio streaming platforms.
