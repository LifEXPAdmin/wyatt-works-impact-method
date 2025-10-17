"use client";
import { useEffect, useState } from "react";
import { useBlueprint } from "@/store/useBlueprint";
import { PhaseId } from "@/types/blueprint";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
// import TopBar from "@/components/TopBar"; // REMOVED - using NavBar from layout
import PhaseNav from "@/components/PhaseNav";
import TaskList from "@/components/TaskList";
// import RightRail from "@/components/RightRail"; // REMOVED
import CommandPalette from "@/components/CommandPalette";
import Confetti from "@/components/Confetti";
import Tour, { Step } from "@/components/Tour";
import ErrorBoundary from "@/components/ErrorBoundary";
import OnboardingModal from "@/components/OnboardingModal";
import { 
  Menu, 
  ArrowRight,
  Sparkles,
  Hammer,
  Zap,
  Target
} from "lucide-react";

function AppPageContent() {
  const { 
    load, 
    activeProject, 
    getPhase, 
    progress
  } = useBlueprint();
  
      const [activePhase, setActivePhase] = useState<string>("spark");
      const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const [showConfetti, setShowConfetti] = useState(false);
      const [lastProgress, setLastProgress] = useState(0);
      const [isTourOpen, setIsTourOpen] = useState(false);
      const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
      const [showPhaseBreakdown, setShowPhaseBreakdown] = useState(false);

      const [isInitialized, setIsInitialized] = useState(false);

  // Get store data with error handling
  let activeProjectData = null;
  let currentPhaseData = null;
  let progressData = { overall: 0, byPhase: { spark: 0, forge: 0, flow: 0, impact: 0 } };

  try {
    activeProjectData = activeProject();
    currentPhaseData = getPhase(activePhase as PhaseId);
    progressData = progress();
  } catch (error) {
    console.error("Error getting store data:", error);
  }

  console.log("Active project data:", activeProjectData);
  console.log("Current phase data:", currentPhaseData);
  console.log("Progress data:", progressData);
  console.log("Is initialized:", isInitialized);
  console.log("Active phase:", activePhase);

  useEffect(() => {
    console.log("Loading blueprint...");
    try {
      load();
      console.log("Blueprint loaded");
    } catch (error) {
      console.error("Error loading blueprint:", error);
    }
    
    // Force a re-render after a short delay to ensure store is updated
    const timer = setTimeout(() => {
      console.log("Setting initialized to true");
      setIsInitialized(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [load]);

  // Force initialization if store is still empty
  useEffect(() => {
    if (isInitialized && !activeProjectData) {
      console.log("Store is empty, forcing initialization...");
      try {
        const { projects } = useBlueprint.getState();
        if (projects.length === 0) {
          console.log("No projects found, creating default...");
          useBlueprint.getState().createProject("My Blueprint");
        }
      } catch (error) {
        console.error("Error forcing initialization:", error);
      }
    }
  }, [isInitialized, activeProjectData]);

  // Additional effect to monitor store changes
  useEffect(() => {
    if (isInitialized) {
      console.log("App initialized, checking store state...");
      try {
        console.log("Projects:", useBlueprint.getState().projects);
        console.log("Active project ID:", useBlueprint.getState().activeProjectId);
      } catch (error) {
        console.error("Error monitoring store:", error);
      }
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
    }
  ];

      // Check if this is first visit to blueprint and show phase breakdown
      useEffect(() => {
        try {
          const hasSeenOnboarding = localStorage.getItem("wwm-onboarding-seen");
          
          if (!hasSeenOnboarding) {
            // Show phase breakdown when first visiting blueprint
            setTimeout(() => setShowPhaseBreakdown(true), 1000);
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error);
        }
      }, []);

  // Handle phase completion celebrations
  useEffect(() => {
    try {
      const currentProgress = progress().overall;
      if (currentProgress === 100 && lastProgress < 100) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      setLastProgress(currentProgress);
    } catch (error) {
      console.error("Error handling progress:", error);
    }
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

      const handlePhaseChange = (phaseId: string) => {
        setActivePhase(phaseId);
      };

      const handleSidebarCollapseChange = (isCollapsed: boolean) => {
        setIsSidebarCollapsed(isCollapsed);
      };


  // Removed handlePromptClick and handleResourceClick - no longer needed

  // Simplified loading check - only show loading if we're not initialized yet
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[var(--brand)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-zinc-400">Loading your blueprint...</p>
        </div>
      </div>
    );
  }

  // If no project data, show a fallback UI that's still interactive
  if (!activeProjectData) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="flex items-center justify-center h-[calc(100vh-73px)]">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-[var(--brand)] text-6xl mb-4">📋</div>
            <h1 className="text-2xl font-bold text-zinc-100 mb-4">No Blueprint Found</h1>
            <p className="text-zinc-400 mb-6">
              It looks like there&apos;s no blueprint data available. Let&apos;s create one for you.
            </p>
            <Button
              onClick={() => {
                try {
                  useBlueprint.getState().createProject("My Blueprint");
                  window.location.reload();
                } catch (error) {
                  console.error("Error creating project:", error);
                }
              }}
              className="bg-[var(--brand)] text-black hover:opacity-90"
            >
              Create New Blueprint
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]" onClick={() => console.log("Main div clicked")}>
      {/* TopBar removed - using NavBar from layout instead */}
      
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
                        onCollapseChange={handleSidebarCollapseChange}
                      />
                    </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

            {/* Left Sidebar - Phase Navigation */}
            <div id="phase-nav" className={`hidden lg:block lg:flex-shrink-0 mobile-px pr-8 transition-all duration-300 ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-80'}`}>
              <PhaseNav 
                active={activePhase} 
                onPhaseChange={handlePhaseChange}
                onCollapseChange={handleSidebarCollapseChange}
              />
            </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? 'ml-0' : ''}`}>
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
              <div className="mobile-px py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{currentPhaseData?.phase.title}</h1>
                    <p className="text-zinc-400 mt-1">{currentPhaseData?.phase.summary}</p>
                    
                    {/* Progress Dots for 4 Phases */}
                    <div className="flex gap-2 mt-3">
                      {['spark', 'forge', 'flow', 'impact'].map((phaseId) => (
                        <div
                          key={phaseId}
                          className={`w-3 h-3 rounded-full border-2 transition-colors ${
                            phaseId === activePhase 
                              ? "bg-[var(--brand)] border-[var(--brand)]" 
                              : getPhase(phaseId as PhaseId)?.progress === 100
                              ? "bg-[var(--gold)] border-[var(--gold)]" 
                              : "bg-transparent border-[var(--brand)]"
                          }`}
                          title={`${phaseId.charAt(0).toUpperCase() + phaseId.slice(1)} Phase`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Export Button */}
                    <Button
                      onClick={async () => {
                        try {
                          console.log("Export button clicked");
                          const { exportPDF } = await import("@/lib/export");
                          console.log("Export function imported");
                          const project = activeProjectData;
                          console.log("Project data:", project);
                          if (project) {
                            console.log("Starting PDF export...");
                            const bytes = await exportPDF(project.blueprint);
                            console.log("PDF generated, bytes:", bytes);
                            const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `${project.name}-blueprint.pdf`;
                            a.click();
                            URL.revokeObjectURL(url);
                            console.log("PDF download initiated");
                          } else {
                            console.error("No project data available for export");
                            alert("No project data available for export");
                          }
                        } catch (error) {
                          console.error("PDF export failed:", error);
                          alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
                        }
                      }}
                      className="bg-[var(--brand)] text-black hover:opacity-90"
                    >
                      Export PDF
                    </Button>
                    
                    <div className="text-right">
                      <div className="text-sm text-zinc-400">Progress</div>
                      <div className="text-xl font-bold text-[var(--brand)]">
                        {currentPhaseData?.progress || 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simplified Task List with fade effects */}
              <div id="task-list" className="flex-1 overflow-y-auto mobile-px py-6 relative">
                {/* Top fade overlay */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[var(--bg)] to-transparent z-10 pointer-events-none" />
                
                {/* Bottom fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--bg)] to-transparent z-10 pointer-events-none" />
                
                <TaskList 
                  tasks={currentPhaseData?.phase.tasks || []} 
                  phaseId={activePhase as PhaseId}
                />
              </div>

              {/* Simplified Footer */}
              <div className="mobile-px py-4 bg-[var(--card)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-400">
                    {currentPhaseData?.tasksCompleted || 0} of {currentPhaseData?.totalTasks || 0} main tasks completed
                    {currentPhaseData?.totalSubtasks ? ` • ${currentPhaseData.subtasksCompleted || 0} of ${currentPhaseData.totalSubtasks} subtasks completed` : ''}
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

            {/* Right Rail - REMOVED */}
            {/* <div id="right-rail" className="hidden xl:block xl:w-80 xl:flex-shrink-0 mobile-px">
              <RightRail 
                onPromptClick={handlePromptClick}
                onResourceClick={handleResourceClick}
              />
            </div> */}
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

          {/* Phase Breakdown Modal */}
          <OnboardingModal 
            isOpen={showPhaseBreakdown}
            onClose={() => {
              setShowPhaseBreakdown(false);
              localStorage.setItem("wwm-onboarding-seen", "true");
            }}
          />
    </div>
  );
}

export default function AppPage() {
  return (
    <ErrorBoundary>
      <AppPageContent />
    </ErrorBoundary>
  );
}