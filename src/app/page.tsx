"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import EnhancedPhaseCard from "@/components/EnhancedPhaseCard";
import { Sparkles, Hammer, Zap, Target } from "lucide-react";

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

        <motion.section 
          className="mt-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
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