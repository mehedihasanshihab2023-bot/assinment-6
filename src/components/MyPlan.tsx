"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Bookmark,
  Check,
  Clock3,
  Dumbbell,
  Eye,
  Flame,
  Star,
  X,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";

type Tab = "plan" | "saved";

export default function MyPlan() {
  const { plan, saved, done, hydrated, isDone, toggleDone, removeFromPlan, removeFromSaved } =
    usePlan();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("plan");

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => toast.error("Could not load workouts"))
      .finally(() => setLoading(false));
  }, []);

  const byId = useMemo(
    () => new Map(workouts.map((w) => [w.id, w])),
    [workouts]
  );

  const activeIds = tab === "plan" ? plan : saved;
  const items = activeIds
    .map((id) => byId.get(id))
    .filter((w): w is Workout => Boolean(w));

  const planned = plan
    .map((id) => byId.get(id))
    .filter((w): w is Workout => Boolean(w));
  const totalMinutes = planned.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = planned.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const stats = [
    { label: "Exercises", value: plan.length, Icon: Dumbbell },
    { label: "Minutes", value: totalMinutes, Icon: Clock3 },
    { label: "Calories", value: totalCalories, Icon: Flame },
  ];

  const handleRemove = (w: Workout) => {
    if (tab === "plan") {
      removeFromPlan(w.id);
      toast.success(`"${w.name}" removed from today's plan`);
    } else {
      removeFromSaved(w.id);
      toast.success(`"${w.name}" removed from saved`);
    }
  };

  const handleToggleDone = (w: Workout) => {
    toggleDone(w.id);
    if (isDone(w.id)) {
      toast(`"${w.name}" marked as not done`, { icon: "↩️" });
    } else {
      toast.success(`"${w.name}" marked as done — nice work! 💪`);
    }
  };

  const tabs: { key: Tab; label: string; count: number; Icon: typeof Dumbbell }[] = [
    { key: "plan", label: "Today's Plan", count: plan.length, Icon: Dumbbell },
    { key: "saved", label: "Saved", count: saved.length, Icon: Bookmark },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        My <span className="text-accent">Plan</span>
      </h1>
      <p className="mt-2 text-zinc-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics summary */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-5.5 w-5.5" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold leading-none">{value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-2 border-b border-zinc-800">
        {tabs.map(({ key, label, count, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
              tab === key
                ? "border-accent text-accent"
                : "border-transparent text-zinc-500 hover:text-zinc-200"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                tab === key ? "bg-accent text-black" : "bg-zinc-800 text-zinc-300"
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <span className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-accent" />
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">
            Loading workouts…
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-600">
            <Dumbbell className="h-8 w-8" />
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-widest text-zinc-300">
            Nothing here yet
          </h2>
          <p className="max-w-sm text-sm text-zinc-500">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 active:scale-95"
          >
            <Dumbbell className="h-4 w-4" strokeWidth={2.5} /> Go to workouts
          </Link>
        </div>
      )}

      {/* List */}
      {!loading && items.length > 0 && (
        <ul className="mt-6 space-y-4">
          {items.map((w) => {
            const worked = isDone(w.id);
            return (
              <li
                key={`${tab}-${w.id}`}
                className={`flex flex-col gap-4 rounded-xl border bg-zinc-900 p-4 transition-colors sm:flex-row sm:items-center ${
                  worked ? "border-accent/60" : "border-zinc-800"
                }`}
              >
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image}
                  alt={w.name}
                  className="h-20 w-full rounded-lg border border-zinc-800 object-cover sm:w-28"
                />

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-display text-lg font-semibold uppercase tracking-wide ${
                      worked ? "text-accent" : ""
                    }`}
                  >
                    {w.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-zinc-400">{w.equipment}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-accent" /> {w.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 text-accent" /> {w.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {w.rating}
                    </span>
                    {worked && (
                      <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 font-bold uppercase tracking-wider text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} /> Done
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workout/${w.id}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-zinc-600 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </Link>
                  {tab === "plan" && (
                    <button
                      type="button"
                      onClick={() => handleToggleDone(w)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        worked
                          ? "bg-accent text-black"
                          : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      {worked ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(w)}
                    aria-label={`Remove ${w.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition-colors hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Keep hydrated referenced so ESLint stays quiet about unused vars */}
      {!hydrated && <span className="sr-only">Restoring your plan…</span>}
    </div>
  );
}
