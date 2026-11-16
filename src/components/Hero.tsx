import { ArrowDown, Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      {/* subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Copy */}
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            <span className="text-accent">Log every set.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2.5 rounded-md bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Dumbbell className="h-4.5 w-4.5" strokeWidth={2.5} />
            Browse Workouts
            <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        {/* Image */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-accent/30 via-transparent to-zinc-800 blur-sm"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691505.jpg?w=740"
            alt="Athlete training with a kettlebell"
            className="relative aspect-[4/3] w-full rounded-2xl border border-zinc-800 object-cover shadow-2xl"
          />
          <div className="absolute bottom-4 left-4 rounded-md border border-zinc-700 bg-zinc-950/90 px-4 py-2 backdrop-blur">
            <p className="font-display text-lg font-semibold uppercase leading-none">
              12 Lifts
            </p>
            <p className="text-xs text-zinc-400">Every muscle group</p>
          </div>
        </div>
      </div>
    </section>
  );
}
