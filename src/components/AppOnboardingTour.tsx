"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, ArrowLeft, Sparkles, Hammer, Zap } from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector for the element to highlight
  position: "top" | "bottom" | "left" | "right";
  icon?: React.ComponentType<{ className?: string }>;
}

const tourSteps: TourStep[] = [
  {
    id: "phases",
    title: "Pick a Phase",
    description: "Choose from The Spark, Forge, Flow, or Impact phases to focus on different aspects of building your brand.",
    target: "[data-tour='phases']",
    position: "right",
    icon: Sparkles,
  },
  {
    id: "tasks",
    title: "Check Tasks & Write Notes",
    description: "Complete tasks by checking them off and add your own notes to track progress and decisions.",
    target: "[data-tour='tasks']",
    position: "left",
    icon: Hammer,
  },
  {
    id: "export",
    title: "Export & Continue Later",
    description: "Export your blueprint as PDF or Markdown, or use the smart prompts to get unstuck.",
    target: "[data-tour='export']",
    position: "left",
    icon: Zap,
  },
];

export default function AppOnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [, setTargetElement] = useState<HTMLElement | null>(null);
  const [, setOverlay] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Check if user has seen the tour
    const hasSeenTour = localStorage.getItem("wwm-app-tour-seen");
    if (!hasSeenTour) {
      // Delay showing the tour to allow the page to load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const step = tourSteps[currentStep];
    const element = document.querySelector(step.target) as HTMLElement;
    
    if (element) {
      setTargetElement(element);
      
      // Create overlay
      const overlayEl = document.createElement("div");
      overlayEl.className = "fixed inset-0 bg-black/50 pointer-events-none z-40";
      document.body.appendChild(overlayEl);
      setOverlay(overlayEl);

      // Highlight target element
      element.style.position = "relative";
      element.style.zIndex = "50";
      element.style.boxShadow = "0 0 0 4px var(--brand), 0 0 0 8px var(--brand)/20";
      element.style.borderRadius = "12px";

      // Scroll element into view
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      return () => {
        // Cleanup
        element.style.position = "";
        element.style.zIndex = "";
        element.style.boxShadow = "";
        element.style.borderRadius = "";
        overlayEl.remove();
      };
    }
  }, [isOpen, currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setIsOpen(false);
    localStorage.setItem("wwm-app-tour-seen", "true");
  };

  const handleSkip = () => {
    handleFinish();
  };

  if (!isOpen) return null;

  const step = tourSteps[currentStep];
  const Icon = step.icon;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Tour Card */}
        <motion.div
          className="relative w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-[var(--border)]">
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Skip tour"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              {Icon && (
                <div className="w-10 h-10 rounded-lg bg-[var(--brand)]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--brand)]" />
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold">{step.title}</h2>
                <div className="text-sm text-zinc-400">
                  Step {currentStep + 1} of {tourSteps.length}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-zinc-300 leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Progress */}
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <div className="flex justify-center space-x-2">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "bg-[var(--brand)] scale-125"
                      : index < currentStep
                      ? "bg-[var(--gold)]"
                      : "bg-[var(--border)]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="opacity-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-3 ml-auto">
              <Button variant="outline" onClick={handleSkip}>
                Skip Tour
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-[var(--brand)] text-black hover:opacity-90"
              >
                {currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}
                {currentStep < tourSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
