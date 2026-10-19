# Oshada Nilendra — Portfolio

A React migration of Oshada's published Luzia portfolio. The first version preserves the existing pages, images, typography, and responsive layouts, with React navigation, a working mobile menu, and accessible FAQ controls.

## Status

**First migration version, ready for review.** It is not yet a fully personalized, production-ready portfolio.

- Home, Work, About, Contact, and six project pages are included.
- Images and fonts are stored locally; no Framer runtime, analytics, or editing overlay is required.
- Desktop and phone layouts were compared in a browser.
- The original template's sample projects, testimonials, experience, external links, and footer attribution remain. Replace these before publishing as your personal portfolio.
- Framer's custom cursor, scroll-linked motion, and exact hover/choreography are not fully reproduced. Those effects need a dedicated motion pass.
- Contact delivery is not configured. The form displays an honest setup message and sends nothing. Set your own address to enable an email-app draft; a server-backed delivery provider would be a separate integration.

## Run in VS Code

Requires Node.js 22 or later.

```bash
npm ci
npm run dev
```

## Edit content

| File | Purpose |
| --- | --- |
| `src/content/site.js` | Portfolio identity, portrait, and optional contact email |
| `src/content/copy.json` | Editable text; change values while preserving source keys |
| `src/content/faq.json` | FAQ answers |
| `src/content/pages.json` | Migrated desktop and phone page structures |
| `src/App.jsx` | React navigation, menu, accordion, and form behaviors |
| `src/source.css` | Retained source styles for visual fidelity |
| `src/styles.css` | React interaction and accessibility styles |
| `public/assets/` | Local images and fonts |

The visual source uses generated Framer class names. These are retained deliberately for this initial migration; this is a React port of published markup, not the original Framer editing project or hand-authored component source. Subsequent edits can refactor one section at a time without losing its reference layout.

## Validate and build

```bash
npm test
npm run build
npm run test:sites
```

Static build output: `dist/client`. `vercel.json` supplies SPA deep-link routing. `public/_redirects` supports hosts that read Netlify-style redirects. GitHub can store the source; plain GitHub Pages requires an additional deep-link strategy.

## GitHub

Create an empty repository, then push the extracted source folder:

```bash
git init
git add .
git commit -m "Add React portfolio migration"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Do not commit `node_modules`, `dist`, or environment files; `.gitignore` excludes them.

## Design provenance

Source: https://azure-replacement-555423.framer.app/

Original Luzia template: Rosyid Qoim / Irise Studio. Existing template footer attribution is preserved. No claim of authorship over the original template or stock project work is made. Keep any rights and attribution required by your template and asset licenses.
