import type { Metadata } from "next";
import MyPlan from "@/components/MyPlan";

export const metadata: Metadata = {
  title: "My Plan",
};

export default function MyPlanPage() {
  return <MyPlan />;
}
