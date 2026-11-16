"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bookmark, Dumbbell, Menu, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/workout")
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-black">
            <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-2xl font-semibold tracking-wide uppercase">
            Fit<span className="text-accent">Log</span>
          </span>
        </Link>

        {/* Middle links (desktop) */}
        <ul className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive(link.href)
                    ? "bg-accent text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: status badges + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            title="Today's plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
          >
            <Dumbbell className="h-3.5 w-3.5" strokeWidth={2.5} />
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-bold text-accent">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            title="Saved workouts"
            className="flex items-center gap-1.5 rounded-full border border-zinc-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-300 transition-colors hover:border-accent hover:text-accent"
          >
            <Bookmark className="h-3.5 w-3.5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-800 px-1 text-[11px] font-bold text-zinc-100">
              {saved.length}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 text-zinc-300 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-4 py-2.5 text-sm font-semibold uppercase tracking-wider ${
                    isActive(link.href)
                      ? "bg-accent text-black"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
