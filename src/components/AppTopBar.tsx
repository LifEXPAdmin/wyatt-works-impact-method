"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useBlueprint } from "@/store/useBlueprint";
import { Progress } from "@/components/ui/progress";

export default function AppTopBar() {
  const load = useBlueprint((s) => s.load);
  const progress = useBlueprint((s) => s.progress)().overall;

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(11,14,20,0.7)] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Wyatt Works Method
        </Link>
        <div className="w-56">
          <Progress value={progress} />
          <div className="text-xs text-zinc-400 mt-1">
            Overall progress: {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}

