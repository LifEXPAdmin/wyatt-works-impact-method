"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Hammer, Zap, Target } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    title: "The Spark",
    description: "Clarify your vision and define your target audience. This is where great ideas take shape.",
    color: "from-[var(--brand)] to-[var(--gold)]",
  },
  {
    icon: Hammer,
    title: "The Forge",
    description: "Build your brand foundation with domain, design, and content. Make your idea real.",
    color: "from-[var(--gold)] to-[var(--brand)]",
  },
  {
    icon: Zap,
    title: "The Flow",
    description: "Create consistent momentum through regular content and audience engagement.",
    color: "from-[var(--brand)] to-[var(--gold)]",
  },
  {
    icon: Target,
    title: "The Impact",
    description: "Launch offers, build partnerships, and scale your system for maximum impact.",
    color: "from-[var(--gold)] to-[var(--brand)]",
  },
];

interface OnboardingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function OnboardingModal({ isOpen: propIsOpen, onClose: propOnClose }: OnboardingModalProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Use prop values if provided, otherwise use internal state
  const modalIsOpen = propIsOpen !== undefined ? propIsOpen : isOpen;
  const handleClose = propOnClose || (() => {
    setIsOpen(false);
    localStorage.setItem("wwm-onboarding-seen", "true");
  });

  useEffect(() => {
    // Only auto-show if no props are provided (backward compatibility)
    if (propIsOpen === undefined) {
      const hasSeenOnboarding = localStorage.getItem("wwm-onboarding-seen");
      if (!hasSeenOnboarding) {
        setIsOpen(true);
      }
    }
  }, [propIsOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative w-full max-w-2xl bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative p-6 border-b border-[var(--border)]">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Welcome to the Wyatt Works Method</h2>
                  <p className="text-zinc-400">
                    Your journey from idea to impact starts here
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-8">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${currentStepData.color} flex items-center justify-center`}>
                      <currentStepData.icon 
                        size={32} 
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{currentStepData.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </motion.div>

                  {/* Progress Indicator */}
                  <div className="flex justify-center space-x-2 mb-6">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                          index < currentStep 
                            ? "bg-[var(--gold)] border-[var(--gold)]" 
                            : index === currentStep 
                            ? "bg-[var(--brand)] border-[var(--brand)]" 
                            : "bg-transparent border-[var(--brand)]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="touch-target"
                  >
                    Previous
                  </Button>

                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={handleClose}>
                      Skip
                    </Button>
                    <Button onClick={handleNext} className="bg-[var(--brand)] text-black hover:opacity-90">
                      {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
