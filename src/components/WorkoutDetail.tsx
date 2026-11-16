"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  Plus,
  Star,
} from "lucide-react";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";

export default function WorkoutDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, toggleSaved, inPlan, inSaved, planFull } = usePlan();

  useEffect(() => {
    if (!Number.isInteger(id)) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getWorkouts()
      .then((data) => setWorkout(data.find((w) => w.id === id) ?? null))
      .catch(() => setWorkout(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-accent" />
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">
          Loading workout…
        </p>
      </div>
    );
  }

  if (!workout || !Number.isInteger(id)) notFound();

  const alreadyInPlan = inPlan(workout.id);
  const isFull = planFull && !alreadyInPlan;
  const savedAlready = inSaved(workout.id);

  const handleAddToPlan = () => {
    if (addToPlan(workout.id)) {
      toast.success(`"${workout.name}" added to today's plan`);
    } else if (isFull) {
      toast.error(`Plan is full — max ${PLAN_CAP} lifts per day`);
    }
  };

  const handleSave = () => {
    const added = toggleSaved(workout.id);
    toast.success(added ? `"${workout.name}" saved for later` : "Removed from saved");
  };

  const specs: { label: string; value: string }[] = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: `${workout.rating} / 5` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to library
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left — visual */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout.image}
            alt={workout.name}
            className="h-72 w-full object-cover sm:h-96 lg:h-full"
          />
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black">
            {workout.difficulty}
          </span>
        </div>

        {/* Right — details */}
        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl lg:text-5xl">
            {workout.name}
          </h1>
          <p className="mt-4 leading-relaxed text-zinc-400">
            {workout.description}
          </p>

          {/* Quick stats strip */}
          <div className="mt-6 flex flex-wrap gap-5 text-sm font-medium text-zinc-300">
            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-accent" /> {workout.duration} min
            </span>
            <span className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-accent" /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" /> {workout.rating}
            </span>
          </div>

          {/* Key specs */}
          <div className="mt-8 overflow-hidden rounded-xl border border-zinc-800">
            <h2 className="border-b border-zinc-800 bg-zinc-900 px-5 py-3 font-display text-sm font-semibold uppercase tracking-widest text-zinc-300">
              Key Specs
            </h2>
            <dl>
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between gap-4 px-5 py-3 text-sm ${
                    i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/50"
                  }`}
                >
                  <dt className="font-semibold uppercase tracking-wider text-zinc-500">
                    {spec.label}
                  </dt>
                  <dd className="font-medium text-zinc-100">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Instructions */}
          <h2 className="mt-10 font-display text-xl font-semibold uppercase tracking-widest text-zinc-200">
            Instructions
          </h2>
          <ol className="mt-4 space-y-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-black">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed text-zinc-300">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToPlan}
              disabled={alreadyInPlan || isFull}
              className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-md bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition enabled:hover:scale-[1.02] enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {alreadyInPlan ? (
                <>
                  <Check className="h-4.5 w-4.5" strokeWidth={3} /> In today&apos;s plan
                </>
              ) : (
                <>
                  <Plus className="h-4.5 w-4.5" strokeWidth={3} />
                  {isFull ? `Plan full (${PLAN_CAP}/${PLAN_CAP})` : "Add to today's plan"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex flex-1 items-center justify-center gap-2.5 rounded-md border px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition hover:scale-[1.02] active:scale-95 ${
                savedAlready
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-zinc-600 text-zinc-200 hover:border-accent hover:text-accent"
              }`}
            >
              <Bookmark
                className={`h-4.5 w-4.5 ${savedAlready ? "fill-accent" : ""}`}
              />
              {savedAlready ? "Saved" : "Save for later"}
            </button>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500">
            <Dumbbell className="h-3.5 w-3.5" />
            Cap of {PLAN_CAP} lifts for today — finish them, then load more.
          </p>
        </div>
      </div>
    </div>
  );
}
