# 🏋️ FitLog — Workout Library

**FitLog** is a dark, no-nonsense gym companion: browse a library of twelve lifts, inspect specs and step-by-step instructions, lock lifts into today's plan, save lifts for later, and watch your daily work add up — all in a bold, high-contrast interface.

## 📄 Description

FitLog has three screens:

- **Home (`/`)** — a hero banner and **The Library**: all 12 workouts in a responsive grid (3×4 on large screens) with category tags, equipment, duration, calories and rating. Includes name/tag search and a **Sort By** dropdown (Duration / Calories / Rating).
- **Workout Details (`/workout/[id]`)** — a two-column layout with a large visual on the left and the workout title, description, tags, a **Key Specs** panel, numbered **Instructions**, and **Add to today's plan** / **Save for later** actions on the right.
- **My Plan (`/my-plan`)** — live metrics (Exercises / Minutes / Calories), **Today's Plan** and **Saved** tabs, per-card **View Details**, **Mark as Done** and remove (✕) actions, plus a friendly empty state.

Today's plan is capped at **5 lifts**; the navbar shows live **Plan** (filled accent pill) and **Saved** (outline pill) counters, both linking to `/my-plan`. An unknown route renders a custom **404** page.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org/) (App Router) | UI, routing & API route handler (`/api/workouts`) |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling & responsiveness (mobile → desktop) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe workout data & state |
| [React Context API](https://react.dev/learn/scaling-up-with-reducer-and-context) | Global plan/saved state with `localStorage` persistence |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications for every action |
| [Lucide React](https://lucide.dev/) | Icons throughout the UI |
| [Vercel](https://vercel.com/) | Deployment |

## ✨ Key Features

1. **Workout library with 12 lifts** — responsive card grid showing images, muscle-group tag pills, equipment, and a duration / calories / rating stats row.
2. **Detailed workout pages** — key specs table (equipment, difficulty, sets, reps, duration, calories, rating) plus a numbered 4-step instruction list.
3. **Today's Plan & Saved lists** — add / save / remove / mark-as-done with live navbar badge counters, a hard cap of 5 lifts per day, and persistence via `localStorage` (survives reloads).
4. **Live metrics dashboard** — Exercises, Minutes and Calories stat cards update instantly as the plan changes; with tabbed views and empty/loading states.
5. **Search & sort** — filter the library by workout name or muscle-group tag, and re-sort by Duration, Calories or Rating.
6. **Toast notifications** — every plan, save, done and remove action is confirmed with a themed toast.
7. **Loading & error states** — spinner animations while data is fetched, a retry button on failure, and a custom 404 page for unknown routes.
8. **Fully responsive** — grids collapse 3 → 2 → 1 columns, the navbar gets a mobile hamburger menu, and the hero stacks on small screens.

## 🚀 Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev          # http://localhost:3000

# production build & start
npm run build
npm run start
```

### Data source

The app fetches workouts from the built-in route handler `/api/workouts`, which serves the bundled FitLog dataset (the live API's single-workout endpoint returns `{"error":"Not found"}`, so the app fetches the full list and finds a workout by id). To point it at the live API instead, set:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-fitlog-api.vercel.app/workouts
```

## 🌐 Deployment

Deploy on **Vercel** (recommended):

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — click **Deploy**.

Client-side routes (`/my-plan`, `/workout/[id]`) are handled by the Next.js server, so reloading any page after deployment works without errors.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/workouts/route.ts   # GET all workouts
│   ├── workout/[id]/page.tsx   # workout details route
│   ├── my-plan/page.tsx        # my plan route
│   ├── not-found.tsx           # custom 404
│   ├── layout.tsx              # fonts, navbar, footer, toaster
│   └── page.tsx                # home (hero + library)
├── components/                 # Navbar, Hero, Library, Cards, Detail, MyPlan…
├── context/PlanContext.tsx     # plan/saved/done state + localStorage
├── data/workouts.json          # FitLog dataset (12 workouts)
└── lib/                        # types + fetch helpers
```

---

© 2026 FitLog — Workout Library. Train hard, log honest. 💪
