# Developer Portfolio (Arabic / English)

A bilingual developer portfolio built with **React, TypeScript and Vite**. Every piece of interface text exists in Arabic and English, and a visible button switches between them instantly. Arabic renders right-to-left, English left-to-right, and the choice is remembered on the visitor's device.

Sections: Hero, About, Skills, Featured Projects, Services, Experience, CV, Contact and Footer.

Skills shown: Java, C#, Python, PHP, JavaScript, React, Angular, React Native, Spring Boot, MySQL and PostgreSQL.

Personal details, experience and education come from Mahmoud Saeed's CV (`public/Mahmoud-Saeed-CV.pdf`). Still to add: the GitHub profile link and the live demo / repository links of each project (`src/config/profile.ts`). See [Personalize](#personalize).

## Features

- **Reusable i18n layer** (`src/i18n`): a language context, typed `en` / `ar` dictionaries and Intl helpers. Components read `t.section.key`; no component is duplicated per language.
- **Type-safe translations:** `ar.ts` is typed against the English dictionary, so a missing Arabic key fails `npm run build`.
- **Direction-aware layout:** `<html lang dir>` updates on every switch; styles use CSS logical properties (`margin-inline-start`, `inset-inline-end`, `text-align: start`, …). Forward arrows mirror in RTL; the select arrow, timeline, toasts and mobile menu follow the direction.
- **Persistence:** the language is saved in `localStorage` (`portfolio.language`). On a first visit it follows the browser language (Arabic browsers get Arabic), otherwise English. A small inline script in `index.html` applies the saved direction before the app loads, so Arabic visitors don't see a left-to-right flash.
- **Locale formatting:** dates and numbers use `Intl` with `en-US` or `ar-SA` (Gregorian calendar, Arabic-Indic digits).
- **Fonts:** IBM Plex Sans Arabic for Arabic and Inter for Latin, with system fallbacks (Noto Sans Arabic, Segoe UI, Tahoma, Geeza Pro).
- **Contact form:** validation with translated messages, focus moved to the first invalid field, accessible error descriptions, a character counter, and toasts. Switching language keeps everything typed and re-translates visible errors and notifications.
- **No fake backend:** the form opens the visitor's email app with a pre-filled message (`mailto:`). If no email is configured, it says so instead of pretending to send.
- **Accessibility:** skip link, labelled landmarks, keyboard-operable language switcher and mobile menu (Escape closes it), visible focus styles, `prefers-reduced-motion` support.
- **Unconfigured links** (live demo, source code, social profiles) are shown as "Link coming soon" / "Not configured yet" rather than dead links.

## Motion and effects

