# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Portfolio content preferences

Preserve the original Framer template appearance. Personalization changes project details only; keep the existing layout, typography, spacing, card styles, and image framing. Featured work starts with PEARL; LumeX, Planza, and Horizon Atlas are temporary example projects. Original project artwork is placeholder imagery until replacement screenshots are provided.

PEARL imagery must match the original Pulma asset treatment: muted blue cloudy background, thin translucent double frame, large rounded screen inset, and no navy band. The PEARL detail gallery contains distinct login, student, and vendor screens in that order. Vendor imagery may use the actual source components with explicitly named demo records; never substitute the public landing page for an authenticated dashboard.

Preserve original section motion when personalizing content. The Services cards use the source Framer hover treatment: title slides to “Start a Project”, icon slides to a rotating arrow, details fade to 30%, and the neutral header gains a small shadow. Original spring settings are stiffness 500, damping 60, mass 1; phone cards retain the static title and arrow. Do not replace this with a generic lift or zoom.
