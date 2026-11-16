"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/** Today's plan holds a maximum of five lifts. */
export const PLAN_CAP = 5;

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

function readIds(key: string): number[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

interface PlanContextValue {
  plan: number[];
  saved: number[];
  done: number[];
  hydrated: boolean;
  planFull: boolean;
  inPlan: (id: number) => boolean;
  inSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  addToPlan: (id: number) => boolean;
  removeFromPlan: (id: number) => void;
  toggleSaved: (id: number) => boolean;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
  clearAll: () => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once on mount (avoids SSR hydration mismatch).
  useEffect(() => {
    setPlan(readIds(PLAN_KEY));
    setSaved(readIds(SAVED_KEY));
    setDone(readIds(DONE_KEY));
    setHydrated(true);
  }, []);

  // Persist on every change.
  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(DONE_KEY, JSON.stringify(done));
  }, [done, hydrated]);

  const addToPlan = useCallback(
    (id: number) => {
      let added = false;
      setPlan((prev) => {
        if (prev.includes(id) || prev.length >= PLAN_CAP) return prev;
        added = true;
        return [...prev, id];
      });
      return added;
    },
    []
  );

  const removeFromPlan = useCallback((id: number) => {
    setPlan((prev) => prev.filter((x) => x !== id));
    setDone((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleSaved = useCallback((id: number) => {
    let added = false;
    setSaved((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      added = true;
      return [...prev, id];
    });
    return added;
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSaved((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleDone = useCallback((id: number) => {
    setDone((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clearAll = useCallback(() => {
    setPlan([]);
    setSaved([]);
    setDone([]);
  }, []);

  const value: PlanContextValue = {
    plan,
    saved,
    done,
    hydrated,
    planFull: plan.length >= PLAN_CAP,
    inPlan: (id) => plan.includes(id),
    inSaved: (id) => saved.includes(id),
    isDone: (id) => done.includes(id),
    addToPlan,
    removeFromPlan,
    toggleSaved,
    removeFromSaved,
    toggleDone,
    clearAll,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
