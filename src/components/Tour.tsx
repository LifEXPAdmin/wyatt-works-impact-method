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

  // Get all elements that should be unblurred (current + completed steps)
  const getUnblurredElements = useCallback(() => {
    const unblurredRects: DOMRect[] = [];
    
    // Skip step 0 (welcome step) - it should stay blurred
    if (currentStep === 0) {
      return unblurredRects; // Return empty array for step 1
    }
    
    // Add current step (but not step 0)
    if (currentStepData && currentStep > 0) {
      const currentElement = document.querySelector(currentStepData.target);
      if (currentElement) {
        unblurredRects.push(currentElement.getBoundingClientRect());
      }
    }
    
    // Add completed steps (but not step 0)
    completedSteps.forEach(stepIndex => {
      if (stepIndex > 0) { // Skip step 0
        const stepData = steps[stepIndex];
        if (stepData) {
          const element = document.querySelector(stepData.target);
          if (element) {
            unblurredRects.push(element.getBoundingClientRect());
          }
        }
      }
    });
    
    return unblurredRects;
  }, [currentStepData, completedSteps, steps, currentStep]);

  // Create overlay pieces that don't cover unblurred elements
  const createOverlayPieces = useCallback(() => {
    const unblurredRects = getUnblurredElements();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (unblurredRects.length === 0) {
      return [<div key="full-overlay" className="absolute inset-0 bg-black/70 backdrop-blur-sm" />];
    }
    
    // Sort rectangles by position
    const sortedRects = [...unblurredRects].sort((a, b) => a.top - b.top);
    const overlayPieces: JSX.Element[] = [];
    
    let currentY = 0;
    sortedRects.forEach((rect, index) => {
      // Add overlay piece above this rectangle
      if (rect.top > currentY) {
        overlayPieces.push(
          <div
            key={`above-${index}`}
            className="absolute bg-black/70 backdrop-blur-sm"
            style={{
              left: 0,
              top: currentY,
              width: viewportWidth,
              height: rect.top - currentY + 1, // Small overlap
            }}
          />
        );
      }
      
      // Add overlay pieces to the left and right of this rectangle
      if (rect.left > 0) {
        overlayPieces.push(
          <div
            key={`left-${index}`}
            className="absolute bg-black/70 backdrop-blur-sm"
            style={{
              left: 0,
              top: rect.top - 1, // Small overlap to prevent gaps
              width: rect.left + 1, // Small overlap
              height: rect.height + 2, // Small overlap
            }}
          />
        );
      }
      
      if (rect.right < viewportWidth) {
        overlayPieces.push(
          <div
            key={`right-${index}`}
            className="absolute bg-black/70 backdrop-blur-sm"
            style={{
              left: rect.right - 1, // Small overlap
              top: rect.top - 1, // Small overlap
              width: viewportWidth - rect.right + 1, // Small overlap
              height: rect.height + 2, // Small overlap
            }}
          />
        );
      }
      
      currentY = Math.max(currentY, rect.bottom);
    });
    
    // Add overlay piece below the last rectangle
    if (currentY < viewportHeight) {
      overlayPieces.push(
        <div
          key="below-last"
          className="absolute bg-black/70 backdrop-blur-sm"
          style={{
            left: 0,
            top: currentY - 1, // Small overlap
            width: viewportWidth,
            height: viewportHeight - currentY + 1, // Small overlap
          }}
        />
      );
    }
    
    return overlayPieces;
  }, [getUnblurredElements]);

  // Reset to step 1 when tour opens

  // Reset to step 1 when tour opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setCompletedSteps([]);
      // Scroll to top when tour starts
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
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

  // Scroll target into view and update position
  const scrollToTarget = useCallback(() => {
    if (!currentStepData) return;

    const targetElement = document.querySelector(currentStepData.target);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        block: "center", 
        behavior: "smooth" 
      });
      
      // Update position after scroll animation
      setTimeout(updateTargetPosition, 500);
    }
  }, [currentStepData, updateTargetPosition]);

  // Handle step changes
  useEffect(() => {
    if (isOpen && currentStepData) {
      scrollToTarget();
      updateTargetPosition();
    }
  }, [isOpen, currentStep, currentStepData, scrollToTarget, updateTargetPosition]);

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
  const handleNext = () => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey, "done");
    onClose();
  };

  const handleFinish = () => {
    localStorage.setItem(storageKey, "done");
    onFinish?.();
    onClose();
  };

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
        {/* Create overlay pieces that don't cover unblurred elements */}
        {createOverlayPieces()}

        {/* Target highlight ring for current step */}
        {targetRect && (
          <div
            className="absolute ring-2 ring-[var(--brand)] rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0)] pointer-events-none"
            style={{
              left: targetRect.left - 12,
              top: targetRect.top - 12,
              width: targetRect.width + 24,
              height: targetRect.height + 24,
            }}
          />
        )}

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
            top: isMobile ? "auto" : tooltipPosition.y,
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
