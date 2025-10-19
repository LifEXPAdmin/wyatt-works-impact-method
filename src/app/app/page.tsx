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
  Target,
  X
} from "lucide-react";
import { sampleBlueprint } from "@/lib/sample-data";

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
  
  // Debug sample data directly
  console.log("Sample blueprint spark phase tasks:", sampleBlueprint.phases.find(p => p.id === 'spark')?.tasks.length);
  console.log("Sample blueprint spark phase task IDs:", sampleBlueprint.phases.find(p => p.id === 'spark')?.tasks.map(t => t.id));
  
  // Debug task data
  if (currentPhaseData) {
    console.log("Phase tasks:", currentPhaseData.phase.tasks);
    console.log("Tasks length:", currentPhaseData.phase.tasks?.length || 0);
    console.log("Task IDs:", currentPhaseData.phase.tasks?.map(t => t.id) || []);
    console.log("Task titles:", currentPhaseData.phase.tasks?.map(t => t.title) || []);
    
    // Debug subtasks
    currentPhaseData.phase.tasks?.forEach((task, index) => {
      console.log(`Task ${index + 1} (${task.id}): ${task.title}`);
      console.log(`  Subtasks: ${task.children?.length || 0}`);
      if (task.children) {
        task.children.forEach((subtask, subIndex) => {
          console.log(`    Subtask ${subIndex + 1}: ${subtask.title}`);
        });
      }
    });
  }

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

  // Force initialization if store is still empty or has no tasks
  useEffect(() => {
    if (isInitialized) {
      try {
        const { projects, activeProjectId } = useBlueprint.getState();
        console.log("Current projects:", projects);
        console.log("Active project ID:", activeProjectId);
        
        if (projects.length === 0) {
          console.log("No projects found, creating default...");
          const projectId = useBlueprint.getState().createProject("My Blueprint");
          console.log("Created project with ID:", projectId);
        } else {
          // Check all projects for correct task count
          let needsRecreation = false;
          projects.forEach(project => {
            const sparkPhase = project.blueprint.phases.find(p => p.id === 'spark');
            const forgePhase = project.blueprint.phases.find(p => p.id === 'forge');
            
            if (sparkPhase && sparkPhase.tasks.length < 10) {
              console.log(`Project ${project.name} Spark phase has only ${sparkPhase.tasks.length} tasks, marking for recreation`);
              needsRecreation = true;
            }
            
            if (forgePhase && forgePhase.tasks.length < 10) {
              console.log(`Project ${project.name} Forge phase has only ${forgePhase.tasks.length} tasks, marking for recreation`);
              needsRecreation = true;
            }
          });
          
          if (needsRecreation) {
            console.log("Projects have incorrect task count, clearing all and creating fresh project...");
            // Clear all projects
            projects.forEach(project => {
              useBlueprint.getState().deleteProject(project.id);
            });
            // Create fresh project
            const projectId = useBlueprint.getState().createProject("My Blueprint");
            console.log("Created fresh project with ID:", projectId);
          } else if (activeProjectId) {
            const activeProject = projects.find(p => p.id === activeProjectId);
            if (activeProject) {
              console.log("Active project found:", activeProject.name);
              console.log("Active project phases:", activeProject.blueprint.phases.length);
              
              // Check if Spark phase has all tasks (should be 10)
              const sparkPhase = activeProject.blueprint.phases.find(p => p.id === 'spark');
              if (sparkPhase) {
                console.log("Spark phase tasks:", sparkPhase.tasks.length);
                console.log("Expected: 10 tasks");
                if (sparkPhase.tasks.length < 10) {
                  console.log(`Spark phase has only ${sparkPhase.tasks.length} tasks, recreating project with complete sample data...`);
                  // Delete the current project and create a new one
                  useBlueprint.getState().deleteProject(activeProjectId);
                  useBlueprint.getState().createProject("My Blueprint");
                }
              }
            } else {
              console.log("Active project not found, setting to first project");
              useBlueprint.getState().setActiveProject(projects[0].id);
            }
          } else {
            console.log("No active project, setting to first project");
            useBlueprint.getState().setActiveProject(projects[0].id);
          }
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
      body: "Choose Spark, Build, Launch, or Scale to focus your work. Each phase builds on the previous one.",
      placement: "right"
    },
    {
      id: "lightbulb",
      target: "[data-tour='lightbulb']",
      title: "Get AI Prompts",
      body: "Click the 💡 lightbulb to see AI prompts you can copy and paste. Customize them with your specific details!",
      placement: "bottom"
    },
    {
      id: "notes",
      target: "[data-tour='notes']",
      title: "Add Notes",
      body: "Click the arrow (→) to expand and add notes to any task or subtask. The arrow points right when closed, down when open.",
      placement: "bottom"
    },
    {
      id: "drag",
      target: "[data-tour='drag']",
      title: "Move tasks around",
      body: "Drag tasks and subtasks to reorder them. Create your own workflow!",
      placement: "bottom"
    },
    {
      id: "menu",
      target: "[data-tour='menu']",
      title: "Edit & delete",
      body: "Click the ⋮ menu to rename, delete, or add new tasks. Make it your own!",
      placement: "bottom"
    }
  ];

      // Check if this is first visit to blueprint and show phase breakdown
      useEffect(() => {
        try {
          const hasSeenOnboarding = localStorage.getItem("wwm-onboarding-seen");
          const hasSeenTour = localStorage.getItem("wwm-app-tour-v1");
          
          if (!hasSeenOnboarding) {
            // Show phase breakdown when first visiting blueprint
            setTimeout(() => setShowPhaseBreakdown(true), 1000);
          }
          
          // Temporarily disabled automatic tour to fix interaction issues
          // if (!hasSeenTour) {
          //   // Show tour after a delay to let the page load
          //   setTimeout(() => setIsTourOpen(true), 2000);
          // }
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
                  const projectId = useBlueprint.getState().createProject("My Blueprint");
                  console.log("Created project:", projectId);
                  // Force a re-render instead of reload
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                } catch (error) {
                  console.error("Error creating project:", error);
                }
              }}
              className="bg-[var(--brand)] text-black hover:opacity-90 touch-target"
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
        {/* Mobile Phase Navigation Overlay - 3/4 Screen */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                className="fixed top-0 left-0 h-full w-3/4 bg-[var(--card)] border-r border-[var(--border)] z-50"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 pt-16 mobile-safe-area h-full overflow-y-auto">
                  {/* Close Button */}
                  <div className="flex justify-end mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="touch-target"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Mobile Phase Navigation - No Collapse */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold mb-4">Blueprint Phases</h2>
                    
                    {['spark', 'forge', 'flow', 'impact'].map((phaseId) => {
                      const phaseData = getPhase(phaseId as PhaseId);
                      const isActive = activePhase === phaseId;
                      
                      return (
                        <motion.div
                          key={phaseId}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => {
                              handlePhaseChange(phaseId);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
                              isActive 
                                ? "border-[var(--brand)] bg-[var(--brand)]/10" 
                                : "border-[var(--border)] hover:border-[var(--brand)]/50 hover:bg-[var(--brand)]/5"
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-lg bg-[var(--brand)] flex items-center justify-center">
                                {phaseId === 'spark' && <Sparkles className="w-5 h-5 text-white" />}
                                {phaseId === 'forge' && <Hammer className="w-5 h-5 text-white" />}
                                {phaseId === 'flow' && <Zap className="w-5 h-5 text-white" />}
                                {phaseId === 'impact' && <Target className="w-5 h-5 text-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">
                                  {phaseId === 'spark' && 'The Spark'}
                                  {phaseId === 'forge' && 'The Build'}
                                  {phaseId === 'flow' && 'The Launch'}
                                  {phaseId === 'impact' && 'The Scale'}
                                </div>
                                <div className="text-xs text-zinc-400">
                                  <div>tasks {phaseData?.tasksCompleted || 0}/{phaseData?.totalTasks || 0}</div>
                                  <div>subtasks {phaseData?.subtasksCompleted || 0}/{phaseData?.totalSubtasks || 0}</div>
                                </div>
                              </div>
                              <div className="text-xs font-medium text-[var(--brand)]">
                                {phaseData?.progress || 0}%
                              </div>
                            </div>
                            
                            <p className="text-xs text-zinc-400 mb-3">
                              {phaseId === 'spark' && 'Clarify vision & target.'}
                              {phaseId === 'forge' && 'Make it real.'}
                              {phaseId === 'flow' && 'Create consistent momentum.'}
                              {phaseId === 'impact' && 'Launch offers & partnerships.'}
                            </p>
                            
                            <div className="space-y-1">
                              <div className="w-full bg-[var(--border)] rounded-full h-1">
                                <div 
                                  className="bg-[var(--brand)] h-1 rounded-full transition-all duration-300"
                                  style={{ width: `${phaseData?.progress || 0}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-zinc-500">
                                <span>Progress</span>
                                <span>{phaseData?.notesCount || 0} notes</span>
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      );
                    })}
                    
                    {/* Overall Progress */}
                    <div className="mt-6 p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm font-bold text-[var(--brand)]">
                          {progressData.overall}%
                        </span>
                      </div>
                      <div className="w-full bg-[var(--border)] rounded-full h-2">
                        <div 
                          className="bg-[var(--brand)] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressData.overall}%` }}
                        />
                      </div>
                    </div>
                  </div>
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
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
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
          </div>

              {/* Simplified Phase Header */}
              <div className="mobile-px py-4 sm:py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="mobile-text-xl font-bold break-words">{currentPhaseData?.phase.title}</h1>
                    <p className="mobile-text-sm text-zinc-400 mt-1 break-words">{currentPhaseData?.phase.summary}</p>
                    
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
                  
                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
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
                      className="bg-[var(--brand)] text-black hover:opacity-90 mobile-text-sm touch-target"
                    >
                      Export PDF
                    </Button>
                    
                    <div className="text-right">
                      <div className="mobile-text-sm text-zinc-400">Progress</div>
                      <div className="mobile-text-lg font-bold text-[var(--brand)]">
                        {currentPhaseData?.progress || 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simplified Task List with fade effects */}
              <div id="task-list" className="flex-1 overflow-y-auto mobile-px py-4 sm:py-6 relative">
                {/* Debug info */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs">
                    <div>Debug Info:</div>
                    <div>Active Phase: {activePhase}</div>
                    <div>Tasks Count: {currentPhaseData?.phase.tasks?.length || 0} (Expected: {activePhase === 'spark' ? '10' : activePhase === 'forge' ? '10' : '4'})</div>
                    <div>Subtasks Count: {currentPhaseData?.phase.tasks?.reduce((sum, task) => sum + (task.children?.length || 0), 0) || 0} (Expected: {activePhase === 'spark' ? '50' : activePhase === 'forge' ? '50' : '12'})</div>
                    <div>Project ID: {activeProjectData?.id}</div>
                    <div>Project Name: {activeProjectData?.name}</div>
                    <div className="mt-2 space-x-2">
                      <button 
                        onClick={() => {
                          console.log("Force recreating project...");
                          if (activeProjectData?.id) {
                            useBlueprint.getState().deleteProject(activeProjectData.id);
                          }
                          useBlueprint.getState().createProject("My Blueprint");
                        }}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                      >
                        Force Recreate Project
                      </button>
                      <button 
                        onClick={() => {
                          console.log("Clearing localStorage and reloading...");
                          localStorage.removeItem("wwm-projects-v1");
                          window.location.reload();
                        }}
                        className="px-2 py-1 bg-orange-500 text-white rounded text-xs"
                      >
                        Clear Storage & Reload
                      </button>
                      <button 
                        onClick={() => {
                          console.log("Force recreating project with new Forge phase...");
                          if (activeProjectData?.id) {
                            useBlueprint.getState().deleteProject(activeProjectData.id);
                          }
                          useBlueprint.getState().createProject("My Blueprint");
                          window.location.reload();
                        }}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                      >
                        Force New Forge Phase
                      </button>
                      <button 
                        onClick={() => {
                          console.log("Starting tour...");
                          setIsTourOpen(true);
                        }}
                        className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                      >
                        Start Tour
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Top fade overlay - Fixed to viewport */}
                <div className="fixed top-0 left-0 right-0 h-16 fade-overlay-top z-20 pointer-events-none" />
                
                {/* Bottom fade overlay - Fixed to viewport */}
                <div className="fixed bottom-0 left-0 right-0 h-16 fade-overlay-bottom z-20 pointer-events-none" />
                
                <TaskList 
                  tasks={currentPhaseData?.phase.tasks || []} 
                  phaseId={activePhase as PhaseId}
                />
              </div>

              {/* Simplified Footer */}
              <div className="mobile-px py-4 bg-[var(--card)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="mobile-text-sm text-zinc-400 break-words">
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
                className="touch-target mobile-text-sm"
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