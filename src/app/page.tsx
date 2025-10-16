import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          From <span className="text-[var(--brand)]">Idea</span> to{" "}
          <span className="text-[var(--gold)]">Impact</span>, step by step.
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          A living blueprint that turns your brand into a system.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild className="bg-[var(--brand)] text-black hover:opacity-90">
            <Link href="/app">Start Free Blueprint</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/stories">See it in action</Link>
          </Button>
        </div>
      </section>

      <section className="mt-16 grid md:grid-cols-4 gap-4">
        {["The Spark", "The Forge", "The Flow", "The Impact"].map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)] hover:border-[var(--brand)] transition"
          >
            <div className="text-lg font-semibold">{t}</div>
            <p className="text-sm text-zinc-400 mt-1">
              Preview of what you&apos;ll do here.
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16 text-center">
        <div className="rounded-2xl border border-[var(--border)] p-8 bg-[var(--card)] inline-block">
          <div className="font-semibold">Live Preview</div>
          <p className="text-sm text-zinc-400 mt-1">
            Open the app to try a real checklist with notes—no login needed.
          </p>
          <Button asChild className="mt-4">
            <Link href="/app">Open App</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}