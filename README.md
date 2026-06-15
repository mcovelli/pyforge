# PyForge

An interactive Python learning platform focused on data analytics, business analytics, and systems analytics. PyForge runs Python directly in the browser via Pyodide (WebAssembly), so there's nothing to install and no server-side code execution.

## What it does

PyForge is organized into 18 rooms across 4 learning paths:

- **Python Foundations** (rooms 1-5): variables, data types, control flow, functions, data structures, file I/O
- **Data Analytics Core** (rooms 6-10): NumPy, Pandas, data cleaning, visualization, statistics
- **Advanced Analytics** (rooms 11-14): business intelligence pipelines, machine learning foundations, interactive visualization, advanced Pandas
- **Systems & Integration** (rooms 15-18): SQL with Python, systems automation, data integration/ETL, and a capstone project

Each room includes lessons, hands-on coding exercises (run live in-browser and checked against test assertions), debugging scenarios, and a quiz. Rooms unlock progressively based on prerequisites. The hands-on coding exercises run inside a step-by-step guided layout to optimize rendering and simplify the user workflow.

## Tech stack

## Tech stack

- React 19 + Vite for the frontend
- Pyodide (v0.27.5) for local in-browser Python execution
- Headless AGG rasterization for converting Matplotlib plots to inline Base64 data strings
- CodeMirror 6 with Python syntax highlighting and isolated key instance bindings
- Dexie (IndexedDB) for local progress storage, no backend required
- Google Gemini (2.0 Flash, free tier) for socratic hints and diagnostic assessment loops

## Local development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

This runs the build and pushes `dist/` via `gh-pages`. Update the `base` path in `vite.config.js` to match your repo name before deploying.

## AI tutor setup (optional)

The AI hint system and post-quiz assessments use Google Gemini. To enable them:

1. Get a free API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Either set `VITE_GEMINI_API_KEY` in a `.env` file (copy `.env.example`), or enter the key directly in the app's Settings page

The key is stored locally in the browser and only ever sent to Google's API. The free tier is capped at roughly 1,400 requests/day; PyForge tracks usage and automatically disables AI features until the next day if the limit is hit. Everything else (lessons, exercises, quizzes, progress tracking) works without a key.

## Data and accounts

User accounts are local-only: usernames and passwords are hashed (SHA-256) and stored in IndexedDB via Dexie, with no server involved. Progress, exercise attempts, and quiz results can be exported as JSON from the Settings page for backup.

## Project structure

```
src/App.jsx                  # Top-level routing between auth, dashboard, room view, settings
src/components/Auth/         # Login/signup
src/components/Layout/       # Sidebar navigation
src/components/Dashboard/    # Progress overview and room grid
src/components/Room/         # Room view, code exercises, quizzes, scenarios
src/components/Editor/       # CodeMirror-based Python editor
src/components/Settings/     # AI key management, data export
src/data/roomIndex.js        # Room metadata, paths, prerequisites
src/data/roomLoader.js        # Maps room IDs to content modules
src/data/rooms/              # Lessons, exercises, scenarios, and quizzes per room
src/services/pyodide.js      # In-browser Python execution and test runner
src/services/ai.js           # Gemini integration for hints and assessments
src/services/database.js     # IndexedDB (Dexie) schema and queries
```

## Notes

- Matplotlib charts render as static images inside output canvas components rather than native interactive popups.
- The capstone (room 18) requires completing rooms 11-14 first.
