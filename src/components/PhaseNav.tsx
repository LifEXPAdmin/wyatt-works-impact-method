"use client";
import { useBlueprint } from "@/store/useBlueprint";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Hammer, Zap, Target } from "lucide-react";

const phases = [
  { 
    id: 'spark' as const, 
    title: "The Spark", 
    summary: "Clarify vision & target.",
    icon: Sparkles,
    color: "from-[var(--brand)] to-[var(--gold)]"
  },
  { 
    id: 'forge' as const, 
    title: "The Forge", 
    summary: "Make it real.",
    icon: Hammer,
    color: "from-[var(--gold)] to-[var(--brand)]"
  },
  { 
    id: 'flow' as const, 
    title: "The Flow", 
    summary: "Create consistent momentum.",
    icon: Zap,
    color: "from-[var(--brand)] to-[var(--gold)]"
  },
  { 
    id: 'impact' as const, 
    title: "The Impact", 
    summary: "Launch offers & partnerships.",
    icon: Target,
    color: "from-[var(--gold)] to-[var(--brand)]"
  }
];

interface PhaseNavProps {
  active?: string;
  onPhaseChange?: (phaseId: string) => void;
}

export default function PhaseNav({ active, onPhaseChange }: PhaseNavProps) {
  const { getPhase, progress } = useBlueprint();
  const progressData = progress();

  const handlePhaseClick = (phaseId: string) => {
    if (onPhaseChange) {
      onPhaseChange(phaseId);
    }
  };

  return (
    <motion.aside
      className="bg-[var(--card)] border border-[var(--border)] rounded-xl"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Blueprint Phases</h2>
        
        <div className="space-y-3">
          {phases.map((phase) => {
            const phaseData = getPhase(phase.id);
            const Icon = phase.icon;
            const isActive = active === phase.id;
            
            return (
              <motion.div
                key={phase.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handlePhaseClick(phase.id)}
                  className={cn(
                    "w-full text-left rounded-xl border p-4 transition-all duration-200",
                    isActive 
                      ? "border-[var(--brand)] bg-[var(--brand)]/10" 
                      : "border-[var(--border)] hover:border-[var(--brand)]/50 hover:bg-[var(--brand)]/5"
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn(
                      "w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center",
                      phase.color
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{phase.title}</div>
                      <div className="text-xs text-zinc-400 truncate">
                        {phaseData?.tasksCompleted || 0}/{phaseData?.totalTasks || 0} tasks
                      </div>
                    </div>
                    <div className="text-xs font-medium text-[var(--brand)]">
                      {phaseData?.progress || 0}%
                    </div>
                  </div>
                  
                  <p className="text-xs text-zinc-400 mb-3">{phase.summary}</p>
                  
                  <div className="space-y-1">
                    <Progress 
                      value={phaseData?.progress || 0} 
                      className="h-1 bg-[var(--border)]"
                    />
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Progress</span>
                      <span>{phaseData?.notesCount || 0} notes</span>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Progress */}
        <div className="mt-6 p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-bold text-[var(--brand)]">
              {progressData.overall}%
            </span>
          </div>
          <Progress 
            value={progressData.overall} 
            className="h-2 bg-[var(--border)]"
          />
        </div>
      </div>
    </motion.aside>
  );
}