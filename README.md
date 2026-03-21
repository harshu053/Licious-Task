# Task Management Dashboard

React (JavaScript) app for creating, editing, filtering, and tracking tasks with **localStorage** persistence.

## Setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Features (assignment scope)

- **Create tasks** — title, description, priority (low / medium / high), optional due date
- **List and card layouts** — toggle in the header
- **Edit** — modal with validation (title required; invalid dates rejected)
- **Delete** — confirmation dialog before removal
- **Status** — complete / pending with checkbox, strikethrough, and reduced emphasis on completed items
- **Search** — title and description (case-insensitive)
- **Filters** — all / pending / completed; priority filter; reset when filters are active
- **Counts** — total, pending, completed (always from full task list, not filtered)
- **Persistence** — tasks stored under `localStorage`; corrupted or invalid stored data is ignored safely
- **Responsive** — layout adapts from mobile (bottom sheet–style modals) through tablet to desktop
- **Theme** — light / dark toggle, remembered in `localStorage`

**Not included (per brief):** TypeScript, unit tests, drag-and-drop reordering.

## Deploy

After `npm run build`, deploy the `dist` folder to Vercel, Netlify, or GitHub Pages. Add your live URL here: `________________`

## Screenshots

_Add desktop + mobile screenshots before submission._

## Design notes

- Warm neutral palette with a single accent for actions and focus rings
- `DM Sans` for UI copy, `Instrument Serif` for headings (loaded from Google Fonts)
- Overdue pending tasks are highlighted; empty and error states use plain language

## Component layout

UI pieces live under `src/components/<name>/` with a matching `<name>.jsx` and `<name>.module.scss` where it helps (e.g. task board). The task editor modal lives at `taskeditor/TaskEditorModal.jsx` with styles from global classes in `index.css`. Shared tokens stay in `src/index.css` (`:root` / `[data-theme]`).
