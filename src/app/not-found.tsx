import Link from "next/link";
import { Dumbbell, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-28 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-black">
        <Dumbbell className="h-8 w-8" strokeWidth={2.5} />
      </span>
      <p className="mt-8 font-display text-7xl font-bold tracking-widest text-accent sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-widest text-zinc-100 sm:text-3xl">
        This set doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
        The page you&apos;re looking for was racked, re-racked, or never loaded.
        Head back to the library and keep training.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2.5 rounded-md bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 active:scale-95"
      >
        <Home className="h-4 w-4" strokeWidth={2.5} /> Back to workouts
      </Link>
    </div>
  );
}
