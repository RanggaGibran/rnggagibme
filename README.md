# Rangga Gibran · Portfolio

A modern single-page portfolio for Rangga Gibran showcasing senior-level experience across full-stack web, Flutter mobile, and realtime game server development. The GitHub section pulls public repositories directly from the GitHub API so visitors always see live activity.

## Features
- Hero, impact metrics, specialties, experience timeline, skill cloud, live GitHub feed, and contact CTA in one smooth-scroll page.
- Clean dark UI with Space Grotesk typography, responsive grid system, and accessible contrast.
- GitHub repositories fetched on load with retry handling, fork filtering, and updated timestamps.
- Centralized profile data in `src/data/profile.ts` for quick edits to bio, metrics, experience, and contact info.
- Lightweight Vite + React + TypeScript stack for fast dev server and optimized builds.

## Getting started
Requirements: Node.js 20+ (or compatible LTS) and npm.

```powershell
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`) to preview the portfolio. For production builds:

```powershell
npm run build
npm run preview
```

## Configuration
1. Update `src/data/profile.ts` with the correct GitHub username, contact email, and any custom copy.
2. Optionally tune the specialties, metrics, and experience arrays to match current work.
3. Deploy the `dist/` output to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

> Note: The GitHub section will error if `profile.github.username` is empty or invalid; the UI exposes guidance plus a retry button.

## Tech stack
- [Vite](https://vitejs.dev/) for bundling and dev tooling
- [React 18](https://react.dev/) with TypeScript
- Modern CSS modules (no runtime CSS frameworks)
