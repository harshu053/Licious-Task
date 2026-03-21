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

After `npm run build`, deploy the `dist` folder to Vercel, Netlify, or GitHub Pages.  
Live URL: `https://licious-task.vercel.app/`

## Screenshots

- [Dashboard — list view](src/screenshots/Dashboard-ListView.png)
- [Dashboard — card view](src/screenshots/Dashboard-CardView.png)
- [Dashboard — dark theme (desktop)](src/screenshots/Dashboard-DarkTheme.png)
- [Add new task](src/screenshots/AddNewTask.png)
- [Edit task](src/screenshots/EditTask.png)
- [Mobile view](src/screenshots/DashboardMobileView.png)
- [Mobile — dark](src/screenshots/DashboardMobileDark.png)

## Design notes

**Look and feel** — Warm, paper-like neutrals (cream / charcoal) with a single **terracotta-style accent** for primary actions and focus rings. Dark mode shifts to deep browns with a softer **coral accent**. The page background uses a **subtle radial wash** tied to the accent so the shell does not feel flat.

**Typography** — **DM Sans** for UI and body copy; **Instrument Serif** for headings and display titles (loaded from Google Fonts in `index.html`).

**Tokens** — Colors, radii, and shadows are **CSS custom properties** on `:root` and `[data-theme='dark']` in `src/index.css`, so light/dark stays consistent without duplicating hex values in every component.

**Task states** — Completed items read as “done” via **lower opacity + strikethrough**. Pending tasks that are **past due** get a stronger border and an **Overdue** chip. Priority uses **small color-coded pills** (low / medium / high).

**Layout and modals** — Content is capped (~1120px) and centered. Modals use a **blurred dim backdrop**; on narrow viewports the task editor reads more like a **bottom sheet** (rounded top corners). Delete confirmation uses a compact **alert dialog** pattern with focus on the safe action first.

**Motion and accessibility** — Short transitions on hovers and panels; **`prefers-reduced-motion`** in `index.css` collapses animation duration so motion stays optional. Screen-reader-only labels are used where controls are icon-only or visually grouped.

**Code organization** — **Vite + React** (no Angular). The task board uses **Sass CSS modules** per component folder where it helps; the task editor and confirm dialog rely on **shared global classes** in `index.css` for the modal shell and form fields. Filtering, sorting, and **localStorage** load/save live under `src/lib/` — there is **no HTTP API** in this app.