| Library | Used for |
| --- | --- |
| [GSAP](https://gsap.com) + ScrollTrigger | Hero entrance; section titles unmask and cards fade up on scroll; the experience timeline fills as you scroll; top scroll-progress bar; hero numbers count up |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling, including in-page links. Driven by GSAP's ticker (`gsap.ticker.add`) and feeds `ScrollTrigger.update`, so both run in the same frame |
| [React Bits](https://reactbits.dev) | `BlurText` (hero name), `LightRays` (hero), `ShinyText` (availability badge), `StarBorder` + `Magnet` (hero buttons), `SpotlightCard` (every card, via `ui/Card.tsx`), `LogoLoop` (skills marquee), `ClickSpark` (click sparks). Source copied into `src/components/reactbits/` |
| [Motion](https://motion.dev) | Required by React Bits `BlurText` |

Design: dark theme with mint (`#2fc4a6`) and gold (`#e3b453`) accents; tokens are at the top of `src/styles/global.css`, and the redesign layer is at the end of that file.

Code lives in `src/animation/` (`gsap.ts`, `useSmoothScroll.ts`, `useScrollReveal.ts`) and `src/components/ui/CountUp.tsx`.

**Reduced motion:** with `prefers-reduced-motion: reduce`, Lenis is not started, sections appear without animation, the light rays are not rendered, the CV glow stops moving, buttons don't follow the cursor, click sparks are off, the name shows as plain text and the numbers show their final value.

React Bits components are under the MIT + Commons Clause license: free to use in this site, but the components themselves may not be resold or redistributed on their own.

## Getting started

Requirements: **Node.js 20.19+ or 22.12+** and npm.

```bash
npm install
npm run dev          # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only |
| `npm run lint` | Lint with oxlint |
| `npm run test:e2e` | Build, serve and run the Playwright tests (desktop + mobile) |

First time running the tests: `npx playwright install chromium`.

## Personalize

1. **Contact details and links:** `src/config/profile.ts`
   - `email`, `phone`, `linkedinUrl`, `githubUrl` (leave `null` to show "Not configured yet")
   - `cvUrl`: copy your CV to `public/cv.pdf` and set `cvUrl: './cv.pdf'` (leave `null` to show "CV coming soon")
   - `projects[].demoUrl` / `repoUrl` for each of the four projects
   - `experience[]`: dates, `group` (`work` or `education`) and `precision` (`year` when only the year is known)
2. **Text in both languages:** `src/i18n/locales/en.ts` and `src/i18n/locales/ar.ts`
   - `profile.name`, `profile.initials`, `profile.role`, `profile.location`, `meta.title`, `meta.description`
   - `about.paragraphs`, `about.factValues.languages`
   - `experience.items` (job titles, organizations, descriptions), keyed by the ids in `profile.ts`
   - `skills.groups` lists only real skills. Add a skill to both files when you actually use it.
   - Review the services list so it matches what you actually offer.
3. **Static title for search engines:** update `<title>` and the description in `index.html`. The app replaces them at runtime, but crawlers and link previews read the static HTML.

### Adding a translated string

1. Add the key to `src/i18n/locales/en.ts`.
2. Run `npm run typecheck`: it fails until the same key exists in `ar.ts`.
3. Use it in a component: `const { t } = useLanguage()` then `t.section.key`. For values use `format(t.section.key, { count })`, `formatNumber` and `formatDate`.

## Project structure

```
src/
  i18n/
    config.ts            # languages, direction, locale, default + storage logic
    context.ts           # context type
    LanguageProvider.tsx # state, <html lang/dir>, title, Intl helpers
    useLanguage.ts       # hook used by components
    interpolate.ts       # "{token}" replacement
    locales/en.ts, ar.ts # dictionaries
  config/profile.ts      # non-translated personal data, links, dates, form limits
  components/
    layout/              # Header, LanguageSwitcher, Footer, nav items
    sections/            # Hero, About, Skills, Projects, Services, Experience, Cv, Contact
    ui/                  # Icon, Section, ExternalLink, toast system
  hooks/useActiveSection.ts
  utils/                 # contact validation, mailto builder
  styles/global.css      # design tokens + logical-property layout
tests/bilingual.spec.ts  # Playwright end-to-end tests
```

## Publish to GitHub

1. Create an empty repository on GitHub (no README), e.g. `developer-portfolio`.
2. From this folder:

```bash
git init            # skip if the folder is already a git repository
git add .
git commit -m "Initial commit: bilingual developer portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/developer-portfolio.git
git push -u origin main
```

`node_modules/`, `dist/`, test output and `.env` files are excluded by `.gitignore`. This project needs no API keys or secrets.

## Deploy to Vercel

The build is static (`dist/`). `vercel.json` tells Vercel to install with `npm ci`, build with `npm run build` and serve `dist/`.

1. Push the project to GitHub as above.
2. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
3. **Add New → Project**, pick the `developer-portfolio` repository, then **Deploy**.
4. Every push to `main` deploys again automatically. Pull requests get their own preview URL.

After the first deploy, put the live URL in `projects[0].demoUrl` in `src/config/profile.ts` and push again.

`.github/workflows/ci.yml` runs lint, type-check and build on every push and pull request, so a broken change shows a red ✗ on GitHub before you rely on the Vercel deploy.

Because asset paths are relative (`base: './'` in `vite.config.ts`), the same build also works on Netlify, Cloudflare Pages or GitHub Pages if you ever move.

## Testing

`tests/bilingual.spec.ts` runs in desktop Chrome and a Pixel 7 mobile viewport and checks:

- English default, switching to Arabic and back, `<html lang dir>`, title and meta description
- Language persists after reload and is applied before the app script loads
- An Arabic browser locale defaults to Arabic
- Keyboard operation and accessible name of the switcher
- No untranslated English text in Arabic mode (only inherently Latin values such as tech names and the email example), and no Arabic in English mode except the switcher label
- Locale formatting of dates and numbers
- Form validation messages in both languages, re-translated on switch
- Typed form values survive switching languages in both directions
- An unconfigured contact email reports an error instead of faking a send; toasts re-translate and can be dismissed
- The Skills section lists exactly the configured skills; the CV section reports a missing file instead of a dead link
- No horizontal overflow in either language; header order flips with direction; mobile menu open, navigate and Escape; arrow icons mirror in RTL

Not covered by automated tests: the `mailto:` hand-off to a real email app (it needs `profile.email` set and a mail client), and real Safari, Firefox or iOS devices. Check those manually before sharing the site.

## License

Add a license of your choice (for example MIT) before publishing if you want others to reuse the code.
