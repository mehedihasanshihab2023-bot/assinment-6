import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FitLog — Workout Library",
    template: "%s | FitLog",
  },
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-100">
        <PlanProvider>
          <Suspense
            fallback={
              <div className="h-16 border-b border-zinc-800 bg-zinc-950" aria-hidden />
            }
          >
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#18181b",
                color: "#fafafa",
                border: "1px solid #3f3f46",
                borderRadius: "10px",
                fontSize: "14px",
              },
              success: { iconTheme: { primary: "#ccff00", secondary: "#09090b" } },
              error: { iconTheme: { primary: "#ef4444", secondary: "#09090b" } },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
