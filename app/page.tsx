import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-bold">
          Grow Better Habits With Your Panda Companion
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Build streaks, earn bamboo, and transform your jungle
          one habit at a time.
        </p>

        <Link href="/dashboard">
          <Button className="mt-8">
            Start Your Journey
          </Button>
        </Link>
      </section>
    </main>
  );
}