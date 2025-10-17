"use client";
import { useState, useEffect } from "react";
import { useBlueprint } from "@/store/useBlueprint";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Hammer, Zap, Target, ChevronLeft, ChevronRight } from "lucide-react";

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
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export default function PhaseNav({ active, onPhaseChange, onCollapseChange }: PhaseNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { getPhase, progress } = useBlueprint();
  const progressData = progress();
  
  // Force re-render when phase data changes
  const [, forceUpdate] = useState({});
  const forceRerender = () => forceUpdate({});
  
  // Listen for store changes
  useEffect(() => {
    const unsubscribe = useBlueprint.subscribe(() => {
      forceRerender();
    });
    return unsubscribe;
  }, []);

  const handlePhaseClick = (phaseId: string) => {
    if (onPhaseChange) {
      onPhaseChange(phaseId);
    }
  };

  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
  };

  return (
    <motion.aside
      className={cn(
        "relative bg-[var(--card)] border border-[var(--border)] rounded-xl transition-all duration-300",
        isCollapsed ? "w-16" : "w-full"
      )}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Better Collapse Toggle - positioned inside the sidebar */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCollapseToggle}
        className="absolute top-4 right-3 z-10 w-7 h-7 p-0 bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--brand)]/10 hover:border-[var(--brand)]/50 transition-all duration-200"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </Button>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-4 pr-12">Blueprint Phases</h2>
              
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
                              {phaseData?.tasksCompleted || 0}/{phaseData?.totalTasks || 0} main tasks
                              {phaseData?.totalSubtasks ? ` • ${phaseData.subtasksCompleted || 0}/${phaseData.totalSubtasks} subtasks` : ''}
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
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {phases.map((phase) => {
                const phaseData = getPhase(phase.id);
                const Icon = phase.icon;
                const isActive = active === phase.id;
                
                return (
                  <motion.div
                    key={phase.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <button
                      onClick={() => handlePhaseClick(phase.id)}
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                        isActive 
                          ? "bg-[var(--brand)] text-white" 
                          : "bg-[var(--border)] text-zinc-400 hover:bg-[var(--brand)]/20"
                      )}
                      title={`${phase.title} - ${phaseData?.progress || 0}%`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}