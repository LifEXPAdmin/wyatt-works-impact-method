"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import EnhancedPhaseCard from "@/components/EnhancedPhaseCard";
import { Sparkles, Hammer, Zap, Target, Brain, Lightbulb } from "lucide-react";

export default function Home() {
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

  const phases = [
    { 
      title: "The Spark", 
      description: "Clarify your vision and define your target audience. This is where great ideas take shape.",
      icon: <Sparkles size={32} />,
      href: "/app?phase=spark"
    },
    { 
      title: "The Forge", 
      description: "Build your brand foundation with domain, design, and content. Make your idea real.",
      icon: <Hammer size={32} />,
      href: "/app?phase=forge"
    },
    { 
      title: "The Flow", 
      description: "Create consistent momentum through regular content and audience engagement.",
      icon: <Zap size={32} />,
      href: "/app?phase=flow"
    },
    { 
      title: "The Impact", 
      description: "Launch offers, build partnerships, and scale your system for maximum impact.",
      icon: <Target size={32} />,
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
                <Link href="/stories">See it in action</Link>
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
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] flex items-center justify-center mb-4">
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
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
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
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
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
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
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
    </main>
  );
}