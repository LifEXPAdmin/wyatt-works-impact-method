"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import EnhancedPhaseCard from "@/components/EnhancedPhaseCard";
import { Hammer, Rocket, TrendingUp, Brain, Lightbulb, RotateCcw, CheckCircle, AlertTriangle, X, Users, Search, CheckSquare } from "lucide-react";
import { CustomSpark } from "@/components/icons/CustomSpark";
import { useState, useEffect } from "react";

export default function Home() {
  const [isAIEducationOpen, setIsAIEducationOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleResetData = () => {
    // Clear all localStorage data
    localStorage.removeItem("wwm-projects-v1");
    localStorage.removeItem("wwm-app-tour-v1");
    localStorage.removeItem("wwm-ai-education-seen");
    localStorage.removeItem("wwm-onboarding-seen");
    
    // Show AI Education Modal immediately
    setIsAIEducationOpen(true);
    setCurrentSection(0);
  };

  // AI Education Modal sections
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
      icon: Users,
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
      icon: CheckSquare,
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

  // AI Education Modal handlers
  const handleClose = () => {
    localStorage.setItem("wwm-ai-education-seen", "true");
    setIsAIEducationOpen(false);
  };

  const handleComplete = () => {
    localStorage.setItem("wwm-ai-education-seen", "true");
    setIsAIEducationOpen(false);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleComplete();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Check if this is first visit and show AI education
  useEffect(() => {
    try {
      const hasSeenAIEducation = localStorage.getItem("wwm-ai-education-seen");
      if (!hasSeenAIEducation) {
        // Small delay to ensure everything is loaded
        setTimeout(() => setIsAIEducationOpen(true), 1500);
      }
    } catch (error) {
      console.error("Error checking AI education status:", error);
    }
  }, []);

  const phases = [
    { 
      title: "The Spark", 
      description: "Clarify your vision and define your target audience. This is where great ideas take shape.",
      icon: <CustomSpark size={32} />,
      href: "/app?phase=spark"
    },
    { 
      title: "The Build", 
      description: "Build your brand foundation with domain, design, and content. Make your idea real.",
      icon: <Hammer size={32} />,
      href: "/app?phase=forge"
    },
    { 
      title: "The Launch", 
      description: "Create consistent momentum through regular content and audience engagement.",
      icon: <Rocket size={32} />,
      href: "/app?phase=flow"
    },
    { 
      title: "The Scale", 
      description: "Launch offers, build partnerships, and scale your system for maximum impact.",
      icon: <TrendingUp size={32} />,
      href: "/app?phase=impact"
    },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-[var(--brand)]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <motion.section 
          className="text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight"
            variants={itemVariants}
          >
            From{" "}
            <span className="bg-gradient-to-r from-[var(--brand)] via-[var(--brand)] to-[var(--gold)] bg-clip-text text-transparent">
              Idea
            </span>{" "}
            to{" "}
            <span className="bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[var(--brand)] bg-clip-text text-transparent">
              Impact
            </span>
            , step by step.
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-lg text-zinc-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            A living blueprint that turns your brand into a system.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild className="bg-[var(--brand)] text-black hover:opacity-90 shadow-lg shadow-[var(--brand)]/25">
                <Link href="/app">Start Free Blueprint</Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild variant="outline" className="shadow-lg">
                <Link href="/stories">How This Could Transform Your Business</Link>
              </Button>
            </motion.div>

            {/* Temporary Reset Button for Development */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                onClick={handleResetData}
                variant="outline" 
                className="shadow-lg border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Data (Dev)
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
            >
              <EnhancedPhaseCard
                title={phase.title}
                description={phase.description}
                icon={phase.icon}
                href={phase.href}
              />
            </motion.div>
          ))}
        </motion.section>

        {/* AI Education Section */}
        <motion.section 
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] bg-clip-text text-transparent">
                AI-Amplified Creation
              </span>
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
              This blueprint combines human creativity with AI intelligence to help you create something truly remarkable. 
              Learn how to use AI as your expert consultant, not your replacement.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <motion.div
              variants={cardVariants}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--brand)]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--brand)] flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Consultant</h3>
              <p className="text-sm text-zinc-400">
                Use AI to analyze your market, competitors, and opportunities like you would a business consultant.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--brand)]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--brand)] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Brainstorming Partner</h3>
              <p className="text-sm text-zinc-400">
                Generate 20 options, then YOU choose the best ones and add your personal touch.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--brand)]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--brand)] flex items-center justify-center mb-4">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Checker</h3>
              <p className="text-sm text-zinc-400">
                Use AI to review your work for clarity, engagement, and effectiveness.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--brand)]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--brand)] flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Research Assistant</h3>
              <p className="text-sm text-zinc-400">
                Get insights faster, but always validate with real people and real data.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <div className="bg-[var(--brand)]/10 border border-[var(--brand)]/20 rounded-xl p-6 max-w-4xl mx-auto">
              <h3 className="font-semibold text-lg mb-3 text-[var(--brand)]">
                Ready to Learn AI-Assisted Creation?
              </h3>
              <p className="text-zinc-300 mb-4">
                When you start your blueprint, you&apos;ll get a comprehensive AI education that teaches you how to prompt effectively, 
                use different AI tools, and maintain your authentic voice while leveraging AI intelligence.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button asChild className="bg-[var(--brand)] text-black hover:opacity-90 shadow-lg">
                  <Link href="/app">Start with AI Education</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section 
          className="mt-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="relative inline-block"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--brand)]/5 to-[var(--gold)]/5 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-lg" />
            <div className="relative rounded-2xl border border-[var(--border)] p-8 bg-[var(--card)] shadow-xl backdrop-blur-sm">
              <div className="font-semibold text-lg mb-2">Live Preview</div>
              <p className="text-sm text-zinc-400 mb-4 max-w-md">
                Open the app to try a real checklist with notes—no login needed.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button asChild className="shadow-lg">
                  <Link href="/app">Open App</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* AI Education Modal */}
      <AnimatePresence>
        {isAIEducationOpen && (
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] flex items-center justify-center">
                      {(() => {
                        const Icon = sections[currentSection]?.icon;
                        return Icon ? <Icon className="w-6 h-6 text-white" /> : null;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{sections[currentSection]?.title}</h2>
                      <p className="text-sm text-zinc-400">
                        Step {currentSection + 1} of {sections.length}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="text-zinc-400 hover:text-zinc-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {sections[currentSection]?.content}
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-[var(--border)]">
                  <div className="flex gap-2">
                    {sections.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full border-2 transition-colors ${
                          index < currentSection 
                            ? "bg-[var(--gold)] border-[var(--gold)]" 
                            : index === currentSection 
                            ? "bg-[var(--brand)] border-[var(--brand)]" 
                            : "bg-transparent border-[var(--brand)]"
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
          </>
        )}
      </AnimatePresence>
    </main>
  );
}