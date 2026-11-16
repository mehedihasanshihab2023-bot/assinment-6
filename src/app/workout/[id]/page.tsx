import type { Metadata } from "next";
import { Suspense } from "react";
import WorkoutDetail from "@/components/WorkoutDetail";

export const metadata: Metadata = {
  title: "Workout Details",
};

export default function WorkoutDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-4 py-32">
          <span className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-accent" />
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">
            Loading workout…
          </p>
        </div>
      }
    >
      <WorkoutDetail />
    </Suspense>
  );
}
