"use client";
import { useEffect, useState } from "react";
import { useBlueprint } from "@/store/useBlueprint";
import { Task, PhaseId } from "@/types/blueprint";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import PhaseNav from "@/components/PhaseNav";
import TaskList from "@/components/TaskList";
import RightRail from "@/components/RightRail";
import CommandPalette from "@/components/CommandPalette";
import Confetti from "@/components/Confetti";
import AppOnboardingTour from "@/components/AppOnboardingTour";
import { 
  Menu, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Hammer,
  Zap,
  Target
} from "lucide-react";

export default function AppPage() {
  const { 
    load, 
    activeProject, 
    getPhase, 
    progress,
    updateNotes
  } = useBlueprint();
  
  const [activePhase, setActivePhase] = useState<string>("spark");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastProgress, setLastProgress] = useState(0);

  useEffect(() => {
    load();
  }, [load]);

  // Handle phase completion celebrations
  useEffect(() => {
    const currentProgress = progress().overall;
    if (currentProgress === 100 && lastProgress < 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setLastProgress(currentProgress);
  }, [progress, lastProgress]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setIsCommandPaletteOpen(true);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeProjectData = activeProject();
  const currentPhaseData = getPhase(activePhase as PhaseId);
  const progressData = progress();

  const handlePhaseChange = (phaseId: string) => {
    setActivePhase(phaseId);
  };

  const handlePromptClick = (prompt: string) => {
    // Find the first task with notes in the current phase
    const phase = activeProjectData?.blueprint.phases.find(p => p.id === activePhase);
    if (phase) {
      const findTaskWithNotes = (tasks: Task[]): Task | null => {
        for (const task of tasks) {
          if (task.notes) return task;
          if (task.children) {
            const found = findTaskWithNotes(task.children);
            if (found) return found;
          }
        }
        return null;
      };
      
      const taskWithNotes = findTaskWithNotes(phase.tasks);
      if (taskWithNotes) {
        updateNotes(taskWithNotes.id, `${taskWithNotes.notes}\n\n${prompt}`);
      }
    }
  };

  const handleResourceClick = (resource: { title: string; description: string }) => {
    // Add resource to notes
    const citation = `\n\n**Resource**: ${resource.title} - ${resource.description}`;
    handlePromptClick(citation);
  };

  if (!activeProjectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[var(--brand)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-zinc-400">Loading your blueprint...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <TopBar />
      
      <div className="flex h-[calc(100vh-73px)]">
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                className="fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-[var(--card)] border-r border-[var(--border)] z-40"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 pt-16">
                  <PhaseNav 
                    active={activePhase} 
                    onPhaseChange={handlePhaseChange}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Sidebar - Phase Navigation */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0 p-4">
          <PhaseNav 
            active={activePhase} 
            onPhaseChange={handlePhaseChange}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-[var(--border)]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-4 h-4 mr-2" />
              Phases
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[var(--brand)]/10 flex items-center justify-center">
                {activePhase === 'spark' && <Sparkles className="w-3 h-3 text-[var(--brand)]" />}
                {activePhase === 'forge' && <Hammer className="w-3 h-3 text-[var(--brand)]" />}
                {activePhase === 'flow' && <Zap className="w-3 h-3 text-[var(--brand)]" />}
                {activePhase === 'impact' && <Target className="w-3 h-3 text-[var(--brand)]" />}
              </div>
              <span className="text-sm font-medium">
                {currentPhaseData?.phase.title}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCommandPaletteOpen(true)}
            >
              ⌘K
            </Button>
          </div>

          {/* Phase Header */}
          <motion.div
            className="p-6 border-b border-[var(--border)]"
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{currentPhaseData?.phase.title}</h1>
                <p className="text-zinc-400 mt-1">{currentPhaseData?.phase.summary}</p>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-zinc-400">Phase Progress</div>
                <div className="text-2xl font-bold text-[var(--brand)]">
                  {currentPhaseData?.progress || 0}%
                </div>
              </div>
            </div>

            {/* Mini Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[var(--bg)] rounded-lg p-3">
                <div className="text-sm text-zinc-400">Tasks</div>
                <div className="text-lg font-semibold">
                  {currentPhaseData?.tasksCompleted || 0}/{currentPhaseData?.totalTasks || 0}
                </div>
              </div>
              <div className="bg-[var(--bg)] rounded-lg p-3">
                <div className="text-sm text-zinc-400">Notes</div>
                <div className="text-lg font-semibold">
                  {currentPhaseData?.notesCount || 0}
                </div>
              </div>
              <div className="bg-[var(--bg)] rounded-lg p-3">
                <div className="text-sm text-zinc-400">Overall</div>
                <div className="text-lg font-semibold text-[var(--brand)]">
                  {progressData.overall}%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Task List */}
          <div className="flex-1 overflow-y-auto p-6">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TaskList 
                tasks={currentPhaseData?.phase.tasks || []} 
                phaseId={activePhase as PhaseId}
              />
            </motion.div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-[var(--border)] p-4 bg-[var(--card)]">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-400">
                {currentPhaseData?.tasksCompleted || 0} of {currentPhaseData?.totalTasks || 0} tasks completed
              </div>
              
              <div className="flex gap-2">
                {currentPhaseData?.progress === 100 && (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Phase Complete!</span>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Go to next phase
                    const phases = ['spark', 'forge', 'flow', 'impact'];
                    const currentIndex = phases.indexOf(activePhase);
                    if (currentIndex < phases.length - 1) {
                      setActivePhase(phases[currentIndex + 1]);
                    }
                  }}
                  disabled={activePhase === 'impact'}
                >
                  Next Phase
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Rail - Desktop Only */}
        <div className="hidden xl:block xl:w-80 xl:flex-shrink-0 p-4">
          <RightRail 
            onPromptClick={handlePromptClick}
            onResourceClick={handleResourceClick}
          />
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Confetti */}
      <Confetti 
        trigger={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Onboarding Tour */}
      <AppOnboardingTour />
    </div>
  );
}