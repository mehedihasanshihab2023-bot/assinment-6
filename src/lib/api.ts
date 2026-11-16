import type { Workout } from "./types";

/**
 * Data source for the whole app.
 *
 * By default it hits the built-in route handler at /api/workouts, which serves
 * the bundled FitLog dataset. To consume the live FitLog API instead, set
 * NEXT_PUBLIC_API_URL in .env.local, e.g.:
 *   NEXT_PUBLIC_API_URL=https://your-fitlog-api.vercel.app/workouts
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/workouts";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch workouts (${res.status})`);
  }
  return res.json();
}

/** The live API has no working single-item endpoint, so find it in the list. */
export async function getWorkout(id: number): Promise<Workout | undefined> {
  const workouts = await getWorkouts();
  return workouts.find((w) => w.id === id);
}
