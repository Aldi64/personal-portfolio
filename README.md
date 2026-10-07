# Aldi Putra — Portfolio

A one-page personal portfolio for a full-stack developer, presented under my own name. The design is warm and approachable: a terracotta accent on a soft off-white base, with personality coming from motion rather than gimmicks.

**Live site:** [aldi-putra.vercel.app](https://aldi-putra.vercel.app)

## Features

- **About** — short intro, credential line, social links, and calls to action
- **Projects** — featured projects as cards that expand into a case-study modal with a preview carousel and lightbox; a separate `/projects` page lists everything with category filters
- **Skills** — skills grouped into cards with brand-colored icons
- **Certifications** — a 3D-tilt carousel with swipe support on mobile
- **Contact** — a minimal form with a confirmation state
- **Animated background** — floating gradient shapes behind every page, with reduced-motion support
- **CMS-driven content** — projects, skills, and certifications are managed in Sanity and fetched at runtime, so updates don't need a redeploy

## Tech stack

| Area         | Tools                                     |
| ------------ | ----------------------------------------- |
| Framework    | React, TypeScript, Vite                   |
| Styling      | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Animation    | Framer Motion                             |
| Routing      | React Router                              |
| Content      | Sanity (projects, skills, certifications) |
| Icons        | react-icons                               |
| Contact form | Formspree (no backend)                    |
| Hosting      | Vercel, deployed from `main`              |

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # type-check and create a production build
npm run preview   # serve the production build locally
```

## Configuration

**Contact form.** Set `FORMSPREE_ENDPOINT` in `src/components/Contact.tsx` to your Formspree form ID.

**Content.** Projects, skills, and certifications come from Sanity. The client lives in `src/lib/sanity`, and the content types are:

| Type            | Used for                                                  |
| --------------- | --------------------------------------------------------- |
| `project`       | Project cards, case-study modal, and the `/projects` page |
| `skills`        | Skill category cards                                      |
| `certification` | Certifications carousel                                   |

Featured projects on the home page are the ones with `order` 0, 1, or 2 in the Studio. Everything else only appears on `/projects`.

**Skill icons.** Icons and brand colors are mapped by skill name in `src/data/skillIcons.tsx`. A skill name in Sanity must match its key there exactly, or it falls back to a bullet.

## Project structure

```text
src/
├── components/     Projects, ProjectModal, Skills, SkillCard,
│                   Certifications, ShapesBackground, ...
├── pages/          AllProjects (/projects)
├── data/           skillIcons
├── lib/            sanity client and image URL helper
└── types/          shared TypeScript types
```

## Deployment

The site is deployed on Vercel from the `main` branch. Every push to `main` triggers a new production build.

## Design notes

- Accent: terracotta `#D9642C` on an off-white `#E7E3DB` base, with charcoal neutrals
- Colors are defined as theme tokens (for example `ink`, `card`, `border`) so the palette can change in one place
- Motion is used sparingly: scroll-in reveals, the project card expanding into its modal, and the floating background shapes
