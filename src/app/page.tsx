import type { Metadata } from "next";
import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LibrarySection />
    </>
  );
}
