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
import Tour, { Step } from "@/components/Tour";
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
  const [isTourOpen, setIsTourOpen] = useState(false);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log("Loading blueprint...");
    load();
    console.log("Blueprint loaded");
    
    // Force a re-render after a short delay to ensure store is updated
    const timer = setTimeout(() => {
      console.log("Setting initialized to true");
      setIsInitialized(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [load]);

  // Force initialization if store is still empty
  useEffect(() => {
    if (isInitialized && !activeProjectData) {
      console.log("Store is empty, forcing initialization...");
      const { projects, activeProjectId } = useBlueprint.getState();
      if (projects.length === 0) {
        console.log("No projects found, creating default...");
        useBlueprint.getState().createProject("My Blueprint");
      }
    }
  }, [isInitialized, activeProjectData]);

  // Additional effect to monitor store changes
  useEffect(() => {
    if (isInitialized) {
      console.log("App initialized, checking store state...");
      console.log("Projects:", useBlueprint.getState().projects);
      console.log("Active project ID:", useBlueprint.getState().activeProjectId);
    }
  }, [isInitialized]);

  // Tour steps definition
  const tourSteps: Step[] = [
    {
      id: "phase",
      target: "#phase-nav",
      title: "Pick a Phase",
      body: "Choose Spark, Forge, Flow, or Impact to focus your work. Each phase builds on the previous one.",
      placement: "right"
    },
    {
      id: "tasks",
      target: "#task-list",
      title: "Check tasks & add notes",
      body: "Tick off steps and capture decisions. Everything autosaves locally—no login needed.",
      placement: "bottom"
    },
    {
      id: "export",
      target: "#right-rail",
      title: "Export or continue later",
      body: "Download PDF/Markdown or just come back—your progress is saved automatically.",
      placement: "left"
    }
  ];

  // Check if this is first visit and show tour
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("wwm-app-tour-v1");
    if (!hasSeenTour) {
      // Small delay to ensure everything is loaded
      setTimeout(() => setIsTourOpen(true), 1000);
    }
  }, []);

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

  console.log("Active project data:", activeProjectData);
  console.log("Current phase data:", currentPhaseData);
  console.log("Progress data:", progressData);

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

  if (!isInitialized || !activeProjectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
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
      
      <div className="flex h-[calc(100vh-73px)] lg:h-[calc(100vh-73px)]">
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
        <div id="phase-nav" className="hidden lg:block lg:w-80 lg:flex-shrink-0 mobile-px">
          <PhaseNav 
            active={activePhase} 
            onPhaseChange={handlePhaseChange}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mobile-px py-4 border-b border-[var(--border)]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="touch-target"
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
              className="touch-target"
            >
              ⌘K
            </Button>
          </div>

          {/* Simplified Phase Header */}
          <div className="mobile-px py-6 border-b border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{currentPhaseData?.phase.title}</h1>
                <p className="text-zinc-400 mt-1">{currentPhaseData?.phase.summary}</p>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-zinc-400">Progress</div>
                <div className="text-xl font-bold text-[var(--brand)]">
                  {currentPhaseData?.progress || 0}%
                </div>
              </div>
            </div>
          </div>

          {/* Simplified Task List */}
          <div id="task-list" className="flex-1 overflow-y-auto mobile-px py-6">
            <TaskList 
              tasks={currentPhaseData?.phase.tasks || []} 
              phaseId={activePhase as PhaseId}
            />
          </div>

          {/* Simplified Footer */}
          <div className="border-t border-[var(--border)] mobile-px py-4 bg-[var(--card)]">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-400">
                {currentPhaseData?.tasksCompleted || 0} of {currentPhaseData?.totalTasks || 0} tasks completed
              </div>
              
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
                className="touch-target"
              >
                Next Phase
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Rail - Desktop Only */}
        <div id="right-rail" className="hidden xl:block xl:w-80 xl:flex-shrink-0 mobile-px">
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

      {/* Guided Tour */}
      <Tour
        steps={tourSteps}
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onFinish={() => {
          console.log("Tour completed!");
        }}
        storageKey="wwm-app-tour-v1"
      />
    </div>
  );
}