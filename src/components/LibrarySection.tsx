"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, RotateCcw, Search, TriangleAlert } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/lib/api";
import type { SortKey, Workout } from "@/lib/types";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const load = () => {
    setLoading(true);
    setError(null);
    getWorkouts()
      .then((data) => setWorkouts(data))
      .catch(() => setError("Could not load workouts. Please try again."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((t) => t.toLowerCase().includes(q))
        )
      : workouts;
    return [...filtered].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
      return a.duration - b.duration;
    });
  }, [workouts, query, sortBy]);

  return (
    <section id="library" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading + controls */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
              The <span className="text-accent">Library</span>
            </h2>
            <p className="mt-2 text-zinc-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search (bonus) */}
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or tag…"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 py-2.5 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-accent focus:outline-none sm:w-56"
              />
            </label>

            {/* Sort dropdown */}
            <label className="relative block">
              <span className="sr-only">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="w-full appearance-none rounded-md border border-zinc-700 bg-zinc-900 py-2.5 pl-4 pr-10 text-sm font-medium text-zinc-100 focus:border-accent focus:outline-none sm:w-40"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort By: {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
            </label>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-accent" />
            <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">
              Loading workouts…
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <TriangleAlert className="h-10 w-10 text-accent" />
            <p className="text-zinc-400">{error}</p>
            <button
              type="button"
              onClick={load}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black"
            >
              <RotateCcw className="h-4 w-4" /> Retry
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            {visible.length === 0 ? (
              <p className="py-24 text-center text-zinc-500">
                No workouts match “{query}”.
              </p>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
