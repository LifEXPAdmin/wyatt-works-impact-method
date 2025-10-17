"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Brain, Zap, Target, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

interface AIEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIEducationModal({ isOpen, onClose }: AIEducationModalProps) {
  const [currentSection, setCurrentSection] = useState(0);

  const handleClose = () => {
    localStorage.setItem("wwm-ai-education-seen", "true");
    onClose();
  };

  const sections = [
    {
      title: "Welcome to AI-Amplified Creation",
      icon: Brain,
      content: (
        <div className="space-y-4">
            <p className="text-lg text-zinc-300">
              You&apos;re about to use the <strong className="text-[var(--brand)]">Wyatt Works Method</strong> - 
              a blueprint that combines human creativity with AI intelligence to create something truly remarkable.
            </p>
            <div className="bg-[var(--brand)]/10 border border-[var(--brand)]/20 rounded-lg p-4">
              <p className="text-sm text-zinc-200">
                <strong>This isn&apos;t about replacing your creativity</strong> - it&apos;s about amplifying it. 
                Think of AI as your expert consultant, brainstorming partner, and quality checker all in one.
              </p>
            </div>
        </div>
      )
    },
    {
      title: "Understanding AI Types",
      icon: Zap,
      content: (
        <div className="space-y-4">
            <p className="text-zinc-300 mb-4">
              AI isn&apos;t just ChatGPT. Here are the different types that can help you:
            </p>
          <div className="grid gap-3">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3">
              <h4 className="font-semibold text-[var(--brand)] mb-1">Large Language Models (LLMs)</h4>
              <p className="text-sm text-zinc-400">ChatGPT, Claude, Gemini - Perfect for brainstorming, writing, and strategic thinking</p>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3">
              <h4 className="font-semibold text-[var(--brand)] mb-1">Image Generation AI</h4>
              <p className="text-sm text-zinc-400">Midjourney, DALL-E - Great for visual content, thumbnails, and brand assets</p>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3">
              <h4 className="font-semibold text-[var(--brand)] mb-1">Video AI</h4>
              <p className="text-sm text-zinc-400">Runway, Pictory - Perfect for video content and social media</p>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3">
              <h4 className="font-semibold text-[var(--brand)] mb-1">Audio AI</h4>
              <p className="text-sm text-zinc-400">ElevenLabs, Murf - Ideal for voiceovers, podcasts, and audio content</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How to Use AI Positively",
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-400 mb-1">AI as Your Expert Consultant</h4>
                <p className="text-sm text-zinc-400">Ask AI to analyze your market, competitors, and opportunities like you would a business consultant.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-400 mb-1">AI as Your Brainstorming Partner</h4>
                <p className="text-sm text-zinc-400">Generate 20 options, then YOU choose the best ones and add your personal touch.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-400 mb-1">AI as Your Quality Checker</h4>
                <p className="text-sm text-zinc-400">Use AI to review your work for clarity, engagement, and effectiveness.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-400 mb-1">AI as Your Research Assistant</h4>
                <p className="text-sm text-zinc-400">Get insights faster, but always validate with real people and real data.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How NOT to Use AI",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Don&apos;t Use AI to Replace Thinking</h4>
                <p className="text-sm text-zinc-400">AI should amplify your thinking, not replace it. You&apos;re still the one making decisions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Don&apos;t Accept AI Output Without Refinement</h4>
                <p className="text-sm text-zinc-400">Always add your human touch, personal voice, and authentic perspective.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Don&apos;t Be Generic in Your Prompts</h4>
                <p className="text-sm text-zinc-400">Specific prompts get better results. Include context, examples, and desired outcomes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Don&apos;t Skip Human Validation</h4>
                <p className="text-sm text-zinc-400">Always test AI suggestions with real people in your target audience.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Mastering AI Prompts",
      icon: Lightbulb,
      content: (
        <div className="space-y-4">
            <p className="text-zinc-300 mb-4">
              Great prompts = Great results. Here&apos;s how to prompt like a pro:
            </p>
            <div className="space-y-3">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3">
                <h4 className="font-semibold text-[var(--brand)] mb-2">The Context Formula</h4>
                <p className="text-sm text-zinc-400 mb-2">Always include: WHO you are, WHAT you&apos;re trying to do, WHO you&apos;re serving, and WHAT outcome you want.</p>
                <div className="bg-[var(--bg)] rounded p-2 text-xs font-mono text-zinc-300">
                  &quot;I&apos;m a [your role] trying to [your goal] for [your audience] who [their problem]. Help me [specific outcome].&quot;
                </div>
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3">
                <h4 className="font-semibold text-[var(--brand)] mb-2">The Iteration Method</h4>
                <p className="text-sm text-zinc-400 mb-2">Start broad, then get specific. Generate options first, then refine the best ones.</p>
                <div className="bg-[var(--bg)] rounded p-2 text-xs font-mono text-zinc-300">
                  Step 1: &quot;Give me 10 options for...&quot;<br/>
                  Step 2: &quot;Refine the top 3 to be more...&quot;<br/>
                  Step 3: &quot;Make this more specific and actionable&quot;
                </div>
              </div>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-3">
                <h4 className="font-semibold text-[var(--brand)] mb-2">The Role-Playing Technique</h4>
                <p className="text-sm text-zinc-400 mb-2">Ask AI to think like an expert in your field for more targeted advice.</p>
                <div className="bg-[var(--bg)] rounded p-2 text-xs font-mono text-zinc-300">
                  &quot;Act as a [expert role] and help me [specific task] for [your situation].&quot;
                </div>
              </div>
            </div>
        </div>
      )
    }
  ];

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleClose();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const skipEducation = () => {
    handleClose();
  };

  if (!isOpen) return null;

  const currentSectionData = sections[currentSection];
  const Icon = currentSectionData.icon;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[var(--card)] border border-[var(--border)] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentSectionData.title}</h2>
                <p className="text-sm text-zinc-400">
                  Step {currentSection + 1} of {sections.length}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={skipEducation}
              className="text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentSectionData.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-[var(--border)]">
            <div className="flex gap-2">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSection ? "bg-[var(--brand)]" : "bg-[var(--border)]"
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={prevSection}
                disabled={currentSection === 0}
                className="touch-target"
              >
                Previous
              </Button>
              <Button
                onClick={nextSection}
                className="bg-[var(--brand)] text-black hover:opacity-90 touch-target"
              >
                {currentSection === sections.length - 1 ? "Get Started" : "Next"}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
