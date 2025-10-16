"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import PhaseNav from "@/components/PhaseNav";
import TaskList from "@/components/TaskList";
import RightRail from "@/components/RightRail";
import { useBlueprint } from "@/store/useBlueprint";
import { sampleBlueprint } from "@/lib/sample-data";

function AppContent() {
  const searchParams = useSearchParams();
  const phase = searchParams.get("phase");
  const load = useBlueprint((s) => s.load);
  const setBlueprint = useBlueprint((s) => s.setBlueprint);
  const blueprint = useBlueprint((s) => s.blueprint);

  useEffect(() => {
    load();
    if (!blueprint) setBlueprint(sampleBlueprint);
  }, [load, setBlueprint, blueprint]);

  const activePhase = blueprint?.phases.find((p) => p.id === phase) ?? blueprint?.phases[0];

  return (
    <AppShell
      sidebar={<PhaseNav active={phase ?? undefined} />}
      right={<RightRail />}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{activePhase?.title}</h1>
          <p className="text-zinc-400 mt-1">{activePhase?.summary}</p>
        </div>
        {activePhase && <TaskList tasks={activePhase.tasks} />}
      </div>
    </AppShell>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent />
    </Suspense>
  );
}
