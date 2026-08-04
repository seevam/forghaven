# Forgehaven Brewing Co. — Landing Page

A premium craft brewery landing page built with **Next.js 15**, **Framer Motion**, and **Lenis smooth scroll**.

## Scrollytelling features

| Section | Technique |
|---|---|
| Hero | Parallax background + cinematic text reveal on load |
| Brews | Sticky panel — scroll drives brew switching (3 brews × 100vh) |
| Process | Horizontal scroll — scroll drives left-right chapter movement |
| Heritage | Parallax image + staggered fade-in reveals |
| Marquee | Infinite looping text strip |
| Global | Smooth scroll (Lenis), amber scroll progress bar at top |

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Framer Motion** — all scroll-driven animations
- **Lenis** — buttery smooth scroll inertia
- **Tailwind CSS** — utility styling
- **Google Fonts** — Playfair Display + Inter

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel (recommended)

### Option 1 — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
# Follow prompts → deploys in ~60 seconds
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo — Vercel auto-detects Next.js
4. Click **Deploy** — no config needed

### Option 3 — Drag & Drop
1. Run `npm run build` locally
2. Drag the `.next` folder into vercel.com/new

## Customisation

- **Brand name / copy** — edit component files in `/components/`
- **Brews data** — edit the `brews` array in `components/BrewsScrolly.tsx`
- **Process steps** — edit `steps` array in `components/HorizontalProcess.tsx`
- **Colors** — CSS variables in `app/globals.css` under `:root {}`
- **Images** — replace Unsplash URLs with your own (update `next.config.ts` domains)

## Project structure

```
forgehaven/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Page assembly
│   └── globals.css       # Design tokens + global styles
├── components/
│   ├── SmoothScroll.tsx  # Lenis provider
│   ├── ScrollProgress.tsx # Amber top progress bar
│   ├── Nav.tsx           # Fixed nav with scroll opacity
│   ├── Hero.tsx          # Parallax hero
│   ├── IntroBand.tsx     # Stats + pull quote
│   ├── BrewsScrolly.tsx  # Sticky scroll brews (main scrollytelling)
│   ├── Marquee.tsx       # Infinite text marquee
│   ├── Heritage.tsx      # Parallax image section
│   ├── HorizontalProcess.tsx # Horizontal scroll craft steps
│   ├── TestimonialCTA.tsx # Quote + CTA
│   └── Footer.tsx
├── vercel.json
└── next.config.ts
```
