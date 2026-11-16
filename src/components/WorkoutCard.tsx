import { Clock3, Dumbbell, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <a
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-200 hover:-translate-y-1 hover:border-accent/70 hover:shadow-lg hover:shadow-accent/5"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden sm:h-48">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full border border-zinc-600 bg-zinc-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-200 backdrop-blur">
          {workout.difficulty}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-semibold uppercase tracking-wide transition-colors group-hover:text-accent">
          {workout.name}
        </h3>

        <p className="flex items-center gap-1.5 text-sm text-zinc-400">
          <Dumbbell className="h-3.5 w-3.5 shrink-0" />
          {workout.equipment}
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-zinc-800 pt-3 text-xs font-medium text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </a>
  );
}
