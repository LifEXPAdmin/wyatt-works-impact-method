"use client";
import { motion } from "framer-motion";
import { type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Target, Users, Lightbulb, Award } from "lucide-react";

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

const values = [
  {
    icon: Lightbulb,
    title: "Clarity First",
    description: "Every great brand starts with crystal-clear vision and purpose. We help you define what makes you unique and valuable."
  },
  {
    icon: Target,
    title: "Strategic Focus",
    description: "Building a brand isn't about doing everything—it's about doing the right things in the right order."
  },
  {
    icon: Users,
    title: "Audience-Centric",
    description: "Your audience is the foundation of everything. We help you understand and serve them better than anyone else."
  },
  {
    icon: Award,
    title: "Results-Driven",
    description: "Every step in our method is designed to create measurable impact and sustainable growth."
  }
];

const timeline = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Started as a freelance consultant helping small businesses build their online presence."
  },
  {
    year: "2020",
    title: "The Pivot",
    description: "Developed the first version of the method while working with 50+ entrepreneurs during the pandemic."
  },
  {
    year: "2022",
    title: "The System",
    description: "Formalized the 4-phase framework after seeing consistent results across different industries."
  },
  {
    year: "2024",
    title: "The Platform",
    description: "Launched this interactive platform to help more entrepreneurs build impactful brands."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-b from-[var(--brand)]/5 to-transparent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                About the <span className="text-[var(--brand)]">Method</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                The Wyatt Works Method was born from years of helping entrepreneurs transform their ideas into impactful brands. It&apos;s not just theory—it&apos;s a proven system that works.
              </p>
              <Button asChild size="lg" className="bg-[var(--brand)] text-black hover:opacity-90">
                <Link href="/app" className="flex items-center gap-2">
                  Try the Method
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--brand)]/20 to-[var(--gold)]/20 p-8 flex items-center justify-center">
                <div className="text-8xl">🎯</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              variants={itemVariants}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-xl text-zinc-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              To democratize brand building by making it systematic, accessible, and results-driven. Every entrepreneur deserves to know how to build a brand that matters.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-16 bg-gradient-to-b from-transparent to-[var(--brand)]/5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Our Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full p-6 bg-[var(--card)] border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--brand)]/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[var(--brand)]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Founder Story */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-6">
                Meet the <span className="text-[var(--gold)]">Founder</span>
              </h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Hi, I&apos;m Wyatt. I&apos;ve spent the last 6 years helping entrepreneurs build brands that actually work. After working with hundreds of founders, I noticed patterns in what made some brands succeed while others struggled.
              </p>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                The Wyatt Works Method is the distillation of everything I&apos;ve learned about building brands that create real impact. It&apos;s not about fancy marketing tricks—it&apos;s about getting the fundamentals right.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] p-0.5">
                  <div className="w-full h-full rounded-full bg-[var(--card)] flex items-center justify-center text-xl">
                    👨‍💼
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Wyatt</div>
                  <div className="text-sm text-zinc-400">Founder & Brand Strategist</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="p-8 bg-[var(--card)] border-[var(--border)]">
                <h3 className="text-xl font-semibold mb-4">The Journey</h3>
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 text-sm font-medium text-[var(--brand)]">
                        {item.year}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-zinc-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-[var(--brand)]/5 to-[var(--gold)]/5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Ready to Build Your Brand?
          </motion.h2>
          <motion.p 
            className="text-xl text-zinc-400 mb-8"
            variants={itemVariants}
          >
            Join thousands of entrepreneurs who have transformed their ideas into impactful brands.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-[var(--brand)] text-black hover:opacity-90">
              <Link href="/app" className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}