"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = {
  id: string;
  target: string;
  title: string;
  body: string;
  placement?: "top" | "bottom" | "left" | "right" | "center";
};

export type TourProps = {
  steps: Step[];
  isOpen: boolean;
  onClose: () => void;
  onFinish?: () => void;
  storageKey?: string;
};

export default function Tour({ 
  steps, 
  isOpen, 
  onClose, 
  onFinish, 
  storageKey = "wwm-app-tour-v1" 
}: TourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const focusTrapRef = useRef<HTMLDivElement>(null);

  const currentStepData = steps[currentStep];

  // Get current element for highlighting (no blurring)
  const getCurrentElement = useCallback(() => {
    if (currentStepData) {
      const currentElement = document.querySelector(currentStepData.target);
      if (currentElement) {
        return currentElement.getBoundingClientRect();
      }
    }
    return null;
  }, [currentStepData]);

  // Create highlight for current element (no blurring)
  const createHighlight = useCallback(() => {
    const currentRect = getCurrentElement();
    if (!currentRect) return null;
    
    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: currentRect.left - 4,
          top: currentRect.top - 4,
          width: currentRect.width + 8,
          height: currentRect.height + 8,
          border: '3px solid #3b82f6', // Blue border
          borderRadius: '8px',
          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)', // Blue glow
          zIndex: 1000,
        }}
      />
    );
  }, [getCurrentElement]);

  // Reset to step 1 when tour opens

  // Reset to step 1 when tour opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setCompletedSteps([]);
      // Don't scroll - keep current position
    }
  }, [isOpen]);

  // Update target position and tooltip placement
  const updateTargetPosition = useCallback(() => {
    if (!currentStepData) return;

    const targetElement = document.querySelector(currentStepData.target);
    if (!targetElement) {
      // Skip to next step if target not found
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        return;
      } else {
        // If it's the last step and target not found, close tour
        onClose();
        return;
      }
    }

    const rect = targetElement.getBoundingClientRect();
    setTargetRect(rect);

    // Calculate tooltip position based on placement
    const padding = 16;
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = 0;
    let y = 0;

    switch (currentStepData.placement) {
      case "right":
        x = rect.right + padding;
        y = rect.top + rect.height / 2 - tooltipHeight / 2;
        break;
      case "left":
        x = rect.left - tooltipWidth - padding;
        y = rect.top + rect.height / 2 - tooltipHeight / 2;
        break;
      case "top":
        x = rect.left + rect.width / 2 - tooltipWidth / 2;
        y = rect.top - tooltipHeight - padding;
        break;
      case "bottom":
        x = rect.left + rect.width / 2 - tooltipWidth / 2;
        y = rect.bottom + padding;
        break;
      case "center":
      default:
        x = viewportWidth / 2 - tooltipWidth / 2;
        y = viewportHeight / 2 - tooltipHeight / 2;
        break;
    }

    // Keep tooltip within viewport bounds
    x = Math.max(padding, Math.min(x, viewportWidth - tooltipWidth - padding));
    y = Math.max(padding, Math.min(y, viewportHeight - tooltipHeight - padding));

    setTooltipPosition({ x, y });

    // Update CSS variables for spotlight effect
    if (overlayRef.current) {
      const spotlightPadding = 12;
      overlayRef.current.style.setProperty('--rx', `${rect.left - spotlightPadding}px`);
      overlayRef.current.style.setProperty('--ry', `${rect.top - spotlightPadding}px`);
      overlayRef.current.style.setProperty('--rw', `${rect.width + spotlightPadding * 2}px`);
      overlayRef.current.style.setProperty('--rh', `${rect.height + spotlightPadding * 2}px`);
    }
  }, [currentStepData]);

  // Update position without scrolling
  const updatePosition = useCallback(() => {
    if (currentStepData) {
      updateTargetPosition();
    }
  }, [currentStepData, updateTargetPosition]);

  // Handle step changes
  useEffect(() => {
    if (isOpen && currentStepData) {
      updatePosition();
    }
  }, [isOpen, currentStep, updatePosition]);

  // Handle scroll and resize
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => {
      requestAnimationFrame(updateTargetPosition);
    };

    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isOpen, updateTargetPosition]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const focusableElements = focusTrapRef.current?.querySelectorAll(
          'button, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        if (focusableElements.length === 0) return;

        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLElement);
        const nextIndex = e.shiftKey 
          ? (currentIndex - 1 + focusableElements.length) % focusableElements.length
          : (currentIndex + 1) % focusableElements.length;
        
        focusableElements[nextIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Navigation handlers
  const handleFinish = useCallback(() => {
    localStorage.setItem(storageKey, "done");
    onFinish?.();
    onClose();
  }, [storageKey, onFinish, onClose]);

  const handleNext = useCallback(() => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  }, [completedSteps, currentStep, steps.length, handleFinish]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    localStorage.setItem(storageKey, "done");
    onClose();
  }, [storageKey, onClose]);

  if (!isOpen || !currentStepData) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999]"
        ref={overlayRef}
        aria-hidden="true"
      >
        {/* Blue highlight for current element */}
        {createHighlight()}

        {/* Tooltip */}
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute z-[10000] rounded-xl border border-[var(--border)] bg-[var(--card)]/95 shadow-2xl backdrop-blur mobile-px py-3",
            isMobile ? "w-[calc(100vw-32px)] max-w-sm" : "w-80"
          )}
          style={{
            left: isMobile ? 16 : tooltipPosition.x,
            top: isMobile ? "auto" : (currentStep === 0 ? 80 : tooltipPosition.y), // Higher for first step
            bottom: isMobile ? 16 : "auto",
          }}
          role="dialog"
          aria-labelledby="tour-title"
          aria-describedby="tour-body"
        >
          {/* Arrow */}
          {!isMobile && currentStepData.placement && currentStepData.placement !== "center" && (
            <div className={cn(
              "tour-arrow",
              `tour-arrow-${currentStepData.placement}`
            )} />
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-[var(--brand)]">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index <= currentStep ? "bg-[var(--brand)]" : "bg-[var(--border)]"
                    )}
                  />
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="w-6 h-6 p-0 hover:bg-[var(--border)] touch-target"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div ref={focusTrapRef} className="space-y-3">
            <h3 id="tour-title" className="mobile-text-base font-semibold text-[var(--fg)]">
              {currentStepData.title}
            </h3>
            <p id="tour-body" className="mobile-text-sm text-zinc-200">
              {currentStepData.body}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-[var(--border)] rounded-full h-1">
              <div
                className="bg-[var(--brand)] h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Actions */}
            <div className={cn(
              "flex gap-2",
              isMobile ? "flex-col" : "flex-row justify-between"
            )}>
              <div className={cn("flex gap-2", isMobile && "order-2")}>
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    className="flex items-center gap-1 touch-target"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSkip}
                  className={cn(isMobile && "flex-1", "touch-target")}
                >
                  Skip Tour
                </Button>
              </div>
              <Button
                onClick={handleNext}
                className={cn(
                  "bg-[var(--brand)] text-black hover:opacity-90 flex items-center gap-1 touch-target",
                  isMobile && "flex-1 order-1"
                )}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
