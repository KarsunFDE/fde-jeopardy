# FDE Jeopardy — Weeks 1–3 Review

An interactive Jeopardy!-style review game for the **Karsun-FDE 6-Week Intensive**, covering Weeks 1–3 (LLM Engineering Essentials, RAG Architecture, Agentic Systems) plus a light touch of brownfield modernization — all oriented around the **Forward Deployed Engineer (FDE) mindset**.

The instructor runs it live as host on one screen (projected to the cohort); keep `HOST-GUIDE.md` open on a second screen for the answer key, FDE teaching points, and trap call-outs.

## Run locally

Pure static site, no build step. Serve the repo root over HTTP (the game fetches `data/board.json`, which `file://` blocks):

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy (GitHub Pages)

Pushing to `main` triggers `.github/workflows/pages.yml`, which deploys the whole repo root. Enable Pages → Source: **GitHub Actions** in repo settings.

- **Live URL:** _(set after first deploy)_ `https://<org>.github.io/<repo>/`

## How to play (host)

1. Project `index.html`. Three teams = the three fixed pairs (rename teams inline on the scoreboard).
2. Click a tile → clue shows. Click again / press **Space** → reveals the correct response. **Esc** = back to board.
3. Host adjudicates each team's "What is …?" response and uses the **+ / −** buttons to apply the clue's value (or the Daily Double wager).
4. Toggle **Timer** and **Sound** in the top bar (both default off). **Round** toggles Jeopardy ⇄ Double Jeopardy. **Final Jeopardy** is its own screen (category → wagers → clue → response).

## Content

- All clues live in `data/board.json` — 12 categories × 5 clues + Final Jeopardy.
- Every clue is grounded in W1–W3 curriculum + the FDE mindset brief. `teaching`, `trap`, and `source` fields are **host-only** metadata — they are never rendered on the learner screen.

> ⚠️ The game data is client-side. Don't let learners open `data/board.json` or `HOST-GUIDE.md` — that's the answer key.
