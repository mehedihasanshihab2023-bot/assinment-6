import type { Metadata } from "next";
import WorkoutDetail from "@/components/WorkoutDetail";

export const metadata: Metadata = {
  title: "Workout Details",
};

export default function WorkoutDetailsPage() {
  return <WorkoutDetail />;
}
