import { NextResponse } from "next/server";
import workouts from "@/data/workouts.json";

/**
 * Local stand-in for the FitLog API.
 * The live API's single-workout endpoint returns {"error":"Not found"},
 * so the app always fetches the full list and filters by id on the client.
 * A tiny artificial delay keeps the loading states visible, like a real network.
 */
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return NextResponse.json(workouts);
}
