"use client";
import { useBlueprint } from "@/store/useBlueprint";
import Link from "next/link";
import { cn } from "@/lib/utils";

const labels = { 
  spark: "The Spark", 
  forge: "The Forge", 
  flow: "The Flow", 
  impact: "The Impact" 
};

export default function PhaseNav({ active }: { active?: string }) {
  const bp = useBlueprint((s) => s.blueprint);
  const prog = useBlueprint((s) => s.progress)().byPhase;

  return (
    <div className="space-y-2">
      {bp?.phases.map((p) => (
        <Link
          key={p.id}
          href={`/app?phase=${p.id}`}
          className={cn(
            "block rounded-xl border border-[var(--border)] p-4 hover:border-[var(--brand)] transition",
            active === p.id && "border-[var(--brand)]"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {labels[p.id as keyof typeof labels]}
            </div>
            <span className="text-xs text-zinc-400">
              {prog[p.id as keyof typeof prog] ?? 0}%
            </span>
          </div>
          <p className="text-sm text-zinc-400 mt-1">{p.summary}</p>
        </Link>
      ))}
    </div>
  );
}
