"use client";
import { motion } from "framer-motion";
import { type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Lightbulb, Target, Zap, CheckCircle, Brain, Hammer, Users } from "lucide-react";

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

const blueprintBenefits = [
  {
    title: "Clarify Your Vision & Target Audience",
    phase: "The Spark",
    icon: Brain,
    description: "Stop guessing who your customers are and what they really need. Get crystal clear on your purpose and ideal customer profile.",
    benefits: [
      "Define a compelling one-sentence purpose",
      "Identify your ideal customer avatar",
      "Craft a problem statement that resonates",
      "Create a unique value proposition",
      "Set realistic success metrics"
    ],
    tip: "Use AI to brainstorm 20 different ways to phrase your purpose, then choose what feels most authentic to you."
  },
  {
    title: "Build Your Brand Foundation",
    phase: "The Forge", 
    icon: Hammer,
    description: "Create the essential systems and assets that make your brand look professional and trustworthy.",
    benefits: [
      "Secure your domain and landing page",
      "Develop consistent brand colors and logo",
      "Set up social media accounts",
      "Create initial content library",
      "Establish your brand voice and tone"
    ],
    tip: "Start with one platform, master it, then expand. Don't try to be everywhere at once."
  },
  {
    title: "Create Consistent Momentum",
    phase: "The Flow",
    icon: Zap,
    description: "Build systems for regular content creation and audience engagement that don't require constant effort.",
    benefits: [
      "Plan weekly long-form content",
      "Define mid-video call-to-actions",
      "Build email list with lead magnets",
      "Engage daily with your audience",
      "Create content pillars and calendar"
    ],
    tip: "Consistency beats perfection. Better to publish good content regularly than perfect content rarely."
  },
  {
    title: "Launch Offers & Scale Systems",
    phase: "The Impact",
    icon: Target,
    description: "Turn your audience into customers and build systems that allow you to scale without burning out.",
    benefits: [
      "Create your first paid offer",
      "Develop partnership strategies",
      "Launch referral programs",
      "Document processes and SOPs",
      "Build systems for sustainable growth"
    ],
    tip: "Start with a simple, clear offer that's easy to buy. You can always add complexity later."
  }
];

const aiIntegrationTips = [
  {
    title: "AI as Your Expert Consultant",
    icon: Users,
    description: "Ask AI to analyze your market, competitors, and opportunities like you would a business consultant.",
    example: "Prompt: 'Help me analyze the competitive landscape for [your industry]. What are the gaps I could fill?'"
  },
  {
    title: "AI as Your Brainstorming Partner", 
    icon: Lightbulb,
    description: "Generate 20 options, then YOU choose the best ones and add your personal touch.",
    example: "Prompt: 'Give me 20 creative name ideas for [your business type] that [your value proposition].'"
  },
  {
    title: "AI as Your Quality Checker",
    icon: CheckCircle,
    description: "Use AI to review your work for clarity, engagement, and effectiveness.",
    example: "Prompt: 'Review this content for clarity and engagement. How can I make it more compelling?'"
  }
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-b from-[var(--brand)]/5 to-transparent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            How This Could <span className="text-[var(--brand)]">Transform</span> Your Business
          </motion.h1>
          <motion.p 
            className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Discover the practical benefits and real-world applications of the Wyatt Works Method. Learn how to build a brand that actually works.
          </motion.p>
          
          {/* Key Benefits */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <div className="text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-[var(--brand)]" />
              <div className="text-lg font-semibold text-[var(--gold)]">Clarity</div>
              <div className="text-sm text-zinc-400">Know exactly who you serve and why</div>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-[var(--brand)]" />
              <div className="text-lg font-semibold text-[var(--gold)]">Consistency</div>
              <div className="text-sm text-zinc-400">Build systems that work without you</div>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-[var(--brand)]" />
              <div className="text-lg font-semibold text-[var(--gold)]">Impact</div>
              <div className="text-sm text-zinc-400">Turn your audience into customers</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Blueprint Benefits */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            What You&apos;ll Accomplish With Each Phase
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blueprintBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full p-6 bg-[var(--card)] border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="bg-[var(--brand)]/10 text-[var(--brand)] mb-1">
                          {benefit.phase}
                        </Badge>
                        <h3 className="text-xl font-semibold">{benefit.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-zinc-300 mb-4">{benefit.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-zinc-300 mb-2">You&apos;ll Learn To:</h4>
                      <ul className="space-y-1">
                        {benefit.benefits.map((item, j) => (
                          <li key={j} className="text-sm text-zinc-400 flex items-center gap-2">
                            <span className="text-[var(--brand)]">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[var(--brand)]/10 border border-[var(--brand)]/20 rounded-lg p-3">
                      <p className="text-sm text-zinc-200">
                        <strong>Pro Tip:</strong> {benefit.tip}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* AI Integration Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-[var(--brand)]/5 to-[var(--gold)]/5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-4"
            variants={itemVariants}
          >
            How AI Amplifies Your Results
          </motion.h2>
          <motion.p 
            className="text-xl text-zinc-400 text-center mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            This blueprint teaches you to use AI as your expert consultant, not your replacement. Here&apos;s how it works:
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiIntegrationTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full p-6 bg-[var(--card)] border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--brand)] to-[var(--gold)] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{tip.title}</h3>
                    <p className="text-zinc-300 mb-4">{tip.description}</p>
                    <div className="bg-[var(--bg)] rounded-lg p-3">
                      <p className="text-sm text-zinc-400 font-mono">{tip.example}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16"
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
            Ready to Build Your Brand System?
          </motion.h2>
          <motion.p 
            className="text-xl text-zinc-400 mb-8"
            variants={itemVariants}
          >
            Stop guessing and start building. Get the step-by-step blueprint that turns your idea into a brand that works.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-[var(--brand)] text-black hover:opacity-90">
              <Link href="/app" className="flex items-center gap-2">
                Start Your Blueprint
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

